import { createRoot } from "react-dom/client";
import App from "./App";

// Import Leaflet CSS first - must come before our custom CSS
const leafletCssLink = document.createElement('link');
leafletCssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
leafletCssLink.rel = "stylesheet";
leafletCssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
leafletCssLink.crossOrigin = "";
document.head.appendChild(leafletCssLink);

// Add type definition for window.L
declare global {
  interface Window {
    L: any;
  }
}

// Fix Leaflet default icon paths
window.L = window.L || {};
window.L.Icon = window.L.Icon || {};
window.L.Icon.Default = window.L.Icon.Default || {};
window.L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.9.4/dist/images/";
window.L.Icon.Default.mergeOptions = window.L.Icon.Default.mergeOptions || function(options) {
  Object.assign(window.L.Icon.Default.prototype.options || {}, options);
};

// Import our custom CSS after Leaflet CSS
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

// Set document title
document.title = "AgriTrack Dashboard";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
