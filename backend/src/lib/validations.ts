import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前は必須です"),
  email: z.string().trim().email("メール形式が不正です"),
  type: z.string().trim().min(1, "種別は必須です"),
  subject: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  phone: z.string().trim().optional().default(""),
  message: z.string().trim().min(10, "メッセージは10文字以上です"),
});

export const applySchema = z.object({
  position: z.string().trim().min(1, "応募職種は必須です"),
  name: z.string().trim().min(1, "お名前は必須です"),
  email: z.string().trim().email("メール形式が不正です"),
  portfolio: z.string().trim().url().optional().or(z.literal("")).optional(),
  github: z.string().trim().url().optional().or(z.literal("")).optional(),
  resumeUrl: z.string().trim().url().optional().or(z.literal("")).optional(),
  message: z.string().trim().min(1, "自己PRは必須です"),
});
