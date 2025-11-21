import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Building2 } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";
import { useState } from "react";

interface LoanCalculatorProps {
  umkm: UMKMDetailed;
}

export const LoanCalculator = ({ umkm }: LoanCalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState(umkm.loanEligibility.maxAmount / 2);
  const [loanTerm, setLoanTerm] = useState(umkm.loanEligibility.term);
  
  const monthlyPayment = (loanAmount * (umkm.loanEligibility.interestRate / 100 / 12) * Math.pow(1 + (umkm.loanEligibility.interestRate / 100 / 12), loanTerm)) / (Math.pow(1 + (umkm.loanEligibility.interestRate / 100 / 12), loanTerm) - 1);

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Kelayakan Pinjaman
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-card border border-primary/30">
            <p className="text-sm text-muted-foreground mb-1">Maksimal Pinjaman</p>
            <p className="text-2xl font-bold text-primary">
              Rp {umkm.loanEligibility.maxAmount.toLocaleString('id-ID')}
            </p>
          </Card>

          <Card className="p-4 bg-card border border-success/30">
            <p className="text-sm text-muted-foreground mb-1">Suku Bunga</p>
            <p className="text-2xl font-bold text-success">
              {umkm.loanEligibility.interestRate}%
            </p>
            <p className="text-xs text-muted-foreground">per tahun</p>
          </Card>

          <Card className="p-4 bg-card border border-warning/30">
            <p className="text-sm text-muted-foreground mb-1">Tenor Maksimal</p>
            <p className="text-2xl font-bold text-warning">
              {umkm.loanEligibility.term} bulan
            </p>
          </Card>
        </div>

        <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Simulasi Pinjaman</h4>
          
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Jumlah Pinjaman</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              max={umkm.loanEligibility.maxAmount}
            />
            <p className="text-xs text-muted-foreground">
              Maksimal: Rp {umkm.loanEligibility.maxAmount.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Tenor (bulan)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              max={umkm.loanEligibility.term}
            />
          </div>

          <div className="bg-primary/10 rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground mb-1">Cicilan per Bulan</p>
            <p className="text-3xl font-bold text-primary">
              Rp {Math.round(monthlyPayment).toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Total dibayar: Rp {Math.round(monthlyPayment * loanTerm).toLocaleString('id-ID')}
            </p>
          </div>

          <Button className="w-full mt-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ajukan Pinjaman
          </Button>
        </div>
      </Card>

      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Rekomendasi Program Banking
        </h3>
        <div className="space-y-4">
          {umkm.recommendations.map((rec, index) => (
            <Card key={index} className="p-4 bg-card border border-border hover:shadow-card transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <p className="text-xs text-primary font-semibold">{rec.provider}</p>
                </div>
                <Button size="sm" variant="outline">Detail</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
