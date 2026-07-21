"use client";

import { useState } from "react";
import { Maximize, MapPin, Minus, Plus } from "lucide-react";
import { WilayahSearchInput } from "@/components/koperasi/register/wilayah-search-input";

export function CoverageMapCard() {
  const [radius, setRadius] = useState(25);

  return (
    <div className="flex h-[600px] w-full flex-col rounded-sm border border-border-soft bg-white p-6">
      <div className="flex gap-4 pb-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor="wilayah-pusat"
            className="text-xs font-semibold tracking-[0.6px] text-body"
          >
            Pilih Wilayah Pusat
          </label>
          <WilayahSearchInput />
        </div>

        <div className="flex w-64 shrink-0 flex-col gap-1.5">
          <label
            htmlFor="radius"
            className="text-xs font-semibold tracking-[0.6px] text-body"
          >
            Radius Layanan (km)
          </label>
          <div className="flex h-11 items-center gap-3 rounded-xs border border-border-soft bg-chip px-4">
            <input
              id="radius"
              type="range"
              min={5}
              max={100}
              step={5}
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
              className="h-1 w-full accent-brand"
            />
            <span className="w-9 shrink-0 text-xs font-semibold tracking-[0.6px] text-info">
              {radius}km
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-sm bg-chip">
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Perbesar"
            className="flex size-10 items-center justify-center rounded-xs border border-border-soft bg-white shadow-sm"
          >
            <Plus className="size-3.5 text-body" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Perkecil"
            className="flex size-10 items-center justify-center rounded-xs border border-border-soft bg-white shadow-sm"
          >
            <Minus className="size-3.5 text-body" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Perbesar tampilan"
            className="flex size-10 items-center justify-center rounded-xs border border-border-soft bg-white shadow-sm"
          >
            <Maximize className="size-4 text-body" strokeWidth={2} />
          </button>
        </div>

        <div className="absolute left-4 top-4 max-w-80 rounded-xs border border-white/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-info" strokeWidth={2} />
            <span className="text-xl font-semibold text-ink">
              Wilayah Aktif
            </span>
          </div>
          <p className="pt-1.5 text-sm text-body">
            Area ini mencakup zona pesisir utama dan klaster perkebunan hulu.
          </p>
          <div className="mt-2 flex items-center justify-between border-t border-border-soft/30 pt-2.5">
            <span className="text-xs font-semibold tracking-[0.6px] text-ink">
              Status:
            </span>
            <span className="rounded-xs bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.5px] text-brand">
              Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
