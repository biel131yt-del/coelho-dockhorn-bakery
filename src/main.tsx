import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("app");
if (container?.firstElementChild) hydrateRoot(container, <App />);
else if (container) createRoot(container).render(<App />);
