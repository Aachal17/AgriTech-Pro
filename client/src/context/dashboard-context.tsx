
import { createContext, useContext, ReactNode } from "react";
import { useFirebaseData } from "@/hooks/use-firebase-data";
import { useTheme } from "@/hooks/use-theme";
import { Alert } from "@/lib/utils";
import { FirebaseData } from "@shared/schema";

interface DashboardContextType {
  data: FirebaseData;
  isConnected: boolean;
  isLoading: boolean;
  lastUpdated: string;
  historicalData: {
    temperature: number[];
    humidity: number[];
    soilMoisture: number[];
    airQuality: number[];
  };
  alerts: Alert[];
  createAlert: (title: string, message: string, type?: Alert["type"]) => Alert;
  updatePumpStatus: (pumpId: string, status: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { 
    data, 
    isConnected, 
    isLoading, 
    lastUpdated, 
    historicalData, 
    alerts, 
    createAlert, 
    updatePumpStatus 
  } = useFirebaseData();
  
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <DashboardContext.Provider
      value={{
        data,
        isConnected,
        isLoading,
        lastUpdated,
        historicalData,
        alerts,
        createAlert,
        updatePumpStatus,
        isDarkMode,
        toggleTheme
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
