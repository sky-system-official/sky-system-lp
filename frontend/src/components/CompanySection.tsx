type CompanyItem = {
  label: string;
  value: string;
};

const COMPANY_INFO: CompanyItem[] = [
  { label: "会社名", value: "SKYシステム合同会社" },
  { label: "所在地", value: "北海道苫小牧市美原町3-16-11" },
  { label: "設立", value: "2024年5月" },
  { label: "代表者", value: "代表社員　今野 大地" },
  {
    label: "事業内容",
    value:
      "システム開発、アプリ開発、ゲーム開発、AI事業、ツール開発、スクレイピング など",
  },
];

const CompanySection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
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
            {COMPANY_INFO.map(({ label, value }) => (
              <tr key={label} className="border-b last:border-b-0">
                <th className="w-1/3 bg-gray-100 text-left px-4 py-3 font-semibold">
                  {label}
                </th>
                <td className="px-4 py-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CompanySection;
