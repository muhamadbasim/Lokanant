-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    umkm_id TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Pemasukan', 'Pengeluaran')),
    amount NUMERIC NOT NULL,
    balance NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_umkm_id ON public.transactions(umkm_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON public.transactions(category);

-- Enable Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Adjust this based on your authentication requirements
CREATE POLICY "Allow all operations for authenticated users"
    ON public.transactions
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data (optional)
INSERT INTO public.transactions (umkm_id, date, description, category, amount, balance) VALUES
    ('UMK001', '2025-01-15', 'Paket Tur Keluarga (4 orang)', 'Pemasukan', 2500000, 15000000),
    ('UMK001', '2025-01-14', 'Gaji Karyawan Jan 2025', 'Pengeluaran', -6000000, 12500000),
    ('UMK001', '2025-01-12', 'Homestay 3 malam', 'Pemasukan', 1800000, 18500000),
    ('UMK001', '2025-01-10', 'Pembelian Bahan Makanan', 'Pengeluaran', -1200000, 16700000),
    ('UMK001', '2025-01-08', 'Paket Fotografi Budaya', 'Pemasukan', 3200000, 17900000);
