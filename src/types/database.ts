// Database Types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string
          umkm_id: string
          date: string
          description: string
          category: 'Pemasukan' | 'Pengeluaran'
          amount: number
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          umkm_id: string
          date: string
          description: string
          category: 'Pemasukan' | 'Pengeluaran'
          amount: number
          balance: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          umkm_id?: string
          date?: string
          description?: string
          category?: 'Pemasukan' | 'Pengeluaran'
          amount?: number
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
