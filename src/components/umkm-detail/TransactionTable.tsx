import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ArrowUpCircle, ArrowDownCircle, RefreshCw, Plus } from "lucide-react";
import { useTransactions, useTransactionStats } from "@/hooks/use-transactions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionForm } from "./TransactionForm";

interface TransactionTableProps {
  umkmId: string;
}

export const TransactionTable = ({ umkmId }: TransactionTableProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch transactions from Supabase
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch
  } = useTransactions({ umkmId });

  // Fetch transaction statistics
  const {
    data: stats,
    isLoading: isLoadingStats,
    refetch: refetchStats
  } = useTransactionStats(umkmId);

  const totalIncome = stats?.totalIncome || 0;
  const totalExpense = stats?.totalExpense || 0;
  const netProfit = stats?.netProfit || 0;

  // Get last balance from the most recent transaction (first in list)
  const lastBalance = transactions && transactions.length > 0 ? transactions[0].balance : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleExport = () => {
    if (!transactions || transactions.length === 0) {
      toast({
        title: 'Tidak ada data',
        description: 'Tidak ada transaksi untuk diekspor',
        variant: 'destructive',
      });
      return;
    }

    // Export logic can be implemented here
    toast({
      title: 'Coming Soon',
      description: 'Fitur export akan segera hadir',
    });
  };

  const handleRefresh = () => {
    refetch();
    refetchStats();
    toast({
      title: 'Memuat ulang...',
      description: 'Data transaksi sedang dimuat ulang',
    });
  };

  // Error state
  if (isError) {
    return (
      <Card className="p-6 shadow-card bg-card border border-border">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-destructive text-lg font-semibold mb-2">
            Gagal memuat data transaksi
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {error?.message || 'Terjadi kesalahan saat memuat data'}
          </p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-card bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Riwayat Transaksi</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? 'Memuat data...' : `${transactions?.length || 0} transaksi`}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Transaksi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah Transaksi Baru</DialogTitle>
                <DialogDescription>
                  Masukkan detail transaksi pemasukan atau pengeluaran.
                </DialogDescription>
              </DialogHeader>
              <TransactionForm
                umkmId={umkmId}
                lastBalance={lastBalance}
                onSuccess={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isLoading}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-success/10 border border-success/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pemasukan</p>
              {isLoadingStats ? (
                <Skeleton className="h-7 w-32 mt-1" />
              ) : (
                <p className="text-xl font-bold text-success">
                  Rp {totalIncome.toLocaleString('id-ID')}
                </p>
              )}
            </div>
            <ArrowUpCircle className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-4 bg-destructive/10 border border-destructive/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
              {isLoadingStats ? (
                <Skeleton className="h-7 w-32 mt-1" />
              ) : (
                <p className="text-xl font-bold text-destructive">
                  Rp {totalExpense.toLocaleString('id-ID')}
                </p>
              )}
            </div>
            <ArrowDownCircle className="w-8 h-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4 bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              {isLoadingStats ? (
                <Skeleton className="h-7 w-32 mt-1" />
              ) : (
                <p className="text-xl font-bold text-primary">
                  Rp {netProfit.toLocaleString('id-ID')}
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Tanggal</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Jumlah</TableHead>
              <TableHead className="text-right">Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 ml-auto" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : transactions && transactions.length > 0 ? (
              // Transaction rows
              transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-sm">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    {transaction.category === "Pemasukan" ? (
                      <Badge className="bg-success text-success-foreground">Pemasukan</Badge>
                    ) : (
                      <Badge className="bg-destructive text-destructive-foreground">Pengeluaran</Badge>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.amount >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {transaction.amount >= 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    Rp {transaction.balance.toLocaleString('id-ID')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Empty state
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <p className="text-muted-foreground">Belum ada transaksi untuk UMKM ini</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
