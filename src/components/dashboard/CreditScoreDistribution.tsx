import { Card } from "@/components/ui/card";
import { PieChart } from "lucide-react";

const distributionData = [
  { label: "Hijau (800-1000)", count: 187, percentage: 36, color: "bg-success" },
  { label: "Kuning (600-799)", count: 245, percentage: 47, color: "bg-warning" },
  { label: "Merah (0-599)", count: 91, percentage: 17, color: "bg-destructive" },
];

export const CreditScoreDistribution = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-secondary flex items-center justify-center">
            <PieChart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Distribusi Credit Score</h2>
            <p className="text-sm text-muted-foreground">Segmentasi UMKM berdasarkan kelayakan</p>
          </div>
        </div>

        <div className="space-y-4">
          {distributionData.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">{item.count}</span>
                  <span className="text-xs text-muted-foreground ml-2">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">Total UMKM</span>
            <span className="text-lg font-bold text-foreground">523</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
