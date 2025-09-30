import { CodeBracketIcon, DevicePhoneMobileIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

const WorksSection = () => {
  return (
    <div
      className="max-w-6xl mx-auto px-6 py-20">
      <h2
        className="text-3xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        実績紹介
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* カード1 */}
        <div
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="300"
        >
          <CodeBracketIcon className="h-16 w-16 text-sky-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-left">システム開発</h3>
          <div className="text-gray-600 space-y-1 text-left">
            <p>{truncateText("学校で使用する映像授業の配信サービス", 20)}</p>
            <p>{truncateText("Amazonの無在庫販売システム", 20)}</p>
            <p>{truncateText("クラウドサービスのログ収集プログラム", 20)}</p>
            <p>{truncateText("仮想通貨の自動売買システム", 20)}</p>
            <p>{truncateText("LINEのお問い合わせChat Bot", 20)}</p>
            <p>{truncateText("市場データを調査するオンラインサービス", 20)}</p>
          </div>
        </div>

        {/* カード2 */}
        <div
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="600"
        >
          <DevicePhoneMobileIcon className="h-16 w-16 text-sky-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-left">アプリ開発</h3>
          <div className="text-gray-600 space-y-1 text-left">
            <p>{truncateText("家計・投資シミュレーションアプリ", 20)}</p>
            <p>{truncateText("AI同士のコミュニケーションアプリ", 20)}</p>
            <p>{truncateText("健康診断・身体測定アプリ", 20)}</p>
            <p>{truncateText("オリパ販売サイトのアプリ化", 20)}</p>
            <p>{truncateText("企業側と求職者のマッチングアプリ", 20)}</p>
            <p>{truncateText("モンスター育成ゲーム", 20)}</p>
          </div>
        </div>

        {/* カード3 */}
        <div
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          data-aos="fade-up" data-aos-delay="900"
        >
          <CpuChipIcon className="h-16 w-16 text-sky-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-left">AI導入</h3>
          <div className="text-gray-600 space-y-1 text-left">
            <p>{truncateText("AIキャラクターとのチャット", 20)}</p>
            <p>{truncateText("ChatGPTで性格診断", 20)}</p>
            <p>{truncateText("請求書の仕分け", 20)}</p>
            <p>{truncateText("Geminiで画像生成", 20)}</p>
            <p>{truncateText("本・小説の文章と絵を生成", 20)}</p>
            <p>{truncateText("個別指導型AIチューター", 20)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksSection;
