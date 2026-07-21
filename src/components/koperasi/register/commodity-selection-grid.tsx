"use client";

import { Coffee, Flower2, Leaf, Sprout, Trees, Wheat, type LucideIcon } from "lucide-react";
import type { CommodityCategory } from "@/components/koperasi/register/category-toggle";

export const COMMODITIES: Record<
  CommodityCategory,
  { id: string; label: string; unit: string; icon: LucideIcon }[]
> = {
  pertanian: [
    { id: "jagung", label: "Jagung", unit: "Ton", icon: Wheat },
    { id: "padi", label: "Padi", unit: "Ton", icon: Sprout },
    { id: "kedelai", label: "Kedelai", unit: "Ton", icon: Leaf },
    { id: "kopi", label: "Kopi", unit: "Kg", icon: Coffee },
    { id: "kelapa-sawit", label: "Kelapa Sawit", unit: "Ton", icon: Trees },
    { id: "tebu", label: "Tebu", unit: "Ton", icon: Flower2 },
  ],
  kelautan: [],
};

export function CommoditySelectionGrid({
  category,
  selected,
  onToggle,
}: {
  category: CommodityCategory;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const commodities = COMMODITIES[category];

  if (commodities.length === 0) {
    return (
      <p className="w-full py-8 text-center text-sm text-body">
        Komoditas kelautan akan segera tersedia.
      </p>
    );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {commodities.map(({ id, label, icon: Icon }) => {
        const isChecked = selected.includes(id);
        return (
          <div
            key={id}
            className="flex flex-col items-center gap-3 rounded-sm border border-border-soft bg-canvas p-[17px]"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-chip">
              <Icon className="size-[18px] text-info" strokeWidth={2} />
            </div>
            <span className="text-xs font-semibold tracking-[0.6px] text-ink">
              {label}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(id)}
                aria-label={`Pilih ${label}`}
                className="size-4 rounded-xs border border-muted text-info focus:ring-info"
              />
              <button
                type="button"
                className="text-[10px] font-bold uppercase tracking-[0.5px] text-info"
              >
                Atur
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
