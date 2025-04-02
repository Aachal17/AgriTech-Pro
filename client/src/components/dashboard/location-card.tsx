import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface LocationCardProps {
  latitude: number;
  longitude: number;
}

export function LocationCard({ latitude, longitude }: LocationCardProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const marker = useRef<any>(null);

  useEffect(() => {
    // Initialize map
    if (mapRef.current && !leafletMap.current) {
      import("leaflet").then((L) => {
        leafletMap.current = L.map(mapRef.current!, {
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          scrollWheelZoom: false,
          touchZoom: false,
          doubleClickZoom: false
        }).setView([latitude || 0, longitude || 0], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap.current);
        
        // Create custom farm icon
        const farmIcon = L.divIcon({
          className: 'farm-marker',
          html: '<span class="material-icons text-primary-600" style="font-size: 24px;">agriculture</span>',
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        });
        
        marker.current = L.marker([latitude || 0, longitude || 0], { icon: farmIcon }).addTo(leafletMap.current);
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
      }
    };
  }, [latitude, longitude]);

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Farm Location</h2>
        <div ref={mapRef} className="w-full h-32 rounded-lg bg-slate-100 dark:bg-slate-700"></div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Lat: <span className="font-medium">{latitude.toFixed(4)}</span></span>
            <span className="mx-2">|</span>
            <span>Long: <span className="font-medium">{longitude.toFixed(4)}</span></span>
          </div>
          <button className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
