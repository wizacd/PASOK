"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useProdusenWizard } from "@/components/onboarding/produsen/registration-wizard-context";

export function AkunForm() {
  const router = useRouter();
  const wizard = useProdusenWizard();
  const [error, setError] = useState("");

  function handleNext() {
    if (!wizard.nama || !wizard.email || !wizard.password) {
      setError("Lengkapi nama, email, dan kata sandi terlebih dahulu.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wizard.email)) {
      setError("Format email tidak valid. Contoh: budi@email.com");
      return;
    }
    if (wizard.password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }
    setError("");
    router.push("/onboarding/produsen/lokasi");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col">
        <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Buat Akun Produsen
        </h2>
        <p className="text-base leading-6 text-body">
          Akun ini akan Anda gunakan untuk masuk dan mengelola tawaran hasil
          bumi di PASOK.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-lg border border-border-soft bg-white p-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="produsen-nama"
            className="text-xs font-semibold tracking-[0.6px] text-body"
          >
            Nama Lengkap
          </label>
          <input
            id="produsen-nama"
            name="nama"
            type="text"
            placeholder="Contoh: Budi Santoso"
            value={wizard.nama}
            onChange={(event) => wizard.setField("nama", event.target.value)}
            className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="produsen-email"
              className="text-xs font-semibold tracking-[0.6px] text-body"
            >
              Email
            </label>
            <input
              id="produsen-email"
              name="email"
              type="email"
              placeholder="Contoh: budi@email.com"
              value={wizard.email}
              onChange={(event) => wizard.setField("email", event.target.value)}
              className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="produsen-password"
              className="text-xs font-semibold tracking-[0.6px] text-body"
            >
              Kata Sandi
            </label>
            <input
              id="produsen-password"
              name="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={wizard.password}
              onChange={(event) => wizard.setField("password", event.target.value)}
              className="h-12 w-full rounded-xs border border-border-soft px-4 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex w-full items-center justify-between pt-4 pb-20">
        <button
          type="button"
          className="invisible flex flex-col items-center justify-center rounded px-8 py-3 text-xl font-semibold text-body"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-3 rounded-sm bg-brand px-10 py-4 text-xl font-semibold text-white shadow-[0px_10px_15px_-3px_rgba(0,138,169,0.2),0px_4px_6px_-4px_rgba(0,138,169,0.2)]"
        >
          Lanjutkan
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
