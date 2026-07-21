import { CheckCircle2 } from "lucide-react";

export function RegistrationSuccessHero() {
  return (
    <div className="flex flex-col items-center gap-4 pb-12 pt-8">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-32 rounded-xl bg-info opacity-10 blur-2xl" />
        <div className="flex size-32 items-center justify-center rounded-xl border border-border-soft bg-white">
          <CheckCircle2 className="size-[50px] text-success" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="pt-2 text-center text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
        Pendaftaran Berhasil!
      </h1>

      <p className="max-w-[672px] text-center text-base leading-6 text-body">
        Koperasi Anda kini telah terdaftar di ekosistem{" "}
        <span className="font-bold text-info">PASOK</span>. Anda dapat mulai
        mengelola komoditas dan memantau tawaran dari produsen.
      </p>
    </div>
  );
}
