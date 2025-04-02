import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Material Icons CSS
const materialIconsLink = document.createElement('link');
materialIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
materialIconsLink.rel = "stylesheet";
document.head.appendChild(materialIconsLink);

// Import Inter font
const interFontLink = document.createElement('link');
interFontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
interFontLink.rel = "stylesheet";
document.head.appendChild(interFontLink);

// Import Leaflet CSS
const leafletCssLink = document.createElement('link');
leafletCssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
leafletCssLink.rel = "stylesheet";
leafletCssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
leafletCssLink.crossOrigin = "";
document.head.appendChild(leafletCssLink);

// Set document title
document.title = "AgriTrack Dashboard";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
