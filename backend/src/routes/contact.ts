import { Router } from "express";

const router = Router();

// 動作確認用 GET
router.get("/test", (_req, res) => {
  res.json({ ok: true, route: "contact/test" });
});

// 本番 POST
router.post("/", (req, res) => {
  const { name, email, type, message } = req.body ?? {};
  if (!name || !email || !type || !message) {
    return res.status(422).json({ ok: false, message: "必須項目が不足しています。" });
  }
  // ここでメール送信やDB保存を実施（まずは 200 返して通ることを確認）
  return res.json({ ok: true });
});

export default router;
