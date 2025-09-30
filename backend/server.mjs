// server.mjs（最小・確実版）
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 8787;

app.use(express.json({ limit: '256kb' }));

console.log('RUNNING FILE:', new URL(import.meta.url).pathname);
console.log('PID:', process.pid);
console.log('ENV check:', {
  hasToken: !!process.env.SLACK_BOT_TOKEN,
  hasChannel: !!process.env.SLACK_CHANNEL_ID,
});

// ① /env-check（必ず 404 より前）
app.get('/env-check', (req, res) => {
  res.json({
    hasToken: !!process.env.SLACK_BOT_TOKEN,
    hasChannel: !!process.env.SLACK_CHANNEL_ID,
  });
});

// ② /api/contact（まずは env 判定だけ返す）
app.post('/api/contact', async (req, res) => {
  const token = process.env.SLACK_BOT_TOKEN?.trim();
  const channel = process.env.SLACK_CHANNEL_ID?.trim();
  console.log('route env', { hasToken: !!token, hasChannel: !!channel });

  if (!token || !channel) {
    return res.status(500).json({ ok: false, message: 'Slack 設定が未完了です。' });
  }

  const { name, email, type, message, phone } = req.body ?? {};
  const text =
    `新しいお問い合わせ\n` +
    `・名前: ${name}\n` +
    `・メール: ${email}\n` +
    (phone ? `・電話: ${phone}\n` : '') +
    `・種別: ${type}\n\n` +
    `${message}`;

  try {
    const r = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ channel, text }),
    });
    const data = await r.json();
    console.log('Slack API response:', data);
    // ★ ここでSlackの返答をそのまま返す
    return res.status(data.ok ? 200 : 500).json({ ok: data.ok, slack: data });
  } catch (e) {
    console.error('Slack post failed:', e);
    return res.status(500).json({ ok: false, message: 'Slack 送信中に例外が発生しました。' });
  }
});

// ③ 404 は最後に
app.use((req, res) => res.status(404).json({ ok: false, message: 'Not Found' }));

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
