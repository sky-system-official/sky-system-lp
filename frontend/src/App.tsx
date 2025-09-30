import Home from "./pages/Home";
import WorksSection from "./components/WorksSection";
import CompanySection from "./components/CompanySection";
import RecruitSection from "./components/RecruitSection";
import ContactForm from "./components/ContactForm";
import Logo from "./assets/favicon_4.png";

function App() {
  return (
    <>
      {/* ナビゲーション */}
      <header className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500 text-white shadow fixed w-full z-50">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          {/* 左側：ロゴ + 会社名 */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="SKYシステム合同会社 ロゴ"
              className="h-8 w-8 rounded-md"
            />
            <h1 className="text-lg md:text-2xl font-bold">SKYシステム合同会社</h1>
          </div>

          {/* 右側：ナビメニュー */}
          <div className="flex gap-6 text-lg">
            <a href="#hero" className="hover:text-black hover:font-bold">ホーム</a>
            <a href="#works" className="hover:text-black hover:font-bold">実績紹介</a>
            <a href="#company" className="hover:text-black hover:font-bold">会社概要</a>
            <a href="#recruit" className="hover:text-black hover:font-bold">採用情報</a>
            <a href="#contact" className="hover:text-black hover:font-bold">お問い合わせ</a>
          </div>
        </nav>
      </header>

      {/* 各セクション */}
      <main className="pt-20"> {/* ヘッダー固定分の余白 */}
        <section id="hero">
          <Home />
        </section>
        <section id="works">
          <WorksSection />
        </section>
        <section id="company">
          <CompanySection />
        </section>
        <section id="recruit">
          <RecruitSection />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </main>
    </>
  );
}

export default App;
