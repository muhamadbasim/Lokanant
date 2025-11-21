import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Award } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface QuickStatsCardsProps {
  umkm: UMKMDetailed;
}

export const QuickStatsCards = ({ umkm }: QuickStatsCardsProps) => {
  const currentMonth = umkm.monthlyRevenue[umkm.monthlyRevenue.length - 1];
  const previousMonth = umkm.monthlyRevenue[umkm.monthlyRevenue.length - 2];
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const isPositive = revenueChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-6 shadow-card bg-card border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Credit Score</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{umkm.creditScore}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Omzet Bulan Ini</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {umkm.revenue}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Profit Bulan Ini</p>
            <h3 className="text-2xl font-bold text-success mt-1">
              Rp {currentMonth.profit.toLocaleString('id-ID')}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Trend Pendapatan</p>
            <h3 className={`text-2xl font-bold mt-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{revenueChange.toFixed(1)}%
            </h3>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPositive ? 'bg-success/20' : 'bg-destructive/20'}`}>
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-success" />
            ) : (
              <TrendingDown className="w-6 h-6 text-destructive" />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
