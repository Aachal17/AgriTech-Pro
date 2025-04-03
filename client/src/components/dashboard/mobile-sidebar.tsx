import { useLocation } from "wouter";
import { useRef, useEffect } from "react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  location: { latitude: number; longitude: number };
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export function MobileSidebar({ 
  isOpen, 
  onClose, 
  location, 
  onToggleTheme, 
  isDarkMode 
}: MobileSidebarProps) {
  const [currentPath, setLocation] = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 bg-slate-800 bg-opacity-50 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        ref={sidebarRef}
        className={`w-64 h-full bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <span className="material-icons text-primary-600 dark:text-primary-400">eco</span>
            <h1 className="text-xl font-semibold text-primary-700 dark:text-primary-300">AgriTrack</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Smart Farming Dashboard</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Monitoring
            </h2>
            <ul>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                    currentPath === "/" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">dashboard</span>
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/map");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg mt-1 ${
                    currentPath === "/map" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">location_on</span>
                  Farm Map
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/analytics");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg mt-1 ${
                    currentPath === "/analytics" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">analytics</span>
                  Analytics
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/devices");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg mt-1 ${
                    currentPath === "/devices" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">settings_input_component</span>
                  Devices
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Controls
            </h2>
            <ul>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/irrigation");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                    currentPath === "/irrigation" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">water_drop</span>
                  Irrigation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/schedule");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg mt-1 ${
                    currentPath === "/schedule" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">schedule</span>
                  Scheduling
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              System
            </h2>
            <ul>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/settings");
                    onClose();
                  }}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg ${
                    currentPath === "/settings" 
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium" 
                      : "text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span className="material-icons text-sm mr-3">settings</span>
                  Settings
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="flex items-center px-3 py-2 text-sm rounded-lg text-slate-700 dark:text-slate-300 font-medium mt-1 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  <span className="material-icons text-sm mr-3">help_outline</span>
                  Help
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="material-icons text-slate-400 mr-2 text-xs">location_on</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
              </span>
            </div>
            <button 
              onClick={onToggleTheme}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <span className="material-icons text-sm">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileHeader({ 
  onOpenSidebar, 
  onToggleTheme,
  isDarkMode 
}: { 
  onOpenSidebar: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10">
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={onOpenSidebar}
          className="text-slate-500 dark:text-slate-400"
        >
          <span className="material-icons">menu</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="material-icons text-primary-600 dark:text-primary-400">eco</span>
          <h1 className="text-lg font-semibold text-primary-700 dark:text-primary-300">AgriTrack</h1>
        </div>
        <button 
          onClick={onToggleTheme}
          className="text-slate-400 dark:text-slate-300"
        >
          <span className="material-icons">
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>
    </div>
  );
}
