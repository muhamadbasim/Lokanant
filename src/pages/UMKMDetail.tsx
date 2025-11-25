import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUMKMById } from "@/data/umkmDetailedData";
import { UMKMHeader } from "@/components/umkm-detail/UMKMHeader";
import batikPattern4 from "@/assets/batik-pattern-4.png";
import { QuickStatsCards } from "@/components/umkm-detail/QuickStatsCards";
import { BusinessInfoCard } from "@/components/umkm-detail/BusinessInfoCard";
import { FinancialPerformance } from "@/components/umkm-detail/FinancialPerformance";
import { CreditScoreGauge } from "@/components/umkm-detail/CreditScoreGauge";
import { TransactionTable } from "@/components/umkm-detail/TransactionTable";
import { AnalyticsInsights } from "@/components/umkm-detail/AnalyticsInsights";
import { LoanCalculator } from "@/components/umkm-detail/LoanCalculator";
import { LearningProgress } from "@/components/umkm-detail/LearningProgress";
import { DigitalPresence } from "@/components/umkm-detail/DigitalPresence";

const UMKMDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const umkm = getUMKMById(id || "");

  if (!umkm) {
    return (
      <div className="min-h-screen bg-gradient-data flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">UMKM tidak ditemukan</h1>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-data relative overflow-hidden">
      {/* Batik Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern4})`,
          backgroundSize: '250px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container mx-auto px-4 py-8 space-y-6 relative z-10">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Button>

        <UMKMHeader umkm={umkm} />
        <QuickStatsCards umkm={umkm} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card shadow-card border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="banking">Banking & Credit</TabsTrigger>
            <TabsTrigger value="learning">E-Learning</TabsTrigger>
            <TabsTrigger value="digital">Digital Presence</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BusinessInfoCard umkm={umkm} />
              <div className="lg:col-span-2">
                <FinancialPerformance umkm={umkm} />
              </div>
            </div>
            <CreditScoreGauge umkm={umkm} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionTable umkmId={id || ""} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsInsights umkm={umkm} />
          </TabsContent>

          <TabsContent value="banking">
            <LoanCalculator umkm={umkm} />
          </TabsContent>

          <TabsContent value="learning">
            <LearningProgress courses={umkm.courses} recipientName={umkm.name} />
          </TabsContent>

          <TabsContent value="digital">
            <DigitalPresence umkm={umkm} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UMKMDetail;
