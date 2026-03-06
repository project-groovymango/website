import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./index";
import Blueprints from "./pages/Blueprints";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/website">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blueprints" element={<Blueprints />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
