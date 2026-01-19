import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      {/* ヘッダー分の余白 */}
      <main className="pt-0">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
