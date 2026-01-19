import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Props = { initialPosition?: string };

const API_BASE = import.meta.env.VITE_API_URL;

const ALL_POSITIONS = [
  "フロントエンドエンジニア",
  "バックエンドエンジニア",
  "インフラエンジニア",
  "プロジェクトマネージャー / ITコンサル",
] as const;

type Position = (typeof ALL_POSITIONS)[number];

type ApplyFormState = {
  positions: Position[];
  name: string;
  phone: string;
  email: string;
  portfolio: string;
  github: string;
  resumeUrl: string;
  message: string;
};

const initialForm: ApplyFormState = {
  positions: [],
  name: "",
  phone: "",
  email: "",
  portfolio: "",
  github: "",
  resumeUrl: "",
  message: "",
};

// Position の安全判定（外部入力 initialPosition 用）
const isPosition = (v: string): v is Position =>
  (ALL_POSITIONS as readonly string[]).includes(v);

const ApplyForm = ({ initialPosition = "" }: Props) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ApplyFormState>(initialForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const updateField = <K extends keyof ApplyFormState>(
    key: K,
    value: ApplyFormState[K]
  ) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* 初期職種（URLから来たもの）をチェックON */
  useEffect(() => {
    if (!initialPosition) return;
    if (!isPosition(initialPosition)) return;

    setForm((p) => ({
      ...p,
      positions: p.positions.includes(initialPosition)
        ? p.positions
        : [...p.positions, initialPosition], // 既存選択を保持して追加
    }));
  }, [initialPosition]);

  const togglePosition = (pos: Position) => {
    updateField(
      "positions",
      form.positions.includes(pos)
        ? form.positions.filter((x) => x !== pos)
        : [...form.positions, pos]
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;

    // ここにない name は無視（安全策）
    if (
      name !== "name" &&
      name !== "phone" &&
      name !== "email" &&
      name !== "portfolio" &&
      name !== "github" &&
      name !== "resumeUrl" &&
      name !== "message"
    ) {
      return;
    }

    updateField(name, e.target.value);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;

    if (f && f.size > 10 * 1024 * 1024) {
      alert("ファイルサイズは10MB以下にしてください。");
      e.currentTarget.value = "";
      return;
    }
    setResumeFile(f);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!API_BASE) {
      alert("送信先(API URL)が未設定です。管理者にご連絡ください。");
      return;
    }

    if (form.positions.length === 0) {
      alert("応募職種を1つ以上選択してください。");
      return;
    }
    if (!form.resumeUrl.trim() && !resumeFile) {
      alert("職務経歴書 / スキルシート をURLまたはファイルでご提出してください。");
      return;
    }
    if (!form.message.trim()) {
      alert("自己PR・備考をご入力してください。");
      return;
    }

    try {
      const fd = new FormData();
      form.positions.forEach((p) => fd.append("positions[]", p));
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("portfolio", form.portfolio);
      fd.append("github", form.github);
      fd.append("resumeUrl", form.resumeUrl);
      fd.append("message", form.message);
      if (resumeFile) fd.append("resumeFile", resumeFile);

      const res = await fetch(`${API_BASE}/api/apply`, {
        method: "POST",
        body: fd,
      });

      const data: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        let msg = "応募の送信に失敗しました。";
        if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          msg = (data as { message: string }).message;
        }
        throw new Error(msg);
      }

      navigate("/apply/thanks", {
        state: { name: form.name, positions: form.positions },
        replace: true,
      });

      setForm(initialForm);
      setResumeFile(null);
    } catch {
      alert("応募の送信中にエラーが発生しました。");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4">応募フォーム</h2>

      {form.positions.length > 0 && (
        <p className="text-center text-gray-600 mb-8">
          応募職種：
          <span className="font-semibold">{form.positions.join(" / ")}</span>
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        {/* 応募職種（チェックボックス） */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            応募職種 <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {ALL_POSITIONS.map((p) => (
              <label key={p} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.positions.includes(p)}
                  onChange={() => togglePosition(p)}
                  className="accent-blue-600"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="email"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            お電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            inputMode="tel"
            placeholder="090-1234-5678"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              職務経歴書 / スキルシート URL
            </label>
            <input
              name="resumeUrl"
              value={form.resumeUrl}
              onChange={onChange}
              placeholder="https://..."
              inputMode="url"
              pattern="https?://.+"
              className="w-full border rounded-md px-4 py-2"
            />
            <p className="text-xs text-red-500 mt-1">※ URL またはファイルのいずれか必須</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              職務経歴書 / スキルシート ファイル（10MBまで）
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md,.rtf,.png,.jpg,.jpeg"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {resumeFile && (
              <p className="text-xs text-gray-500 mt-1">
                選択中: {resumeFile.name}（{Math.round(resumeFile.size / 1024)} KB）
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            自己PR・備考 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={onChange}
            required
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            応募する
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
