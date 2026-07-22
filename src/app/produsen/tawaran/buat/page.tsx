"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OfferForm } from "@/components/produsen/tawaran/offer-form";
import { NearbyCooperativeCard } from "@/components/produsen/tawaran/nearby-cooperative-card";
import { QualityTipsCard } from "@/components/produsen/tawaran/quality-tips-card";
import { ReferencePriceCard } from "@/components/produsen/tawaran/reference-price-card";
import { getAccessToken } from "@/lib/auth";

type KomoditasOption = { komoditas_ref: string; nama_komoditas: string };

export default function BuatTawaranPage() {
  const [anggotaRef, setAnggotaRef] = useState("");
  const [komoditasOptions, setKomoditasOptions] = useState<KomoditasOption[]>([]);
  const [selectedKomoditasRef, setSelectedKomoditasRef] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = await getAccessToken();
      if (!token) {
        setError("Sesi tidak ditemukan. Silakan masuk kembali.");
        setIsLoading(false);
        return;
      }

      const meResponse = await fetch("/api/produsen/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const me = await meResponse.json();

      if (!meResponse.ok) {
        setError(me.error ?? "Gagal memuat profil produsen.");
        setIsLoading(false);
        return;
      }

      setAnggotaRef(me.anggota_ref);

      const komoditasResponse = await fetch(
        `/api/wilayah/komoditas?kode_wilayah=${encodeURIComponent(me.kode_wilayah)}`,
      );
      const komoditas = await komoditasResponse.json();
      setKomoditasOptions(Array.isArray(komoditas) ? komoditas : []);
      setIsLoading(false);
    }

    load();
  }, []);

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

      {isLoading ? (
        <p className="pt-6 text-sm text-body">Memuat data...</p>
      ) : error ? (
        <p className="pt-6 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-8 pt-6">
          <div className="col-span-8">
            <OfferForm
              anggotaRef={anggotaRef}
              komoditasOptions={komoditasOptions}
              selectedKomoditasRef={selectedKomoditasRef}
              onKomoditasChange={setSelectedKomoditasRef}
            />
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <ReferencePriceCard komoditasRef={selectedKomoditasRef} />
            <NearbyCooperativeCard />
            <QualityTipsCard />
          </div>
        </div>
      )}
    </div>
  );
}
