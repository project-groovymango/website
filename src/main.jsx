import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-mono/400.css";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import App from "./pages/Home";

const Blueprints = lazy(() => import("./pages/Blueprints"));
const BlueprintDetail = lazy(() => import("./pages/BlueprintDetail"));
const SlackConnect = lazy(() => import("./pages/SlackConnect"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/website">
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blueprints" element={<Blueprints />} />
          <Route path="/blueprints/:slug" element={<BlueprintDetail />} />
          <Route path="/slack" element={<SlackConnect />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
