import Link from "next/link";
import { BookOpen, LayoutDashboard } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { AccountSummaryCard } from "@/components/koperasi/register/account-summary-card";
import { NextStepsCard } from "@/components/koperasi/register/next-steps-card";
import { RegisterTopBar } from "@/components/koperasi/register/register-top-bar";
import { RegistrationSuccessHero } from "@/components/koperasi/register/registration-success-hero";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

async function getKoperasiSummary(koperasiRef: string) {
  const { data: profil } = await supabase
    .from("profil_koperasi")
    .select("koperasi_ref, nama_koperasi, status_registrasi")
    .eq("koperasi_ref", koperasiRef)
    .single();

  if (!profil) return null;

  const { data: wilayahRow } = await supabase
    .from("referensi_koperasi_wilayah")
    .select("kode_wilayah")
    .eq("koperasi_ref", koperasiRef)
    .single();

  let wilayahLabel = "-";
  if (wilayahRow) {
    const { data: wilayah } = await supabase
      .from("referensi_wilayah")
      .select("kab_kota, kecamatan")
      .eq("kode_wilayah", wilayahRow.kode_wilayah)
      .single();

    if (wilayah) {
      wilayahLabel = `${wilayah.kecamatan}, ${wilayah.kab_kota}`;
    }
  }

  return {
    koperasiRef: profil.koperasi_ref as string,
    namaKoperasi: profil.nama_koperasi as string,
    statusRegistrasi: (profil.status_registrasi as string) ?? "Diproses",
    wilayahLabel,
  };
}

export default async function PendaftaranSelesaiPage({
  searchParams,
}: {
  searchParams: Promise<{ koperasi_ref?: string; komoditas?: string }>;
}) {
  const params = await searchParams;
  const koperasiRef = params.koperasi_ref ?? "";
  const komoditasUtama = params.komoditas
    ? params.komoditas.split(",").filter(Boolean)
    : [];

  const summary = koperasiRef ? await getKoperasiSummary(koperasiRef) : null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <RegisterTopBar />

      <main className="flex flex-1 flex-col items-center px-8 py-8">
        <div className="flex w-full max-w-4xl flex-col items-center">
          <RegistrationSuccessHero />

          {summary ? (
            <div className="flex w-full gap-8">
              <AccountSummaryCard
                koperasiRef={summary.koperasiRef}
                statusRegistrasi={summary.statusRegistrasi}
                wilayahLabel={summary.wilayahLabel}
                komoditasUtama={komoditasUtama}
              />
              <NextStepsCard />
            </div>
          ) : (
            <p className="text-sm text-body">
              Data pendaftaran tidak ditemukan. Silakan ulangi proses
              registrasi dari{" "}
              <Link href="/koperasi/register" className="font-bold text-info">
                halaman awal
              </Link>
              .
            </p>
          )}

          <div className="flex w-full max-w-md gap-4 pt-12">
            <Link
              href="/koperasi"
              className="flex flex-1 items-center justify-center gap-2 rounded-xs bg-brand px-8 py-4 text-base text-white"
            >
              <LayoutDashboard className="size-[18px]" strokeWidth={2} />
              Buka Dashboard Utama
            </Link>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-xs border border-border-soft bg-white px-8 py-4 text-base text-body"
            >
              <BookOpen className="size-[18px]" strokeWidth={2} />
              Lihat Panduan
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border-soft px-8 py-8">
        <p className="text-center text-base text-body/60">
          © 2024 AgriMaritime Portal (PASOK). Seluruh hak cipta dilindungi.
        </p>
      </footer>
    </div>
  );
}
