export type CreditStatus = "hijau" | "kuning" | "merah";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: "Pemasukan" | "Pengeluaran";
  amount: number;
  balance: number;
}

export interface UMKMDetailed {
  id: string;
  name: string;
  category: string;
  location: string;
  revenue: string;
  creditScore: number;
  status: CreditStatus;

  // Business Info
  established: string;
  phone: string;
  email: string;
  employees: number;
  legalDocs: { nib: string; npwp: string };
  description: string;

  // Financial
  monthlyRevenue: { month: string; revenue: number; expenses: number; profit: number }[];
  expenses: { category: string; amount: number; percentage: number }[];
  transactions: Transaction[];

  // Credit
  creditHistory: { date: string; score: number }[];
  scoreFactors: { factor: string; weight: number; score: number; maxScore: number }[];

  // Learning
  courses: { name: string; progress: number; completed: boolean; certificateUrl?: string }[];

  // Digital
  websiteUrl?: string;
  websiteStats?: { visits: number; engagement: number; conversionRate: number };
  socialMedia?: { platform: string; url: string; followers: number }[];

  // Analytics
  topProducts: { name: string; sales: number; revenue: number }[];
  peakHours: { hour: string; transactions: number }[];
  predictions: { metric: string; current: number; predicted: number; confidence: number }[];

  // Banking
  loanEligibility: { maxAmount: number; interestRate: number; term: number };
  recommendations: { title: string; description: string; provider: string }[];
}

export const umkmDetailedData: UMKMDetailed[] = [
  {
    id: "UMK001",
    name: "Tongkonan Aya",
    category: "Pariwisata",
    location: "Toraja",
    revenue: "Rp 15.000.000",
    creditScore: 850,
    status: "hijau",
    established: "2019-03-15",
    phone: "+62 812-3456-7890",
    email: "tongkonan.aya@gmail.com",
    employees: 8,
    legalDocs: { nib: "1234567890123", npwp: "12.345.678.9-012.000" },
    description: "Wisata budaya Tongkonan dengan homestay dan tur tradisional Toraja",

    monthlyRevenue: [
      { month: "Okt 2024", revenue: 18500000, expenses: 12000000, profit: 6500000 },
      { month: "Nov 2024", revenue: 16200000, expenses: 11500000, profit: 4700000 },
      { month: "Des 2024", revenue: 22000000, expenses: 14000000, profit: 8000000 },
      { month: "Jan 2025", revenue: 15000000, expenses: 10500000, profit: 4500000 },
    ],

    expenses: [
      { category: "Gaji Karyawan", amount: 6000000, percentage: 40 },
      { category: "Operasional", amount: 3500000, percentage: 23 },
      { category: "Pemasaran", amount: 2000000, percentage: 13 },
      { category: "Pemeliharaan", amount: 2500000, percentage: 17 },
      { category: "Lainnya", amount: 1000000, percentage: 7 },
    ],

    transactions: [
      { id: "TRX001", date: "2025-01-15", description: "Paket Tur Keluarga (4 orang)", category: "Pemasukan", amount: 2500000, balance: 15000000 },
      { id: "TRX002", date: "2025-01-14", description: "Gaji Karyawan Jan 2025", category: "Pengeluaran", amount: -6000000, balance: 12500000 },
      { id: "TRX003", date: "2025-01-12", description: "Homestay 3 malam", category: "Pemasukan", amount: 1800000, balance: 18500000 },
      { id: "TRX004", date: "2025-01-10", description: "Pembelian Bahan Makanan", category: "Pengeluaran", amount: -1200000, balance: 16700000 },
      { id: "TRX005", date: "2025-01-08", description: "Paket Fotografi Budaya", category: "Pemasukan", amount: 3200000, balance: 17900000 },
    ],

    creditHistory: [
      { date: "Agu 2024", score: 780 },
      { date: "Sep 2024", score: 800 },
      { date: "Okt 2024", score: 820 },
      { date: "Nov 2024", score: 830 },
      { date: "Des 2024", score: 845 },
      { date: "Jan 2025", score: 850 },
    ],

    scoreFactors: [
      { factor: "Riwayat Pembayaran", weight: 35, score: 95, maxScore: 100 },
      { factor: "Stabilitas Pendapatan", weight: 30, score: 88, maxScore: 100 },
      { factor: "Pertumbuhan Bisnis", weight: 20, score: 82, maxScore: 100 },
      { factor: "Legalitas & Dokumentasi", weight: 15, score: 90, maxScore: 100 },
    ],

    courses: [
      { name: "Digital Marketing untuk UMKM", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Manajemen Keuangan Bisnis", progress: 75, completed: false },
      { name: "Customer Service Excellence", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Strategi Pemasaran Media Sosial", progress: 45, completed: false },
    ],

    websiteUrl: "https://tongkonan-aya.lokananta.app",
    websiteStats: { visits: 2450, engagement: 68, conversionRate: 12 },
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/tongkonanaya", followers: 3200 },
      { platform: "Facebook", url: "https://facebook.com/tongkonanaya", followers: 1850 },
    ],

    topProducts: [
      { name: "Paket Tur 2D1N", sales: 45, revenue: 67500000 },
      { name: "Homestay Budget", sales: 32, revenue: 38400000 },
      { name: "Paket Fotografi", sales: 18, revenue: 28800000 },
    ],

    peakHours: [
      { hour: "09:00", transactions: 12 },
      { hour: "14:00", transactions: 18 },
      { hour: "17:00", transactions: 15 },
    ],

    predictions: [
      { metric: "Pendapatan Bulan Depan", current: 15000000, predicted: 17500000, confidence: 85 },
      { metric: "Credit Score", current: 850, predicted: 870, confidence: 78 },
      { metric: "Jumlah Pelanggan", current: 95, predicted: 110, confidence: 72 },
    ],

    loanEligibility: { maxAmount: 150000000, interestRate: 8.5, term: 24 },
    recommendations: [
      { title: "KUR BRI", description: "Kredit Usaha Rakyat dengan bunga rendah", provider: "Bank BRI" },
      { title: "Program Pariwisata Kemenkraf", description: "Hibah untuk pengembangan destinasi wisata", provider: "Kementerian Pariwisata" },
    ],
  },

  {
    id: "UMK002",
    name: "Tenun Ibu Sari",
    category: "Kriya",
    location: "Toraja",
    revenue: "Rp 8.500.000",
    creditScore: 720,
    status: "kuning",
    established: "2020-06-20",
    phone: "+62 813-9876-5432",
    email: "tenun.ibusari@gmail.com",
    employees: 5,
    legalDocs: { nib: "9876543210987", npwp: "98.765.432.1-098.000" },
    description: "Produksi dan penjualan tenun tradisional Toraja dengan motif khas",

    monthlyRevenue: [
      { month: "Okt 2024", revenue: 9200000, expenses: 6500000, profit: 2700000 },
      { month: "Nov 2024", revenue: 7800000, expenses: 5800000, profit: 2000000 },
      { month: "Des 2024", revenue: 11500000, expenses: 7200000, profit: 4300000 },
      { month: "Jan 2025", revenue: 8500000, expenses: 6000000, profit: 2500000 },
    ],

    expenses: [
      { category: "Bahan Baku", amount: 2800000, percentage: 47 },
      { category: "Gaji Pengrajin", amount: 2000000, percentage: 33 },
      { category: "Operasional", amount: 800000, percentage: 13 },
      { category: "Pemasaran", amount: 400000, percentage: 7 },
    ],

    transactions: [
      { id: "TRX101", date: "2025-01-16", description: "Penjualan Kain Tenun Premium", category: "Pemasukan", amount: 3500000, balance: 8500000 },
      { id: "TRX102", date: "2025-01-13", description: "Pembelian Benang Wol", category: "Pengeluaran", amount: -1200000, balance: 5000000 },
      { id: "TRX103", date: "2025-01-11", description: "Order Korporat (10 pcs)", category: "Pemasukan", amount: 5000000, balance: 6200000 },
      { id: "TRX104", date: "2025-01-09", description: "Gaji Pengrajin", category: "Pengeluaran", amount: -2000000, balance: 1200000 },
    ],

    creditHistory: [
      { date: "Agu 2024", score: 680 },
      { date: "Sep 2024", score: 690 },
      { date: "Okt 2024", score: 705 },
      { date: "Nov 2024", score: 710 },
      { date: "Des 2024", score: 715 },
      { date: "Jan 2025", score: 720 },
    ],

    scoreFactors: [
      { factor: "Riwayat Pembayaran", weight: 35, score: 78, maxScore: 100 },
      { factor: "Stabilitas Pendapatan", weight: 30, score: 65, maxScore: 100 },
      { factor: "Pertumbuhan Bisnis", weight: 20, score: 72, maxScore: 100 },
      { factor: "Legalitas & Dokumentasi", weight: 15, score: 85, maxScore: 100 },
    ],

    courses: [
      { name: "E-Commerce untuk Kriya", progress: 60, completed: false },
      { name: "Quality Control Produk", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Export Management", progress: 30, completed: false },
    ],

    websiteUrl: "https://tenun-ibusari.lokananta.app",
    websiteStats: { visits: 1280, engagement: 52, conversionRate: 8 },
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/tenunibusari", followers: 1850 },
    ],

    topProducts: [
      { name: "Kain Tenun Premium", sales: 28, revenue: 42000000 },
      { name: "Sarung Toraja", sales: 35, revenue: 21000000 },
      { name: "Selendang Motif Khas", sales: 22, revenue: 13200000 },
    ],

    peakHours: [
      { hour: "10:00", transactions: 8 },
      { hour: "15:00", transactions: 11 },
    ],

    predictions: [
      { metric: "Pendapatan Bulan Depan", current: 8500000, predicted: 9200000, confidence: 68 },
      { metric: "Credit Score", current: 720, predicted: 735, confidence: 65 },
    ],

    loanEligibility: { maxAmount: 80000000, interestRate: 10.5, term: 18 },
    recommendations: [
      { title: "KUR Mikro", description: "Modal kerja untuk pengrajin", provider: "Bank Mandiri" },
    ],
  },

  {
    id: "UMK003",
    name: "Batik Mas Agung",
    category: "Kriya",
    location: "Yogyakarta",
    revenue: "Rp 22.000.000",
    creditScore: 890,
    status: "hijau",
    established: "2015-08-10",
    phone: "+62 811-2345-6789",
    email: "batik.masagung@gmail.com",
    employees: 15,
    legalDocs: { nib: "5555666677778", npwp: "55.556.666.7-777.000" },
    description: "Produksi batik tulis dan cap dengan desain modern dan tradisional",

    monthlyRevenue: [
      { month: "Okt 2024", revenue: 24500000, expenses: 15000000, profit: 9500000 },
      { month: "Nov 2024", revenue: 21800000, expenses: 14200000, profit: 7600000 },
      { month: "Des 2024", revenue: 28000000, expenses: 16500000, profit: 11500000 },
      { month: "Jan 2025", revenue: 22000000, expenses: 14800000, profit: 7200000 },
    ],

    expenses: [
      { category: "Gaji Karyawan", amount: 8500000, percentage: 38 },
      { category: "Bahan Baku", amount: 4200000, percentage: 19 },
      { category: "Operasional", amount: 3800000, percentage: 17 },
      { category: "Pemasaran", amount: 2800000, percentage: 13 },
      { category: "Lainnya", amount: 2900000, percentage: 13 },
    ],

    transactions: [
      { id: "TRX201", date: "2025-01-17", description: "Order Korporat 50 pcs", category: "Pemasukan", amount: 12500000, balance: 22000000 },
      { id: "TRX202", date: "2025-01-15", description: "Pembelian Kain Mori", category: "Pengeluaran", amount: -2500000, balance: 9500000 },
      { id: "TRX203", date: "2025-01-13", description: "Penjualan Online", category: "Pemasukan", amount: 4800000, balance: 12000000 },
      { id: "TRX204", date: "2025-01-10", description: "Gaji Karyawan", category: "Pengeluaran", amount: -8500000, balance: 7200000 },
    ],

    creditHistory: [
      { date: "Agu 2024", score: 860 },
      { date: "Sep 2024", score: 870 },
      { date: "Okt 2024", score: 875 },
      { date: "Nov 2024", score: 880 },
      { date: "Des 2024", score: 885 },
      { date: "Jan 2025", score: 890 },
    ],

    scoreFactors: [
      { factor: "Riwayat Pembayaran", weight: 35, score: 98, maxScore: 100 },
      { factor: "Stabilitas Pendapatan", weight: 30, score: 92, maxScore: 100 },
      { factor: "Pertumbuhan Bisnis", weight: 20, score: 85, maxScore: 100 },
      { factor: "Legalitas & Dokumentasi", weight: 15, score: 95, maxScore: 100 },
    ],

    courses: [
      { name: "Digital Marketing untuk UMKM", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Export Readiness", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Manajemen Keuangan Bisnis", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Brand Development", progress: 80, completed: false },
    ],

    websiteUrl: "https://batik-masagung.lokananta.app",
    websiteStats: { visits: 5680, engagement: 75, conversionRate: 18 },
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/batikmasagung", followers: 8500 },
      { platform: "Facebook", url: "https://facebook.com/batikmasagung", followers: 4200 },
      { platform: "TikTok", url: "https://tiktok.com/@batikmasagung", followers: 12000 },
    ],

    topProducts: [
      { name: "Batik Tulis Premium", sales: 85, revenue: 127500000 },
      { name: "Batik Cap Modern", sales: 120, revenue: 96000000 },
      { name: "Kemeja Batik Corporate", sales: 95, revenue: 71250000 },
    ],

    peakHours: [
      { hour: "09:00", transactions: 22 },
      { hour: "13:00", transactions: 28 },
      { hour: "16:00", transactions: 25 },
    ],

    predictions: [
      { metric: "Pendapatan Bulan Depan", current: 22000000, predicted: 25000000, confidence: 88 },
      { metric: "Credit Score", current: 890, predicted: 910, confidence: 82 },
      { metric: "Jumlah Pelanggan", current: 185, predicted: 205, confidence: 79 },
    ],

    loanEligibility: { maxAmount: 250000000, interestRate: 7.5, term: 36 },
    recommendations: [
      { title: "KUR TKI", description: "Kredit untuk ekspansi bisnis", provider: "Bank BNI" },
      { title: "Pembiayaan Syariah", description: "Tanpa bunga untuk UMKM", provider: "Bank Syariah Indonesia" },
    ],
  },

  {
    id: "UMK004",
    name: "Kuliner Bu Tini",
    category: "Kuliner",
    location: "Solo",
    revenue: "Rp 5.200.000",
    creditScore: 650,
    status: "kuning",
    established: "2021-11-05",
    phone: "+62 815-4321-8765",
    email: "kuliner.butini@gmail.com",
    employees: 3,
    legalDocs: { nib: "3333444455556", npwp: "33.334.444.5-555.000" },
    description: "Warung makan tradisional Solo dengan menu nasi liwet dan sate buntel",

    monthlyRevenue: [
      { month: "Okt 2024", revenue: 6200000, expenses: 4800000, profit: 1400000 },
      { month: "Nov 2024", revenue: 5800000, expenses: 4600000, profit: 1200000 },
      { month: "Des 2024", revenue: 7500000, expenses: 5200000, profit: 2300000 },
      { month: "Jan 2025", revenue: 5200000, expenses: 4100000, profit: 1100000 },
    ],

    expenses: [
      { category: "Bahan Makanan", amount: 2400000, percentage: 46 },
      { category: "Gaji Karyawan", amount: 1500000, percentage: 29 },
      { category: "Sewa Tempat", amount: 800000, percentage: 15 },
      { category: "Utilitas", amount: 500000, percentage: 10 },
    ],

    transactions: [
      { id: "TRX301", date: "2025-01-18", description: "Penjualan Harian", category: "Pemasukan", amount: 850000, balance: 5200000 },
      { id: "TRX302", date: "2025-01-17", description: "Belanja Bahan Baku", category: "Pengeluaran", amount: -650000, balance: 4350000 },
      { id: "TRX303", date: "2025-01-16", description: "Penjualan Harian", category: "Pemasukan", amount: 780000, balance: 5000000 },
      { id: "TRX304", date: "2025-01-15", description: "Bayar Sewa Bulan Jan", category: "Pengeluaran", amount: -800000, balance: 4220000 },
    ],

    creditHistory: [
      { date: "Agu 2024", score: 620 },
      { date: "Sep 2024", score: 625 },
      { date: "Okt 2024", score: 635 },
      { date: "Nov 2024", score: 640 },
      { date: "Des 2024", score: 645 },
      { date: "Jan 2025", score: 650 },
    ],

    scoreFactors: [
      { factor: "Riwayat Pembayaran", weight: 35, score: 70, maxScore: 100 },
      { factor: "Stabilitas Pendapatan", weight: 30, score: 60, maxScore: 100 },
      { factor: "Pertumbuhan Bisnis", weight: 20, score: 55, maxScore: 100 },
      { factor: "Legalitas & Dokumentasi", weight: 15, score: 75, maxScore: 100 },
    ],

    courses: [
      { name: "Manajemen Keuangan Usaha Kecil", progress: 40, completed: false },
      { name: "Food Safety & Hygiene", progress: 100, completed: true, certificateUrl: "#" },
    ],

    websiteStats: { visits: 420, engagement: 38, conversionRate: 5 },

    topProducts: [
      { name: "Nasi Liwet Komplit", sales: 180, revenue: 27000000 },
      { name: "Sate Buntel", sales: 150, revenue: 18000000 },
      { name: "Wedang Uwuh", sales: 220, revenue: 6600000 },
    ],

    peakHours: [
      { hour: "12:00", transactions: 35 },
      { hour: "18:00", transactions: 42 },
    ],

    predictions: [
      { metric: "Pendapatan Bulan Depan", current: 5200000, predicted: 5800000, confidence: 62 },
      { metric: "Credit Score", current: 650, predicted: 665, confidence: 58 },
    ],

    loanEligibility: { maxAmount: 35000000, interestRate: 12.5, term: 12 },
    recommendations: [
      { title: "KUR Mikro", description: "Modal usaha kecil", provider: "Bank BRI" },
    ],
  },

  {
    id: "UMK005",
    name: "Ukir Kayu Pak Budi",
    category: "Kriya",
    location: "Bali",
    revenue: "Rp 18.500.000",
    creditScore: 820,
    status: "hijau",
    established: "2017-02-14",
    phone: "+62 817-6543-2109",
    email: "ukir.pakbudi@gmail.com",
    employees: 10,
    legalDocs: { nib: "7777888899990", npwp: "77.778.888.9-999.000" },
    description: "Pengrajin ukiran kayu khas Bali untuk dekorasi dan souvenir",

    monthlyRevenue: [
      { month: "Okt 2024", revenue: 21000000, expenses: 13500000, profit: 7500000 },
      { month: "Nov 2024", revenue: 17800000, expenses: 12200000, profit: 5600000 },
      { month: "Des 2024", revenue: 25000000, expenses: 15000000, profit: 10000000 },
      { month: "Jan 2025", revenue: 18500000, expenses: 12800000, profit: 5700000 },
    ],

    expenses: [
      { category: "Gaji Pengrajin", amount: 7000000, percentage: 39 },
      { category: "Kayu & Bahan", amount: 3500000, percentage: 19 },
      { category: "Alat & Perawatan", amount: 2800000, percentage: 15 },
      { category: "Operasional", amount: 2500000, percentage: 14 },
      { category: "Pemasaran", amount: 2300000, percentage: 13 },
    ],

    transactions: [
      { id: "TRX401", date: "2025-01-16", description: "Order Patung Garuda (3 unit)", category: "Pemasukan", amount: 9000000, balance: 18500000 },
      { id: "TRX402", date: "2025-01-14", description: "Pembelian Kayu Jati", category: "Pengeluaran", amount: -2200000, balance: 9500000 },
      { id: "TRX403", date: "2025-01-12", description: "Penjualan Souvenir Hotel", category: "Pemasukan", amount: 5500000, balance: 11700000 },
      { id: "TRX404", date: "2025-01-10", description: "Gaji Pengrajin", category: "Pengeluaran", amount: -7000000, balance: 6200000 },
    ],

    creditHistory: [
      { date: "Agu 2024", score: 785 },
      { date: "Sep 2024", score: 795 },
      { date: "Okt 2024", score: 805 },
      { date: "Nov 2024", score: 810 },
      { date: "Des 2024", score: 815 },
      { date: "Jan 2025", score: 820 },
    ],

    scoreFactors: [
      { factor: "Riwayat Pembayaran", weight: 35, score: 90, maxScore: 100 },
      { factor: "Stabilitas Pendapatan", weight: 30, score: 85, maxScore: 100 },
      { factor: "Pertumbuhan Bisnis", weight: 20, score: 78, maxScore: 100 },
      { factor: "Legalitas & Dokumentasi", weight: 15, score: 88, maxScore: 100 },
    ],

    courses: [
      { name: "Export Management", progress: 100, completed: true, certificateUrl: "#" },
      { name: "Product Photography", progress: 85, completed: false },
      { name: "Online Marketplace Mastery", progress: 100, completed: true, certificateUrl: "#" },
    ],

    websiteUrl: "https://ukir-pakbudi.lokananta.app",
    websiteStats: { visits: 3850, engagement: 71, conversionRate: 14 },
    socialMedia: [
      { platform: "Instagram", url: "https://instagram.com/ukirpakbudi", followers: 5600 },
      { platform: "Facebook", url: "https://facebook.com/ukirpakbudi", followers: 2800 },
    ],

    topProducts: [
      { name: "Patung Garuda", sales: 45, revenue: 135000000 },
      { name: "Panel Relief Ramayana", sales: 28, revenue: 84000000 },
      { name: "Topeng Bali", sales: 95, revenue: 47500000 },
    ],

    peakHours: [
      { hour: "10:00", transactions: 15 },
      { hour: "14:00", transactions: 20 },
      { hour: "16:00", transactions: 17 },
    ],

    predictions: [
      { metric: "Pendapatan Bulan Depan", current: 18500000, predicted: 21000000, confidence: 81 },
      { metric: "Credit Score", current: 820, predicted: 840, confidence: 76 },
      { metric: "Jumlah Pelanggan", current: 125, predicted: 145, confidence: 74 },
    ],

    loanEligibility: { maxAmount: 180000000, interestRate: 9.0, term: 30 },
    recommendations: [
      { title: "KUR TKI", description: "Untuk ekspansi dan export", provider: "Bank BNI" },
      { title: "Program Seni & Budaya", description: "Hibah pengembangan produk", provider: "Kemendikbud" },
    ],
  },
];

export const getUMKMById = (id: string): UMKMDetailed | undefined => {
  return umkmDetailedData.find(umkm => umkm.id === id);
};
