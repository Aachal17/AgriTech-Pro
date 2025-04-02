import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function IrrigationPage() {
  const { data, isConnected, lastUpdated, updatePumpStatus } = useDashboard();
  const { sensors } = data;
  
  const [isManualMode, setIsManualMode] = useState(true);
  const [selectedZone, setSelectedZone] = useState("zone-1");
  
  const zones = [
    { id: "zone-1", name: "Main Field", status: sensors.pump, soilMoisture: sensors.soilMoisture },
    { id: "zone-2", name: "Greenhouse", status: false, soilMoisture: 75 },
    { id: "zone-3", name: "Garden Beds", status: false, soilMoisture: 68 },
    { id: "zone-4", name: "Orchard", status: false, soilMoisture: 62 }
  ];

  const selectedZoneData = zones.find(zone => zone.id === selectedZone);
  
  const handlePumpToggle = (status: boolean) => {
    updatePumpStatus(status);
  };
  
  const getZoneColor = (soilMoisture: number) => {
    if (soilMoisture > 70) return "bg-blue-50 dark:bg-blue-900/20";
    if (soilMoisture > 40) return "bg-green-50 dark:bg-green-900/20";
    return "bg-yellow-50 dark:bg-yellow-900/20";
  };
  
  const getZoneTextColor = (soilMoisture: number) => {
    if (soilMoisture > 70) return "text-blue-700 dark:text-blue-300";
    if (soilMoisture > 40) return "text-green-700 dark:text-green-300";
    return "text-yellow-700 dark:text-yellow-300";
  };

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
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Irrigation Control</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage your farm's irrigation system
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}></span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isConnected ? "System Online" : "System Offline"}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Last updated: {lastUpdated}
              </span>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Irrigation Zones</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Mode:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isManualMode ? 'font-medium text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'}`}>Manual</span>
                    <Switch 
                      checked={!isManualMode} 
                      onCheckedChange={(checked) => setIsManualMode(!checked)} 
                    />
                    <span className={`text-sm ${!isManualMode ? 'font-medium text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400'}`}>Automatic</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {zones.map((zone) => (
                  <div 
                    key={zone.id}
                    className={`rounded-lg p-4 cursor-pointer ${
                      selectedZone === zone.id 
                        ? 'border-2 border-primary-400 dark:border-primary-500 ' + getZoneColor(zone.soilMoisture)
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                    onClick={() => setSelectedZone(zone.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-medium ${
                        selectedZone === zone.id 
                          ? getZoneTextColor(zone.soilMoisture)
                          : 'text-slate-700 dark:text-slate-200'
                      }`}>
                        {zone.name}
                      </h3>
                      <Badge variant={zone.status ? "default" : "outline"} className={`text-xs ${zone.status ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" : ""}`}>
                        {zone.status ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons text-slate-400 mr-1 text-sm">water_drop</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{zone.soilMoisture}% Moisture</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-base font-medium">{selectedZoneData?.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Zone Status</p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex items-center">
                        <span className="material-icons text-slate-400 mr-1 text-sm">water_drop</span>
                        <span className="text-sm font-medium">{selectedZoneData?.soilMoisture}% Moisture</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-slate-600 dark:text-slate-300">Pump:</span>
                      <Switch 
                        checked={selectedZoneData?.status || false} 
                        onCheckedChange={handlePumpToggle}
                        disabled={!isManualMode}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="h-40 bg-white dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700 p-3 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium">Zone Activity</h4>
                    <span className="text-xs text-slate-500">Last 24 hours</span>
                  </div>
                  <div className="h-24 flex items-center justify-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Zone activity chart coming soon</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={!isManualMode}
                  >
                    <span className="material-icons text-sm mr-1">schedule</span>
                    Schedule
                  </Button>
                  <Button 
                    size="sm"
                    disabled={!isManualMode}
                    onClick={() => handlePumpToggle(!selectedZoneData?.status)}
                  >
                    <span className="material-icons text-sm mr-1">{selectedZoneData?.status ? "power_off" : "power"}</span>
                    {selectedZoneData?.status ? "Turn Off" : "Turn On"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">System Status</h2>
              
              <div className="space-y-3 mb-6">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                      <span className="material-icons text-blue-600 dark:text-blue-400 text-sm">water</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Water Pressure</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Normal</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Good
                  </Badge>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mr-3">
                      <span className="material-icons text-yellow-600 dark:text-yellow-400 text-sm">battery_std</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Battery Status</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Backup Power</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                    85%
                  </Badge>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-3">
                      <span className="material-icons text-green-600 dark:text-green-400 text-sm">wifi</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Connectivity</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Signal Strength</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Strong
                  </Badge>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mb-3">Weather Status</h3>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="material-icons text-2xl mr-2 text-slate-600 dark:text-slate-300">
                      {sensors.rain ? "water" : "wb_sunny"}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{sensors.rain ? "Rain Detected" : "Clear Weather"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Current Conditions</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-700 rounded p-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Temperature</p>
                    <p className="text-sm font-medium">{sensors.temperature}°C</p>
                  </div>
                  <div className="bg-white dark:bg-slate-700 rounded p-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
                    <p className="text-sm font-medium">{sensors.humidity}%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="sm" variant="outline">
                  <span className="material-icons text-sm mr-1">settings</span>
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Irrigation Schedule</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Zone</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Start Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Days</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-sm">Main Field</td>
                    <td className="py-3 px-4 text-sm">06:00 AM</td>
                    <td className="py-3 px-4 text-sm">30 minutes</td>
                    <td className="py-3 px-4 text-sm">Mon, Wed, Fri</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <span className="material-icons text-sm">pause</span>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 text-sm">Greenhouse</td>
                    <td className="py-3 px-4 text-sm">07:30 AM</td>
                    <td className="py-3 px-4 text-sm">15 minutes</td>
                    <td className="py-3 px-4 text-sm">Daily</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                          <span className="material-icons text-sm">pause</span>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button>
                <span className="material-icons text-sm mr-1">add</span>
                Add Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}