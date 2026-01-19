import nodemailer from "nodemailer";

const toList = (process.env.MAIL_TO || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const MAIL_TO = toList;

export const MAIL_FROM = {
  name: process.env.MAIL_FROM_NAME || "【お問い合わせ】SKYシステム　ホームページより",
  address: process.env.MAIL_FROM || process.env.SMTP_USER || "",
};

mailer.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP verify failed:", err);
  } else {
    console.log("✅ SMTP server is ready:", success);
  }
});
