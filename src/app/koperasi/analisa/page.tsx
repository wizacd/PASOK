"use client";

import { useEffect, useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import { RequireAuth } from "@/components/auth/require-auth";
import {
  PriceRecommendationCard,
  type RekomendasiHarga,
} from "@/components/koperasi/analisa/price-recommendation-card";
import {
  SupplyForecastChart,
  type PrediksiKomoditas,
} from "@/components/koperasi/analisa/supply-forecast-chart";
import { DashboardSidebar } from "@/components/koperasi/dashboard/dashboard-sidebar";
import { DashboardTopBar } from "@/components/koperasi/dashboard/dashboard-top-bar";
import { supabase } from "@/lib/supabase";

type KomoditasAnalisa = {
  komoditas_ref: string;
  nama_komoditas: string;
  prediksi: PrediksiKomoditas;
  harga: RekomendasiHarga;
};

export default function AnalisaPage() {
  const [daftarKomoditas, setDaftarKomoditas] = useState<KomoditasAnalisa[]>([]);
  const [selectedRef, setSelectedRef] = useState("");
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
          `/api/koperasi/analisa?koperasi_ref=${profile.koperasi_ref}`,
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Gagal memuat data");
        setDaftarKomoditas(data.komoditas);
        if (data.komoditas.length > 0) {
          setSelectedRef(data.komoditas[0].komoditas_ref);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const selected = useMemo(
    () => daftarKomoditas.find((k) => k.komoditas_ref === selectedRef) ?? null,
    [daftarKomoditas, selectedRef],
  );

  return (
    <RequireAuth role="koperasi">
      <div className="flex min-h-screen w-full bg-canvas">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar />

          <main className="flex flex-1 flex-col gap-8 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
                  Analisa
                </h1>
                <p className="text-base text-body">
                  Prediksi volume panen dan rekomendasi harga per komoditas di
                  wilayah koperasi.
                </p>
              </div>

              {daftarKomoditas.length > 0 ? (
                <select
                  value={selectedRef}
                  onChange={(event) => setSelectedRef(event.target.value)}
                  className="h-12 min-w-[240px] rounded-xs border border-border-soft bg-white px-4 text-base text-ink focus:border-info focus:outline-none"
                >
                  {daftarKomoditas.map((k) => (
                    <option key={k.komoditas_ref} value={k.komoditas_ref}>
                      {k.nama_komoditas}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>

            {error ? (
              <p className="rounded-xs border border-danger/20 bg-danger/5 px-6 py-4 text-sm text-danger">
                {error}
              </p>
            ) : loading ? (
              <p className="text-sm text-body">Memuat analisa...</p>
            ) : !selected ? (
              <p className="rounded-xs border border-border-soft bg-white px-6 py-10 text-center text-sm text-body">
                Belum ada komoditas terdaftar untuk wilayah koperasi ini.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <SupplyForecastChart prediksi={selected.prediksi} />
                  </div>
                  <div className="col-span-4">
                    <PriceRecommendationCard harga={selected.harga} />
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xs border border-border-soft bg-white p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/10">
                    <Lightbulb className="size-5 text-warning" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-ink">
                      Cara Kerja Analisa Ini
                    </h3>
                    <p className="text-sm leading-6 text-body">
                      <strong>Prediksi volume</strong> dihitung dari agregat penawaran
                      aktif yang dikelompokkan per bulan estimasi panen — semakin
                      banyak bulan dengan data, semakin tinggi tingkat keyakinannya.{" "}
                      <strong>Rekomendasi harga</strong> dihitung dari kombinasi
                      harga acuan pemerintah dan rata-rata harga transaksi produsen
                      di wilayah yang sama.
                    </p>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
