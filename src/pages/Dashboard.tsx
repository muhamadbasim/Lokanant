import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { UMKMTable } from "@/components/dashboard/UMKMTable";
import { WebhookPanel } from "@/components/dashboard/WebhookPanel";
import { TransactionChart } from "@/components/dashboard/TransactionChart";
import { CreditScoreDistribution } from "@/components/dashboard/CreditScoreDistribution";
import batikPattern3 from "@/assets/batik-pattern-3.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-data relative">
      {/* Subtle Batik Background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern3})`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        <StatsOverview />
        
        <Tabs defaultValue="umkm" className="space-y-6">
          <TabsList className="bg-card shadow-card border border-border">
            <TabsTrigger value="umkm">UMKM Database</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="webhooks">n8n Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="umkm" className="space-y-6">
            <UMKMTable />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionChart />
              <CreditScoreDistribution />
            </div>
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-6">
            <WebhookPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
