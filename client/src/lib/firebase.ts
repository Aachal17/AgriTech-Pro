import { FirebaseData, FirebaseSensors, FirebaseLocation } from "@shared/schema";

// Firebase config should come from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Mock initial data (will be replaced with actual Firebase data)
export const initialData: FirebaseData = {
  location: {
    latitude: 0,
    longitude: 0
  },
  sensors: {
    airQuality: 0,
    humidity: 0,
    pump: false,
    rain: false,
    soilMoisture: 0,
    temperature: 0
  }
};

// Initialize Firebase app
let firebaseApp: any = null;
let database: any = null;

export async function initializeFirebase() {
  // Dynamically import Firebase modules
  const { initializeApp } = await import("firebase/app");
  const { getDatabase, ref, onValue, set, get } = await import("firebase/database");

  if (!firebaseApp) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      database = getDatabase(firebaseApp);
      console.log("Firebase initialized successfully");
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }

  return { firebaseApp, database, ref, onValue, set, get };
}

// Function to update pump status in Firebase
export async function updatePumpStatus(pumpId: string, status: boolean): Promise<void> {
  const { database, ref, set } = await initializeFirebase();
  try {
    await set(ref(database, `sensors/${pumpId}`), status);
    console.log(`Updated ${pumpId} status to ${status} in Firebase`);
    return Promise.resolve();
  } catch (error) {
    console.error("Error updating pump status:", error);
    return Promise.reject(error);
  }
}

// Helper to get a formatted timestamp
export function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}