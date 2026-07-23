"use client";

import { useEffect, useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { StatCards } from "@/components/produsen/riwayat/stat-cards";
import { FilterPanel, type FilterValues } from "@/components/produsen/riwayat/filter-panel";
import { TransactionsTable, type TransactionRow } from "@/components/produsen/riwayat/transactions-table";
import {
  MonthlyDistributionChart,
  buildMonthlyDistribution,
} from "@/components/produsen/riwayat/monthly-distribution-chart";
import { getAccessToken } from "@/lib/auth";

type PenawaranRow = {
  id: string;
  estimasi_volume: number | null;
  harga_ditawarkan: number | null;
  estimasi_tanggal_panen: string | null;
  status: "tersedia" | "matched" | "terjual";
  created_at: string;
  referensi_komoditas_desa: { nama_komoditas: string } | null;
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const EMPTY_FILTER: FilterValues = { dari: "", sampai: "", komoditas: "semua", status: "semua" };

export default function RiwayatTransaksiPage() {
  const [penawaran, setPenawaran] = useState<PenawaranRow[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterValues>(EMPTY_FILTER);

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/produsen/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Gagal memuat data riwayat.");
        setIsLoading(false);
        return;
      }

      setPenawaran(result.penawaran);
      setIsLoading(false);
    }

    load();
  }, []);

  const daftarKomoditas = useMemo(
    () =>
      Array.from(
        new Set(penawaran.map((p) => p.referensi_komoditas_desa?.nama_komoditas ?? "Komoditas"))
      ).sort(),
    [penawaran]
  );

  const transactions: TransactionRow[] = useMemo(
    () =>
      penawaran.map((p) => ({
        id: p.id,
        date: formatTanggal(p.created_at),
        namaKomoditas: p.referensi_komoditas_desa?.nama_komoditas ?? "Komoditas",
        estimasiVolume: p.estimasi_volume,
        hargaSatuan: p.harga_ditawarkan,
        status: p.status,
      })),
    [penawaran]
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (filter.status !== "semua" && tx.status !== filter.status) return false;
      if (filter.komoditas !== "semua" && tx.namaKomoditas !== filter.komoditas) return false;

      const raw = penawaran.find((p) => p.id === tx.id);
      if (!raw) return true;
      const created = new Date(raw.created_at);
      if (filter.dari && created < new Date(filter.dari)) return false;
      if (filter.sampai && created > new Date(`${filter.sampai}T23:59:59`)) return false;

      return true;
    });
  }, [transactions, filter, penawaran]);

  if (isLoading) {
    return <p className="text-sm text-body">Memuat riwayat transaksi...</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-danger" role="alert">
        {error}
      </p>
    );
  }

  const selesai = penawaran.filter((p) => p.status === "terjual");
  const totalPenjualan = selesai.reduce(
    (sum, p) => sum + (p.harga_ditawarkan ?? 0) * (p.estimasi_volume ?? 0),
    0
  );
  const volumeTerkirimKg = selesai.reduce((sum, p) => sum + (p.estimasi_volume ?? 0), 0);
  const tingkatKeberhasilanPersen =
    penawaran.length > 0 ? (selesai.length / penawaran.length) * 100 : null;

  const now = new Date();
  const bulanIni = selesai.filter((p) => {
    const d = new Date(p.created_at);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const bulanLalu = selesai.filter((p) => {
    const d = new Date(p.created_at);
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === prev.getFullYear() && d.getMonth() === prev.getMonth();
  });
  const totalBulanIni = bulanIni.reduce(
    (sum, p) => sum + (p.harga_ditawarkan ?? 0) * (p.estimasi_volume ?? 0),
    0
  );
  const totalBulanLalu = bulanLalu.reduce(
    (sum, p) => sum + (p.harga_ditawarkan ?? 0) * (p.estimasi_volume ?? 0),
    0
  );
  const perubahanPenjualanPersen =
    totalBulanLalu > 0 ? ((totalBulanIni - totalBulanLalu) / totalBulanLalu) * 100 : null;

  const monthlyData = buildMonthlyDistribution(penawaran.map((p) => p.created_at));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-base text-ink">Riwayat Transaksi</h1>
          <p className="text-base text-body">
            Kelola dan pantau semua penawaran dan status transaksi komoditas Anda.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex h-10 items-center gap-2 rounded-xs border border-border-soft px-4 text-sm font-medium text-body"
        >
          <Printer className="size-4" strokeWidth={2} />
          Cetak Laporan
        </button>
      </div>

      <StatCards
        totalPenjualan={totalPenjualan}
        perubahanPenjualanPersen={perubahanPenjualanPersen}
        volumeTerkirimKg={volumeTerkirimKg}
        jumlahSelesai={selesai.length}
        tingkatKeberhasilanPersen={tingkatKeberhasilanPersen}
      />

      <FilterPanel daftarKomoditas={daftarKomoditas} onApply={setFilter} />

      <TransactionsTable transactions={filteredTransactions} totalCount={transactions.length} />

      <MonthlyDistributionChart data={monthlyData} />
    </div>
  );
}
