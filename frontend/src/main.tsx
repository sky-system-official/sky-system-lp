import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ApplyPage from "./pages/ApplyPage";
import ApplyThanksPage from "./pages/ApplyThanksPage";
import ContactPage from "./pages/ContactPage";
import ContactThanksPage from "./pages/ContactThanksPage";
import "./index.css";

// AOS をインポート
import AOS from "aos";
import "aos/dist/aos.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/apply", element: <ApplyPage /> },                   // 応募
  { path: "/apply/thanks", element: <ApplyThanksPage /> },      // 応募サンクス
  { path: "/contact", element: <ContactPage /> },               // お問い合わせ
  { path: "/contact/thanks", element: <ContactThanksPage /> },  // お問い合わせサンクス
]);

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // アニメーションの時間（ms）
      once: true,     // 一度だけ実行
    });
  }, []);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
