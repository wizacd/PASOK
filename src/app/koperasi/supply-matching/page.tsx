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
import { supabase } from "@/lib/supabase";

export default function SupplyMatchingPage() {
  const [koperasiRef, setKoperasiRef] = useState<string | null>(null);
  const [offers, setOffers] = useState<MatchedOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<MatchedOffer | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOffers(ref: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/koperasi/matching?koperasi_ref=${ref}`,
      );
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

      setKoperasiRef(profile.koperasi_ref);
      loadOffers(profile.koperasi_ref);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              koperasiRef={koperasiRef ?? ""}
              onAccepted={() => koperasiRef && loadOffers(koperasiRef)}
            />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
