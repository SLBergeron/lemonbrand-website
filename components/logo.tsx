"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 relative z-20 group shrink-0"
    >
      <Image
        src="/assets/logo_lemonbrand_256x256.svg"
        alt="LemonBrand"
        width={28}
        height={28}
        className="w-7 h-7"
      />
      <span className="font-display text-lg font-semibold tracking-tight group-hover:text-accent transition-colors hidden sm:block">
        LemonBrand
      </span>
    </Link>
  );
};
