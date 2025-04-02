import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DevicesPage() {
  const { data, isConnected, lastUpdated } = useDashboard();
  const { sensors } = data;

  const devices = [
    {
      id: "temp-sensor-01",
      name: "Temperature Sensor",
      type: "Temperature",
      status: "Online",
      battery: 87,
      lastReading: `${sensors.temperature}°C`,
      icon: "thermostat"
    },
    {
      id: "humidity-sensor-01",
      name: "Humidity Sensor",
      type: "Humidity",
      status: "Online",
      battery: 76,
      lastReading: `${sensors.humidity}%`,
      icon: "water_drop"
    },
    {
      id: "soil-sensor-01",
      name: "Soil Moisture Sensor",
      type: "Soil Moisture",
      status: "Online",
      battery: 92,
      lastReading: `${sensors.soilMoisture}%`,
      icon: "grass"
    },
    {
      id: "pump-controller-01",
      name: "Irrigation Pump",
      type: "Pump",
      status: sensors.pump ? "Active" : "Inactive",
      battery: 100,
      lastReading: sensors.pump ? "On" : "Off",
      icon: "water"
    },
    {
      id: "rain-detector-01",
      name: "Rain Detector",
      type: "Weather",
      status: "Online",
      battery: 65,
      lastReading: sensors.rain ? "Raining" : "Clear",
      icon: "cloud"
    }
  ];

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
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Connected Devices</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage and monitor your farm's IoT devices
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}></span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isConnected ? "Network OK" : "Network Error"}
                </span>
              </div>
              <Button size="sm">
                <span className="material-icons text-sm mr-1">add_circle</span>
                Add Device
              </Button>
            </div>
          </div>
        </header>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Device Overview</h2>
              <span className="text-sm text-slate-500">Last updated: {lastUpdated}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Online Devices</h3>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">5</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">Battery Health</h3>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">Good</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Data Frequency</h3>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">1 min</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">Alerts</h3>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">0</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Device</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Battery</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Last Reading</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                            <span className="material-icons text-primary-600 dark:text-primary-400 text-sm">{device.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{device.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{device.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{device.type}</td>
                      <td className="py-3 px-4">
                        <Badge variant={device.status === "Online" || device.status === "Active" ? "default" : "secondary"} className={device.status === "Online" || device.status === "Active" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" : ""}>
                          {device.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                device.battery > 70 ? "bg-green-500" : 
                                device.battery > 30 ? "bg-yellow-500" : "bg-red-500"
                              }`} 
                              style={{ width: `${device.battery}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{device.battery}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{device.lastReading}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center space-x-2">
                          <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <span className="material-icons text-sm">edit</span>
                          </button>
                          <button className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                            <span className="material-icons text-sm">refresh</span>
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                            <span className="material-icons text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Device Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Reading Frequency</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <Button variant="outline" size="sm" className="px-3">30s</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-primary-50 dark:bg-primary-900/30 
                  border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400">1m</Button>
                  <Button variant="outline" size="sm" className="px-3">5m</Button>
                  <Button variant="outline" size="sm" className="px-3">15m</Button>
                </div>
                
                <h3 className="text-sm font-medium mb-2">Alert Threshold</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Temperature</p>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Min: 10°C</span>
                      <span className="text-sm font-medium">Max: 35°C</span>
                    </div>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Humidity</p>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Min: 30%</span>
                      <span className="text-sm font-medium">Max: 80%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Device Groups</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <span className="text-sm font-medium">Sensors</span>
                    <Badge>3 devices</Badge>
                  </div>
                  <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <span className="text-sm font-medium">Controllers</span>
                    <Badge>1 device</Badge>
                  </div>
                  <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <span className="text-sm font-medium">Weather</span>
                    <Badge>1 device</Badge>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    <span className="material-icons text-sm mr-1">settings</span>
                    Configure
                  </Button>
                  <Button size="sm">
                    <span className="material-icons text-sm mr-1">save</span>
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}