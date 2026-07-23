"use client";

import { useState } from "react";

export type FilterValues = {
  dari: string;
  sampai: string;
  komoditas: string;
  status: string;
};

const EMPTY_FILTER: FilterValues = { dari: "", sampai: "", komoditas: "semua", status: "semua" };

export function FilterPanel({
  daftarKomoditas,
  onApply,
}: {
  daftarKomoditas: string[];
  onApply: (filter: FilterValues) => void;
}) {
  const [draft, setDraft] = useState<FilterValues>(EMPTY_FILTER);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border-soft bg-white p-6">
      <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
        Filter Data
      </span>
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-xs font-medium text-body">
          Dari Tanggal
          <input
            type="date"
            value={draft.dari}
            onChange={(event) => setDraft((prev) => ({ ...prev, dari: event.target.value }))}
            className="h-10 rounded-xs border border-border-soft bg-white px-3 text-sm text-ink"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-body">
          Sampai Tanggal
          <input
            type="date"
            value={draft.sampai}
            onChange={(event) => setDraft((prev) => ({ ...prev, sampai: event.target.value }))}
            className="h-10 rounded-xs border border-border-soft bg-white px-3 text-sm text-ink"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-body">
          Sektor Komoditas
          <select
            value={draft.komoditas}
            onChange={(event) => setDraft((prev) => ({ ...prev, komoditas: event.target.value }))}
            className="h-10 rounded-xs border border-border-soft bg-white px-3 text-sm text-ink"
          >
            <option value="semua">Semua Komoditas</option>
            {daftarKomoditas.map((nama) => (
              <option key={nama} value={nama}>
                {nama}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-medium text-body">
          Status Transaksi
          <select
            value={draft.status}
            onChange={(event) => setDraft((prev) => ({ ...prev, status: event.target.value }))}
            className="h-10 rounded-xs border border-border-soft bg-white px-3 text-sm text-ink"
          >
            <option value="semua">Semua Status</option>
            <option value="tersedia">Menunggu</option>
            <option value="matched">Dicocokkan</option>
            <option value="terjual">Selesai</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => onApply(draft)}
          className="h-10 rounded-xs bg-brand px-5 text-sm font-semibold text-white"
        >
          Terapkan Filter
        </button>

        <button
          type="button"
          onClick={() => {
            setDraft(EMPTY_FILTER);
            onApply(EMPTY_FILTER);
          }}
          className="h-10 rounded-xs border border-border-soft px-5 text-sm font-medium text-body"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
