"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type WilayahSelection = {
  kodeWilayah: string;
  label: string;
} | null;

type RegistrationWizardState = {
  namaKoperasi: string;
  email: string;
  password: string;
  nikPengurus: string;
  nikop: string;
  akteFile: File | null;
  nibFile: File | null;
  wilayah: WilayahSelection;
  koperasiRef: string | null;
};

type RegistrationWizardContextValue = RegistrationWizardState & {
  setField: <K extends keyof RegistrationWizardState>(
    key: K,
    value: RegistrationWizardState[K],
  ) => void;
};

const initialState: RegistrationWizardState = {
  namaKoperasi: "",
  email: "",
  password: "",
  nikPengurus: "",
  nikop: "",
  akteFile: null,
  nibFile: null,
  wilayah: null,
  koperasiRef: null,
};

const RegistrationWizardContext =
  createContext<RegistrationWizardContextValue | null>(null);

export function RegistrationWizardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<RegistrationWizardState>(initialState);

  function setField<K extends keyof RegistrationWizardState>(
    key: K,
    value: RegistrationWizardState[K],
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <RegistrationWizardContext.Provider value={{ ...state, setField }}>
      {children}
    </RegistrationWizardContext.Provider>
  );
}

export function useRegistrationWizard() {
  const ctx = useContext(RegistrationWizardContext);
  if (!ctx) {
    throw new Error(
      "useRegistrationWizard must be used within RegistrationWizardProvider",
    );
  }
  return ctx;
}
