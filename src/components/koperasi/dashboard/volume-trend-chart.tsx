"use client";

import { useState } from "react";

const WEEKLY_DATA = [
  { label: "Sen", value: 1.2, heightPx: 60 },
  { label: "Sel", value: 2.8, heightPx: 100 },
  { label: "Rab", value: 1.9, heightPx: 75 },
  { label: "Kam", value: 4.1, heightPx: 130 },
  { label: "Jum", value: 1.5, heightPx: 68 },
  { label: "Sab", value: 0.8, heightPx: 45 },
  { label: "Min", value: 0.3, heightPx: 25 },
];

const PEAK_VALUE = Math.max(...WEEKLY_DATA.map((item) => item.value));

export function VolumeTrendChart() {
  const [period, setPeriod] = useState<"mingguan" | "bulanan">("mingguan");

  return (
    <div className="flex w-full flex-col rounded-xs border border-border-soft bg-white">
      <div className="flex items-center justify-between border-b border-border-soft px-6 py-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-ink">
            Tren Volume Transaksi
          </h3>
          <p className="text-sm text-body">
            Perbandingan volume harian tonase komoditas
          </p>
        </div>

        <div className="flex gap-1 rounded-xs bg-chip p-1">
          <button
            type="button"
            onClick={() => setPeriod("mingguan")}
            className={`rounded-xs px-4 py-1.5 text-xs font-semibold tracking-[0.6px] ${
              period === "mingguan"
                ? "bg-white text-forest shadow-sm"
                : "text-body"
            }`}
          >
            Mingguan
          </button>
          <button
            type="button"
            onClick={() => setPeriod("bulanan")}
            className={`rounded-xs px-4 py-1.5 text-xs font-semibold tracking-[0.6px] ${
              period === "bulanan"
                ? "bg-white text-forest shadow-sm"
                : "text-body"
            }`}
          >
            Bulanan
          </button>
        </div>
      </div>

      <div className="flex min-h-[360px] items-end justify-between gap-4 px-8 py-8">
        {WEEKLY_DATA.map((item) => (
          <div
            key={item.label}
            className="group flex flex-1 flex-col items-center gap-4"
          >
            <div className="relative flex w-full flex-col items-center">
              <span className="pointer-events-none absolute -top-8 rounded-xs bg-ink px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.value}T
              </span>
              <div
                className={`w-full rounded-t-xs ${
                  item.value === PEAK_VALUE ? "bg-info" : "bg-chip"
                }`}
                style={{ height: `${item.heightPx}px` }}
              />
            </div>
            <span className="text-[11px] font-medium text-body">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
