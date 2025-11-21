# Setup Supabase untuk TransactionTable

Panduan lengkap untuk mengintegrasikan Supabase dengan TransactionTable di Lokakarya Bridge Flow.

## Prerequisites

1. Akun Supabase (gratis di [supabase.com](https://supabase.com))
2. Project Supabase yang sudah dibuat
3. Node.js dan npm terinstall

## Langkah 1: Install Dependencies

Dependencies sudah terinstall. Jika belum, jalankan:

```bash
npm install @supabase/supabase-js
```

## Langkah 2: Setup Environment Variables

1. Copy file `.env.example` menjadi `.env.local`:

```bash
copy .env.example .env.local
```

2. Buka Supabase Dashboard:
   - Kunjungi [app.supabase.com](https://app.supabase.com)
   - Pilih project Anda
   - Buka **Settings** → **API**

3. Copy credentials ke `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **PENTING**: Jangan commit file `.env.local` ke git! File ini sudah ada di `.gitignore`.

## Langkah 3: Setup Database

### Opsi A: Menggunakan SQL Editor (Recommended)

1. Buka Supabase Dashboard → **SQL Editor**
2. Copy isi file `supabase/migrations/001_create_transactions_table.sql`
3. Paste ke SQL Editor dan klik **Run**

### Opsi B: Menggunakan Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login ke Supabase
supabase login

# Link project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

## Langkah 4: Verifikasi Setup

### 4.1 Cek Tabel di Database

1. Buka Supabase Dashboard → **Table Editor**
2. Pastikan tabel `transactions` sudah ada
3. Cek sample data yang sudah diinsert

### 4.2 Test di Aplikasi

1. Jalankan development server:

```bash
npm run dev
```

2. Buka browser dan navigasi ke halaman UMKM Detail
3. TransactionTable harus menampilkan data dari Supabase

## Struktur Database

### Tabel: `transactions`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `umkm_id` | TEXT | ID dari UMKM (misalnya: "UMK001") |
| `date` | TIMESTAMPTZ | Tanggal transaksi |
| `description` | TEXT | Deskripsi transaksi |
| `category` | TEXT | "Pemasukan" atau "Pengeluaran" |
| `amount` | NUMERIC | Jumlah transaksi (positif untuk pemasukan, negatif untuk pengeluaran) |
| `balance` | NUMERIC | Saldo setelah transaksi |
| `created_at` | TIMESTAMPTZ | Timestamp dibuat |
| `updated_at` | TIMESTAMPTZ | Timestamp terakhir diupdate |

### Indexes

- `idx_transactions_umkm_id` - Index pada `umkm_id` untuk query cepat
- `idx_transactions_date` - Index pada `date` (descending) untuk sorting
- `idx_transactions_category` - Index pada `category` untuk filtering

### Row Level Security (RLS)

Tabel menggunakan RLS dengan policy default yang mengizinkan semua operasi untuk authenticated users. **Sesuaikan policy ini sesuai kebutuhan keamanan Anda!**

## Penggunaan Komponen

### Cara Menggunakan TransactionTable

```tsx
import { TransactionTable } from "@/components/umkm-detail/TransactionTable";

// Di dalam komponen
<TransactionTable umkmId="UMK001" />
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `umkmId` | string | Yes | ID UMKM untuk filter transaksi |

### Features

- ✅ Real-time data dari Supabase
- ✅ Loading skeleton saat fetch
- ✅ Error handling dengan retry
- ✅ Auto-refresh button
- ✅ Statistics (Total Pemasukan, Pengeluaran, Net Profit)
- ✅ Empty state handling
- ✅ Toast notifications

## Custom Hooks Available

### `useTransactions(filters)`

Fetch transaksi dengan optional filters:

```tsx
const { data, isLoading, error, refetch } = useTransactions({
  umkmId: 'UMK001',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  category: 'Pemasukan',
  limit: 100
});
```

### `useTransactionStats(umkmId)`

Fetch statistik transaksi:

```tsx
const { data: stats } = useTransactionStats('UMK001');
// Returns: { totalIncome, totalExpense, netProfit, transactionCount }
```

### `useAddTransaction()`

Tambah transaksi baru:

```tsx
const { mutate: addTransaction } = useAddTransaction();

addTransaction({
  umkm_id: 'UMK001',
  date: '2025-01-20',
  description: 'Penjualan Produk',
  category: 'Pemasukan',
  amount: 500000,
  balance: 16000000
});
```

### `useUpdateTransaction()`

Update transaksi:

```tsx
const { mutate: updateTransaction } = useUpdateTransaction();

updateTransaction({
  id: 'transaction-uuid',
  description: 'Penjualan Produk (Updated)',
  amount: 550000
});
```

### `useDeleteTransaction()`

Hapus transaksi:

```tsx
const { mutate: deleteTransaction } = useDeleteTransaction();

deleteTransaction('transaction-uuid');
```

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Solusi**: Pastikan file `.env.local` sudah dibuat dan berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.

### Error: "Failed to fetch transactions"

**Solusi**:
1. Cek koneksi internet
2. Verifikasi credentials di `.env.local`
3. Pastikan tabel `transactions` sudah dibuat di Supabase
4. Cek RLS policy di Supabase

### Data tidak muncul

**Solusi**:
1. Buka Network tab di Developer Tools
2. Cek request ke Supabase API
3. Verifikasi `umkmId` yang dikirim sesuai dengan data di database
4. Cek console untuk error messages

### RLS Error / Permission Denied

**Solusi**:
1. Nonaktifkan RLS sementara untuk testing:
   ```sql
   ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
   ```
2. Atau sesuaikan policy sesuai auth system Anda

## Next Steps

1. **Authentication**: Integrasikan Supabase Auth untuk user management
2. **Real-time**: Gunakan Supabase Realtime untuk live updates
3. **Export**: Implementasi export ke Excel menggunakan library seperti `xlsx`
4. **Pagination**: Tambahkan pagination untuk data yang banyak
5. **Filtering**: Tambahkan filter UI (date range, category, search)

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Project AGENTS.md](./AGENTS.md) - Project guidelines

## Support

Jika ada masalah, cek:
1. Supabase Dashboard → **Logs** untuk database errors
2. Browser Console untuk client errors
3. Network tab untuk API request/response

---

**Created by**: Droid AI Assistant  
**Last Updated**: 2025-01-18
