"use client";

import { Clock, MapPin, Scale } from "lucide-react";

export type MatchedOffer = {
  id: string;
  estimasi_volume: number;
  harga_ditawarkan: number;
  estimasi_tanggal_panen: string;
  komoditas_ref: string;
  anggota_koperasi: {
    nama: string;
    anggota_lokasi: { lokasi_lat: number; lokasi_lng: number } | null;
  } | null;
  referensi_komoditas_desa: { nama_komoditas: string } | null;
  skor_total: number;
  jarak_km: number;
  breakdown: {
    skor_jarak: number;
    skor_kategori: number;
    skor_volume: number;
  };
};

function hariLagi(tanggalPanen: string) {
  const diffMs = new Date(tanggalPanen).getTime() - Date.now();
  const diffHari = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffHari <= 0) return "Siap panen";
  return `${diffHari} Hari Lagi`;
}

export function OfferQueuePanel({
  offers,
  selectedId,
  onSelect,
  loading,
  error,
}: {
  offers: MatchedOffer[];
  selectedId: string | null;
  onSelect: (offer: MatchedOffer) => void;
  loading: boolean;
  error: string;
}) {
  return (
    <div className="flex h-full w-[341px] shrink-0 flex-col border-r border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <h2 className="text-xl font-semibold text-ink">
          Antrean Penawaran Terpilih
        </h2>
        <span className="rounded-xs bg-info/10 px-3 py-1 text-xs font-bold text-info">
          {offers.length} Aktif
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-canvas/50 p-4">
        {loading ? (
          <p className="p-4 text-sm text-body">Memuat penawaran...</p>
        ) : error ? (
          <p className="p-4 text-sm text-danger">{error}</p>
        ) : offers.length === 0 ? (
          <p className="p-4 text-sm text-body">
            Belum ada penawaran yang cocok saat ini.
          </p>
        ) : (
          offers.map((offer) => {
            const isSelected = offer.id === selectedId;
            return (
              <button
                key={offer.id}
                type="button"
                onClick={() => onSelect(offer)}
                className={`flex flex-col gap-4 rounded-xs border bg-white p-[18px] text-left ${
                  isSelected
                    ? "border-2 border-info shadow-sm"
                    : "border-border-soft"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-ink">
                      {offer.anggota_koperasi?.nama ?? "Produsen"}
                    </h3>
                    <span className="text-xs font-medium uppercase tracking-[0.6px] text-brand">
                      {offer.referensi_komoditas_desa?.nama_komoditas}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-info">
                      {Math.round(offer.skor_total * 100)}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-body">
                      Match Score
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-canvas pt-3">
                  <div className="flex items-center gap-2">
                    <Scale className="size-3.5 text-body" strokeWidth={2} />
                    <span className="text-sm text-ink">
                      {offer.estimasi_volume} kg
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-body" strokeWidth={2} />
                    <span className="text-sm text-ink">
                      {offer.jarak_km} km
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Clock className="size-3.5 text-body" strokeWidth={2} />
                    <span className="text-sm text-ink">
                      {hariLagi(offer.estimasi_tanggal_panen)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
