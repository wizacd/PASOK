"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  CategoryToggle,
  type CommodityCategory,
} from "@/components/koperasi/register/category-toggle";
import {
  COMMODITIES,
  CommoditySelectionGrid,
} from "@/components/koperasi/register/commodity-selection-grid";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";
import { RegistrationStepper } from "@/components/koperasi/register/registration-stepper";
import { SelectionSummaryCard } from "@/components/koperasi/register/selection-summary-card";
import { StepActionsFooter } from "@/components/koperasi/register/step-actions-footer";

export default function KelolaKomoditasPage() {
  const router = useRouter();
  const wizard = useRegistrationWizard();
  const [category, setCategory] = useState<CommodityCategory>("pertanian");
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleToggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  const selectedCommodities = selected
    .map((id) => COMMODITIES[category].find((item) => item.id === id))
    .filter((item): item is (typeof COMMODITIES)["pertanian"][number] =>
      Boolean(item),
    );
  const selectedLabels = selectedCommodities.map((item) => item.label);

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
      if (selectedCommodities.length > 0) {
        const responses = await Promise.all(
          selectedCommodities.map((item) =>
            fetch("/api/koperasi/produk", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                koperasi_ref: wizard.koperasiRef,
                nama_produk: item.label,
                unit: item.unit,
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
          <div className="flex flex-col gap-4 rounded-sm border border-border-soft bg-white p-6">
            <h2 className="text-xl font-semibold text-ink">
              Pilih Kategori Utama
            </h2>
            <CategoryToggle selected={category} onSelect={setCategory} />
          </div>

          <div className="flex flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">
                Daftar Komoditas{" "}
                <span className="text-info">
                  ({category === "pertanian" ? "Pertanian" : "Kelautan"})
                </span>
              </h2>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-body"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  placeholder="Cari komoditas..."
                  className="h-11 w-64 rounded-xs border border-border-soft bg-white pl-10 pr-4 text-sm text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
                />
              </div>
            </div>

            <CommoditySelectionGrid
              category={category}
              selected={selected}
              onToggle={handleToggle}
            />
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
