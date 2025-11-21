import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const chartData = [
  { day: "Sen", value: 65 },
  { day: "Sel", value: 78 },
  { day: "Rab", value: 90 },
  { day: "Kam", value: 72 },
  { day: "Jum", value: 85 },
  { day: "Sab", value: 98 },
  { day: "Min", value: 92 },
];

export const TransactionChart = () => {
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Transaksi Mingguan</h2>
            <p className="text-sm text-muted-foreground">Total transaksi per hari</p>
          </div>
        </div>

        <div className="space-y-4">
          {chartData.map((item) => (
            <div key={item.day} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{item.day}</span>
                <span className="font-semibold text-primary">{item.value}</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
