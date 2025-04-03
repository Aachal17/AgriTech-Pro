import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SchedulePage() {
  const { data, isConnected, lastUpdated } = useDashboard();
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
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Scheduling</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage and automate your farm operations
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
              <Button>
                <span className="material-icons text-sm mr-1">add_circle</span>
                New Schedule
              </Button>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="irrigation" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="irrigation">
              <span className="material-icons text-sm mr-2">water_drop</span>
              Irrigation
            </TabsTrigger>
            <TabsTrigger value="monitoring">
              <span className="material-icons text-sm mr-2">sensors</span>
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="automation">
              <span className="material-icons text-sm mr-2">smart_toy</span>
              Automation
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <span className="material-icons text-sm mr-2">notifications</span>
              Alerts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="irrigation" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Irrigation Schedules</h2>
                  <span className="text-sm text-slate-500">Last updated: {lastUpdated}</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                          <span className="material-icons text-blue-600 dark:text-blue-400">water_drop</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium">Main Field Irrigation</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Every Mon, Wed, Fri</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          Active
                        </Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Start Time</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">schedule</span>
                          <p className="text-sm font-medium">06:00 AM</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Duration</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">timer</span>
                          <p className="text-sm font-medium">30 minutes</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Conditions</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">rule</span>
                          <p className="text-sm font-medium">Skip if raining</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">edit</span>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="material-icons text-sm mr-1">delete</span>
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-3">
                          <span className="material-icons text-green-600 dark:text-green-400">eco</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium">Greenhouse Watering</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Daily</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          Active
                        </Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Start Time</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">schedule</span>
                          <p className="text-sm font-medium">07:30 AM</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Duration</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">timer</span>
                          <p className="text-sm font-medium">15 minutes</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Conditions</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">rule</span>
                          <p className="text-sm font-medium">Always run</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">edit</span>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="material-icons text-sm mr-1">delete</span>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">
                    <span className="material-icons text-sm mr-1">add</span>
                    Add Irrigation Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Sensor Monitoring Schedule</h2>
                
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">Data Collection Frequency</h3>
                    <Badge>Global Setting</Badge>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                      <div className="flex items-center">
                        <span className="material-icons text-primary-600 dark:text-primary-400 mr-2">thermostat</span>
                        <span className="text-sm font-medium">Temperature Sensor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Every 1 minute</span>
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm">edit</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                      <div className="flex items-center">
                        <span className="material-icons text-blue-600 dark:text-blue-400 mr-2">water_drop</span>
                        <span className="text-sm font-medium">Humidity Sensor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Every 1 minute</span>
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm">edit</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                      <div className="flex items-center">
                        <span className="material-icons text-green-600 dark:text-green-400 mr-2">grass</span>
                        <span className="text-sm font-medium">Soil Moisture Sensor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Every 1 minute</span>
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm">edit</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                      <div className="flex items-center">
                        <span className="material-icons text-purple-600 dark:text-purple-400 mr-2">air</span>
                        <span className="text-sm font-medium">Air Quality Sensor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Every 5 minutes</span>
                        <Button variant="outline" size="sm">
                          <span className="material-icons text-sm">edit</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <span className="material-icons text-sm mr-1">save</span>
                      Save Settings
                    </Button>
                  </div>
                </div>
                
                <h3 className="text-base font-medium mb-3">Data Retention</h3>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-slate-700/50 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Historical Data Storage</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Store data for</span>
                        <span className="text-sm font-medium">30 days</span>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-700/50 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Data Export Schedule</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Export data every</span>
                        <span className="text-sm font-medium">Week</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">
                      <span className="material-icons text-sm mr-1">file_download</span>
                      Export Now
                    </Button>
                    <Button variant="outline">
                      <span className="material-icons text-sm mr-1">settings</span>
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Automation Rules</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                          <span className="material-icons text-blue-600 dark:text-blue-400">water_drop</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium">Low Soil Moisture Alert</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Trigger irrigation when soil is dry</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          Active
                        </Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Condition</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">water_drop</span>
                          <p className="text-sm font-medium">Soil Moisture &lt; 40%</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Action</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">play_arrow</span>
                          <p className="text-sm font-medium">Turn on pump for 15 minutes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">edit</span>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="material-icons text-sm mr-1">delete</span>
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mr-3">
                          <span className="material-icons text-yellow-600 dark:text-yellow-400">wb_sunny</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium">High Temperature Alert</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Send notification when temperature is high</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          Active
                        </Badge>
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Condition</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">thermostat</span>
                          <p className="text-sm font-medium">Temperature &gt; 35°C</p>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-slate-700/50 rounded p-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Action</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">notifications</span>
                          <p className="text-sm font-medium">Send notification alert</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">edit</span>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="material-icons text-sm mr-1">delete</span>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button>
                    <span className="material-icons text-sm mr-1">add</span>
                    Create New Automation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Alert Configuration</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <h3 className="text-base font-medium mb-3">Notification Channels</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="material-icons text-blue-600 dark:text-blue-400 mr-2">email</span>
                          <span className="text-sm font-medium">Email Notifications</span>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="material-icons text-green-600 dark:text-green-400 mr-2">sms</span>
                          <span className="text-sm font-medium">SMS Alerts</span>
                        </div>
                        <Switch checked={false} />
                      </div>
                      
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="material-icons text-purple-600 dark:text-purple-400 mr-2">notifications</span>
                          <span className="text-sm font-medium">Push Notifications</span>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                    
                    <h3 className="text-base font-medium mb-3">Alert Severity Levels</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                          <span className="text-sm font-medium">Critical Alerts</span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">All channels</span>
                      </div>
                      
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                          <span className="text-sm font-medium">Warning Alerts</span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">Email, Push</span>
                      </div>
                      
                      <div className="flex justify-between items-center bg-white dark:bg-slate-700/50 p-3 rounded">
                        <div className="flex items-center">
                          <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
                          <span className="text-sm font-medium">Info Alerts</span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">Email only</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">
                        <span className="material-icons text-sm mr-1">settings</span>
                        Configure Alerts
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    <h3 className="text-base font-medium mb-3">Alert Schedule</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white dark:bg-slate-700/50 p-3 rounded">
                        <p className="text-sm font-medium mb-1">Working Hours</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">schedule</span>
                          <p className="text-sm">08:00 AM - 06:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-700/50 p-3 rounded">
                        <p className="text-sm font-medium mb-1">After Hours</p>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 mr-1 text-sm">notifications_paused</span>
                          <p className="text-sm">Critical alerts only</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>
                        <span className="material-icons text-sm mr-1">save</span>
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">
                    <span className="material-icons text-sm mr-1">send</span>
                    Test Alert System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}