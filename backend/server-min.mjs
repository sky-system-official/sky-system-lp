import 'dotenv/config';
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8787;

app.use(express.json());

// 起動ログ
console.log("RUNNING FILE:", new URL(import.meta.url).pathname);
console.log("PID:", process.pid);

// ★ /env-check を登録（これだけ）
app.get("/env-check", (req, res) => {
  res.json({
    hasToken: !!process.env.SLACK_BOT_TOKEN,
    hasChannel: !!process.env.SLACK_CHANNEL_ID,
  });
});

// 起動後にルート一覧を表示（登録順を確認）
app.listen(PORT, () => {
  console.log(`MIN API on http://localhost:${PORT}`);
  const routes = [];
  for (const l of app._router.stack) {
    if (l.route) {
      routes.push({ methods: Object.keys(l.route.methods), path: l.route.path });
    }
  }
  console.log("ROUTES:", routes);
});
