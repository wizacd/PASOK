import { Droplets, Fish, Thermometer, Wheat } from "lucide-react";
import { ActiveOffersTable } from "@/components/produsen/dashboard/active-offers-table";
import { OfferSummaryWidget } from "@/components/produsen/dashboard/offer-summary-widget";
import { PriceCard } from "@/components/produsen/dashboard/price-card";
import { PrimaryActionCard } from "@/components/produsen/dashboard/primary-action-card";
import { RecentActivityList } from "@/components/produsen/dashboard/recent-activity-list";

const WEATHER_STATS = [
  { icon: Thermometer, label: "Suhu Lahan", value: "28°C" },
  { icon: Droplets, label: "Kelembapan", value: "65%" },
];

export default function ProdusenDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            Selamat Pagi, Pak Tani
          </h1>
          <p className="text-base text-body">
            Kamis, 24 Oktober 2024 • Panen Raya Musim Gugur
          </p>
        </div>

        <div className="flex gap-2">
          {WEATHER_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 self-stretch rounded-xs border border-border-soft bg-white px-4 py-2"
              >
                <Icon className="size-[18px] text-brand" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-muted">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-ink">
                    {stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 grid grid-cols-2 gap-4">
          <PriceCard
            icon={Wheat}
            iconClassName="text-forest"
            commodity="Jagung Pipil Kering"
            price="Rp 5.250"
            metaLabel="Harga Pasar Regional"
            metaValue="Stabil"
            trend={{ direction: "up", value: "+2.4%" }}
          />
          <PriceCard
            icon={Fish}
            iconClassName="text-info"
            commodity="Ikan Tongkol"
            price="Rp 24.800"
            metaLabel="Tangkapan Segar"
            metaValue="Permintaan Tinggi"
            trend={{ direction: "down", value: "-1.2%" }}
          />
          <PrimaryActionCard />
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <OfferSummaryWidget />
          <RecentActivityList />
        </div>

        <ActiveOffersTable />
      </div>
    </div>
  );
}
