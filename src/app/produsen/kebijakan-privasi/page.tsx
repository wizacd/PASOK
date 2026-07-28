import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function KebijakanPrivasiPage() {
  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/produsen" className="text-body">
          Dashboard
        </Link>
        <ChevronRight className="size-3 text-body" strokeWidth={2} />
        <span className="font-medium text-brand-deep">Kebijakan Privasi</span>
      </nav>

      <div className="flex items-center gap-3 pt-2">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
          <ShieldCheck className="size-5 text-brand" strokeWidth={2} />
        </div>
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-ink">
          Kebijakan Privasi
        </h1>
      </div>

      <div className="mt-6 rounded-sm border border-border-soft bg-white p-6">
        <p className="text-sm leading-6 text-body">
          Dokumen Kebijakan Privasi resmi PASOK sedang disiapkan dan akan
          tersedia di halaman ini sebelum peluncuran publik. Untuk pertanyaan
          seputar penggunaan platform saat ini, silakan kunjungi{" "}
          <Link href="/produsen/bantuan" className="font-semibold text-brand">
            Pusat Bantuan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
