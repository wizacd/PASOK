import Image from "next/image";

export function BrandHero() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2 pt-12">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-pasok.png"
          alt="PASOK"
          width={49}
          height={55}
          className="h-[55px] w-[49px] shrink-0 object-contain"
          priority
        />
        <span className="text-[32px] font-extrabold leading-10 tracking-[-0.8px] text-brand">
          PASOK
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[1.2px] text-muted">
        Panen terdata, Koperasi Berdaya
      </p>
    </div>
  );
}
