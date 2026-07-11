import { BadgeCheck, FileUp } from "lucide-react";
import { DocumentUploadCard } from "@/components/koperasi/register/document-upload-card";
import { GuidanceNote } from "@/components/koperasi/register/guidance-note";
import { RegistrationStepper } from "@/components/koperasi/register/registration-stepper";
import { StepActionsFooter } from "@/components/koperasi/register/step-actions-footer";

export default function RegisterKoperasiPage() {
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
                className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <DocumentUploadCard
              icon={FileUp}
              label="Akte Pendirian Koperasi"
            />
            <DocumentUploadCard icon={BadgeCheck} label="Sertifikat NIB" />
          </div>
        </div>

        <StepActionsFooter nextHref="/koperasi/register/cakupan-operasi" />
      </div>

      <GuidanceNote title="Tips Keamanan">
        PASOK menggunakan enkripsi tingkat militer untuk melindungi dokumen
        legalitas Anda. Hanya tim verifikasi resmi yang memiliki akses
        terbatas selama proses on-boarding ini.
      </GuidanceNote>
    </>
  );
}
