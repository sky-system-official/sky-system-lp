import { Link, useLocation } from "react-router-dom";

type ThanksState = { name?: string };

const ContactThanksPage = () => {
  const { state } = useLocation();
  const s = (state || {}) as ThanksState;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-6">お問い合わせありがとうございました！</h1>
      <p className="text-gray-700 mb-6">
        {s.name ? `${s.name} 様、` : ""}メッセージを受け付けました。<br />
        担当者より追ってご連絡いたします。
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          ホームへ戻る
        </Link>

      </div>
    </div>
  );
};

export default ContactThanksPage;
