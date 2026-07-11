"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const REDIRECT_DELAY_MS = 1800;

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/pilih-peran");
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-deep">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative local SVG watermark, next/image requires dangerouslyAllowSVG for local SVGs */}
      <img
        src="/splash-map-watermark.svg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="relative z-10 flex flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-pasok.png"
            alt="PASOK"
            width={98}
            height={110}
            priority
            className="h-[70px] w-[62px] shrink-0 object-contain sm:h-[100px] sm:w-[90px]"
          />
          <span className="text-[48px] font-bold leading-none tracking-[-0.32px] text-white sm:text-[80px]">
            PASOK
          </span>
        </div>
        <p className="pl-1 text-[18px] font-medium italic leading-none text-white sm:text-[28px]">
          Panen terdata, Koperasi Berdaya
        </p>
      </div>
    </div>
  );
}
