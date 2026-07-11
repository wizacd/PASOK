import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OfferForm } from "@/components/produsen/tawaran/offer-form";
import { NearbyCooperativeCard } from "@/components/produsen/tawaran/nearby-cooperative-card";
import { QualityTipsCard } from "@/components/produsen/tawaran/quality-tips-card";
import { ReferencePriceCard } from "@/components/produsen/tawaran/reference-price-card";

export default function BuatTawaranPage() {
  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/produsen" className="text-body">
          Dashboard
        </Link>
        <ChevronRight className="size-3 text-body" strokeWidth={2} />
        <span className="font-medium text-brand-deep">Buat Tawaran</span>
      </nav>

      <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
        Buat Tawaran Baru
      </h1>

      <div className="grid grid-cols-12 gap-8 pt-6">
        <div className="col-span-8">
          <OfferForm />
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <ReferencePriceCard />
          <NearbyCooperativeCard />
          <QualityTipsCard />
        </div>
      </div>
    </div>
  );
}
