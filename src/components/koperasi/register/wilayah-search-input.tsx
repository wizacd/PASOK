"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRegistrationWizard } from "@/components/koperasi/register/registration-wizard-context";

type WilayahRow = {
  kode_wilayah: string;
  provinsi: string;
  kab_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
};

function formatWilayahLabel(row: WilayahRow) {
  return `${row.desa_kelurahan}, ${row.kecamatan}, ${row.kab_kota}`;
}

export function WilayahSearchInput() {
  const wizard = useRegistrationWizard();
  const [query, setQuery] = useState(wizard.wilayah?.label ?? "");
  const [results, setResults] = useState<WilayahRow[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 3 || query === wizard.wilayah?.label) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const response = await fetch(
        `/api/wilayah/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(row: WilayahRow) {
    const label = formatWilayahLabel(row);
    wizard.setField("wilayah", { kodeWilayah: row.kode_wilayah, label });
    setQuery(label);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-body"
        strokeWidth={2}
      />
      <input
        type="text"
        placeholder="Cari kota, kabupaten, atau kecamatan..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          if (wizard.wilayah) {
            wizard.setField("wilayah", null);
          }
        }}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        className="h-11 w-full rounded-xs border border-border-soft bg-chip pl-10 pr-4 text-base text-ink placeholder:text-body/70 focus:border-info focus:outline-none"
      />

      {isOpen && results.length > 0 ? (
        <ul className="absolute z-10 mt-1 w-full rounded-xs border border-border-soft bg-white py-1 shadow-sm">
          {results.map((row) => (
            <li key={row.kode_wilayah}>
              <button
                type="button"
                onClick={() => handleSelect(row)}
                className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-chip"
              >
                {formatWilayahLabel(row)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {isOpen && query.trim().length >= 3 && results.length === 0 ? (
        <div className="absolute z-10 mt-1 w-full rounded-xs border border-border-soft bg-white px-4 py-2 text-sm text-body shadow-sm">
          Wilayah tidak ditemukan.
        </div>
      ) : null}
    </div>
  );
}
