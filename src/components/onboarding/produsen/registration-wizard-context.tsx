"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type FrekuensiPanen = "harian" | "mingguan" | "bulanan" | "musiman";

export type KomoditasSelection = {
  komoditasRef: string;
  namaKomoditas: string;
};

type ProdusenWizardState = {
  nama: string;
  email: string;
  password: string;
  komoditas: KomoditasSelection[];
  provinsi: string;
  kabKota: string;
  kecamatan: string;
  kodeWilayah: string;
  alamat: string;
  lat: number | null;
  lng: number | null;
  volumePanen: string;
  luasLahan: string;
  frekuensiPanen: FrekuensiPanen;
  bulanPanen: string;
};

type ProdusenWizardContextValue = ProdusenWizardState & {
  setField: <K extends keyof ProdusenWizardState>(
    key: K,
    value: ProdusenWizardState[K],
  ) => void;
};

const initialState: ProdusenWizardState = {
  nama: "",
  email: "",
  password: "",
  komoditas: [],
  provinsi: "",
  kabKota: "",
  kecamatan: "",
  kodeWilayah: "",
  alamat: "",
  lat: null,
  lng: null,
  volumePanen: "",
  luasLahan: "",
  frekuensiPanen: "bulanan",
  bulanPanen: "",
};

const ProdusenWizardContext =
  createContext<ProdusenWizardContextValue | null>(null);

export function ProdusenWizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProdusenWizardState>(initialState);

  function setField<K extends keyof ProdusenWizardState>(
    key: K,
    value: ProdusenWizardState[K],
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <ProdusenWizardContext.Provider value={{ ...state, setField }}>
      {children}
    </ProdusenWizardContext.Provider>
  );
}

export function useProdusenWizard() {
  const ctx = useContext(ProdusenWizardContext);
  if (!ctx) {
    throw new Error(
      "useProdusenWizard must be used within ProdusenWizardProvider",
    );
  }
  return ctx;
}
