import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertType, getAlertStyles } from "@/lib/utils";

interface AlertProps {
  alert: Alert;
}

function AlertItem({ alert }: AlertProps) {
  const { bg, border, icon, iconColor, textColor, titleColor } = getAlertStyles(alert.type);
  
  return (
    <div className={`flex items-start p-3 mb-2 rounded-lg border ${bg} ${border}`}>
      <span className={`material-icons ${iconColor} mr-3`}>{icon}</span>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className={`font-semibold ${titleColor}`}>{alert.title}</h3>
          <span className={`text-xs ${textColor}`}>{alert.timestamp}</span>
        </div>
        <p className={`text-sm ${textColor} mt-1`}>{alert.message}</p>
      </div>
    </div>
  );
}

interface AlertsSectionProps {
  alerts: Alert[];
}

export function AlertsSection({ alerts }: AlertsSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Alerts</h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
          <span className="material-icons text-sm mr-1">notifications</span>
          View All
        </button>
      </div>
      
      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          {alerts.length > 0 ? (
            <div>
              {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-slate-500 dark:text-slate-400">
              <span className="material-icons text-slate-300 dark:text-slate-600 text-4xl mb-2">notifications_off</span>
              <p>No alerts at this time</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
