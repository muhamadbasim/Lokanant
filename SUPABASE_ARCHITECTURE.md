# Supabase Architecture - Data Flow

## Arsitektur Integrasi

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           UMKMDetail.tsx (Page Component)                  │ │
│  │                                                             │ │
│  │  - Routes: /dashboard/umkm/:id                            │ │
│  │  - Manages tabs navigation                                 │ │
│  │  - Passes umkmId to child components                       │ │
│  └───────────────────────┬────────────────────────────────────┘ │
│                          │                                       │
│                          ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │       TransactionTable.tsx (Feature Component)             │ │
│  │                                                             │ │
│  │  Props: { umkmId: string }                                │ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │  UI States:                                          │  │ │
│  │  │  • Loading → Skeleton                               │  │ │
│  │  │  • Error → Error Message + Retry                    │  │ │
│  │  │  • Empty → "Belum ada transaksi"                   │  │ │
│  │  │  • Success → Table with data                        │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  └───────────────────────┬────────────────────────────────────┘ │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             │ Calls hooks with umkmId
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    CUSTOM HOOKS LAYER                            │
│             (src/hooks/use-transactions.ts)                      │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  useTransactions({ umkmId, ...filters })                │   │
│  │  • Fetches transaction list                              │   │
│  │  • Returns: { data, isLoading, error, refetch }         │   │
│  │  • Cache: 5 minutes (TanStack Query)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  useTransactionStats(umkmId)                             │   │
│  │  • Calculates statistics                                 │   │
│  │  • Returns: { totalIncome, totalExpense, netProfit }    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  useAddTransaction()                                      │   │
│  │  • Mutation hook untuk tambah data                       │   │
│  │  • Auto-invalidate cache after success                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  useUpdateTransaction()                                   │   │
│  │  • Mutation hook untuk update data                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  useDeleteTransaction()                                   │   │
│  │  • Mutation hook untuk hapus data                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Uses Supabase client
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   SUPABASE CLIENT LAYER                          │
│                  (src/lib/supabase.ts)                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  createClient(url, anonKey)                              │   │
│  │  • Singleton Supabase client                             │   │
│  │  • Auto-refresh token                                     │   │
│  │  • Persistent session                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Environment Variables:                                          │
│  • VITE_SUPABASE_URL                                            │
│  • VITE_SUPABASE_ANON_KEY                                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/REST API calls
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    SUPABASE DATABASE                             │
│                   (PostgreSQL + PostgREST)                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Table: public.transactions                              │   │
│  │                                                           │   │
│  │  Columns:                                                 │   │
│  │  • id (UUID, PK)                                         │   │
│  │  • umkm_id (TEXT, indexed)                               │   │
│  │  • date (TIMESTAMPTZ, indexed)                           │   │
│  │  • description (TEXT)                                     │   │
│  │  • category (TEXT, indexed, CHECK constraint)            │   │
│  │  • amount (NUMERIC)                                       │   │
│  │  • balance (NUMERIC)                                      │   │
│  │  • created_at (TIMESTAMPTZ, auto)                        │   │
│  │  • updated_at (TIMESTAMPTZ, auto + trigger)              │   │
│  │                                                           │   │
│  │  RLS: Enabled with policies                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Indexes for Performance:                                        │
│  • idx_transactions_umkm_id → Fast filter by UMKM               │
│  • idx_transactions_date → Fast sorting by date                 │
│  • idx_transactions_category → Fast filter by category          │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow - Read Operation

```
1. User navigates to /dashboard/umkm/UMK001
   ↓
2. UMKMDetail renders, passes umkmId="UMK001" to TransactionTable
   ↓
3. TransactionTable calls useTransactions({ umkmId: "UMK001" })
   ↓
4. TanStack Query checks cache:
   • Cache hit (< 5 min) → Return cached data
   • Cache miss → Proceed to fetch
   ↓
5. useTransactions calls Supabase client:
   supabase
     .from('transactions')
     .select('*')
     .eq('umkm_id', 'UMK001')
     .order('date', { ascending: false })
   ↓
6. Supabase makes REST API call to PostgreSQL:
   GET https://your-project.supabase.co/rest/v1/transactions
   ?umkm_id=eq.UMK001
   &order=date.desc
   ↓
7. PostgreSQL executes query:
   SELECT * FROM transactions 
   WHERE umkm_id = 'UMK001' 
   ORDER BY date DESC;
   ↓
8. Database returns JSON response
   ↓
9. Supabase client parses response
   ↓
10. TanStack Query caches result
   ↓
11. TransactionTable receives data
   ↓
12. Component renders table with transaction rows
```

## Data Flow - Write Operation (Add Transaction)

```
1. User triggers addTransaction({ umkm_id, date, ... })
   ↓
2. useAddTransaction mutation is called
   ↓
3. Mutation function calls Supabase:
   supabase
     .from('transactions')
     .insert([{ umkm_id, date, ... }])
     .select()
   ↓
4. Supabase makes REST API call:
   POST https://your-project.supabase.co/rest/v1/transactions
   Body: { umkm_id, date, description, ... }
   ↓
5. PostgreSQL executes INSERT:
   INSERT INTO transactions (umkm_id, date, ...)
   VALUES ('UMK001', '2025-01-20', ...)
   RETURNING *;
   ↓
6. Trigger fires: set created_at, updated_at
   ↓
7. Database returns inserted row
   ↓
8. useAddTransaction onSuccess callback:
   • Invalidates ['transactions'] cache
   • Shows success toast
   ↓
9. TanStack Query refetches data automatically
   ↓
10. UI updates with new transaction
```

## Type Safety Flow

```
┌──────────────────────────────────────────────────────┐
│  Database Schema (PostgreSQL)                        │
│  • Actual table structure                           │
└─────────────────────┬────────────────────────────────┘
                      │
                      │ Mirrored in TypeScript
                      ▼
┌──────────────────────────────────────────────────────┐
│  src/types/database.ts                               │
│  • Database type definitions                         │
│  • Auto-generated or manually synced                 │
│                                                      │
│  export interface Database {                         │
│    public: {                                         │
│      Tables: {                                       │
│        transactions: {                               │
│          Row: { id, umkm_id, date, ... }            │
│          Insert: { ... }                             │
│          Update: { ... }                             │
│        }                                             │
│      }                                               │
│    }                                                 │
│  }                                                   │
└─────────────────────┬────────────────────────────────┘
                      │
                      │ Used by
                      ▼
┌──────────────────────────────────────────────────────┐
│  src/types/transaction.ts                            │
│  • Application types                                 │
│  • Extends/simplifies database types                 │
│                                                      │
│  export interface Transaction {                      │
│    id: string;                                       │
│    umkm_id: string;                                  │
│    date: string;                                     │
│    ...                                               │
│  }                                                   │
└─────────────────────┬────────────────────────────────┘
                      │
                      │ Used by
                      ▼
┌──────────────────────────────────────────────────────┐
│  src/hooks/use-transactions.ts                       │
│  • Typed hooks with Transaction interface            │
│  • Type-safe Supabase queries                        │
└─────────────────────┬────────────────────────────────┘
                      │
                      │ Used by
                      ▼
┌──────────────────────────────────────────────────────┐
│  src/components/umkm-detail/TransactionTable.tsx     │
│  • Type-safe props and state                         │
│  • Compile-time error checking                       │
└──────────────────────────────────────────────────────┘
```

## Caching Strategy (TanStack Query)

```
Query Key Structure:
┌─────────────────────────────────────────┐
│ ['transactions', filters]               │
│                                         │
│ Examples:                               │
│ • ['transactions', { umkmId: 'UMK001' }]│
│ • ['transactions', { umkmId: 'UMK001',  │
│    category: 'Pemasukan' }]             │
│ • ['transaction-stats', 'UMK001']       │
└─────────────────────────────────────────┘

Cache Behavior:
┌─────────────┬──────────────┬─────────────┐
│ Action      │ Cache Effect │ Result      │
├─────────────┼──────────────┼─────────────┤
│ Query       │ Store 5 min  │ Fast reads  │
│ Mutation    │ Invalidate   │ Auto-refetch│
│ Manual      │ Refetch      │ Fresh data  │
│ Refresh     │              │             │
└─────────────┴──────────────┴─────────────┘

Stale Time: 5 minutes
• Data considered fresh for 5 min
• No refetch during this period
• Background refetch after 5 min

Invalidation:
• Add transaction → Invalidate all transaction queries
• Update transaction → Invalidate all transaction queries
• Delete transaction → Invalidate all transaction queries
```

## Security Flow (Row Level Security)

```
┌──────────────────────────────────────────────────────┐
│  Client Request                                      │
│  • Includes Supabase anon key in header             │
│  • May include auth token (if authenticated)         │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│  Supabase API Gateway                                │
│  • Validates API key                                 │
│  • Verifies JWT token (if present)                   │
│  • Sets PostgreSQL role                              │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│  PostgreSQL RLS Policies                             │
│                                                      │
│  Current Policy:                                     │
│  "Allow all operations for authenticated users"      │
│                                                      │
│  CREATE POLICY "..."                                 │
│    ON public.transactions                            │
│    FOR ALL                                           │
│    USING (true)                                      │
│    WITH CHECK (true);                                │
│                                                      │
│  ⚠️  Default: Allow all (adjust as needed!)         │
└─────────────────────┬────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────┐
│  Query Execution                                     │
│  • If policy passes → Execute query                  │
│  • If policy fails → Return empty/error              │
└──────────────────────────────────────────────────────┘

Recommended RLS Policies:
┌──────────────────────────────────────────────────────┐
│ Read (SELECT):                                       │
│ • Public: Anyone can view                           │
│ • OR: Only authenticated users                       │
│ • OR: Only owner/admin                               │
│                                                      │
│ Write (INSERT/UPDATE/DELETE):                        │
│ • Authenticated users only                           │
│ • OR: Admin role only                                │
│ • OR: Owner of UMKM only                             │
└──────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
Error Sources:
┌────────────────────────────────────────┐
│ 1. Network Error                       │
│    • No internet                       │
│    • Timeout                           │
│    • DNS failure                       │
│                                        │
│ 2. Authentication Error                │
│    • Invalid credentials               │
│    • Expired token                     │
│                                        │
│ 3. Database Error                      │
│    • RLS policy denial                 │
│    • Constraint violation              │
│    • Invalid query                     │
│                                        │
│ 4. Application Error                   │
│    • Invalid data format               │
│    • Type mismatch                     │
└────────────────┬───────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│ useTransactions Hook                   │
│ • Catches error in queryFn             │
│ • TanStack Query sets error state      │
└────────────────┬───────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│ TransactionTable Component             │
│ • if (isError) → Show error UI         │
│ • Display error message                │
│ • Provide retry button                 │
└────────────────┬───────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────┐
│ User Action                            │
│ • Click "Coba Lagi" button            │
│ • Triggers refetch()                   │
└────────────────────────────────────────┘

Mutation Errors:
Add/Update/Delete → onError callback → Toast notification
```

## Performance Optimizations

```
Database Level:
├─ Indexes on frequently queried columns
│  ├─ umkm_id (most common filter)
│  ├─ date (for sorting)
│  └─ category (for filtering)
│
├─ Connection pooling (built-in Supabase)
└─ Query optimization (avoid N+1)

Application Level:
├─ TanStack Query caching (5 min stale time)
├─ Retry logic (2 retries on failure)
├─ Pagination (limit query results)
└─ Optimistic updates (future improvement)

UI Level:
├─ Skeleton loading states
├─ Debounced search (future improvement)
├─ Virtual scrolling for large lists (future)
└─ Lazy loading tabs
```

## Summary

**Architecture Highlights:**
✅ Clean separation of concerns (UI → Hooks → Client → Database)
✅ Type-safe end-to-end with TypeScript
✅ Efficient caching with TanStack Query
✅ Robust error handling
✅ Optimized database queries with indexes
✅ Secure with RLS policies
✅ Scalable for future features

**Tech Stack:**
- **Frontend**: React + TypeScript + Tailwind CSS
- **State Management**: TanStack Query
- **Backend**: Supabase (PostgreSQL + PostgREST)
- **Type Safety**: TypeScript + Database types
- **Caching**: TanStack Query (5 min stale time)
- **Security**: RLS policies + API keys

**Ready for Production?**
- ✅ Development: Yes
- ⚠️  Production: Adjust RLS policies first!
- ⚠️  Production: Set up proper authentication
- ⚠️  Production: Configure environment variables securely
