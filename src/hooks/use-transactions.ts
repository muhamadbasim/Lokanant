import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Transaction, TransactionFilters } from '@/types/transaction';
import { useToast } from '@/hooks/use-toast';
import { getMockTransactions } from '@/data/mockTransactionData';

// Fetch transactions from Supabase
export const useTransactions = (filters?: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      // Apply filters
      if (filters?.umkmId) {
        query = query.eq('umkm_id', filters.umkmId);
      }

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('date', filters.endDate);
      }

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        // Fallback to mock data when Supabase fails
        console.warn('Using mock data - Supabase fetch failed:', error.message);
        return getMockTransactions(filters?.umkmId || '');
      }

      return data as Transaction[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

// Add new transaction
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('transactions')
        // @ts-ignore
        .insert([transaction])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to add transaction: ${error.message}`);
      }

      return data as Transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast({
        title: 'Berhasil',
        description: 'Transaksi berhasil ditambahkan',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

// Update transaction
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Transaction> & { id: string }) => {
      const { data, error } = await supabase
        .from('transactions')
        // @ts-ignore
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update transaction: ${error.message}`);
      }

      return data as Transaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast({
        title: 'Berhasil',
        description: 'Transaksi berhasil diupdate',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

// Delete transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete transaction: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast({
        title: 'Berhasil',
        description: 'Transaksi berhasil dihapus',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

// Get transaction statistics
export const useTransactionStats = (umkmId: string) => {
  return useQuery({
    queryKey: ['transaction-stats', umkmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('category, amount')
        .eq('umkm_id', umkmId);

      if (error) {
        // Fallback to mock data when Supabase fails
        console.warn('Using mock stats from mock data - Supabase fetch failed:', error.message);
        const mockData = getMockTransactions(umkmId);
        const mockIncome = mockData.filter(t => t.category === 'Pemasukan').reduce((sum, t) => sum + t.amount, 0);
        const mockExpense = Math.abs(mockData.filter(t => t.category === 'Pengeluaran').reduce((sum, t) => sum + t.amount, 0));
        return {
          totalIncome: mockIncome,
          totalExpense: mockExpense,
          netProfit: mockIncome - mockExpense,
          transactionCount: mockData.length,
        };
      }

      const transactions = data as Transaction[];

      const totalIncome = transactions
        .filter(t => t.category === 'Pemasukan')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpense = Math.abs(
        transactions
          .filter(t => t.category === 'Pengeluaran')
          .reduce((sum, t) => sum + t.amount, 0)
      );

      const netProfit = totalIncome - totalExpense;

      return {
        totalIncome,
        totalExpense,
        netProfit,
        transactionCount: transactions.length,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
