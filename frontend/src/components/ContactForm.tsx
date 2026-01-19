import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Errors = Partial<{
  name: string;
  email: string;
  type: string;
  message: string;
  agree: string;
  submit: string;
}>;

const API_BASE = import.meta.env.VITE_API_URL; // 例: http://localhost:8787

const INQUIRY_TYPES = ["お見積り", "ご相談", "採用関連", "その他"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: "" | InquiryType;
  subject: string;
  message: string;
  agree: boolean;
  honey: string; // honeypot
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  type: "",
  subject: "",
  message: "",
  agree: false,
  honey: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, submit: undefined }));
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;

    // ここで「知らない name」は無視（安全策）
    if (
      field !== "name" &&
      field !== "company" &&
      field !== "email" &&
      field !== "phone" &&
      field !== "type" &&
      field !== "subject" &&
      field !== "message" &&
      field !== "agree" &&
      field !== "honey"
    ) {
      return;
    }

    if (field === "agree") {
      updateField("agree", (e.target as HTMLInputElement).checked);
      return;
    }

    const value = e.target.value;

    if (field === "type") {
      // select の options が限定されている前提でOK（空文字も許容）
      updateField("type", value === "" ? "" : (value as InquiryType));
      return;
    }

    // それ以外は全部 string
    updateField(field, value);
  };

  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "お名前を入力してください。";
    if (!form.email.trim()) e.email = "メールアドレスを入力してください。";
    else if (!isEmail(form.email.trim())) e.email = "メールアドレスの形式が正しくありません。";
    if (!form.type) e.type = "お問い合わせ種別を選択してください。";
    if (!form.message.trim()) e.message = "メッセージを入力してください。";
    else if (form.message.trim().length < 10) e.message = "10文字以上でご入力ください。";
    if (!form.agree) e.agree = "プライバシーポリシーへの同意が必要です。";
    return e;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // --- スパム対策：ハニーポット or 送信が早すぎる ---
    const tookMs = Date.now() - startedAtRef.current;
    if (form.honey || tookMs < 1500) {
      navigate("/contact/thanks", { state: { name: form.name }, replace: true });
      return;
    }

    // --- バリデーション ---
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      const order: (keyof Errors)[] = ["name", "email", "type", "message", "agree"];
      const first = order.find((k) => v[k]);
      if (first) {
        const el = document.querySelector(`[name="${first}"]`) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        type: form.type,
        subject: form.subject.trim(),
        message: form.message.trim(),
      };

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "送信に失敗しました。時間を置いて再度お試しください。";
        try {
          const data: unknown = await res.json();
          if (
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
          ) {
            msg = (data as { message: string }).message;
          }
        } catch {}
        throw new Error(msg);
      }

      navigate("/contact/thanks", {
        state: { name: form.name },
        replace: true,
      });

      setForm(initialForm);
      startedAtRef.current = Date.now();
    } catch {
      setErrors((p) => ({ ...p, submit: "送信に失敗しました。時間を置いて再度お試しください。" }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  const help = (msg?: string) => (msg ? <p className="mt-1 text-sm text-red-600">{msg}</p> : null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        お問い合わせ
        <br />
        （お仕事のご依頼やお見積りなど）
      </h2>

      {errors.submit && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
          {errors.submit}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {/* ハニーポット（表示しない） */}
        <input
          type="text"
          name="honey"
          value={form.honey}
          onChange={onChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className={inputClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
            />
            {help(errors.name)}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">会社名（任意）</label>
            <input
              name="company"
              value={form.company}
              onChange={onChange}
              className={inputClass()}
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className={inputClass(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
            />
            {help(errors.email)}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">お電話番号（任意）</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className={inputClass()}
              inputMode="tel"
              autoComplete="tel"
              placeholder="090-1234-5678"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              お問い合わせ種別 <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={form.type}
              onChange={onChange}
              className={inputClass(Boolean(errors.type))}
              aria-invalid={Boolean(errors.type)}
            >
              <option value="" disabled>
                選択してください
              </option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {help(errors.type)}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">件名（任意）</label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className={inputClass()}
              placeholder="例：システム開発のご相談"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            メッセージ <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={onChange}
            className={inputClass(Boolean(errors.message))}
            aria-invalid={Boolean(errors.message)}
            placeholder="ご相談内容やご要望、希望納期やご予算感などがあればご記入ください。"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
            <span>10文字以上でご入力してください</span>
            <span>{form.message.length} 文字</span>
          </div>
          {help(errors.message)}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={onChange}
            className="mt-1 h-4 w-4"
          />
          <label htmlFor="agree" className="text-sm text-gray-700">
            <span className="font-medium">プライバシーポリシー</span>に同意します。
            <span className="text-red-500">*</span>
          </label>
        </div>
        {help(errors.agree)}

        <div className="text-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-8 py-3 rounded-md font-semibold transition text-white ${
              submitting ? "bg-gray-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            {submitting ? "送信中…" : "送信する"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
