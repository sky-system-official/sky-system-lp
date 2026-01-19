// src/main.tsx
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ApplyPage from "./pages/ApplyPage";
import ApplyThanksPage from "./pages/ApplyThanksPage";
import ContactPage from "./pages/ContactPage";
import ContactThanksPage from "./pages/ContactThanksPage";

import "./index.css";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

import MainLayout from "./layouts/MainLayout";

const router = createHashRouter([
  {
    element: <MainLayout />, // ← 共通ヘッダー
    children: [
      { path: "/", element: <App /> },
      { path: "/apply", element: <ApplyPage /> },
      { path: "/apply/thanks", element: <ApplyThanksPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/contact/thanks", element: <ContactThanksPage /> },
    ],
  },
]);

function Root() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root />
);
