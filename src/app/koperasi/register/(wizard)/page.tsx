"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BadgeCheck, FileUp } from "lucide-react";
import { DocumentUploadCard } from "@/components/koperasi/register/document-upload-card";
import { GuidanceNote } from "@/components/koperasi/register/guidance-note";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";
import { RegistrationStepper } from "@/components/koperasi/register/registration-stepper";
import { StepActionsFooter } from "@/components/koperasi/register/step-actions-footer";

export default function RegisterKoperasiPage() {
  const router = useRouter();
  const wizard = useRegistrationWizard();
  const [error, setError] = useState("");

  function handleNext() {
    if (
      !wizard.namaKoperasi ||
      !wizard.email ||
      !wizard.password ||
      !wizard.nikPengurus ||
      !wizard.nikop ||
      !wizard.akteFile ||
      !wizard.nibFile
    ) {
      setError("Lengkapi semua data dan unggah kedua dokumen sebelum lanjut.");
      return;
    }

    if (wizard.password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    setError("");
    router.push("/koperasi/register/cakupan-operasi");
  }

  return (
    <>
      <RegistrationStepper currentStep={1} />

      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-white">
        <div className="flex flex-col gap-8 p-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-ink">
              Unggah Dokumen Legalitas
            </h2>
            <p className="text-sm text-body">
              Pastikan dokumen dalam format PDF atau JPG dengan ukuran
              maksimal 5MB untuk mempercepat proses verifikasi otomatis kami.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="koperasi-nama"
              className="text-xs font-semibold tracking-[0.6px] text-body"
            >
              Nama Koperasi
            </label>
            <input
              id="koperasi-nama"
              name="nama_koperasi"
              type="text"
              placeholder="Contoh: Koperasi Tani Makmur"
              value={wizard.namaKoperasi}
              onChange={(event) =>
                wizard.setField("namaKoperasi", event.target.value)
              }
              className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="koperasi-email"
                className="text-xs font-semibold tracking-[0.6px] text-body"
              >
                Email
              </label>
              <input
                id="koperasi-email"
                name="email"
                type="email"
                placeholder="Contoh: manager@coop.id"
                value={wizard.email}
                onChange={(event) =>
                  wizard.setField("email", event.target.value)
                }
                className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="koperasi-password"
                className="text-xs font-semibold tracking-[0.6px] text-body"
              >
                Kata Sandi
              </label>
              <input
                id="koperasi-password"
                name="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={wizard.password}
                onChange={(event) =>
                  wizard.setField("password", event.target.value)
                }
                className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="koperasi-nik"
                className="text-xs font-semibold tracking-[0.6px] text-body"
              >
                NIK Pengurus Utama
              </label>
              <input
                id="koperasi-nik"
                name="nik"
                type="text"
                inputMode="numeric"
                placeholder="Masukkan 16 digit NIK"
                value={wizard.nikPengurus}
                onChange={(event) =>
                  wizard.setField("nikPengurus", event.target.value)
                }
                className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="koperasi-nikop"
                className="text-xs font-semibold tracking-[0.6px] text-body"
              >
                Nomor Registrasi Koperasi (NIKOP)
              </label>
              <input
                id="koperasi-nikop"
                name="nikop"
                type="text"
                placeholder="Contoh: 123/BH/M.KUKM.2/I/2024"
                value={wizard.nikop}
                onChange={(event) =>
                  wizard.setField("nikop", event.target.value)
                }
                className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <DocumentUploadCard
              icon={<FileUp className="size-8 text-info" strokeWidth={1.5} />}
              label="Akte Pendirian Koperasi"
              onFileSelect={(file) => wizard.setField("akteFile", file)}
            />
            <DocumentUploadCard
              icon={
                <BadgeCheck className="size-8 text-info" strokeWidth={1.5} />
              }
              label="Sertifikat NIB"
              onFileSelect={(file) => wizard.setField("nibFile", file)}
            />
          </div>

          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <StepActionsFooter onNext={handleNext} />
      </div>

      <GuidanceNote title="Tips Keamanan">
        PASOK menggunakan enkripsi tingkat militer untuk melindungi dokumen
        legalitas Anda. Hanya tim verifikasi resmi yang memiliki akses
        terbatas selama proses on-boarding ini.
      </GuidanceNote>
    </>
  );
}
