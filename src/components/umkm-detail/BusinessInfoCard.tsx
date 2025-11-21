import { Card } from "@/components/ui/card";
import { Building2, Calendar, Users, Phone, Mail, FileText } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface BusinessInfoCardProps {
  umkm: UMKMDetailed;
}

export const BusinessInfoCard = ({ umkm }: BusinessInfoCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="p-6 shadow-card bg-card border border-border">
      <h3 className="text-xl font-bold text-foreground mb-4">Informasi Bisnis</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Deskripsi</p>
            <p className="text-sm text-foreground">{umkm.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Tahun Berdiri</p>
            <p className="text-sm font-semibold text-foreground">{formatDate(umkm.established)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Jumlah Karyawan</p>
            <p className="text-sm font-semibold text-foreground">{umkm.employees} orang</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Nomor Telepon</p>
            <p className="text-sm font-semibold text-foreground">{umkm.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-semibold text-foreground">{umkm.email}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Dokumen Legalitas</p>
              <div className="space-y-1">
                <p className="text-sm text-foreground"><span className="font-semibold">NIB:</span> {umkm.legalDocs.nib}</p>
                <p className="text-sm text-foreground"><span className="font-semibold">NPWP:</span> {umkm.legalDocs.npwp}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
