# 🚀 Quick Start Guide - Supabase Integration

## 5 Menit Setup

### 1️⃣ Buat Project Supabase (2 menit)

1. Buka [supabase.com](https://supabase.com) → Sign up/Login
2. Click **"New Project"**
3. Isi:
   - Name: `lokananta-umkm`
   - Database Password: (ASDQWE1!)
   - Region: `Southeast Asia (Singapore)`
4. Click **"Create new project"**
5. Tunggu ~2 menit hingga selesai

### 2️⃣ Setup Environment Variables (1 menit)

```bash
# Copy template
copy .env.example .env.local
```

**Ambil credentials:**
1. Di Supabase Dashboard → **Settings** → **API**
2. Copy **Project URL** → paste ke `.env.local` sebagai `VITE_SUPABASE_URL`
3. Copy **anon/public key** → paste ke `.env.local` sebagai `VITE_SUPABASE_ANON_KEY`

**File `.env.local` Anda:**
```env
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3️⃣ Setup Database (2 menit)

1. Di Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Copy seluruh isi file: `supabase/migrations/001_create_transactions_table.sql`
4. Paste ke SQL Editor
5. Click **"Run"** (atau tekan F5)
6. ✅ Lihat "Success" message

**Verifikasi:**
- Buka **Table Editor** → Lihat tabel `transactions`
- Klik tabel → Lihat 5 sample data sudah ada

### 4️⃣ Test Aplikasi

```bash
npm run dev
```

1. Buka `http://localhost:8080`
2. Click **"Dashboard"**
3. Click salah satu UMKM (contoh: Tongkonan Aya)
4. Click tab **"Transaksi"**
5. ✅ Data muncul dari Supabase!

---

## 📋 Checklist

Setup berhasil jika:

- [ ] Project Supabase sudah dibuat
- [ ] File `.env.local` sudah ada dan berisi credentials
- [ ] Tabel `transactions` sudah dibuat (cek di Table Editor)
- [ ] Sample data (5 transaksi) sudah ada di database
- [ ] Aplikasi berjalan di `http://localhost:8080`
- [ ] TransactionTable menampilkan data dari Supabase
- [ ] Statistics cards menampilkan angka yang benar
- [ ] Refresh button berfungsi

---

## 🎯 Testing Checklist

### Test 1: Basic Load
- [ ] Buka halaman UMKM Detail
- [ ] Tab "Transaksi" → Data muncul
- [ ] Loading skeleton tampil sebelum data muncul
- [ ] 5 transaksi sample ditampilkan

### Test 2: Statistics
- [ ] Total Pemasukan = Rp 7.500.000 (green)
- [ ] Total Pengeluaran = Rp 7.200.000 (red)
- [ ] Net Profit = Rp 300.000 (blue)

### Test 3: Refresh
- [ ] Click refresh button
- [ ] Icon berputar (loading)
- [ ] Data di-reload ulang
- [ ] Toast notification muncul

### Test 4: Error Handling
Untuk test error:
1. Matikan internet / Stop Supabase project
2. Reload halaman
3. [ ] Error message muncul
4. [ ] Button "Coba Lagi" tampil
5. Hidupkan internet / Start Supabase
6. Click "Coba Lagi"
7. [ ] Data berhasil dimuat

---

## 🔧 Common Issues & Fixes

### Issue: "Missing Supabase environment variables"
```
❌ Error: Missing Supabase environment variables
```
**Fix:**
```bash
# Pastikan file .env.local ada
dir .env.local

# Jika tidak ada, copy dari template
copy .env.example .env.local

# Edit dengan credentials Anda
notepad .env.local
```

### Issue: "Failed to fetch transactions"
```
❌ Error: Failed to fetch transactions: ...
```
**Fix:**
1. Cek internet connection
2. Cek Supabase Dashboard → Project masih running?
3. Verifikasi credentials di `.env.local` benar
4. Pastikan tabel `transactions` sudah dibuat

### Issue: Data tidak muncul (empty)
```
✅ No error, tapi "Belum ada transaksi untuk UMKM ini"
```
**Fix:**
1. Buka Supabase → **Table Editor** → `transactions`
2. Cek apakah ada data dengan `umkm_id = 'UMK001'`
3. Jika tidak ada, run SQL migration lagi (Step 3)

### Issue: RLS Error (Permission Denied)
```
❌ Error: new row violates row-level security policy
```
**Fix:**
```sql
-- Sementara disable RLS untuk testing
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
```

**Atau sesuaikan policy:**
```sql
-- Allow all untuk testing
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.transactions;

CREATE POLICY "Allow all for testing"
  ON public.transactions
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## 📊 Sample Data

Default sample data (5 transaksi untuk UMK001):

| Date | Description | Category | Amount |
|------|-------------|----------|--------|
| 2025-01-15 | Paket Tur Keluarga (4 orang) | Pemasukan | +Rp 2.500.000 |
| 2025-01-14 | Gaji Karyawan Jan 2025 | Pengeluaran | -Rp 6.000.000 |
| 2025-01-12 | Homestay 3 malam | Pemasukan | +Rp 1.800.000 |
| 2025-01-10 | Pembelian Bahan Makanan | Pengeluaran | -Rp 1.200.000 |
| 2025-01-08 | Paket Fotografi Budaya | Pemasukan | +Rp 3.200.000 |

**Total Pemasukan:** Rp 7.500.000  
**Total Pengeluaran:** Rp 7.200.000  
**Net Profit:** Rp 300.000

---

## 🎨 UI States Preview

### Loading State
```
┌─────────────────────────────────────┐
│ Riwayat Transaksi                   │
│ Memuat data...                   [↻]│
├─────────────────────────────────────┤
│ [Gray skeleton bars animating...]   │
│ [Gray skeleton bars animating...]   │
│ [Gray skeleton bars animating...]   │
└─────────────────────────────────────┘
```

### Success State
```
┌─────────────────────────────────────┐
│ Riwayat Transaksi                   │
│ 5 transaksi dari Supabase        [↻]│
├─────────────────────────────────────┤
│ [Total Pemasukan] [Total Pengeluar] │
│ [Net Profit]                         │
├─────────────────────────────────────┤
│ Date  │ Desc      │ Category │ Amt  │
│ 01/15 │ Paket Tur │ Pemasuk  │ +2.5M│
│ 01/14 │ Gaji      │ Pengelua │ -6M  │
│ ...                                  │
└─────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────┐
│      Gagal memuat data transaksi    │
│                                     │
│  Failed to fetch: network error     │
│                                     │
│         [Coba Lagi]                 │
└─────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────┐
│ Riwayat Transaksi                   │
│ 0 transaksi dari Supabase        [↻]│
├─────────────────────────────────────┤
│ [Stats all show 0]                  │
├─────────────────────────────────────┤
│                                     │
│   Belum ada transaksi untuk UMKM    │
│            ini                       │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔐 Security Checklist (Sebelum Production)

- [ ] **Environment Variables**: Jangan commit `.env.local` ke git
- [ ] **RLS Policies**: Sesuaikan dengan auth system Anda
- [ ] **API Keys**: Gunakan environment-specific keys (dev vs prod)
- [ ] **Authentication**: Implement Supabase Auth
- [ ] **CORS**: Configure allowed origins di Supabase
- [ ] **Rate Limiting**: Monitor usage di Supabase Dashboard
- [ ] **Backup**: Setup automatic database backups

---

## 📚 Next Steps

### Immediate
1. ✅ Setup selesai
2. Test semua fitur
3. Tambah sample data untuk UMKM lain

### This Week
- [ ] Setup Supabase Auth (user login)
- [ ] Implement pagination (jika data banyak)
- [ ] Add date range filter UI
- [ ] Implement export to Excel

### This Month
- [ ] Integrate WhatsApp for auto-import transactions
- [ ] Real-time updates dengan Supabase Realtime
- [ ] Add transaction categories management
- [ ] Build transaction analytics dashboard

---

## 📖 Documentation

Dokumentasi lengkap tersedia di:
- **Setup Guide**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Architecture**: [SUPABASE_ARCHITECTURE.md](./SUPABASE_ARCHITECTURE.md)
- **Integration Summary**: [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)
- **Project Guidelines**: [AGENTS.md](./AGENTS.md)

---

## 🆘 Need Help?

### Debug Mode
```tsx
// Add to TransactionTable.tsx untuk debugging
console.log('umkmId:', umkmId);
console.log('transactions:', transactions);
console.log('stats:', stats);
console.log('isLoading:', isLoading);
console.log('error:', error);
```

### Check Network
1. Open Browser DevTools (F12)
2. Network tab
3. Filter: `supabase`
4. Lihat request/response

### Check Database
1. Supabase Dashboard → **Table Editor**
2. Click `transactions` table
3. Verify data ada dan `umkm_id` cocok

### Check Logs
1. Supabase Dashboard → **Logs**
2. Filter by: API calls
3. Cari error messages

---

## ✅ Done!

Setup selesai! 🎉

Aplikasi Anda sekarang sudah terintegrasi dengan Supabase dan siap untuk:
- ✅ Real-time data fetching
- ✅ CRUD operations
- ✅ Loading & error states
- ✅ Statistics calculation
- ✅ Type-safe operations

**Total Setup Time:** ~5 minutes  
**Ready for:** Development & Testing

**Selamat mencoba! 🚀**
