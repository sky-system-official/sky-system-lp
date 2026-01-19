import type { MouseEvent } from "react";

const scrollToContact = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // ← URLの #contact を使わせない
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const Home = () => {
  return (
    <div>
      {/* === ヒーローセクション === */}
      <section
        className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 text-white min-h-[40vh]"
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-5xl px-6">
        <h1
          className="text-4xl md:text-6xl font-bold mb-12 leading-snug"
          data-aos="fade-up"
          data-aos-duration="2500"
        >
          御社に寄り添い、社会の役に立ち、<br />みんなを幸せに！
        </h1>
          <p
            className="text-lg md:text-2xl mb-14 text-gray-900 font-extrabold"
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            SKYシステム合同会社は、システム開発を通じて「企業」と「社会」の未来を支えます！
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-block bg-white text-sky-600 px-6 py-2 rounded-full font-bold text-2xl shadow-lg
                      transition hover:bg-blue-600 hover:text-white"
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            お問い合わせはこちら
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
