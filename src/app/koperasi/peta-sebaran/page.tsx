"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  FilterPanel,
  type FilterState,
} from "@/components/koperasi/peta-sebaran/filter-panel";
import { MapLegend } from "@/components/koperasi/peta-sebaran/map-legend";
import {
  PRODUCER_PINS,
  type ProducerPin,
} from "@/components/koperasi/peta-sebaran/producer-data";
import { ProducerDetailDrawer } from "@/components/koperasi/peta-sebaran/producer-detail-drawer";

const DistributionMap = dynamic(
  () =>
    import("@/components/koperasi/peta-sebaran/distribution-map").then(
      (mod) => mod.DistributionMap,
    ),
  { ssr: false },
);

const INITIAL_FILTERS: FilterState = {
  kategori: "pertanian",
  komoditas: [],
  radiusKm: 45,
  status: [],
};

export default function PetaSebaranPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedPin, setSelectedPin] = useState<ProducerPin | null>(null);

  const visiblePins = useMemo(() => {
    return PRODUCER_PINS.filter((pin) => {
      if (pin.kategori !== filters.kategori) return false;

      if (filters.komoditas.length > 0 && !filters.komoditas.includes(pin.komoditas)) {
        return false;
      }

      if (filters.status.length > 0) {
        const matchesTersedia =
          filters.status.includes("Tersedia (Ready Stock)") &&
          pin.status === "Tersedia";
        const matchesPanen =
          filters.status.includes("Segera Panen (Estimasi 7 Hari)") &&
          pin.status === "Segera Panen";
        if (!matchesTersedia && !matchesPanen) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <RequireAuth role="koperasi">
      <div className="flex h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <div className="relative flex-1 overflow-hidden">
            <DistributionMap
              pins={visiblePins}
              selectedPin={selectedPin}
              onSelectPin={setSelectedPin}
            />

            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onApply={() => setSelectedPin(null)}
            />

            <MapLegend />

            <ProducerDetailDrawer
              pin={selectedPin}
              onClose={() => setSelectedPin(null)}
            />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
