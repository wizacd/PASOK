"use client";

import { Sprout } from "lucide-react";

export type KomoditasOption = {
  komoditas_ref: string;
  nama_komoditas: string;
};

export function CommoditySelectionGrid({
  komoditasOptions,
  selected,
  onToggle,
}: {
  komoditasOptions: KomoditasOption[];
  selected: string[];
  onToggle: (komoditasRef: string) => void;
}) {
  if (komoditasOptions.length === 0) {
    return (
      <p className="w-full py-8 text-center text-sm text-body">
        Belum ada data komoditas untuk wilayah yang dipilih.
      </p>
    );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {komoditasOptions.map(({ komoditas_ref, nama_komoditas }) => {
        const isChecked = selected.includes(komoditas_ref);
        return (
          <label
            key={komoditas_ref}
            className="flex cursor-pointer flex-col items-center gap-3 rounded-sm border border-border-soft bg-canvas p-[17px]"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-chip">
              <Sprout className="size-[18px] text-info" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold tracking-[0.6px] text-ink">
              {nama_komoditas}
            </span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(komoditas_ref)}
              aria-label={`Pilih ${nama_komoditas}`}
              className="size-4 rounded-xs border border-muted text-info focus:ring-info"
            />
          </label>
        );
      })}
    </div>
  );
}
