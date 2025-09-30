import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import contactRoute from "./routes/contact";
import applyRoute from "./routes/apply";

const app = express();

// 基本ミドルウェア（ FE ＝＝ DB・インフラ の仲介役）主に、認証やエラーハンドリングなど。
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || "").split(",").filter(Boolean) || true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// レート制限（/api/* だけ）
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// ★ ここより“前”に 404 ハンドラを書かないこと！
app.use("/api/contact", contactRoute);
app.use("/api/apply", applyRoute); // まだなら一旦コメントアウト可

// ヘルスチェック
app.get("/healthz", (_req, res) => res.send("ok"));

// 仮エンドポイント
app.get("/api/ping", (_req, res) => res.json({ ok: true, pong: true }));

// 404
app.use((_req, res) => res.status(404).json({ ok: false, message: "Not Found" }));

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log("Mounted routes: POST /api/contact, GET /api/ping, GET /healthz");
});
