import { Radar } from "lucide-react";

export function NearbyCooperativeCard() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-sm border border-border-soft bg-white p-6">
      <div className="flex items-center gap-2">
        <Radar className="size-[15px] text-body" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
          Supply Matching
        </span>
      </div>
      <p className="text-sm text-body">
        Setelah dikirim, penawaran ini akan muncul di antrean Supply Matching
        koperasi terdekat (dihitung dari komoditas, volume, dan lokasi Anda)
        untuk ditinjau dan diterima oleh staf koperasi.
      </p>
    </div>
  );
}
