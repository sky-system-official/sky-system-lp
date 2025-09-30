type Props = { position: string };

const ApplyButton = ({ position }: Props) => (
  <a
    href={`/apply?position=${position}`}
    className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-center hover:bg-blue-700 transition shadow-lg"
  >
    応募する
  </a>
);

export default ApplyButton;
