import { Transaction } from '@/types/transaction';

export const mockTransactions: Record<string, Transaction[]> = {
  'UMK001': [
    { id: '1', umkm_id: 'UMK001', date: '2026-01-04', description: 'Penjualan Kain Tenun', category: 'Pemasukan', amount: 2500000, balance: 15000000 },
    { id: '2', umkm_id: 'UMK001', date: '2026-01-03', description: 'Penjualan Selendang', category: 'Pemasukan', amount: 1200000, balance: 12500000 },
    { id: '3', umkm_id: 'UMK001', date: '2026-01-02', description: 'Pembelian Benang', category: 'Pengeluaran', amount: -500000, balance: 11300000 },
    { id: '4', umkm_id: 'UMK001', date: '2026-01-01', description: 'Penjualan Kain Adat', category: 'Pemasukan', amount: 3500000, balance: 11800000 },
    { id: '5', umkm_id: 'UMK001', date: '2025-12-30', description: 'Pembayaran Listrik', category: 'Pengeluaran', amount: -350000, balance: 8300000 },
  ],
};

export const getMockTransactions = (umkmId: string): Transaction[] => {
  return mockTransactions[umkmId] || [];
};
