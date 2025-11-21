import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertCircle } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface CreditScoreGaugeProps {
  umkm: UMKMDetailed;
}

export const CreditScoreGauge = ({ umkm }: CreditScoreGaugeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getRecommendations = () => {
    const recommendations = [];
    umkm.scoreFactors.forEach(factor => {
      const percentage = (factor.score / factor.maxScore) * 100;
      if (percentage < 70) {
        recommendations.push(`Tingkatkan ${factor.factor.toLowerCase()} untuk meningkatkan credit score`);
      }
    });
    return recommendations;
  };

  return (
    <Card className="p-6 shadow-card bg-card border border-border">
      <h3 className="text-xl font-bold text-foreground mb-6">Detail Credit Score</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--success))"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(umkm.creditScore / 1000) * 502.4} 502.4`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(umkm.creditScore)}`}>
                  {umkm.creditScore}
                </span>
                <span className="text-sm text-muted-foreground">/ 1000</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Credit Score Saat Ini
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Riwayat Credit Score (6 Bulan)
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={umkm.creditHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[600, 1000]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Faktor Pembentuk Score</h4>
            <div className="space-y-4">
              {umkm.scoreFactors.map((factor, index) => {
                const percentage = (factor.score / factor.maxScore) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground">{factor.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {factor.score}/{factor.maxScore}
                        </span>
                        <span className="text-xs text-muted-foreground">({factor.weight}%)</span>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Rekomendasi Peningkatan
            </h4>
            <ul className="space-y-2">
              {getRecommendations().length > 0 ? (
                getRecommendations().map((rec, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-warning mt-0.5">•</span>
                    {rec}
                  </li>
                ))
              ) : (
                <li className="text-sm text-success">
                  ✓ Semua faktor dalam kondisi baik. Pertahankan performa!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
