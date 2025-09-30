import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = { initialPosition?: string };

const positions = [
  "フロントエンドエンジニア",
  "バックエンドエンジニア",
  "インフラエンジニア",
  "プロジェクトマネージャー / ITコンサル",
];

const ApplyForm = ({ initialPosition = "" }: Props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    position: "",
    name: "",
    email: "",
    portfolio: "",
		github: "",
    resumeUrl: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null); // ← 追加（ファイルアップ）

  useEffect(() => {
    if (initialPosition) {
      setForm((p) => ({ ...p, position: initialPosition }));
    }
  }, [initialPosition]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    // 例: 10MB制限
    if (f && f.size > 10 * 1024 * 1024) {
      alert("ファイルサイズは10MB以下にしてください。");
      e.currentTarget.value = "";
      setResumeFile(null);
      return;
    }
    setResumeFile(f);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

		  // 履歴書が URL もファイルも空ならエラー
		if (!form.resumeUrl.trim() && !resumeFile) {
			alert("履歴書をURLまたはファイルで提出してください。");
			return;
		}

		if (!form.message) {
			alert("自己PR・備考を入力してください。");
			return;
		}

    // 送信処理　(例) FormDataに詰める（バックエンド実装時にPOST）
    const fd = new FormData();
    fd.append("position", form.position);
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("portfolio", form.portfolio);
    fd.append("github", form.github);
    fd.append("resumeUrl", form.resumeUrl);
    fd.append("message", form.message);
    if (resumeFile) fd.append("resumeFile", resumeFile);

    // 成功したらサンクスへ。state で名前・職種を渡す
    navigate("/apply/thanks", {
      state: { name: form.name, position: form.position },
      replace: true, // 戻るボタンで再送信しにくくするため任意で
    });

    console.log("応募データ(デバッグ):", {
      ...form,
      resumeFile: resumeFile ? { name: resumeFile.name, size: resumeFile.size } : null,
    });

    // alert("応募を送信しました。ありがとうございます！");
    // setForm({
    //   position: initialPosition || "",
    //   name: "",
    //   email: "",
    //   portfolio: "",
    //   github: "",
    //   resumeUrl: "",
    //   message: "",
    // });
    // setResumeFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">応募フォーム</h2>

      <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {/* 応募職種 */}
        {form.position ? (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
							応募職種 <span className="text-red-500">*</span>
						</label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={onChange}
              className="w-full border rounded-md px-4 py-2"
              readOnly
            />
          </div>
        ) : (
          <>
            {/* 応募職種（未指定時は選択させる） */}
						<div>
							<label className="block text-gray-700 font-semibold mb-2">
								応募職種 <span className="text-red-500">*</span>
							</label>
							<select
								name="position"
								value={form.position}
								onChange={onChange}
								required
								className="w-full border rounded-md px-4 py-2 bg-white"
							>
								<option value="" disabled>選択してください</option>
								{positions.map((p) => (
									<option key={p} value={p}>{p}</option>
								))}
							</select>
						</div>
					</>
				)}

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
						お名前 <span className="text-red-500">*</span>
					</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            autoComplete="name"
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
          <label className="block text-gray-700 font-semibold mb-2">ポートフォリオURL</label>
          <input
            name="portfolio"
            value={form.portfolio}
            onChange={onChange}
            placeholder="https://..."
            inputMode="url"
            pattern="https?://.+"
            className="w-full border rounded-md px-4 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">例: https://example.com/portfolio</p>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">GithubアカウントURL</label>
          <input
            name="github"
            value={form.github || ""}
            onChange={onChange}
            placeholder="https://github.com/username"
            inputMode="url"
            pattern="https?://.+"
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        {/* 履歴書はURLでもファイルでもOKに */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
							履歴書/職務経歴書URL
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
            <p className="text-xs text-gray-500 mt-1 text-red-500">
							※ URL またはファイルのいずれか必須
						</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
							履歴書ファイル（10MBまで）
						</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md,.pages,.rtf,.png,.jpg,.jpeg"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            応募する
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
