import { Router } from "express";
import multer from "multer";
import { applySchema } from "../lib/validations";
import { notify } from "../lib/mailer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post("/", upload.single("resumeFile"), async (req, res) => {
  try {
    const data = applySchema.parse(req.body);

    const hasResume = Boolean(data.resumeUrl) || Boolean(req.file);
    if (!hasResume) {
      return res.status(422).json({ ok: false, message: "履歴書はURLまたはファイルのどちらか必須です。" });
    }

    const fileLine = req.file
      ? `${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`
      : "(なし)";

    const subject = `【応募】${data.position} - ${data.name}`;
    const text = [
      `応募職種: ${data.position}`,
      `お名前: ${data.name}`,
      `メール: ${data.email}`,
      `ポートフォリオ: ${data.portfolio || "(なし)"}`,
      `GitHub: ${data.github || "(なし)"}`,
      `履歴書URL: ${data.resumeUrl || "(なし)"}`,
      `履歴書ファイル: ${fileLine}`,
      `---`,
      data.message,
    ].join("\n");

    // 添付として送る場合は transporter.sendMail の attachments を利用（推奨はS3等に保存してURL通知）
    await notify(process.env.MAIL_TO || "", subject, text);

    return res.json({ ok: true });
  } catch (e: any) {
    if (e.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ ok: false, message: "ファイルサイズは10MB以下にしてください。" });
    }
    if (e.errors) {
      return res.status(422).json({ ok: false, message: "入力エラー", errors: e.errors });
    }
    console.error(e);
    return res.status(500).json({ ok: false, message: "サーバーエラー" });
  }
});

export default router;
