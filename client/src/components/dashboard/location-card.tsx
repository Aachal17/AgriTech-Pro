import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface LocationCardProps {
  latitude: number;
  longitude: number;
}

export function LocationCard({ latitude, longitude }: LocationCardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const marker = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Initialize map
    if (mapRef.current && !leafletMap.current) {
      import("leaflet").then((L) => {
        // Add a small delay to ensure the container is fully rendered
        setTimeout(() => {
          try {
            leafletMap.current = L.map(mapRef.current!, {
              zoomControl: false,
              attributionControl: false,
              dragging: false,
              scrollWheelZoom: false,
              touchZoom: false,
              doubleClickZoom: false,
              boxZoom: false,
              keyboard: false
            }).setView([latitude || 0, longitude || 0], 15);
            
            // Use a different tile provider with better styling
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
              maxZoom: 19,
              subdomains: 'abcd'
            }).addTo(leafletMap.current);
            
            // Create custom farm icon
            const farmIcon = L.divIcon({
              className: 'farm-marker',
              html: '<span class="material-icons text-primary-600 bg-white rounded-full p-1" style="font-size: 22px;">agriculture</span>',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });
            
            marker.current = L.marker([latitude || 0, longitude || 0], { icon: farmIcon }).addTo(leafletMap.current);
            
            // Indicate map is loaded
            setIsMapLoaded(true);
          } catch (err) {
            console.error("Error initializing map:", err);
          }
        }, 100);
      });
    }
    
    // Update marker position when coordinates change
    if (leafletMap.current && marker.current) {
      marker.current.setLatLng([latitude, longitude]);
      leafletMap.current.setView([latitude, longitude], 15);
    }
    
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        marker.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [latitude, longitude]);

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Farm Location</h2>
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
          <div ref={mapRef} className="w-full h-full" />
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-icons animate-spin text-primary-500">sync</span>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Lat: <span className="font-medium">{latitude.toFixed(4)}</span></span>
            <span className="mx-2">|</span>
            <span>Long: <span className="font-medium">{longitude.toFixed(4)}</span></span>
          </div>
          <Link href="/map" className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
            <span className="material-icons text-sm mr-1">location_on</span>
            View Map
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
