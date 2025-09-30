const CompanySection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2
        className="text-3xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        会社概要
      </h2>

      <div className="overflow-x-auto">
        <table
          className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md"
          data-aos="fade-up"
        >
          <tbody>
            <tr className="border-b">
              <th className="w-1/3 bg-gray-100 text-left px-4 py-3 font-semibold">
                会社名
              </th>
              <td className="px-4 py-3">SKYシステム合同会社</td>
            </tr>
            <tr className="border-b">
              <th className="bg-gray-100 text-left px-4 py-3 font-semibold">
                所在地
              </th>
              <td className="px-4 py-3">北海道苫小牧市美原町3-16-11</td>
            </tr>
            <tr className="border-b">
              <th className="bg-gray-100 text-left px-4 py-3 font-semibold">
                設立
              </th>
              <td className="px-4 py-3">2024年5月</td>
            </tr>
            <tr className="border-b">
              <th className="bg-gray-100 text-left px-4 py-3 font-semibold">
                代表者
              </th>
              <td className="px-4 py-3">代表社員 今野 大地</td>
            </tr>
            <tr>
              <th className="bg-gray-100 text-left px-4 py-3 font-semibold">
                事業内容
              </th>
              <td className="px-4 py-3">
                システム開発、アプリ開発、ゲーム開発、AI事業、ツール開発、スクレイピング...など
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanySection;
