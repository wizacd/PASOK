"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronDown, FileText, Send } from "lucide-react";

type KomoditasOption = { komoditas_ref: string; nama_komoditas: string };

export function OfferForm({
  anggotaRef,
  komoditasOptions,
  selectedKomoditasRef,
  onKomoditasChange,
}: {
  anggotaRef: string;
  komoditasOptions: KomoditasOption[];
  selectedKomoditasRef: string;
  onKomoditasChange: (komoditasRef: string) => void;
}) {
  const router = useRouter();
  const [volume, setVolume] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [harga, setHarga] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedKomoditasRef || !volume || !tanggal || !harga) {
      setError("Lengkapi semua data sebelum mengirim penawaran.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/penawaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anggota_ref: anggotaRef,
          komoditas_ref: selectedKomoditasRef,
          estimasi_volume: Number(volume),
          estimasi_tanggal_panen: tanggal,
          harga_ditawarkan: Number(harga),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error ?? "Gagal mengirim penawaran.");
      }

      router.push("/produsen");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim penawaran.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
        <div className="flex items-center gap-2">
          <FileText className="size-[18px] text-ink" strokeWidth={2} />
          <h2 className="text-xl font-semibold text-ink">Detail Komoditas</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="tawaran-komoditas"
              className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
            >
              Komoditas Utama
            </label>
            <div className="relative">
              <select
                id="tawaran-komoditas"
                name="komoditas"
                value={selectedKomoditasRef}
                onChange={(event) => onKomoditasChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-xs border border-border-soft bg-canvas px-4 text-base text-ink focus:border-brand focus:outline-none"
              >
                <option value="" disabled>
                  Pilih Komoditas
                </option>
                {komoditasOptions.map((option) => (
                  <option key={option.komoditas_ref} value={option.komoditas_ref}>
                    {option.nama_komoditas}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-body"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="tawaran-volume"
              className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
            >
              Estimasi Volume (KG)
            </label>
            <div className="relative">
              <input
                id="tawaran-volume"
                name="volume"
                type="number"
                min="0"
                placeholder="Contoh: 500"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
                className="h-12 w-full rounded-xs border border-border-soft bg-canvas pl-4 pr-12 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-body">
                KG
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="tawaran-tanggal"
              className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
            >
              Tanggal Siap Panen
            </label>
            <div className="relative">
              <input
                id="tawaran-tanggal"
                name="tanggal"
                type="date"
                value={tanggal}
                onChange={(event) => setTanggal(event.target.value)}
                className="h-12 w-full rounded-xs border border-border-soft bg-canvas pl-4 pr-11 text-base text-ink [color-scheme:light] focus:border-brand focus:outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-11 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <Calendar
                className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-body"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="tawaran-harga"
              className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
            >
              Harga Ditawarkan (Rp/KG)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-body">
                Rp
              </span>
              <input
                id="tawaran-harga"
                name="harga"
                type="number"
                min="0"
                placeholder="8.500"
                value={harga}
                onChange={(event) => setHarga(event.target.value)}
                className="h-12 w-full rounded-xs border border-border-soft bg-canvas pl-11 pr-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-end gap-4 rounded-sm border border-border-soft bg-white p-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xs bg-brand px-8 py-2.5 text-xs font-semibold uppercase tracking-[0.6px] text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Send className="size-3" strokeWidth={2} />
          {isSubmitting ? "Mengirim..." : "Kirim Penawaran"}
        </button>
      </div>
    </form>
  );
}
