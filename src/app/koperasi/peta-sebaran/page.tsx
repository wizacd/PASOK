"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  FilterPanel,
  type FilterState,
} from "@/components/koperasi/peta-sebaran/filter-panel";
import { MapLegend } from "@/components/koperasi/peta-sebaran/map-legend";
import {
  mapPenawaranToPin,
  type PenawaranPeta,
  type ProducerPin,
} from "@/components/koperasi/peta-sebaran/producer-data";
import { ProducerDetailDrawer } from "@/components/koperasi/peta-sebaran/producer-detail-drawer";
import { supabase } from "@/lib/supabase";

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
  radiusKm: 100,
  status: [],
};

export default function PetaSebaranPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedPin, setSelectedPin] = useState<ProducerPin | null>(null);
  const [pins, setPins] = useState<ProducerPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("koperasi_ref")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile?.koperasi_ref) {
        setError("Tidak menemukan data koperasi untuk akun ini.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/koperasi/peta?koperasi_ref=${profile.koperasi_ref}`,
        );
        const data: PenawaranPeta[] = await response.json();
        if (!response.ok) throw new Error("Gagal memuat data peta");
        setPins(
          data
            .map(mapPenawaranToPin)
            .filter((pin): pin is ProducerPin => pin !== null),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const komoditasOptions = useMemo(
    () => [...new Set(pins.map((pin) => pin.komoditas))].sort(),
    [pins],
  );

  const visiblePins = useMemo(() => {
    return pins.filter((pin) => {
      if (pin.kategori !== filters.kategori) return false;

      if (filters.komoditas.length > 0 && !filters.komoditas.includes(pin.komoditas)) {
        return false;
      }

      if (
        pin.jarak_km !== null &&
        pin.jarak_km > filters.radiusKm
      ) {
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
  }, [pins, filters]);

  return (
    <RequireAuth role="koperasi">
      <div className="flex h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <div className="relative flex-1 overflow-hidden">
            {error ? (
              <div className="flex h-full items-center justify-center">
                <p className="rounded-xs border border-danger/20 bg-danger/5 px-6 py-4 text-sm text-danger">
                  {error}
                </p>
              </div>
            ) : loading ? (
              <div className="flex h-full items-center justify-center text-sm text-body">
                Memuat peta sebaran...
              </div>
            ) : (
              <>
                <DistributionMap
                  pins={visiblePins}
                  selectedPin={selectedPin}
                  onSelectPin={setSelectedPin}
                />

                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onApply={() => setSelectedPin(null)}
                  komoditasOptions={komoditasOptions}
                />

                <MapLegend />

                <ProducerDetailDrawer
                  pin={selectedPin}
                  onClose={() => setSelectedPin(null)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
