"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sprout,
} from "lucide-react";
import {
  useProdusenWizard,
  type KomoditasSelection,
} from "@/components/onboarding/produsen/registration-wizard-context";

type KomoditasRow = { komoditas_ref: string; nama_komoditas: string };

export function CommoditySelector() {
  const router = useRouter();
  const wizard = useProdusenWizard();
  const [options, setOptions] = useState<KomoditasRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!wizard.kodeWilayah) {
      setOptions([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetch(`/api/wilayah/komoditas?kode_wilayah=${encodeURIComponent(wizard.kodeWilayah)}`)
      .then((res) => res.json())
      .then((data) => setOptions(Array.isArray(data) ? data : []))
      .finally(() => setIsLoading(false));
  }, [wizard.kodeWilayah]);

  const selectedRefs = new Set(wizard.komoditas.map((item) => item.komoditasRef));

  function toggle(row: KomoditasRow) {
    const isSelected = selectedRefs.has(row.komoditas_ref);
    const next: KomoditasSelection[] = isSelected
      ? wizard.komoditas.filter((item) => item.komoditasRef !== row.komoditas_ref)
      : [
          ...wizard.komoditas,
          { komoditasRef: row.komoditas_ref, namaKomoditas: row.nama_komoditas },
        ];
    wizard.setField("komoditas", next);
  }

  function handleNext() {
    router.push("/onboarding/produsen/kapasitas");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
            Apa yang Anda produksi?
          </h2>
          <p className="text-base leading-6 text-body">
            Pilih semua komoditas utama yang Anda hasilkan untuk dipasarkan.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-body">Memuat komoditas untuk wilayah Anda...</p>
        ) : options.length === 0 ? (
          <p className="text-sm text-body">
            Belum ada data komoditas untuk wilayah yang Anda pilih. Silakan hubungi
            koperasi setempat atau kembali ke langkah Lokasi.
          </p>
        ) : (
          <div
            role="group"
            aria-label="Pilih komoditas"
            className="grid w-full grid-cols-3 gap-6"
          >
            {options.map((row) => {
              const isSelected = selectedRefs.has(row.komoditas_ref);
              return (
                <button
                  key={row.komoditas_ref}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(row)}
                  className={`relative flex flex-col items-center gap-4 rounded-lg border p-6 transition-colors ${
                    isSelected
                      ? "border-brand bg-chip"
                      : "border-border-soft bg-white hover:border-brand/50"
                  }`}
                >
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-chip">
                    <Sprout className="size-7 text-ink" strokeWidth={1.75} />
                  </div>
                  <span className="text-xl font-semibold text-ink">
                    {row.nama_komoditas}
                  </span>
                  <span className="absolute right-3 top-3">
                    {isSelected ? (
                      <CheckCircle2 className="size-5 text-brand" strokeWidth={2} />
                    ) : (
                      <Circle className="size-5 text-border-soft" strokeWidth={2} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between pt-4 pb-20">
        <button
          type="button"
          onClick={() => router.push("/onboarding/produsen/lokasi")}
          className="flex items-center gap-3 rounded-xs border border-brand-deep px-8 py-3 text-xl font-semibold text-brand-deep"
        >
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          Kembali
        </button>
        <button
          type="button"
          disabled={selectedRefs.size === 0}
          onClick={handleNext}
          className="flex items-center gap-3 rounded-sm bg-brand px-10 py-4 text-xl font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,138,169,0.2),0px_4px_6px_-4px_rgba(0,138,169,0.2)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Lanjutkan
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
