import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Chart helpers
export function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Sensor threshold configuration
export const thresholds = {
  temperature: { min: 5, max: 35, unit: "°C" },
  humidity: { min: 30, max: 80, unit: "%" },
  soilMoisture: { min: 20, max: 80, unit: "%" },
  airQuality: { min: 0, max: 50, unit: "ppm" }
};

// Sensor display configurations
export const sensorConfig = {
  temperature: {
    label: "Temperature",
    icon: "device_thermostat",
    color: "#ef4444", // red-500
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    unit: "°C"
  },
  humidity: {
    label: "Humidity",
    icon: "water",
    color: "#3b82f6", // blue-500
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    unit: "%"
  },
  soilMoisture: {
    label: "Soil Moisture",
    icon: "grass",
    color: "#10b981", // green-500
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    unit: "%"
  },
  airQuality: {
    label: "Air Quality",
    icon: "air",
    color: "#8b5cf6", // purple-500
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
    unit: "ppm"
  }
};

// Function to get status for sensors based on thresholds
export function getSensorStatus(sensor: keyof typeof thresholds, value: number): {
  status: "below" | "optimal" | "above";
  text: string;
  icon: string;
  color: string;
} {
  const { min, max } = thresholds[sensor];
  
  if (value < min) {
    return {
      status: "below",
      text: "Below optimal range",
      icon: "trending_down",
      color: "text-blue-500"
    };
  } else if (value > max) {
    return {
      status: "above",
      text: "Above optimal range",
      icon: "trending_up",
      color: "text-red-500"
    };
  } else {
    return {
      status: "optimal",
      text: "Within optimal range",
      icon: "check_circle",
      color: "text-green-500"
    };
  }
}

// Alert type definitions
export type AlertType = "warning" | "error" | "info" | "success";

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  timestamp: string;
}

// Function to get alert styles based on type
export function getAlertStyles(type: AlertType): {
  bg: string;
  border: string;
  icon: string;
  iconColor: string;
} {
  switch (type) {
    case "warning":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: "warning",
        iconColor: "text-yellow-500"
      };
    case "error":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "error",
        iconColor: "text-red-500"
      };
    case "success":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "check_circle",
        iconColor: "text-green-500"
      };
    default: // info
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "info",
        iconColor: "text-blue-500"
      };
  }
}
