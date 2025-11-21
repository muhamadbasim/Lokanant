import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone } from "lucide-react";
import { UMKMDetailed, CreditStatus } from "@/data/umkmDetailedData";
import batikPattern1 from "@/assets/batik-pattern-1.png";

interface UMKMHeaderProps {
  umkm: UMKMDetailed;
}

const getStatusBadge = (status: CreditStatus) => {
  const variants = {
    hijau: { label: "Hijau - Bankable", className: "bg-success text-success-foreground" },
    kuning: { label: "Kuning - Fluktuatif", className: "bg-warning text-warning-foreground" },
    merah: { label: "Merah - Berisiko", className: "bg-destructive text-destructive-foreground" },
  };
  
  const { label, className } = variants[status];
  return <Badge className={className}>{label}</Badge>;
};

export const UMKMHeader = ({ umkm }: UMKMHeaderProps) => {
  return (
    <Card className="p-6 shadow-card relative overflow-hidden">
      {/* Batik Border Pattern */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-16 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern1})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-y',
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-16 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${batikPattern1})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-y',
        }}
      />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
            {umkm.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{umkm.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-muted-foreground">{umkm.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{umkm.location}</span>
              <span className="text-muted-foreground">•</span>
              {getStatusBadge(umkm.status)}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </Card>
  );
};
