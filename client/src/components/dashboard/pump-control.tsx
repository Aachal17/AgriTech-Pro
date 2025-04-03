
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface PumpControlProps {
  pumpId: string;
  pumpName: string;
  pumpStatus: boolean;
  onStatusChange: (pumpId: string, status: boolean) => void;
}

export function PumpControl({ pumpId, pumpName, pumpStatus = false, onStatusChange }: PumpControlProps) {
  const handleStatusChange = async (checked: boolean) => {
    try {
      await onStatusChange(pumpId, checked);
    } catch (error) {
      console.error("Error toggling pump:", error);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`material-icons ${pumpStatus ? 'text-green-500' : 'text-slate-400'}`}>
              water_drop
            </span>
            <div>
              <h3 className="text-sm font-medium">{pumpName}</h3>
              <p className="text-xs text-slate-500">Status: {pumpStatus ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
          <Switch
            checked={pumpStatus}
            onCheckedChange={handleStatusChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
