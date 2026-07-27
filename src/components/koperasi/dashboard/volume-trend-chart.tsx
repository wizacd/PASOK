"use client";

export type TrendHarian = { label: string; volume_kg: number };

export function VolumeTrendChart({ data }: { data: TrendHarian[] }) {
  const peak = Math.max(...data.map((item) => item.volume_kg), 1);

  return (
    <div className="flex w-full flex-col rounded-xs border border-border-soft bg-white">
      <div className="border-b border-border-soft px-6 py-6">
        <h3 className="text-xl font-semibold text-ink">
          Tren Volume Stok Diterima
        </h3>
        <p className="text-sm text-body">
          Volume komoditas yang diterima koperasi 7 hari terakhir
        </p>
      </div>

      <div className="flex min-h-[360px] items-end justify-between gap-4 px-8 py-8">
        {data.every((item) => item.volume_kg === 0) ? (
          <p className="w-full py-24 text-center text-sm text-body">
            Belum ada aktivitas dalam 7 hari terakhir.
          </p>
        ) : (
          data.map((item, index) => {
            const heightPx = Math.max(
              4,
              Math.round((item.volume_kg / peak) * 260)
            );
            return (
              <div
                key={`${item.label}-${index}`}
                className="group flex flex-1 flex-col items-center gap-4"
              >
                <div className="relative flex w-full flex-col items-center">
                  <span className="pointer-events-none absolute -top-8 rounded-xs bg-ink px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.volume_kg.toLocaleString("id-ID")} Kg
                  </span>
                  <div
                    className={`w-full rounded-t-xs ${
                      item.volume_kg === peak && item.volume_kg > 0
                        ? "bg-info"
                        : "bg-chip"
                    }`}
                    style={{ height: `${heightPx}px` }}
                  />
                </div>
                <span className="text-[11px] font-medium text-body">
                  {item.label}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
