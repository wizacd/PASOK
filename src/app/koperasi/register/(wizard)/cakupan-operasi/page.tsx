"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CoverageMapCard } from "@/components/koperasi/register/coverage-map-card";
import { CoverageSummaryCard } from "@/components/koperasi/register/coverage-summary-card";
import { EfficiencyTipsCard } from "@/components/koperasi/register/efficiency-tips-card";
import { LogisticsHubTable } from "@/components/koperasi/register/logistics-hub-table";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";
import { RegistrationStepper } from "@/components/koperasi/register/registration-stepper";
import { StepActionsFooter } from "@/components/koperasi/register/step-actions-footer";

export default function CakupanOperasiPage() {
  const router = useRouter();
  const wizard = useRegistrationWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleNext() {
    if (!wizard.wilayah) {
      setError("Pilih wilayah pusat operasi terlebih dahulu.");
      return;
    }

    if (
      !wizard.namaKoperasi ||
      !wizard.email ||
      !wizard.password ||
      !wizard.nikPengurus ||
      !wizard.nikop ||
      !wizard.akteFile ||
      !wizard.nibFile
    ) {
      setError(
        "Data profil koperasi tidak lengkap. Silakan kembali ke step 1.",
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("email", wizard.email);
    formData.set("password", wizard.password);
    formData.set("nama_koperasi", wizard.namaKoperasi);
    formData.set("nik_pengurus", wizard.nikPengurus);
    formData.set("nikop", wizard.nikop);
    formData.set("kode_wilayah", wizard.wilayah.kodeWilayah);
    formData.set("akte", wizard.akteFile);
    formData.set("nib", wizard.nibFile);

    try {
      const response = await fetch("/api/koperasi/registrasi-lengkap", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Gagal menyimpan data koperasi.");
      }

      wizard.setField("koperasiRef", result.koperasi_ref);
      router.push("/koperasi/register/kelola-komoditas");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menyimpan data koperasi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <RegistrationStepper currentStep={2} />

      <div className="grid w-full grid-cols-12 gap-6">
        <div className="col-span-8 flex flex-col gap-6">
          <CoverageMapCard />
          <LogisticsHubTable />
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <CoverageSummaryCard />
          <EfficiencyTipsCard />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white">
        <StepActionsFooter
          backHref="/koperasi/register"
          nextLabel={isSubmitting ? "Menyimpan..." : "Simpan & Lanjutkan"}
          nextDisabled={isSubmitting}
          onNext={handleNext}
          helperText={
            wizard.wilayah ? wizard.wilayah.label : "Pilih wilayah dulu"
          }
        />
      </div>
    </>
  );
}
