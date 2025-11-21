import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CreditStatus = "hijau" | "kuning" | "merah";

interface UMKM {
  id: string;
  name: string;
  category: string;
  location: string;
  revenue: string;
  creditScore: number;
  status: CreditStatus;
}

const dummyData: UMKM[] = [
  { id: "UMK001", name: "Tongkonan Aya", category: "Pariwisata", location: "Toraja", revenue: "Rp 15.000.000", creditScore: 850, status: "hijau" },
  { id: "UMK002", name: "Tenun Ibu Sari", category: "Kriya", location: "Toraja", revenue: "Rp 8.500.000", creditScore: 720, status: "kuning" },
  { id: "UMK003", name: "Batik Mas Agung", category: "Kriya", location: "Yogyakarta", revenue: "Rp 22.000.000", creditScore: 890, status: "hijau" },
  { id: "UMK004", name: "Kuliner Bu Tini", category: "Kuliner", location: "Solo", revenue: "Rp 5.200.000", creditScore: 650, status: "kuning" },
  { id: "UMK005", name: "Ukir Kayu Pak Budi", category: "Kriya", location: "Bali", revenue: "Rp 18.500.000", creditScore: 820, status: "hijau" },
];

const getStatusBadge = (status: CreditStatus) => {
  const variants = {
    hijau: { label: "Hijau - Bankable", className: "bg-success text-success-foreground" },
    kuning: { label: "Kuning - Fluktuatif", className: "bg-warning text-warning-foreground" },
    merah: { label: "Merah - Berisiko", className: "bg-destructive text-destructive-foreground" },
  };
  
  const { label, className } = variants[status];
  return <Badge className={className}>{label}</Badge>;
};

export const UMKMTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = dummyData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Database UMKM Kedaerahan</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitoring & Credit Scoring Real-time</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari UMKM, kategori, atau lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>ID</TableHead>
                <TableHead>Nama UMKM</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Omzet (Bulan Ini)</TableHead>
                <TableHead>Credit Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((umkm) => (
                <TableRow key={umkm.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/umkm/${umkm.id}`)}>
                  <TableCell className="font-mono text-sm">{umkm.id}</TableCell>
                  <TableCell className="font-semibold text-primary hover:underline">{umkm.name}</TableCell>
                  <TableCell>{umkm.category}</TableCell>
                  <TableCell>{umkm.location}</TableCell>
                  <TableCell className="font-semibold text-success">{umkm.revenue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{umkm.creditScore}</span>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full"
                          style={{ width: `${(umkm.creditScore / 1000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(umkm.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
