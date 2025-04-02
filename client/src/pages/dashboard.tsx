import { useState } from "react";
import { SensorCard } from "@/components/ui/sensor-card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar, MobileHeader } from "@/components/dashboard/mobile-sidebar";
import { WeatherCard } from "@/components/dashboard/weather-card";
import { LocationCard } from "@/components/dashboard/location-card";
import { PumpControl } from "@/components/dashboard/pump-control";
import { AlertsSection } from "@/components/dashboard/alerts-section";
import { useDashboard } from "@/context/dashboard-context";

export default function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { 
    data, 
    isConnected, 
    isLoading, 
    lastUpdated, 
    historicalData, 
    alerts, 
    updatePumpStatus,
    isDarkMode, 
    toggleTheme 
  } = useDashboard();

  const { sensors, location } = data;

  return (
    <div className={`flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white transition-colors duration-300`}>
      {/* Sidebar for desktop */}
      <Sidebar 
        location={location} 
        onToggleTheme={toggleTheme} 
        isDarkMode={isDarkMode}
      />
      
      {/* Mobile header and sidebar */}
      <MobileHeader 
        onOpenSidebar={() => setIsMobileSidebarOpen(true)} 
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
        location={location}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 md:pl-64">
        {/* Dashboard Header */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Farm Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{lastUpdated}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="flex items-center mr-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isConnected ? "bg-green-500" : isLoading ? "bg-yellow-500" : "bg-red-500"
                }`}></span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isConnected ? "Connected" : isLoading ? "Connecting" : "Disconnected"}
                </span>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50">
                <span className="material-icons text-sm mr-1">refresh</span>
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="px-4 md:px-6 pb-8">
          {/* Weather & Location Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Weather Summary Card */}
            <WeatherCard rainStatus={sensors.rain} />
            
            {/* Location Card */}
            <div className="md:col-span-2">
              <LocationCard latitude={location.latitude} longitude={location.longitude} />
            </div>
          </div>
          
          {/* Sensor Readings Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Sensor Readings</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
                <span className="material-icons text-sm mr-1">history</span>
                View History
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SensorCard 
                type="temperature" 
                value={sensors.temperature} 
                historicalData={historicalData.temperature}
                isDarkMode={isDarkMode}
              />
              <SensorCard 
                type="humidity" 
                value={sensors.humidity} 
                historicalData={historicalData.humidity}
                isDarkMode={isDarkMode}
              />
              <SensorCard 
                type="soilMoisture" 
                value={sensors.soilMoisture} 
                historicalData={historicalData.soilMoisture}
                isDarkMode={isDarkMode}
              />
              <SensorCard 
                type="airQuality" 
                value={sensors.airQuality} 
                historicalData={historicalData.airQuality}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          
          {/* Irrigation Control Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Irrigation Control</h2>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                Auto Mode: Off
              </span>
            </div>
            
            <PumpControl 
              pumpStatus={sensors.pump} 
              onStatusChange={updatePumpStatus}
            />
          </div>
          
          {/* Alerts Section */}
          <AlertsSection alerts={alerts} />
        </div>
      </main>
    </div>
  );
}
