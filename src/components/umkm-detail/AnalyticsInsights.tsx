import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Package, Clock, Brain } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface AnalyticsInsightsProps {
  umkm: UMKMDetailed;
}

export const AnalyticsInsights = ({ umkm }: AnalyticsInsightsProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Produk Terlaris
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={umkm.topProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Bar dataKey="sales" fill="hsl(var(--primary))" name="Jumlah Penjualan" />
            <Bar dataKey="revenue" fill="hsl(var(--success))" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Peak Hours Transaksi
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={umkm.peakHours}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line type="monotone" dataKey="transactions" stroke="hsl(var(--primary))" strokeWidth={2} name="Transaksi" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI-Powered Predictions
        </h3>
        <div className="space-y-4">
          {umkm.predictions.map((prediction, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{prediction.metric}</h4>
                <span className="text-sm text-muted-foreground">Confidence: {prediction.confidence}%</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current</p>
                  <p className="text-lg font-bold text-foreground">
                    {prediction.current.toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Predicted</p>
                  <p className="text-lg font-bold text-success flex items-center gap-2">
                    {prediction.predicted.toLocaleString('id-ID')}
                    <TrendingUp className="w-4 h-4" />
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
