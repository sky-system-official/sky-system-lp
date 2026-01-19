import ApplyButton from "./ApplyButton";

type RecruitJob = {
  title: string;
  descriptionLines: string[]; // 見た目維持のため改行を配列で管理
  employment: string;
  location: string;
  salary: string;
  applyPosition: string;
  aosDelay: number;
};

const JOBS: RecruitJob[] = [
  {
    title: "フロントエンドエンジニア",
    descriptionLines: [
      "React / Vue.js を用いたWebアプリケーション開発。",
      "「お客様」の視点でUI/UXを設計し、快適なユーザー体験を提供します。",
    ],
    employment: "正社員 / 契約社員",
    location: "北海道 / フルリモート",
    salary: "年収400万〜700万（経験・スキルによる）",
    applyPosition: "フロントエンドエンジニア",
    aosDelay: 300,
  },
  {
    title: "バックエンドエンジニア",
    descriptionLines: [
      "Laravel / Node.js を用いたサーバーサイド開発。",
      "データやAPIを通じて「お客様」に最適なシステム基盤を構築します。",
    ],
    employment: "正社員 / 契約社員",
    location: "北海道 / フルリモート",
    salary: "年収450万〜800万（経験・スキルによる）",
    applyPosition: "バックエンドエンジニア",
    aosDelay: 600,
  },
  {
    title: "インフラエンジニア",
    descriptionLines: [
      "AWSやGCPを中心としたクラウドインフラ構築・運用。",
      "「お客様」が安心して使えるようセキュリティや運用を徹底します。",
    ],
    employment: "正社員 / 契約社員",
    location: "北海道 / フルリモート",
    salary: "年収400万〜750万（経験・スキルによる）",
    applyPosition: "インフラエンジニア",
    aosDelay: 900,
  },
  {
    title: "プロジェクトマネージャー / ITコンサル",
    descriptionLines: [
      "お客様との要件定義や課題解決をリードし、",
      "「お客様」を第一にプロジェクトを成功へ導きます。",
    ],
    employment: "正社員 / 契約社員",
    location: "北海道 / フルリモート",
    salary: "年収500万〜900万（経験・スキルによる）",
    applyPosition: "プロジェクトマネージャー",
    aosDelay: 1200,
  },
];

const RecruitSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
        採用情報
      </h2>

      <p className="text-center text-gray-700 mb-12" data-aos="fade-up">
        SKYシステム合同会社では「お客様のために」と「お客様第一」を大切にし、共に成長する仲間を募集しています！
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        {JOBS.map((job) => (
          <div
            key={job.title}
            className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay={job.aosDelay}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center">
                {job.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {job.descriptionLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <ul className="text-gray-700 space-y-2 text-sm">
                <li>
                  <span className="font-semibold">雇用形態:</span>{" "}
                  {job.employment}
                </li>
                <li>
                  <span className="font-semibold">勤務地:</span> {job.location}
                </li>
                <li>
                  <span className="font-semibold">給与:</span> {job.salary}
                </li>
              </ul>
            </div>

            <ApplyButton position={job.applyPosition} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecruitSection;
