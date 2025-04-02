import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { updatePumpStatus } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface PumpControlProps {
  pumpStatus: boolean;
  onStatusChange: (status: boolean) => void;
}

export function PumpControl({ pumpStatus, onStatusChange }: PumpControlProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleToggle = async () => {
    if (isUpdating) return;
    
    const newStatus = !pumpStatus;
    setIsUpdating(true);
    
    try {
      await updatePumpStatus(newStatus);
      onStatusChange(newStatus);
      
      toast({
        title: "Pump Status Changed",
        description: `Pump is now ${newStatus ? 'active' : 'inactive'}`,
        variant: newStatus ? "default" : "secondary",
      });
    } catch (error) {
      console.error("Error updating pump status:", error);
      
      toast({
        title: "Update Failed",
        description: "Could not update pump status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-4">
              <span className="material-icons">opacity</span>
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">Water Pump</h3>
              <p className={`text-sm ${pumpStatus ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}>
                {pumpStatus ? "Pump is currently active" : "Pump is currently inactive"}
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-between md:justify-end space-x-4">
              <button className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white flex items-center">
                <span className="material-icons text-sm mr-1">history</span>
                History
              </button>
              
              <label htmlFor="pump-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="pump-toggle" 
                    className="sr-only" 
                    checked={pumpStatus}
                    onChange={handleToggle}
                    disabled={isUpdating}
                  />
                  <div className={`toggle-bg block w-14 h-8 rounded-full transition duration-300 ease-in-out ${
                    pumpStatus ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"
                  }`}></div>
                  <div className={`toggle-dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition duration-300 ease-in-out shadow-md ${
                    pumpStatus ? "translate-x-6" : ""
                  }`}></div>
                </div>
                <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300" id="pump-toggle-text">
                  {isUpdating ? "Updating..." : pumpStatus ? "Turn Off" : "Turn On"}
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Last Activated</h4>
              <p className="text-base font-medium dark:text-white">Today, 08:45 AM</p>
            </div>
            <div className="text-center">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Duration</h4>
              <p className="text-base font-medium dark:text-white">15 minutes</p>
            </div>
            <div className="text-center">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Water Used</h4>
              <p className="text-base font-medium dark:text-white">120 liters</p>
            </div>
            <div className="text-center">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Next Schedule</h4>
              <p className="text-base font-medium dark:text-white">Tomorrow, 08:00 AM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
