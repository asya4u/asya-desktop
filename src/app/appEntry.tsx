import "regenerator-runtime/runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./layouts/main.css";
import App from "pages/Index/Index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
