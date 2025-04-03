import { Card, CardContent } from "@/components/ui/card";

interface WeatherCardProps {
  rainStatus: boolean;
}

export function WeatherCard({ rainStatus }: WeatherCardProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Weather Condition</h2>
            <div className="flex items-center mt-2">
              <span 
                id="rain-indicator" 
                className={`material-icons text-3xl ${
                  rainStatus ? "text-blue-500" : "text-yellow-500"
                }`}
              >
                {rainStatus ? "water_drop" : "wb_sunny"}
              </span>
              <div className="ml-3">
                <p className="text-lg font-semibold dark:text-white">
                  {rainStatus ? "Rainy" : "Clear"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {rainStatus ? "Rain detected by sensors" : "No rain detected"}
                </p>
              </div>
            </div>
          </div>
          {rainStatus && (
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
              Rain Detected
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
