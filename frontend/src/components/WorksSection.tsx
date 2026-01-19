import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType } from "react";

type WorkCard = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: string[];
  aosDelay: number;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

const WORKS: WorkCard[] = [
  {
    title: "システム開発",
    icon: CodeBracketIcon,
    aosDelay: 0,
    items: [
      "🔶学校・塾向け 映像授業の配信サービス",
      "🔶Amazon 無在庫販売システム",
      "🔶ログ収集プログラム オンラインサービス",
      "🔶仮想通貨 自動売買システム",
      "🔶LINEお問い合わせ Chat Bot",
      "🔶市場データ調査 オンラインサービス",
    ],
  },
  {
    title: "アプリ開発",
    icon: DevicePhoneMobileIcon,
    aosDelay: 150,
    items: [
      "🔶家計・投資シミュレーションアプリ",
      "🔶AI同士のコミュニケーションアプリ",
      "🔶健康診断・身体測定アプリ",
      "🔶オリパ販売サイト アプリ化",
      "🔶企業×求職者 マッチングサービス",
      "🔶モンスター育成ゲーム",
    ],
  },
  {
    title: "AI導入",
    icon: CpuChipIcon,
    aosDelay: 300,
    items: [
      "🔶AIキャラクター チャットシステム",
      "🔶AI性格診断・AI占い",
      "🔶請求書の仕分け",
      "🔶Geminiで画像生成",
      "🔶本・小説の文章と絵を生成",
      "🔶個別指導型AIチューター",
    ],
  },
];

const WorksSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="works-title"
      className="max-w-6xl mx-auto px-6 py-20 scroll-mt-24"
    >
      <h2
        id="works-title"
        className="text-3xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        実績紹介
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {WORKS.map(({ title, icon: Icon, items, aosDelay }) => (
          <div
            key={title}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay={aosDelay}
            data-aos-duration="1200"
            data-aos-easing="ease-out-cubic"
            data-aos-offset="100"
          >
            <Icon className="h-16 w-16 text-sky-500 mb-4" />

            <h3 className="text-xl font-semibold mb-2 text-left">{title}</h3>

            <div className="text-gray-600 space-y-1 text-left">
              {items.map((text, i) => (
                <p key={i}>{truncateText(text, 25)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
