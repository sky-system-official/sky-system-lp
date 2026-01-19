import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo =
    (id: string) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // すでにトップページにいる場合 → そのままスクロール
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // apply / thanks など別ページの場合
      // → トップに戻してからスクロール
      navigate("/", { replace: false });

      // 遷移後にスクロール（少し待つ）
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };

  return (
    <header className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500 text-white shadow fixed w-full z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
						src={`${import.meta.env.BASE_URL}favicon.png`}
						alt="SKYシステム合同会社 ロゴ"
						className="h-8 w-8 rounded-md"
					/>
          <h1 className="text-lg md:text-2xl font-bold">
            SKYシステム合同会社
          </h1>
        </div>

        <div className="flex gap-6 text-[17px] font-semibold tracking-wide">
          <a href="#hero" onClick={scrollTo("hero")} className="nav-link">ホーム</a>
          <a href="#works" onClick={scrollTo("works")} className="nav-link">実績紹介</a>
          <a href="#company" onClick={scrollTo("company")} className="nav-link">会社概要</a>
          <a href="#recruit" onClick={scrollTo("recruit")} className="nav-link">採用情報</a>
          <a href="#contact" onClick={scrollTo("contact")} className="nav-link">お問い合わせ</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
