import { Link, useLocation } from "react-router-dom";

type ThanksState = { name?: string; position?: string };

const ApplyThanksPage = () => {
  const location = useLocation();
  const state = (location.state || {}) as ThanksState;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-6">ご応募ありがとうございます！</h1>
      <p className="text-gray-700 mb-8">
        {state.name ? `${state.name} 様、` : ""}
        ご応募を受け付けました。
        {state.position && <>（応募職種：{state.position}）</>}
      </p>

      <p className="text-gray-600 mb-10">
        担当者が内容を確認し、追ってご連絡いたします。<br />
        しばらくお待ちください。
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
};

export default ApplyThanksPage;
