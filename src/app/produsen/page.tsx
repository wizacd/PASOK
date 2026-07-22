"use client";

import { useEffect, useState } from "react";
import { Sprout } from "lucide-react";
import { ActiveOffersTable, type DashboardOffer } from "@/components/produsen/dashboard/active-offers-table";
import { OfferSummaryWidget } from "@/components/produsen/dashboard/offer-summary-widget";
import { PriceCard } from "@/components/produsen/dashboard/price-card";
import { PrimaryActionCard } from "@/components/produsen/dashboard/primary-action-card";
import { RecentActivityList, type ActivityOffer } from "@/components/produsen/dashboard/recent-activity-list";
import { getAccessToken } from "@/lib/auth";

type PenawaranRow = {
  id: string;
  estimasi_volume: number | null;
  harga_ditawarkan: number | null;
  estimasi_tanggal_panen: string | null;
  status: "tersedia" | "matched" | "terjual";
  created_at: string;
  komoditas_ref: string;
  referensi_komoditas_desa: { nama_komoditas: string } | null;
};

type DashboardData = {
  nama: string;
  ringkasan: { menunggu: number; diterima: number };
  penawaran: PenawaranRow[];
  harga_rekomendasi: { komoditas_ref: string; nama_komoditas: string; harga_rekomendasi: number | null; metode: string }[];
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

const TODAY_LABEL = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ProdusenDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
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
        setError(result.error ?? "Gagal memuat data dashboard.");
        setIsLoading(false);
        return;
      }

      setData(result);
      setIsLoading(false);
    }

    load();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-body">Memuat dashboard...</p>;
  }

  if (error || !data) {
    return (
      <p className="text-sm text-danger" role="alert">
        {error || "Data tidak tersedia."}
      </p>
    );
  }

  const offers: DashboardOffer[] = data.penawaran.map((p) => ({
    id: p.id,
    namaKomoditas: p.referensi_komoditas_desa?.nama_komoditas ?? "Komoditas",
    estimasiVolume: p.estimasi_volume,
    hargaDitawarkan: p.harga_ditawarkan,
    status: p.status,
  }));

  const activityOffers: ActivityOffer[] = data.penawaran.map((p) => ({
    id: p.id,
    namaKomoditas: p.referensi_komoditas_desa?.nama_komoditas ?? "Komoditas",
    estimasiVolume: p.estimasi_volume,
    status: p.status,
    createdAt: p.created_at,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            {getGreeting()}, {data.nama}
          </h1>
          <p className="text-base text-body">{TODAY_LABEL}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 grid grid-cols-2 gap-4">
          {data.harga_rekomendasi.length === 0 ? (
            <div className="col-span-2 flex items-center justify-center rounded-sm border border-dashed border-border-soft bg-white p-6 text-sm text-body">
              Belum ada rekomendasi harga — buat penawaran pertama Anda dulu.
            </div>
          ) : (
            data.harga_rekomendasi.map((item) => (
              <PriceCard
                key={item.komoditas_ref}
                icon={Sprout}
                iconClassName="text-forest"
                commodity={item.nama_komoditas}
                price={
                  item.harga_rekomendasi != null
                    ? formatRupiah(item.harga_rekomendasi)
                    : "Belum ada data"
                }
                metaLabel="Rekomendasi AI"
                metaValue={item.metode}
              />
            ))
          )}
          <PrimaryActionCard />
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <OfferSummaryWidget
            menunggu={data.ringkasan.menunggu}
            diterima={data.ringkasan.diterima}
          />
          <RecentActivityList offers={activityOffers} />
        </div>

        <ActiveOffersTable offers={offers} />
      </div>
    </div>
  );
}
