// Transaction types aligned with database schema
export interface Transaction {
  id: string;
  umkm_id: string;
  date: string;
  description: string;
  category: "Pemasukan" | "Pengeluaran";
  amount: number;
  balance: number;
  created_at?: string;
  updated_at?: string;
}

export interface TransactionFilters {
  umkmId?: string;
  startDate?: string;
  endDate?: string;
  category?: 'Pemasukan' | 'Pengeluaran';
  limit?: number;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  transactionCount: number;
}
