"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import {
  OfferQueuePanel,
  type MatchedOffer,
} from "@/components/koperasi/supply-matching/offer-queue-panel";
import { OfferDetailPanel } from "@/components/koperasi/supply-matching/offer-detail-panel";
import { getAccessToken } from "@/lib/auth";

export default function SupplyMatchingPage() {
  const [offers, setOffers] = useState<MatchedOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<MatchedOffer | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOffers() {
    setLoading(true);
    setError("");

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sesi tidak ditemukan. Silakan masuk kembali.");

      const response = await fetch("/api/koperasi/matching", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Gagal memuat data");
      setOffers(data);
      setSelectedOffer((prev) =>
        prev ? (data.find((o: MatchedOffer) => o.id === prev.id) ?? null) : null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <RequireAuth role="koperasi">
      <div className="flex h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <div className="flex flex-1 overflow-hidden">
            <OfferQueuePanel
              offers={offers}
              selectedId={selectedOffer?.id ?? null}
              onSelect={setSelectedOffer}
              loading={loading}
              error={error}
            />
            <OfferDetailPanel
              offer={selectedOffer}
              onResolved={() => {
                setSelectedOffer(null);
                loadOffers();
              }}
            />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
