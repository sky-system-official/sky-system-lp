import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import WorksSection from "./components/WorksSection";
import CompanySection from "./components/CompanySection";
import RecruitSection from "./components/RecruitSection";
import ContactForm from "./components/ContactForm";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // AOS 初期化
    AOS.init({
      once: true,
      duration: 250,
      easing: "ease-out-cubic",
    });
    AOS.refresh();

    // window.onload を待ってから 0.5秒後に表示
    const onLoad = () => {
      setTimeout(() => setReady(true), 1);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  if (!ready) {
    // 準備が整うまで白背景のみ表示
    return <div className="h-screen w-screen bg-white"></div>;
  }

  return (
    <>
      {/* 各セクション */}
      <main className="pt-20">
        <section id="hero" className="scroll-mt-24 -mt-6 py-4" data-aos="fade-up">
          <Home />
        </section>

        <section id="works" className="scroll-mt-24 py-8" data-aos="fade-up">
          <WorksSection />
        </section>

        <section id="company" className="scroll-mt-24 py-8" data-aos="fade-up">
          <CompanySection />
        </section>

        <section id="recruit" className="scroll-mt-24 py-8" data-aos="fade-up">
          <RecruitSection />
        </section>

        <section id="contact" className="scroll-mt-24 py-8" data-aos="fade-up">
          <ContactForm />
        </section>
      </main>
    </>
  );
}

export default App;
