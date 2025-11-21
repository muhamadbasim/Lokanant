import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import batikPattern5 from "@/assets/batik-pattern-5.png";

export const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-card relative overflow-hidden">
      {/* Batik Pattern Accent */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-64 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern5})`,
          backgroundSize: '100px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${batikPattern5})`,
                backgroundSize: 'cover',
              }}
            />
            <div className="relative w-10 h-10 bg-gradient-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">LC</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Lokakarya Connect</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
