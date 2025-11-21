import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, CheckCircle2 } from "lucide-react";
import batikPattern2 from "@/assets/batik-pattern-2.png";

const stats = [
  {
    title: "Total UMKM",
    value: "523",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    gradient: "from-primary to-accent",
  },
  {
    title: "Total Transaksi (Bulan Ini)",
    value: "Rp 2.4M",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    gradient: "from-secondary to-primary",
  },
  {
    title: "UMKM Bankable",
    value: "187",
    change: "+23.1%",
    trend: "up",
    icon: CheckCircle2,
    gradient: "from-success to-secondary",
  },
  {
    title: "Credit Score Avg",
    value: "782",
    change: "+5.3%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-accent to-warning",
  },
];

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 relative overflow-hidden group">
            {/* Batik Pattern on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundImage: `url(${batikPattern2})`,
                backgroundSize: '150px',
                backgroundRepeat: 'repeat',
              }}
            />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
                <p className="text-sm text-success mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change} vs bulan lalu
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url(${batikPattern2})`,
                    backgroundSize: 'cover',
                  }}
                />
                <Icon className="w-6 h-6 text-white relative z-10" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
