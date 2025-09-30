import ApplyButton from "./ApplyButton";

const RecruitSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2
        className="text-3xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        採用情報
      </h2>
      <p
        className="text-center text-gray-700 mb-12"
        data-aos="fade-up"
      >
        SKYシステム合同会社では「お客様のために」と「お客様第一」を大切にし、共に成長する仲間を募集しています！
      </p>

      {/* 募集職種リスト */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* 職種1 */}
        <div
          className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="300"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">フロントエンドエンジニア</h3>
            <p className="text-gray-600 mb-6">
              React / Vue.js を用いたWebアプリケーション開発。<br />
              「お客様」の視点でUI/UXを設計し、快適なユーザー体験を提供します。
            </p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li><span className="font-semibold">雇用形態:</span> 正社員 / 契約社員</li>
              <li><span className="font-semibold">勤務地:</span> 北海道 / フルリモート</li>
              <li><span className="font-semibold">給与:</span> 年収400万〜700万（経験・スキルによる）</li>
            </ul>
          </div>
          <ApplyButton position="フロントエンドエンジニア" />
        </div>

        {/* 職種2 */}
        <div
          className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="600"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">バックエンドエンジニア</h3>
            <p className="text-gray-600 mb-6">
              Laravel / Node.js を用いたサーバーサイド開発。<br />
              データやAPIを通じて「お客様」に最適なシステム基盤を構築します。
            </p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li><span className="font-semibold">雇用形態:</span> 正社員 / 契約社員</li>
              <li><span className="font-semibold">勤務地:</span> 北海道 / フルリモート</li>
              <li><span className="font-semibold">給与:</span> 年収450万〜800万（経験・スキルによる）</li>
            </ul>
          </div>
          <ApplyButton position="バックエンドエンジニア" />
        </div>

        {/* 職種3 */}
        <div
          className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="900"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">インフラエンジニア</h3>
            <p className="text-gray-600 mb-6">
              AWSやGCPを中心としたクラウドインフラ構築・運用。<br />
              「お客様」が安心して使えるようセキュリティや運用を徹底します。
            </p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li><span className="font-semibold">雇用形態:</span> 正社員 / 契約社員</li>
              <li><span className="font-semibold">勤務地:</span> 北海道 / フルリモート</li>
              <li><span className="font-semibold">給与:</span> 年収400万〜750万（経験・スキルによる）</li>
            </ul>
          </div>
          <ApplyButton position="インフラエンジニア" />
        </div>

				{/* 職種4 */}
        <div
          className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="1200"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center">プロジェクトマネージャー / ITコンサル</h3>
            <p className="text-gray-600 mb-6">
							お客様との要件定義や課題解決をリードし、<br />
							「お客様」を第一にプロジェクトを成功へ導きます。<br />
						</p>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li><span className="font-semibold">雇用形態:</span> 正社員 / 契約社員</li>
              <li><span className="font-semibold">勤務地:</span> 北海道 / フルリモート</li>
              <li><span className="font-semibold">給与:</span> 年収500万〜900万（経験・スキルによる）</li>
            </ul>
          </div>
          <ApplyButton position="プロジェクトマネージャー" />
        </div>
      </div>
    </div>
  );
};

export default RecruitSection;
