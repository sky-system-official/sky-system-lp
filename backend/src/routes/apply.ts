import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { mailer, MAIL_FROM, MAIL_TO } from "../lib/mailer";

const router = Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

const ApplySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().min(1),
  portfolio: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
  resumeUrl: z.string().optional().or(z.literal("")),
  // positions[] は複数になる想定
  positions: z.array(z.string()).min(1),
});

router.post("/", upload.single("resumeFile"), async (req, res) => {
  console.log("📩 /api/apply called");
  console.log("body:", req.body);
  console.log("file:", req.file);

  // FormData の場合、配列は色々な形で来るので吸収
  const raw = req.body["positions[]"] ?? req.body.positions ?? req.body.position;
  const positions = Array.isArray(raw) ? raw : raw ? [raw] : [];

  const data = {
    ...req.body,
    positions,
  };

  const parsed = ApplySchema.safeParse(data);
  if (!parsed.success) {
    console.error("❌ apply zod error:", parsed.error.issues);
    return res.status(400).json({
      ok: false,
      message: "Invalid input",
      issues: parsed.error.issues,
    });
  }

  const { name, email, phone, message, portfolio, github, resumeUrl } = parsed.data;

  if (!resumeUrl?.trim() && !req.file) {
    return res.status(400).json({ ok: false, message: "resumeUrl or resumeFile is required" });
  }

  const subject = `【LP応募】${name} 様（${parsed.data.positions.join(" / ")}）`;
  const text =
`LPから応募がありました。

■ 応募職種
${parsed.data.positions.join(" / ")}

■ お名前
${name}

■ メール
${email}

■ 電話番号
${phone}

■ ポートフォリオ
${portfolio || "-"}

■ GitHub
${github || "-"}

■ 職務経歴書/スキルシートURL
${resumeUrl || "-"}

■ 自己PR・備考
${message}
`;

  const fixedOriginalname = req.file
    ? Buffer.from(req.file.originalname, "latin1").toString("utf8")
    : "";

  const attachments = req.file
    ? [{
        filename: fixedOriginalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
        headers: {
          // RFC2231 / RFC5987 対応（日本語ファイル名の決定版）
          "Content-Disposition":
            `attachment; filename*=UTF-8''${encodeURIComponent(fixedOriginalname)}`
        },
      }]
    : [];

  try {
    await mailer.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      // （文字化け対策）
      text,
      attachments,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, message: "Mail send failed" });
  }
});

export default router;
