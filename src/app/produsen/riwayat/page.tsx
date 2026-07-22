"use client";

import { useEffect, useState } from "react";
import { HubStatusCard } from "@/components/produsen/riwayat/hub-status-card";
import { TotalAccumulationCard } from "@/components/produsen/riwayat/total-accumulation-card";
import { TransactionsTable, type TransactionRow } from "@/components/produsen/riwayat/transactions-table";
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

export default function RiwayatTransaksiPage() {
  const [penawaran, setPenawaran] = useState<PenawaranRow[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const menunggu = penawaran.filter((p) => p.status === "tersedia").length;
  const dicocokkan = penawaran.filter((p) => p.status === "matched").length;
  const selesai = penawaran.filter((p) => p.status === "terjual").length;

  const totalRupiah = penawaran
    .filter((p) => p.status === "terjual")
    .reduce((sum, p) => sum + (p.harga_ditawarkan ?? 0) * (p.estimasi_volume ?? 0), 0);

  const transactions: TransactionRow[] = penawaran.map((p) => ({
    id: p.id,
    date: formatTanggal(p.created_at),
    namaKomoditas: p.referensi_komoditas_desa?.nama_komoditas ?? "Komoditas",
    estimasiVolume: p.estimasi_volume,
    hargaSatuan: p.harga_ditawarkan,
    status: p.status,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-base text-ink">Riwayat Transaksi</h1>
          <p className="text-base text-body">
            Kelola dan pantau semua penawaran dan status transaksi komoditas
            Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <TotalAccumulationCard totalRupiah={totalRupiah} />
        <HubStatusCard menunggu={menunggu} dicocokkan={dicocokkan} selesai={selesai} />
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
