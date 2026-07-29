"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommoditySelectionGrid,
  type KomoditasOption,
} from "@/components/koperasi/register/commodity-selection-grid";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";
import { RegistrationStepper } from "@/components/koperasi/register/registration-stepper";
import { SelectionSummaryCard } from "@/components/koperasi/register/selection-summary-card";
import { StepActionsFooter } from "@/components/koperasi/register/step-actions-footer";
import { getAccessToken } from "@/lib/auth";

export default function KelolaKomoditasPage() {
  const router = useRouter();
  const wizard = useRegistrationWizard();
  const [komoditasOptions, setKomoditasOptions] = useState<KomoditasOption[]>([]);
  const [isLoadingKomoditas, setIsLoadingKomoditas] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!wizard.wilayah?.kodeWilayah) {
      setIsLoadingKomoditas(false);
      return;
    }
    fetch(`/api/wilayah/komoditas?kode_wilayah=${encodeURIComponent(wizard.wilayah.kodeWilayah)}`)
      .then((res) => res.json())
      .then((data) => setKomoditasOptions(Array.isArray(data) ? data : []))
      .finally(() => setIsLoadingKomoditas(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wizard.wilayah?.kodeWilayah]);

  function handleToggle(komoditasRef: string) {
    setSelected((prev) =>
      prev.includes(komoditasRef)
        ? prev.filter((item) => item !== komoditasRef)
        : [...prev, komoditasRef],
    );
  }

  const filteredOptions = useMemo(
    () =>
      komoditasOptions.filter((item) =>
        item.nama_komoditas.toLowerCase().includes(search.toLowerCase()),
      ),
    [komoditasOptions, search],
  );

  const selectedCommodities = selected
    .map((ref) => komoditasOptions.find((item) => item.komoditas_ref === ref))
    .filter((item): item is KomoditasOption => Boolean(item));
  const selectedLabels = selectedCommodities.map((item) => item.nama_komoditas);

  async function handleNext() {
    if (!wizard.koperasiRef) {
      setError(
        "Data pendaftaran tidak ditemukan. Silakan ulangi dari step 1.",
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Sesi tidak ditemukan. Silakan masuk kembali.");
      }

      if (selectedCommodities.length > 0) {
        const responses = await Promise.all(
          selectedCommodities.map((item) =>
            fetch("/api/koperasi/produk", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                nama_produk: item.nama_komoditas,
                unit: "Kg",
              }),
            }),
          ),
        );

        for (const response of responses) {
          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error ?? "Gagal menyimpan komoditas.");
          }
        }
      }

      const selesaiHref = `/koperasi/register/selesai?koperasi_ref=${encodeURIComponent(
        wizard.koperasiRef,
      )}&komoditas=${encodeURIComponent(selectedLabels.join(","))}`;
      router.push(selesaiHref);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menyimpan komoditas.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <RegistrationStepper currentStep={3} />

      <div className="grid w-full grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">
                Daftar Komoditas{" "}
                <span className="text-info">
                  {wizard.wilayah ? `(${wizard.wilayah.label})` : ""}
                </span>
              </h2>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-body"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari komoditas..."
                  className="h-11 w-64 rounded-xs border border-border-soft bg-white pl-10 pr-4 text-sm text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
                />
              </div>
            </div>

            {isLoadingKomoditas ? (
              <p className="py-8 text-center text-sm text-body">
                Memuat komoditas untuk wilayah Anda...
              </p>
            ) : (
              <CommoditySelectionGrid
                komoditasOptions={filteredOptions}
                selected={selected}
                onToggle={handleToggle}
              />
            )}
          </div>
        </div>

        <div className="col-span-4">
          <SelectionSummaryCard selected={selectedLabels} />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white">
        <StepActionsFooter
          backHref="/koperasi/register/cakupan-operasi"
          nextLabel={isSubmitting ? "Menyimpan..." : "Selesaikan Pendaftaran"}
          nextDisabled={isSubmitting}
          onNext={handleNext}
        />
      </div>
    </>
  );
}
