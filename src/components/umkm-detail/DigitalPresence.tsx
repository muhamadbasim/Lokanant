import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Eye, MousePointerClick, TrendingUp, Share2, QrCode } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface DigitalPresenceProps {
  umkm: UMKMDetailed;
}

export const DigitalPresence = ({ umkm }: DigitalPresenceProps) => {
  return (
    <div className="space-y-6">
      {umkm.websiteUrl && (
        <Card className="p-6 shadow-card bg-card border border-border">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Website Auto-Generated
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-muted rounded-lg p-4 mb-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Website Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">{umkm.websiteUrl}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Website
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </div>

            {umkm.websiteStats && (
              <div className="space-y-4">
                <Card className="p-4 bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Total Kunjungan</p>
                  <p className="text-2xl font-bold text-foreground">{umkm.websiteStats.visits.toLocaleString()}</p>
                </Card>

                <Card className="p-4 bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointerClick className="w-5 h-5 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  <p className="text-2xl font-bold text-success">{umkm.websiteStats.engagement}%</p>
                </Card>

                <Card className="p-4 bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-warning">{umkm.websiteStats.conversionRate}%</p>
                </Card>
              </div>
            )}
          </div>
        </Card>
      )}

      {umkm.socialMedia && umkm.socialMedia.length > 0 && (
        <Card className="p-6 shadow-card bg-card border border-border">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Integrasi Media Sosial
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {umkm.socialMedia.map((social, index) => (
              <Card key={index} className="p-5 bg-card border border-border hover:shadow-card transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{social.platform}</h4>
                  <Button size="sm" variant="outline">Lihat</Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Followers</p>
                  <p className="text-2xl font-bold text-primary">{social.followers.toLocaleString()}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate">{social.url}</p>
              </Card>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 shadow-card bg-gradient-primary text-white">
        <h3 className="text-xl font-bold mb-2">Tingkatkan Presence Digital Anda</h3>
        <p className="text-sm opacity-90 mb-4">
          Manfaatkan fitur auto-website generation dan integrasi marketplace untuk menjangkau lebih banyak pelanggan
        </p>
        <Button variant="secondary">
          <Globe className="w-4 h-4 mr-2" />
          Aktifkan Fitur Premium
        </Button>
      </Card>
    </div>
  );
};
