import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useDashboard();

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
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Configure your dashboard and system preferences
              </p>
            </div>
            <div className="flex items-center">
              <Button>
                <span className="material-icons text-sm mr-1">save</span>
                Save Changes
              </Button>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="general">
              <span className="material-icons text-sm mr-2">settings</span>
              General
            </TabsTrigger>
            <TabsTrigger value="account">
              <span className="material-icons text-sm mr-2">person</span>
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <span className="material-icons text-sm mr-2">notifications</span>
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system">
              <span className="material-icons text-sm mr-2">memory</span>
              System
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Display Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Theme</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Choose your preferred theme</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Light</span>
                      <Switch 
                        checked={isDarkMode} 
                        onCheckedChange={toggleTheme}
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Dark</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Temperature Unit</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Choose your preferred temperature unit</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">°F</span>
                      <Switch checked={true} />
                      <span className="text-sm text-slate-600 dark:text-slate-300">°C</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Language</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred language</p>
                    </div>
                    <select className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Date Format</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Choose how dates are displayed</p>
                    </div>
                    <select className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200">
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Time Format</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Choose your preferred time format</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">24h</span>
                      <Switch checked={false} />
                      <span className="text-sm text-slate-600 dark:text-slate-300">12h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Dashboard Customization</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Auto-refresh Data</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Automatically refresh dashboard data</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Refresh Interval</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">How often to refresh dashboard data</p>
                    </div>
                    <select className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200">
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="300">5 minutes</option>
                      <option value="600">10 minutes</option>
                    </select>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-3">Shown Cards</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Select which cards to display on your dashboard</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Temperature</span>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Humidity</span>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Soil Moisture</span>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Air Quality</span>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Weather</span>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Pump Controls</span>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Account Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-4">
                      <span className="material-icons text-primary-600 dark:text-primary-400 text-3xl">person</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Farm Admin</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">admin@agritrack.com</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" defaultValue="Farm Admin" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input type="email" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" defaultValue="admin@agritrack.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input type="text" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        <option value="admin">Administrator</option>
                        <option value="manager">Farm Manager</option>
                        <option value="operator">Operator</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button size="sm">Change Password</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-4">Notification Channels</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts via email</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">SMS Notifications</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts via text message</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Push Notifications</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Receive alerts on your device</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Alert Types</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">System Alerts</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Notifications about system status</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Sensor Alerts</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Notifications about sensor readings</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Weather Alerts</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Notifications about weather changes</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Task Reminders</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Reminders about scheduled tasks</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">System Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium mb-4">Data Management</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Data Backup</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Automatic backup of system data</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Data Export</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Scheduled export of sensor data</p>
                        </div>
                        <select className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200">
                          <option value="never">Never</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <div>
                          <p className="text-sm font-medium">Data Retention</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">How long to keep historical data</p>
                        </div>
                        <select className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200">
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="180">6 months</option>
                          <option value="365">1 year</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">file_download</span>
                        Export Data
                      </Button>
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">backup</span>
                        Backup Now
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">Connection Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Firebase Project ID</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200" defaultValue="agritrack-demo" readOnly />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">API Key Status</label>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          <span className="text-sm">Valid and active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-base font-medium mb-4">System Status</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">App Version</span>
                        <span className="text-sm">1.0.0</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">Last System Update</span>
                        <span className="text-sm">April 2, 2025</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded">
                        <span className="text-sm font-medium">System Health</span>
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          <span className="text-sm">All systems operational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                      Reset System
                    </Button>
                    <Button size="sm">
                      <span className="material-icons text-sm mr-1">save</span>
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}