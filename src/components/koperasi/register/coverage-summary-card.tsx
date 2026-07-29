"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";

export function CoverageSummaryCard() {
  const wizard = useRegistrationWizard();
  const [jumlahProdusen, setJumlahProdusen] = useState<number | null>(null);

  useEffect(() => {
    if (!wizard.wilayah?.kodeWilayah) {
      setJumlahProdusen(null);
      return;
    }
    fetch(`/api/wilayah/produsen-count?kode_wilayah=${encodeURIComponent(wizard.wilayah.kodeWilayah)}`)
      .then((res) => res.json())
      .then((data) => setJumlahProdusen(data.jumlah_produsen ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wizard.wilayah?.kodeWilayah]);

  return (
    <div className="flex w-full flex-col gap-6 rounded-sm border border-border-soft bg-white p-6">
      <h3 className="text-xl font-semibold text-ink">Ringkasan Cakupan</h3>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
          Wilayah Terpilih
        </span>
        <span className="rounded-xs bg-chip px-3 py-2 text-sm text-ink">
          {wizard.wilayah ? wizard.wilayah.label : "Belum dipilih"}
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-sm border border-success/20 bg-chip p-4">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
            <Users className="size-6 text-success" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.6px] text-body">
              Produsen Terdaftar di Wilayah Ini
            </span>
            <span className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-brand">
              {jumlahProdusen !== null ? jumlahProdusen : "-"}
            </span>
          </div>
        </div>
        <p className="text-xs italic text-body">
          Dihitung dari data produsen yang sudah terdaftar di sistem PASOK untuk
          wilayah ini, bukan estimasi.
        </p>
      </div>
    </div>
  );
}
