import { QrCode, Truck } from "lucide-react";

export type WaybillData = {
  idTransaksi: string;
  namaProduser: string;
  tanggalMuat: string;
  asal: string;
  tujuan: string;
  driver: string;
  kendaraan: string;
  beratFinal: string;
  namaLogistikHub: string;
  nomorDokumen: string;
};

export function WaybillPreview({ data }: { data: WaybillData }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 overflow-hidden rounded-xs border border-border-soft bg-white shadow-sm">
      <div className="w-full border-b border-border-soft bg-canvas px-4 py-4">
        <span className="text-sm uppercase tracking-[0.8px] text-ink">
          Preview E-Surat Jalan
        </span>
      </div>

      <div className="flex min-h-[500px] w-[85%] flex-col gap-8 border border-dashed border-border-soft bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-4 items-center justify-center rounded-xs bg-info">
                <Truck className="size-3 text-white" strokeWidth={2} />
              </div>
              <div className="text-[14px] font-bold leading-5 text-ink">
                <p>PASOK</p>
                <p>COOPERATIVE</p>
              </div>
            </div>
            <div className="pt-2 text-2xl font-bold leading-8 text-info">
              <p>SURAT</p>
              <p>JALAN</p>
            </div>
            <div className="text-[10px] leading-[15px] text-muted">
              <p>ELECTRONIC WAYBILL</p>
              <p>SYSTEM</p>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] leading-[15px] text-muted">
              NOMOR
              <br />
              DOKUMEN
            </span>
            <span className="font-mono text-xs font-bold leading-4 text-ink">
              {data.nomorDokumen}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-[25px] items-start justify-between border-b border-canvas pb-2">
            <span className="text-[10px] uppercase text-muted">
              ID Transaksi
            </span>
            <span className="text-xs font-semibold text-ink">
              {data.idTransaksi}
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <div className="flex w-1/2 flex-col gap-1.5">
              <span className="text-[10px] uppercase text-muted">Asal</span>
              <span className="text-[11px] font-semibold leading-[16.5px] text-ink">
                {data.asal || "-"}
              </span>
            </div>
            <div className="flex w-1/2 flex-col gap-1.5">
              <span className="text-[10px] uppercase text-muted">Tujuan</span>
              <span className="text-[11px] font-semibold leading-[16.5px] text-ink">
                {data.tujuan || "-"}
              </span>
            </div>
          </div>

          <div className="flex h-[25px] items-start justify-between border-b border-canvas pb-2">
            <span className="text-[10px] uppercase text-muted">Driver</span>
            <span className="text-xs font-semibold text-ink">
              {data.driver || "-"}
            </span>
          </div>

          <div className="flex h-[25px] items-start justify-between border-b border-canvas pb-2">
            <span className="text-[10px] uppercase text-muted">
              Kendaraan
            </span>
            <span className="text-xs font-semibold text-ink">
              {data.kendaraan || "-"}
            </span>
          </div>

          <div className="flex h-[25px] items-start justify-between border-b border-canvas pb-2">
            <span className="text-[10px] uppercase text-muted">
              Berat Final
            </span>
            <span className="text-xs font-semibold text-ink">
              {data.beratFinal ? `${data.beratFinal} kg` : "-"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-canvas bg-canvas/50 py-6">
          <div className="flex size-32 items-center justify-center border border-border-soft bg-white p-2 shadow-inner">
            <QrCode className="size-16 text-ink" strokeWidth={1} />
          </div>
          <p className="max-w-40 text-center text-[9px] italic leading-[13.5px] text-muted">
            Scan untuk verifikasi digital via AgriMarine Chain
          </p>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center gap-1">
            <span className="pb-7 text-[10px] uppercase text-muted">
              Pengirim
            </span>
            <div className="h-px w-20 bg-border-soft" />
            <span className="text-[10px] text-ink">
              ( {data.namaProduser} )
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="pb-7 text-[10px] uppercase text-muted">
              Logistik Hub
            </span>
            <div className="h-px w-20 bg-border-soft" />
            <span className="text-[10px] text-ink">
              ( {data.namaLogistikHub} )
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
