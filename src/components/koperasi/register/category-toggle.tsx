"use client";

import { Sprout, Waves } from "lucide-react";

const CATEGORIES = [
  { id: "pertanian", label: "Pertanian", icon: Sprout },
  { id: "kelautan", label: "Kelautan", icon: Waves },
] as const;

export type CommodityCategory = (typeof CATEGORIES)[number]["id"];

export function CategoryToggle({
  selected,
  onSelect,
}: {
  selected: CommodityCategory;
  onSelect: (category: CommodityCategory) => void;
}) {
  return (
    <div className="flex w-full gap-4">
      {CATEGORIES.map(({ id, label, icon: Icon }) => {
        const isActive = id === selected;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex flex-1 items-center justify-center gap-3 rounded-sm p-[18px] text-base ${
              isActive
                ? "border-2 border-success bg-info text-white"
                : "border border-border-soft text-body"
            }`}
          >
            <Icon className="size-5" strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
