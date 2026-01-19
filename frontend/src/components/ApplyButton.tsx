type Props = { position?: string };

const ApplyButton = ({ position = "フロントエンドエンジニア" }: Props) => {
  const base = import.meta.env.BASE_URL; // "/sky-system-lp/" が入る
  const href = `${base}#/apply?position=${encodeURIComponent(position)}`;

  return (
    <a
      href={href}
      className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-center hover:bg-blue-700 transition shadow-lg"
    >
      応募する
    </a>
  );
};

export default ApplyButton;
