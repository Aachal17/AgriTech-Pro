import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const { data, isConnected, lastUpdated, historicalData } = useDashboard();
  const { sensors } = data;

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
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Advanced analytics and insights for your farm
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}></span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Last updated: {lastUpdated}
              </span>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Temperature Trends</h2>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold">{sensors.temperature}°C</p>
                  <p className="text-sm text-slate-500">Current temperature</p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                  <span className="material-icons text-blue-500">thermostat</span>
                </div>
              </div>
              <div className="mt-4 h-28 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <p className="text-sm text-slate-500">Temperature chart coming soon</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Humidity Analysis</h2>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold">{sensors.humidity}%</p>
                  <p className="text-sm text-slate-500">Current humidity</p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/20">
                  <span className="material-icons text-teal-500">water_drop</span>
                </div>
              </div>
              <div className="mt-4 h-28 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <p className="text-sm text-slate-500">Humidity chart coming soon</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Soil Moisture Insights</h2>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-3xl font-bold">{sensors.soilMoisture}%</p>
                  <p className="text-sm text-slate-500">Current soil moisture</p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
                  <span className="material-icons text-green-500">grass</span>
                </div>
              </div>
              <div className="mt-4 h-28 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <p className="text-sm text-slate-500">Soil moisture chart coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Historical Performance</h2>
            <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
              <div className="text-center">
                <span className="material-icons text-slate-400 text-4xl mb-2">analytics</span>
                <p className="text-slate-500 mb-1">Historical data visualization coming soon</p>
                <p className="text-xs text-slate-400">We're working on advanced analytics to help you understand your farm better.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Weather Correlation</h2>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">Beta</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center">
                    <span className="material-icons text-slate-400 mr-2">{sensors.rain ? "water" : "wb_sunny"}</span>
                    <p className="text-sm font-medium">{sensors.rain ? "Rainy" : "Clear"}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Current weather condition</p>
                </div>
              </div>
              <div className="mt-4 h-32 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <p className="text-sm text-slate-500">Weather correlation chart coming soon</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Irrigation Efficiency</h2>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center">
                    <span className="material-icons text-slate-400 mr-2">{sensors.pump ? "power" : "power_off"}</span>
                    <p className="text-sm font-medium">{sensors.pump ? "Active" : "Inactive"}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Pump status</p>
                </div>
              </div>
              <div className="mt-4 h-32 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <p className="text-sm text-slate-500">Irrigation efficiency metrics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline">
            <span className="material-icons mr-1 text-sm">file_download</span>
            Export Data
          </Button>
          <Button>
            <span className="material-icons mr-1 text-sm">insights</span>
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}