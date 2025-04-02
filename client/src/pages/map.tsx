import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useDashboard } from "@/context/dashboard-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TileLayer, Map as LeafletMap } from "leaflet";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<LeafletMap | null>(null);
  const marker = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { data, isDarkMode } = useDashboard();
  const { location } = data;

  useEffect(() => {
    // Initialize map with more interactive features
    if (mapRef.current && !leafletMap.current) {
      import("leaflet").then((L) => {
        try {
          leafletMap.current = L.map(mapRef.current!, {
            zoomControl: true,
            attributionControl: false,
            dragging: true,
            scrollWheelZoom: true,
            touchZoom: true,
            doubleClickZoom: true,
          }).setView([location.latitude || 0, location.longitude || 0], 13);
          
          // Use a map style that works well in both light/dark modes
          const tileLayer = isDarkMode
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
            
          L.tileLayer(tileLayer, {
            maxZoom: 19,
            subdomains: 'abcd'
          }).addTo(leafletMap.current);
          
          // Create custom farm icon
          const farmIcon = L.divIcon({
            className: 'farm-marker',
            html: `<span class="material-icons text-primary-600 bg-white rounded-full p-1 shadow-md" style="font-size: 24px;">agriculture</span>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });
          
          marker.current = L.marker([location.latitude || 0, location.longitude || 0], { icon: farmIcon })
            .addTo(leafletMap.current)
            .bindPopup("<strong>Your Farm</strong><br>Active Monitoring")
            .openPopup();
            
          // Add a circle to represent coverage area
          L.circle([location.latitude || 0, location.longitude || 0], {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            radius: 500
          }).addTo(leafletMap.current);
          
          setIsMapLoaded(true);
        } catch (err) {
          console.error("Error initializing map:", err);
        }
      });
    }
    
    // Update the map when theme changes
    if (leafletMap.current && marker.current) {
      const tileLayer = isDarkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        
      import("leaflet").then((L) => {
        if (leafletMap.current) {
          // Remove all existing tile layers
          leafletMap.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
              leafletMap.current!.removeLayer(layer);
            }
          });
          
          // Add new tile layer with current theme
          L.tileLayer(tileLayer, {
            maxZoom: 19,
            subdomains: 'abcd'
          }).addTo(leafletMap.current);
        }
      });
    }
    
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        marker.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [location.latitude, location.longitude, isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center mb-2">
                <span className="material-icons text-sm mr-1">arrow_back</span>
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Farm Location</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Detailed view of your farm's location and surrounding area
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <span className="material-icons text-sm mr-1">share</span>
                Share
              </Button>
              <Button size="sm" className="flex items-center">
                <span className="material-icons text-sm mr-1">save</span>
                Save
              </Button>
            </div>
          </div>
        </header>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="relative w-full h-[calc(100vh-12rem)] min-h-[400px] rounded-lg overflow-hidden">
              <div ref={mapRef} className="w-full h-full" />
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <div className="flex flex-col items-center">
                    <span className="material-icons animate-spin text-primary-500 text-2xl mb-2">sync</span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start">
                <span className="material-icons text-primary-500 mr-3">location_on</span>
                <div>
                  <h3 className="font-semibold mb-1">Coordinates</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Latitude: {location.latitude.toFixed(6)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Longitude: {location.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start">
                <span className="material-icons text-primary-500 mr-3">layers</span>
                <div>
                  <h3 className="font-semibold mb-1">Map Layers</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="satellite" className="mr-2" checked readOnly />
                      <label htmlFor="satellite" className="text-sm text-slate-600 dark:text-slate-300">Base Map</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="terrain" className="mr-2" checked readOnly />
                      <label htmlFor="terrain" className="text-sm text-slate-600 dark:text-slate-300">Monitoring Zone</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          Map data provided by OpenStreetMap contributors
        </div>
      </div>
    </div>
  );
}