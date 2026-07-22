"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Lightbulb,
  Sun,
  Sunrise,
  TreePalm,
  type LucideIcon,
} from "lucide-react";
import {
  useProdusenWizard,
  type FrekuensiPanen,
} from "@/components/onboarding/produsen/registration-wizard-context";
import { signIn, getDashboardPath, getRole } from "@/lib/auth";

const FREKUENSI_OPTIONS: { id: FrekuensiPanen; label: string; icon: LucideIcon }[] = [
  { id: "harian", label: "Harian", icon: Sunrise },
  { id: "mingguan", label: "Mingguan", icon: CalendarDays },
  { id: "bulanan", label: "Bulanan", icon: Sun },
  { id: "musiman", label: "Musiman", icon: TreePalm },
];

const TIPS = [
  "Meminimalkan kerugian pasca-panen (post-harvest loss).",
  "Menjamin ketersediaan armada transportasi tepat waktu.",
  "Menstabilkan harga jual melalui kontrak forward.",
];

export function KapasitasForm() {
  const router = useRouter();
  const wizard = useProdusenWizard();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleNext() {
    if (!wizard.volumePanen || !wizard.luasLahan || !wizard.bulanPanen) {
      setError("Lengkapi estimasi volume, luas lahan, dan bulan panen terdekat.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/produsen/registrasi-lengkap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: wizard.nama,
          email: wizard.email,
          password: wizard.password,
          kode_wilayah: wizard.kodeWilayah,
          lokasi_lat: wizard.lat,
          lokasi_lng: wizard.lng,
          alamat: wizard.alamat,
          komoditas: wizard.komoditas.map((item) => ({
            komoditas_ref: item.komoditasRef,
          })),
          estimasi_volume: Number(wizard.volumePanen),
          estimasi_tanggal_panen: `${wizard.bulanPanen}-01`,
          luas_lahan_hektar: Number(wizard.luasLahan),
          frekuensi_panen: wizard.frekuensiPanen,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Gagal menyelesaikan pendaftaran.");
      }

      const { user } = await signIn(wizard.email, wizard.password);
      router.push(getDashboardPath(getRole(user)));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menyelesaikan pendaftaran.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[1016px] items-start gap-8">
      <div className="flex flex-1 flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            Berapa kapasitas produksi Anda?
          </h2>
          <p className="text-base leading-6 text-body">
            Informasi ini membantu kami merencanakan logistik dan penyerapan hasil
            bumi Anda agar efisien.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                Estimasi Volume Panen
              </label>
              <div className="flex h-[42px] w-full">
                <input
                  type="number"
                  min={0}
                  value={wizard.volumePanen}
                  onChange={(event) => wizard.setField("volumePanen", event.target.value)}
                  placeholder="0"
                  className="h-full w-full flex-1 rounded-l-sm border border-[#90a7b4] bg-white px-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                />
                <span className="flex shrink-0 items-center rounded-r-sm border border-l-0 border-[#90a7b4] bg-chip px-4 text-xs font-semibold tracking-[0.6px] text-ink">
                  Ton
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
                Luas Lahan / Pangkalan
              </label>
              <div className="flex h-[42px] w-full">
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={wizard.luasLahan}
                  onChange={(event) => wizard.setField("luasLahan", event.target.value)}
                  placeholder="Contoh: 1.5"
                  className="h-full w-full flex-1 rounded-l-sm border border-[#90a7b4] bg-white px-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
                />
                <span className="flex shrink-0 items-center rounded-r-sm border border-l-0 border-[#90a7b4] bg-chip px-4 text-xs font-semibold tracking-[0.6px] text-ink">
                  Hektar
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Frekuensi Panen
            </label>
            <div className="flex items-start gap-3">
              {FREKUENSI_OPTIONS.map((option) => {
                const isSelected = wizard.frekuensiPanen === option.id;
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => wizard.setField("frekuensiPanen", option.id)}
                    className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-sm border-2 px-4 py-[18px] ${
                      isSelected
                        ? "border-brand-deep bg-brand-deep text-white"
                        : "border-[#90a7b4] bg-white text-ink"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                    <span className="text-xs font-semibold tracking-[0.6px]">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Bulan Panen Terdekat
            </label>
            <input
              type="month"
              value={wizard.bulanPanen}
              onChange={(event) => wizard.setField("bulanPanen", event.target.value)}
              className="h-[48px] w-full rounded-sm border border-[#90a7b4] bg-white px-4 text-base text-ink focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-lg border border-[#90a7b4]/50 bg-chip px-[25px] py-[25px]">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-white/60">
            <ArrowRight className="size-8 text-brand-deep/40" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-semibold text-brand-deep">
              Logistics Match-Making
            </h4>
            <p className="text-sm leading-5 text-[#002f48]">
              Sistem kami akan mencocokkan kapasitas Anda dengan armada logistik
              terdekat secara otomatis setelah pendaftaran selesai.
            </p>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex w-full items-center justify-between border-t border-border-soft pt-6">
          <button
            type="button"
            onClick={() => router.push("/onboarding/produsen/komoditas")}
            className="flex items-center gap-3 rounded-xs border border-brand-deep px-10 py-4 text-xl font-semibold text-brand-deep"
          >
            <ArrowLeft className="size-4" strokeWidth={2.5} />
            Kembali
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-3 rounded-sm bg-brand px-10 py-4 text-xl font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,138,169,0.2),0px_4px_6px_-4px_rgba(0,138,169,0.2)] disabled:opacity-60"
          >
            {isSubmitting ? "Menyimpan..." : "Selesaikan Pendaftaran"}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <aside className="flex w-80 shrink-0 flex-col gap-4 rounded-lg border border-border-soft bg-white p-[25px]">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-5 text-warning" strokeWidth={2} />
          <h3 className="text-xl font-semibold text-warning">
            Mengapa ini penting?
          </h3>
        </div>
        <p className="text-sm leading-[22.75px] text-body">
          Data kapasitas membantu PASOK mengamankan pembeli (off-taker) lebih
          awal. Dengan mengetahui jadwal panen Anda, kami bisa:
        </p>
        <ul className="flex flex-col gap-3">
          {TIPS.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-5 text-ink">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
              {tip}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
