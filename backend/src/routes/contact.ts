import { Router } from "express";
import { z } from "zod";
import { mailer, MAIL_FROM, MAIL_TO } from "../lib/mailer";

const router = Router();

/**
 * フロントの payload と完全一致させる
 */
const ContactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  type: z.string().optional().or(z.literal("")),
  subject: z.string().optional().or(z.literal("")),
  message: z.string().min(1),
});

router.post("/", async (req, res) => {
  console.log("📩 /api/contact called", req.body);
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: "Invalid input",
      issues: parsed.error.issues,
    });
  }

  const {
    name,
    company,
    email,
    phone,
    type,
    subject,
    message,
  } = parsed.data;

  const mailSubject = `【HPお問い合わせ】${subject || "お問い合わせ"}（${name} 様）`;

  const text = `
HPからお問い合わせがありました。

■ お名前
${name}

■ 会社名
${company || "-"}

■ メールアドレス
${email}

■ 電話番号
${phone || "-"}

■ お問い合わせ種別
${type || "-"}

■ 件名
${subject || "-"}

■ 内容
${message}
`;

  try {
    await mailer.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,        // info_contact + gmail
      replyTo: email,     // 返信は問い合わせ者へ
      subject: mailSubject,
      // （文字化け対策）
      text,
    });

    return res.json({ ok: true });
  } catch (e: any) {
    console.error("❌ Mail send error:", e);

    return res.status(500).json({
      ok: false,
      message: "Mail send failed",
      error: e?.message || String(e),
      code: e?.code,
      response: e?.response,          // SMTPサーバからの返答が入ることがある
      responseCode: e?.responseCode,  // 535など
    });
  }
});

export default router;
