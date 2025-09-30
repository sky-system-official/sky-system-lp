import nodemailer from "nodemailer";

const {
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
} = process.env;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: false,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
});

export async function notify(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject,
    text
  });
}
