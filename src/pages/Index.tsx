import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Users, BarChart3, Webhook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import batikPattern3 from "@/assets/batik-pattern-3.png";
import batikPattern4 from "@/assets/batik-pattern-4.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-data relative overflow-hidden">
      {/* Batik Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern3})`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <header className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url(${batikPattern4})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="relative w-10 h-10 bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">LC</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Lokakarya Connect</h1>
              <p className="text-xs text-muted-foreground">Ekosistem Digital UMKM Budaya</p>
            </div>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="gap-2">
            Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <section className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4">
            <span className="text-sm font-semibold text-accent">Zero Learning Curve Platform</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            Digitalisasi UMKM Budaya dengan{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Asisten AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform terintegrasi untuk mencatat transaksi, membangun credit scoring, dan menghubungkan UMKM dengan akses permodalan
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
              Masuk Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Zap,
              title: "WhatsApp Integration",
              description: "Pencatatan transaksi via chat - tanpa aplikasi baru",
              gradient: "from-primary to-accent",
            },
            {
              icon: Users,
              title: "Credit Scoring",
              description: "Dashboard real-time untuk monitoring kelayakan kredit",
              gradient: "from-secondary to-primary",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              description: "Insight bisnis & trend untuk pengambilan keputusan",
              gradient: "from-success to-secondary",
            },
            {
              icon: Webhook,
              title: "n8n Webhooks",
              description: "Integrasi otomatis dengan workflow automation",
              gradient: "from-accent to-warning",
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 relative overflow-hidden group">
                {/* Batik Pattern on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url(${batikPattern4})`,
                    backgroundSize: '150px',
                    backgroundRepeat: 'repeat',
                  }}
                />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="rounded-2xl bg-gradient-primary p-12 text-center shadow-elevated">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Siap Transformasi Digital?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ratusan UMKM budaya yang sudah naik kelas dari unbankable menjadi bankable
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/dashboard")} className="gap-2">
            Akses Dashboard Sekarang
            <ArrowRight className="w-5 h-5" />
          </Button>
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Lokakarya Connect - Lokananta AI Team</p>
          <p className="mt-2">Kompetisi Inovasi Digital Budaya Indonesia - BUDAYA GO! 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
