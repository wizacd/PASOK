import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

type ReferencePrice = {
  commodity: string;
  updatedLabel: string;
  price: string;
  trend: {
    direction: "up" | "down";
    value: string;
  };
};

const REFERENCE_PRICES: ReferencePrice[] = [
  {
    commodity: "Jagung Pipil Kering",
    updatedLabel: "Update: 2 jam yang lalu",
    price: "Rp 8.250",
    trend: { direction: "up", value: "2.4%" },
  },
  {
    commodity: "Ikan Tongkol",
    updatedLabel: "Update: 1 jam yang lalu",
    price: "Rp 24.000",
    trend: { direction: "down", value: "0.5%" },
  },
];

export function ReferencePriceCard() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-border-soft bg-white">
      <div className="flex items-center gap-2 border-b border-border-soft bg-chip px-4 py-4">
        <TrendingUp className="size-[15px] text-ink" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-ink">
          Harga Referensi Hari Ini
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        {REFERENCE_PRICES.map((item, index) => {
          const TrendIcon = item.trend.direction === "up" ? ArrowUp : ArrowDown;
          const trendClassName =
            item.trend.direction === "up" ? "text-brand" : "text-danger";
          const priceClassName =
            item.trend.direction === "up" ? "text-brand" : "text-ink";
          return (
            <div
              key={item.commodity}
              className={`flex items-center justify-between pb-3 ${
                index < REFERENCE_PRICES.length - 1
                  ? "border-b border-chip"
                  : ""
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-ink">
                  {item.commodity}
                </span>
                <span className="text-[10px] text-body">
                  {item.updatedLabel}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-base font-bold ${priceClassName}`}>
                  {item.price}
                </span>
                <span
                  className={`flex items-center gap-1 text-[10px] ${trendClassName}`}
                >
                  <TrendIcon className="size-2" strokeWidth={2.5} />
                  {item.trend.value}
                </span>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="py-1 text-xs font-semibold uppercase tracking-[0.6px] text-brand-deep"
        >
          Lihat Semua Tren Harga
        </button>
      </div>
    </div>
  );
}
