"use client";

import { Calendar, ChevronDown, FileText, Send } from "lucide-react";

const COMMODITY_OPTIONS = [
  "Padi",
  "Jagung",
  "Ikan",
  "Ternak",
  "Kopi",
  "Sayur",
];

export function OfferForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-6 w-full"
    >
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
                defaultValue=""
                className="h-12 w-full appearance-none rounded-xs border border-border-soft bg-canvas px-4 text-base text-ink focus:border-brand focus:outline-none"
              >
                <option value="" disabled>
                  Pilih Komoditas
                </option>
                {COMMODITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                className="h-12 w-full rounded-xs border border-border-soft bg-canvas pl-11 pr-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="tawaran-catatan"
            className="text-xs font-semibold uppercase tracking-[0.6px] text-body"
          >
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            id="tawaran-catatan"
            name="catatan"
            rows={4}
            placeholder="Sebutkan varietas atau detail kualitas lainnya..."
            className="w-full resize-none rounded-xs border border-border-soft bg-canvas p-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 rounded-sm border border-border-soft bg-white p-6">
        <button
          type="button"
          className="rounded-xs border border-border-soft px-6 py-3 text-xs font-semibold uppercase tracking-[0.6px] text-ink"
        >
          Simpan Draft
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xs bg-brand px-8 py-2.5 text-xs font-semibold uppercase tracking-[0.6px] text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-90"
        >
          <Send className="size-3" strokeWidth={2} />
          Kirim Penawaran
        </button>
      </div>
    </form>
  );
}
