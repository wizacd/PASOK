"use client";

import { useState } from "react";
import { LocateFixed, Map as MapIcon, MapPin } from "lucide-react";
import { WilayahSearchInput } from "@/components/koperasi/register/wilayah-search-input";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";

export function CoverageMapCard() {
  const wizard = useRegistrationWizard();
  const [radius, setRadius] = useState(25);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState("");

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

  const coordLabel =
    wizard.lat !== null && wizard.lng !== null
      ? `${wizard.lat.toFixed(4)}, ${wizard.lng.toFixed(4)}`
      : "Belum ditentukan";

  return (
    <div className="flex h-[600px] w-full flex-col rounded-sm border border-border-soft bg-white p-6">
      <div className="flex gap-4 pb-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor="wilayah-pusat"
            className="text-xs font-semibold tracking-[0.6px] text-body"
          >
            Pilih Wilayah Pusat
          </label>
          <WilayahSearchInput />
        </div>

        <div className="flex w-64 shrink-0 flex-col gap-1.5">
          <label
            htmlFor="radius"
            className="text-xs font-semibold tracking-[0.6px] text-body"
          >
            Radius Layanan (km)
          </label>
          <div className="flex h-11 items-center gap-3 rounded-xs border border-border-soft bg-chip px-4">
            <input
              id="radius"
              type="range"
              min={5}
              max={100}
              step={5}
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
              className="h-1 w-full accent-brand"
            />
            <span className="w-9 shrink-0 text-xs font-semibold tracking-[0.6px] text-info">
              {radius}km
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-sm bg-chip">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapIcon className="size-16 text-info/30" strokeWidth={1.5} />
        </div>

        <div className="absolute left-4 top-4 max-w-80 rounded-xs border border-white/50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-info" strokeWidth={2} />
            <span className="text-xl font-semibold text-ink">
              Koordinat Pusat Operasi
            </span>
          </div>
          <p className="pt-1.5 text-sm text-body">{coordLabel}</p>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="flex w-full items-center justify-center gap-2 rounded-xs bg-brand-deep px-4 py-3 text-base text-white shadow-sm disabled:opacity-60"
          >
            <LocateFixed className="size-[18px]" strokeWidth={2} />
            {isLocating ? "Mencari lokasi..." : "Gunakan Lokasi Saat Ini"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="pt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
