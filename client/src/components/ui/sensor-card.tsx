import { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { Card, CardContent } from "@/components/ui/card";
import { sensorConfig, getSensorStatus, hexToRGBA } from "@/lib/utils";

type SensorType = "temperature" | "humidity" | "soilMoisture" | "airQuality";

interface SensorCardProps {
  type: SensorType;
  value: number;
  historicalData: number[];
  isDarkMode: boolean;
}

export function SensorCard({ type, value, historicalData, isDarkMode }: SensorCardProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { label, icon, color, iconColor, unit } = sensorConfig[type];
  const status = getSensorStatus(type, value);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array(10).fill(''),
            datasets: [{
              data: historicalData,
              borderColor: color,
              backgroundColor: hexToRGBA(color, 0.1),
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0,
              pointHitRadius: 5,
              pointHoverRadius: 3,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true }
            },
            scales: {
              x: { display: false },
              y: { display: false }
            },
            animation: {
              duration: 1000
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [historicalData, color]);

  // Update chart when dark mode changes
  useEffect(() => {
    if (chartInstance.current) {
      const theme = isDarkMode ? 'dark' : 'light';
      chartInstance.current.options.plugins!.tooltip!.backgroundColor = isDarkMode ? '#374151' : '#ffffff';
      chartInstance.current.options.plugins!.tooltip!.titleColor = isDarkMode ? '#ffffff' : '#1e293b';
      chartInstance.current.options.plugins!.tooltip!.bodyColor = isDarkMode ? '#d1d5db' : '#475569';
      chartInstance.current.update();
    }
  }, [isDarkMode]);

  return (
    <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`material-icons ${iconColor} mr-2`}>{icon}</span>
              <h3 className="text-sm font-semibold">{label}</h3>
            </div>
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              {unit}
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{value.toFixed(1)}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                {unit === "°C" ? "degrees" : unit === "ppm" ? "ppm" : "percent"}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className={`material-icons text-xs mr-1 ${status.color}`}>{status.icon}</span>
              <span className={`text-xs ${status.color}`}>{status.text}</span>
            </div>
          </div>
        </div>
        <div className="px-2 pt-3 pb-2 h-[60px]">
          <canvas ref={chartRef} height="60"></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
