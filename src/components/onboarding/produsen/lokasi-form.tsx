"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Info,
  LocateFixed,
  Map as MapIcon,
  MapPin,
} from "lucide-react";
import { useProdusenWizard } from "@/components/onboarding/produsen/registration-wizard-context";

type Kecamatan = { kode_wilayah: string; kecamatan: string };

export function LokasiForm() {
  const router = useRouter();
  const wizard = useProdusenWizard();

  const [provinsiList, setProvinsiList] = useState<string[]>([]);
  const [kabKotaList, setKabKotaList] = useState<string[]>([]);
  const [kecamatanList, setKecamatanList] = useState<Kecamatan[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/wilayah/provinsi")
      .then((res) => res.json())
      .then((data) => setProvinsiList(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (!wizard.provinsi) {
      setKabKotaList([]);
      return;
    }
    fetch(`/api/wilayah/kabupaten?provinsi=${encodeURIComponent(wizard.provinsi)}`)
      .then((res) => res.json())
      .then((data) => setKabKotaList(Array.isArray(data) ? data : []));
  }, [wizard.provinsi]);

  useEffect(() => {
    if (!wizard.provinsi || !wizard.kabKota) {
      setKecamatanList([]);
      return;
    }
    fetch(
      `/api/wilayah/kecamatan?provinsi=${encodeURIComponent(wizard.provinsi)}&kab_kota=${encodeURIComponent(wizard.kabKota)}`,
    )
      .then((res) => res.json())
      .then((data) => setKecamatanList(Array.isArray(data) ? data : []));
  }, [wizard.provinsi, wizard.kabKota]);

  function handleProvinsiChange(value: string) {
    wizard.setField("provinsi", value);
    wizard.setField("kabKota", "");
    wizard.setField("kecamatan", "");
    wizard.setField("kodeWilayah", "");
  }

  function handleKabKotaChange(value: string) {
    wizard.setField("kabKota", value);
    wizard.setField("kecamatan", "");
    wizard.setField("kodeWilayah", "");
  }

  function handleKecamatanChange(value: string) {
    const match = kecamatanList.find((row) => row.kecamatan === value);
    wizard.setField("kecamatan", value);
    wizard.setField("kodeWilayah", match?.kode_wilayah ?? "");
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Perangkat Anda tidak mendukung deteksi lokasi.");
      return;
    }
    setIsLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        wizard.setField("lat", position.coords.latitude);
        wizard.setField("lng", position.coords.longitude);
        setIsLocating(false);
      },
      () => {
        setError("Gagal mendapatkan lokasi. Izinkan akses lokasi di browser Anda.");
        setIsLocating(false);
      },
    );
  }

  function handleNext() {
    if (!wizard.provinsi || !wizard.kabKota || !wizard.kecamatan || !wizard.alamat.trim()) {
      setError("Lengkapi provinsi, kota/kabupaten, kecamatan, dan alamat terlebih dahulu.");
      return;
    }
    setError("");
    router.push("/onboarding/produsen/komoditas");
  }

  const coordLabel =
    wizard.lat !== null && wizard.lng !== null
      ? `${wizard.lat.toFixed(4)}° S, ${wizard.lng.toFixed(4)}° E`
      : "Belum ditentukan";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Di mana lokasi lahan atau pangkalan Anda?
        </h2>
        <p className="text-base leading-6 text-body">
          Lokasi yang akurat membantu koperasi menemukan tawaran Anda lebih cepat.
        </p>
      </div>

      <div className="flex w-full items-start justify-center gap-8">
        <div className="flex flex-1 flex-col gap-4 pb-8">
          <div className="flex h-[480px] w-full flex-col overflow-hidden rounded-lg border border-border-soft bg-chip">
            <div className="relative flex-1 bg-chip">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapIcon className="size-16 text-brand/30" strokeWidth={1.5} />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="flex w-full items-center justify-center gap-2 rounded-xs bg-brand-deep px-4 py-3 text-base text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] disabled:opacity-60"
                >
                  <LocateFixed className="size-[18px]" strokeWidth={2} />
                  {isLocating ? "MENCARI LOKASI..." : "GUNAKAN LOKASI SAAT INI"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between rounded-lg border border-border-soft bg-white p-[17px]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-deep/10">
                <MapPin className="size-5 text-brand-deep" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[1px] text-body">
                  Titik Koordinat
                </span>
                <span className="text-xl font-semibold text-ink">{coordLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 rounded-lg border border-border-soft bg-white p-[25px]">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Provinsi
            </label>
            <div className="relative">
              <select
                value={wizard.provinsi}
                onChange={(event) => handleProvinsiChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-sm border border-border-soft bg-canvas px-4 text-base text-ink focus:border-brand focus:outline-none"
              >
                <option value="">Pilih provinsi</option>
                {provinsiList.map((provinsi) => (
                  <option key={provinsi} value={provinsi}>
                    {provinsi}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-body"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Kota/Kabupaten
            </label>
            <div className="relative">
              <select
                value={wizard.kabKota}
                onChange={(event) => handleKabKotaChange(event.target.value)}
                disabled={!wizard.provinsi}
                className="h-12 w-full appearance-none rounded-sm border border-border-soft bg-canvas px-4 text-base text-ink focus:border-brand focus:outline-none disabled:opacity-50"
              >
                <option value="">Pilih kota/kabupaten</option>
                {kabKotaList.map((kabKota) => (
                  <option key={kabKota} value={kabKota}>
                    {kabKota}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-body"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Kecamatan
            </label>
            <div className="relative">
              <select
                value={wizard.kecamatan}
                onChange={(event) => handleKecamatanChange(event.target.value)}
                disabled={!wizard.kabKota}
                className="h-12 w-full appearance-none rounded-sm border border-border-soft bg-canvas px-4 text-base text-ink focus:border-brand focus:outline-none disabled:opacity-50"
              >
                <option value="">Pilih kecamatan</option>
                {kecamatanList.map((row) => (
                  <option key={row.kode_wilayah} value={row.kecamatan}>
                    {row.kecamatan}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-body"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.6px] text-body">
              Alamat Lengkap
            </label>
            <textarea
              value={wizard.alamat}
              onChange={(event) => wizard.setField("alamat", event.target.value)}
              placeholder="Masukkan detail alamat, nama jalan, atau patokan terdekat..."
              rows={3}
              className="w-full resize-none rounded-sm border border-border-soft bg-canvas px-4 py-3 text-base text-ink placeholder:text-body/70 focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-3 rounded-sm border border-dashed border-border-soft bg-chip p-[17px]">
            <Info className="size-5 shrink-0 text-brand" strokeWidth={2} />
            <p className="text-sm leading-5 text-body">
              Pastikan lokasi yang Anda pilih dapat diakses oleh armada logistik
              berukuran sedang (Colt Diesel).
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex w-full items-center justify-between border-t border-border-soft pt-6">
        <button
          type="button"
          onClick={() => router.push("/onboarding/produsen/komoditas")}
          className="flex items-center gap-3 rounded-xs border border-brand-deep px-10 py-4 text-xl font-semibold text-brand-deep"
        >
          <ArrowLeft className="size-4" strokeWidth={2.5} />
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
