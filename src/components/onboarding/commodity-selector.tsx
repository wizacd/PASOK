"use client";

import { useState } from "react";
import {
  ArrowRight,
  Carrot,
  CheckCircle2,
  Circle,
  Coffee,
  Fish,
  PawPrint,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";

type Commodity = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const COMMODITIES: Commodity[] = [
  { id: "padi", label: "Padi", icon: Wheat },
  { id: "jagung", label: "Jagung", icon: Sprout },
  { id: "ikan", label: "Ikan", icon: Fish },
  { id: "ternak", label: "Ternak", icon: PawPrint },
  { id: "kopi", label: "Kopi", icon: Coffee },
  { id: "sayur", label: "Sayur", icon: Carrot },
];

export function CommoditySelector() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            Apa yang Anda produksi?
          </h2>
          <p className="text-base leading-6 text-body">
            Pilih semua komoditas utama yang Anda hasilkan untuk dipasarkan.
          </p>
        </div>

        <div
          role="group"
          aria-label="Pilih komoditas"
          className="grid w-full grid-cols-3 gap-6"
        >
          {COMMODITIES.map((commodity) => {
            const isSelected = selected.has(commodity.id);
            const Icon = commodity.icon;
            return (
              <button
                key={commodity.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(commodity.id)}
                className={`relative flex flex-col items-center gap-4 rounded-lg border p-6 transition-colors ${
                  isSelected
                    ? "border-brand bg-chip"
                    : "border-border-soft bg-white hover:border-brand/50"
                }`}
              >
                <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-chip">
                  <Icon className="size-7 text-ink" strokeWidth={1.75} />
                </div>
                <span className="text-xl font-semibold text-ink">
                  {commodity.label}
                </span>
                <span className="absolute right-3 top-3">
                  {isSelected ? (
                    <CheckCircle2 className="size-5 text-brand" strokeWidth={2} />
                  ) : (
                    <Circle className="size-5 text-border-soft" strokeWidth={2} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex w-full items-center justify-between pt-4 pb-20">
        <button
          type="button"
          className="invisible flex flex-col items-center justify-center rounded px-8 py-3 text-xl font-semibold text-body"
        >
          Kembali
        </button>
        <button
          type="button"
          disabled={selected.size === 0}
          className="flex items-center gap-3 rounded-sm bg-brand px-10 py-4 text-xl font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,138,169,0.2),0px_4px_6px_-4px_rgba(0,138,169,0.2)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Lanjutkan
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
