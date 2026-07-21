"use client";

import { useState } from "react";
import { Sprout, Waves } from "lucide-react";

const KOMODITAS_OPTIONS = [
  "Padi",
  "Jagung",
  "Ikan Tuna",
  "Udang Vaname",
  "Kopi Arabika",
];

const STATUS_OPTIONS = ["Tersedia (Ready Stock)", "Segera Panen (Estimasi 7 Hari)"];

export type FilterState = {
  kategori: "pertanian" | "kelautan";
  komoditas: string[];
  radiusKm: number;
  status: string[];
};

export function FilterPanel({
  filters,
  onChange,
  onApply,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
}) {
  const [draft, setDraft] = useState(filters);

  function toggleKomoditas(name: string) {
    setDraft((prev) => ({
      ...prev,
      komoditas: prev.komoditas.includes(name)
        ? prev.komoditas.filter((item) => item !== name)
        : [...prev.komoditas, name],
    }));
  }

  function toggleStatus(name: string) {
    setDraft((prev) => ({
      ...prev,
      status: prev.status.includes(name)
        ? prev.status.filter((item) => item !== name)
        : [...prev.status, name],
    }));
  }

  return (
    <div className="absolute left-6 top-6 z-[400] flex max-h-[calc(100%-48px)] w-80 flex-col overflow-hidden rounded-lg border border-chip-strong bg-white/95 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-1 border-b border-chip-strong px-5 py-5">
        <h3 className="text-xl font-semibold text-ink">Filter Komoditas</h3>
        <p className="text-sm text-muted">Kelola visibilitas sebaran pasokan</p>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto p-5">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
            Kategori Utama
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDraft((prev) => ({ ...prev, kategori: "pertanian" }))}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xs px-3 py-2.5 text-sm font-semibold ${
                draft.kategori === "pertanian"
                  ? "border-2 border-brand bg-success/10 text-brand"
                  : "border border-chip-strong text-body"
              }`}
            >
              <Sprout className="size-4" strokeWidth={2} />
              Pertanian
            </button>
            <button
              type="button"
              onClick={() => setDraft((prev) => ({ ...prev, kategori: "kelautan" }))}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xs px-3 py-2.5 text-sm font-semibold ${
                draft.kategori === "kelautan"
                  ? "border-2 border-brand bg-success/10 text-brand"
                  : "border border-chip-strong text-body"
              }`}
            >
              <Waves className="size-4" strokeWidth={2} />
              Kelautan
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
            Komoditas Spesifik
          </span>
          <div className="flex flex-wrap gap-2">
            {KOMODITAS_OPTIONS.map((name) => {
              const isActive = draft.komoditas.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleKomoditas(name)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isActive
                      ? "bg-brand/25 text-brand-deep"
                      : "bg-chip text-body"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
              Radius Wilayah
            </span>
            <span className="text-sm font-bold text-brand">
              {draft.radiusKm} km
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={100}
            step={5}
            value={draft.radiusKm}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                radiusKm: Number(event.target.value),
              }))
            }
            className="h-1.5 w-full accent-brand"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
            Status Pasokan
          </span>
          <div className="flex flex-col gap-2">
            {STATUS_OPTIONS.map((name) => (
              <label
                key={name}
                className="flex items-center gap-3 text-sm text-body"
              >
                <input
                  type="checkbox"
                  checked={draft.status.includes(name)}
                  onChange={() => toggleStatus(name)}
                  className="size-4 rounded-xs border border-chip-strong text-brand"
                />
                {name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-chip-strong bg-canvas px-4 pb-4 pt-4">
        <button
          type="button"
          onClick={() => {
            onChange(draft);
            onApply();
          }}
          className="w-full rounded-xs bg-ink py-2.5 text-sm font-semibold text-white"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}
