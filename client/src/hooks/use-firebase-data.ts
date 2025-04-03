import { useState, useEffect } from "react";
import { FirebaseData, FirebaseSensors, FirebaseLocation } from "@shared/schema";
import { initialData, initializeFirebase, getFormattedTime } from "@/lib/firebase";
import { thresholds, Alert, getAlertStyles } from "@/lib/utils";
import { nanoid } from "nanoid";

// Number of historical data points to track for charts
const MAX_HISTORY_LENGTH = 10;

export function useFirebaseData() {
  const [data, setData] = useState<FirebaseData>(initialData);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("Connecting to database...");
  const [historicalData, setHistoricalData] = useState<{
    temperature: number[];
    humidity: number[];
    soilMoisture: number[];
    airQuality: number[];
  }>({
    temperature: Array(MAX_HISTORY_LENGTH).fill(0),
    humidity: Array(MAX_HISTORY_LENGTH).fill(0),
    soilMoisture: Array(MAX_HISTORY_LENGTH).fill(0),
    airQuality: Array(MAX_HISTORY_LENGTH).fill(0),
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Function to create a new alert
  const createAlert = (title: string, message: string, type: Alert["type"] = "info") => {
    const newAlert: Alert = {
      id: nanoid(),
      title,
      message,
      type,
      timestamp: getFormattedTime()
    };
    
    setAlerts(prev => {
      // Keep only the latest 5 alerts
      const updatedAlerts = [newAlert, ...prev].slice(0, 5);
      return updatedAlerts;
    });
    
    return newAlert;
  };

  // Function to check sensor values against thresholds
  const checkSensorAlerts = (sensors: FirebaseSensors) => {
    Object.entries(sensors).forEach(([key, value]) => {
      if (typeof value === 'number' && thresholds[key as keyof typeof thresholds]) {
        const sensor = key as keyof typeof thresholds;
        const { min, max, unit } = thresholds[sensor];
        
        // Only create alerts for values outside thresholds
        if (value < min) {
          createAlert(
            `Low ${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`, 
            `${sensor} reading of ${value.toFixed(1)} ${unit} is below recommended minimum of ${min} ${unit}`, 
            "warning"
          );
        } else if (value > max) {
          createAlert(
            `High ${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`, 
            `${sensor} reading of ${value.toFixed(1)} ${unit} is above recommended maximum of ${max} ${unit}`, 
            "warning"
          );
        }
      }
    });
    
    // Create rain alert if necessary
    if (sensors.rain) {
      createAlert("Rain Detected", "Water pumps may activate automatically", "warning");
    }
  };

  // Function to update historical data with new values
  const updateHistoricalData = (sensors: FirebaseSensors) => {
    setHistoricalData(prev => ({
      temperature: [...prev.temperature.slice(1), sensors.temperature],
      humidity: [...prev.humidity.slice(1), sensors.humidity],
      soilMoisture: [...prev.soilMoisture.slice(1), sensors.soilMoisture],
      airQuality: [...prev.airQuality.slice(1), sensors.airQuality],
    }));
  };

  // Set up Firebase listeners
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    
    async function setupFirebase() {
      try {
        setIsLoading(true);
        const { database, ref, onValue } = await initializeFirebase();
        
        // Listen for data changes
        const rootRef = ref(database, '/');
        unsubscribe = onValue(rootRef, (snapshot) => {
          const fbData = snapshot.val() as FirebaseData | null;
          
          if (fbData) {
            setData(fbData);
            setIsConnected(true);
            setLastUpdated(`Last updated: ${getFormattedTime()}`);
            
            // Update historical data
            if (fbData.sensors) {
              updateHistoricalData(fbData.sensors);
              checkSensorAlerts(fbData.sensors);
            }
          }
          
          setIsLoading(false);
        }, (error) => {
          console.error("Firebase error:", error);
          setIsConnected(false);
          setIsLoading(false);
          createAlert("Connection Error", "Failed to connect to the database. Check your internet connection and try again.", "error");
        });
      } catch (error) {
        console.error("Error setting up Firebase:", error);
        setIsConnected(false);
        setIsLoading(false);
      }
    }
    
    setupFirebase();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Function to update pump status
  const updatePumpStatus = async (pumpId: string, status: boolean) => {
    try {
      const { database, ref, set } = await initializeFirebase();
      await set(ref(database, `sensors/${pumpId}`), status);
      setData(prev => ({
        ...prev,
        sensors: {
          ...prev.sensors,
          [pumpId]: status
        }
      }));
    } catch (error) {
      console.error("Failed to update pump status:", error);
      throw error;
    }
  };

  return {
    data,
    isConnected,
    isLoading,
    lastUpdated,
    historicalData,
    alerts,
    createAlert,
    updatePumpStatus
  };
}
