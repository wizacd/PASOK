import Link from "next/link";
import { Map } from "lucide-react";

export function SocialImpactSection({
  jumlahProdusen,
  totalVolumeKg,
  loading,
}: {
  jumlahProdusen: number;
  totalVolumeKg: number;
  loading: boolean;
}) {
  return (
    <div className="flex w-full gap-6">
      <div className="flex flex-1 gap-6 rounded-xs border border-info/20 bg-info/5 p-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold text-info-deep">
            Rekam Jejak Finansial
          </h4>
          <p className="text-base text-body">
            Setiap transaksi terkonfirmasi tercatat sebagai bukti transaksi digital,
            membentuk rekam jejak finansial yang dapat mempermudah akses pembiayaan
            di koperasi.
          </p>

          <div className="flex gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-[40px] font-bold leading-[56px] text-info-deep">
                {loading ? "..." : jumlahProdusen}
              </span>
              <span className="text-[11px] font-medium text-body">
                Produsen dengan Rekam Jejak
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[40px] font-bold leading-[56px] text-info-deep">
                {loading ? "..." : totalVolumeKg.toLocaleString("id-ID")}
              </span>
              <span className="text-[11px] font-medium text-body">
                Kg Komoditas Terdistribusi
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 rounded-xs border border-border-soft bg-white p-6">
        <span className="text-xs font-semibold uppercase tracking-[1.2px] text-body">
          Penyebaran Regional Dampak
        </span>
        <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xs bg-chip">
          <Link
            href="/koperasi/peta-sebaran"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base text-forest shadow-md"
          >
            <Map className="size-[18px]" strokeWidth={2} />
            Buka Visualisasi Geografis
          </Link>
        </div>
      </div>
    </div>
  );
}
