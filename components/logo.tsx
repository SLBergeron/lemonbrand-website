"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-3 items-center text-sm mr-4 px-2 py-1 relative z-20"
    >
      <Image
        src="/assets/logo_lemonbrand_256x256.svg"
        alt="Lemonbrand"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <Image
        src="/assets/Lemonbrand_Wordmark.svg"
        alt="Lemonbrand"
        width={72}
        height={20}
        className="h-4 w-auto hidden sm:block"
      />
    </Link>
  );
};
