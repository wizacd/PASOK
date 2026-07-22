"use client";

import { useEffect, useState } from "react";
import { Sparkles, Truck } from "lucide-react";
import type { MatchedOffer } from "@/components/koperasi/supply-matching/offer-queue-panel";

type HargaRekomendasi = {
  nama_komoditas: string;
  harga_rekomendasi: number;
  harga_acuan_pemerintah: number | null;
  rata_rata_harga_lokal: number | null;
  metode: string;
};

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function OfferDetailPanel({
  offer,
  koperasiRef,
  onAccepted,
}: {
  offer: MatchedOffer | null;
  koperasiRef: string;
  onAccepted: () => void;
}) {
  const [harga, setHarga] = useState<HargaRekomendasi | null>(null);
  const [hargaError, setHargaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!offer) return;
    setHarga(null);
    setHargaError("");

    fetch(`/api/harga/rekomendasi?komoditas_ref=${offer.komoditas_ref}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal memuat harga");
        setHarga(data);
      })
      .catch((err) => setHargaError(err.message));
  }, [offer]);

  async function handleTerima() {
    if (!offer) return;
    setIsSubmitting(true);
    setActionError("");

    try {
      const response = await fetch("/api/koperasi/matching/terima", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penawaran_id: offer.id,
          koperasi_ref: koperasiRef,
          skor_matching: offer.skor_total,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Gagal menerima penawaran");
      onAccepted();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!offer) {
    return (
      <div className="flex flex-1 items-center justify-center bg-canvas">
        <p className="text-body">Pilih salah satu penawaran di sebelah kiri.</p>
      </div>
    );
  }

  const rangeMin =
    harga?.harga_acuan_pemerintah && harga?.rata_rata_harga_lokal
      ? Math.min(harga.harga_acuan_pemerintah, harga.rata_rata_harga_lokal)
      : null;
  const rangeMax =
    harga?.harga_acuan_pemerintah && harga?.rata_rata_harga_lokal
      ? Math.max(harga.harga_acuan_pemerintah, harga.rata_rata_harga_lokal)
      : null;

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-y-auto bg-canvas p-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-[1.2px] text-body">
            SUPPLY MATCHING /{" "}
            <span className="text-info">DETAIL PENAWARAN</span>
          </span>
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            Detail &amp; Rekomendasi Harga
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-ink">
                Rekomendasi Harga
              </h3>
              <p className="text-sm text-body">
                Analisis pasar berdasarkan harga acuan &amp; transaksi
                sekitar.
              </p>
            </div>
            {harga ? (
              <div className="flex w-24 flex-col items-center rounded-xs bg-info px-4 py-2 text-white">
                <span className="text-[10px] font-bold uppercase opacity-80">
                  Ideal Buy
                </span>
                <span className="text-lg font-bold">
                  {formatRupiah(harga.harga_rekomendasi)}
                </span>
              </div>
            ) : null}
          </div>

          {hargaError ? (
            <p className="text-sm text-danger">{hargaError}</p>
          ) : !harga ? (
            <p className="text-sm text-body">Memuat rekomendasi harga...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {rangeMin && rangeMax ? (
                <div className="flex h-12 items-center justify-between rounded-xl bg-canvas px-4">
                  <span className="text-xs font-bold text-ink">
                    {formatRupiah(rangeMin)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-info">
                    Rentang Wajar
                  </span>
                  <span className="text-xs font-bold text-ink">
                    {formatRupiah(rangeMax)}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center justify-between text-sm">
                <span className="text-body">Harga Ditawarkan Produsen</span>
                <span className="font-bold text-ink">
                  {formatRupiah(offer.harga_ditawarkan)}
                </span>
              </div>
              <p className="text-xs italic text-body">{harga.metode}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-xs bg-ink p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-info" strokeWidth={2} />
              <h3 className="text-lg font-bold text-white">Skor Matching</h3>
            </div>
            <span className="text-4xl font-bold text-info">
              {Math.round(offer.skor_total * 100)}
              <span className="text-lg">/100</span>
            </span>
            <p className="text-xs text-white/60">
              Berbobot jarak (40%), kecocokan komoditas (35%), dan volume
              (25%).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
          <h3 className="text-base font-bold text-ink">
            Rincian Skor Matching
          </h3>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">Dampak Jarak</span>
              <span className="font-bold text-ink">
                {offer.jarak_km} km
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-canvas">
              <div
                className="h-1.5 rounded-full bg-brand"
                style={{ width: `${offer.breakdown.skor_jarak * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">Kecocokan Volume</span>
              <span className="font-bold text-ink">
                {offer.estimasi_volume} kg
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-canvas">
              <div
                className="h-1.5 rounded-full bg-brand"
                style={{ width: `${offer.breakdown.skor_volume * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">Kesesuaian Komoditas</span>
              <span className="font-bold text-ink">
                {offer.breakdown.skor_kategori === 1 ? "Cocok" : "Tidak Cocok"}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-canvas">
              <div
                className="h-1.5 rounded-full bg-brand"
                style={{ width: `${offer.breakdown.skor_kategori * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xs border border-border-soft bg-white p-6">
          <div className="flex items-center gap-2">
            <Truck className="size-5 text-info" strokeWidth={2} />
            <span className="text-xs font-bold uppercase tracking-[0.6px] text-body">
              Ketersediaan Armada
            </span>
          </div>
          <p className="text-sm text-body">
            Data armada belum terhubung ke sistem — fitur ini masih
            ilustratif.
          </p>
        </div>
      </div>

      {actionError ? (
        <p className="text-sm text-danger">{actionError}</p>
      ) : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleTerima}
          disabled={isSubmitting}
          className="rounded-xs bg-info px-8 py-3 text-base font-bold text-white disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Terima Penawaran"}
        </button>
        <button
          type="button"
          className="rounded-xs border border-body px-8 py-3 text-base font-bold text-ink"
        >
          Nego
        </button>
        <button
          type="button"
          className="rounded-xs px-8 py-3 text-base font-bold text-danger"
        >
          Tolak
        </button>
      </div>
    </div>
  );
}
