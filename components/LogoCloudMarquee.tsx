"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export function LogoCloudMarquee() {
  const logos = [
    {
      name: "Salesforce",
      src: "/logos/salesforce.svg",
      darkSrc: null, // No dark variant needed
    },
    {
      name: "HubSpot",
      src: "/logos/hubspot.svg",
      darkSrc: "/logos/hubspot_dark.svg",
    },
    {
      name: "Zapier",
      src: "/logos/zapier.svg",
      darkSrc: null,
    },
    {
      name: "Make",
      src: "/logos/make.svg",
      darkSrc: "/logos/make_dark.svg",
    },
    {
      name: "OpenAI",
      src: "/logos/openai.svg",
      darkSrc: "/logos/openai_dark.svg",
    },
    {
      name: "Claude AI",
      src: "/logos/claude.svg",
      darkSrc: "/logos/claude_dark.svg",
    },
    {
      name: "Perplexity",
      src: "/logos/perplexity.svg",
      darkSrc: "/logos/perplexity_dark.svg",
    },
    {
      name: "ClickUp",
      src: "/logos/clickup.svg",
      darkSrc: "/logos/clickup_dark.svg",
    },
    {
      name: "Google",
      src: "/logos/google.svg",
      darkSrc: "/logos/google_dark.svg",
    },
    {
      name: "Airtable",
      src: "/logos/airtable.svg",
      darkSrc: "/logos/airtable_dark.svg",
    },
    {
      name: "Node.js",
      src: "/logos/nodejs.svg",
      darkSrc: "/logos/nodejs_dark.svg",
    },
    {
      name: "React",
      src: "/logos/react.svg",
      darkSrc: null,
    },
  ];

  return (
    <div className="relative z-20 px-4 py-12 md:px-8 md:py-20 bg-white dark:bg-neutral-950">
      <p className="text-center font-sans text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-8">
        Built with industry-leading tools
      </p>

      {/* First Row - Right Direction */}
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-wrap justify-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <Marquee pauseOnHover direction="right" speed={40}>
          {logos.map((logo, idx) => (
            <div key={logo.name + "logo-wrapper-row1" + idx} className="relative mx-12 h-18 w-auto">
              {/* Light mode logo */}
              <Image
                src={logo.src}
                alt={logo.name}
                width="180"
                height="72"
                className="h-18 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:hidden"
              />
              {/* Dark mode logo */}
              <Image
                src={logo.darkSrc || logo.src}
                alt={logo.name}
                width="180"
                height="72"
                className="hidden h-18 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:block"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Second Row - Left Direction */}
      <div className="relative mx-auto mt-8 flex h-full w-full max-w-7xl flex-wrap justify-center gap-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <Marquee pauseOnHover direction="left" speed={40}>
          {logos.map((logo, idx) => (
            <div key={logo.name + "logo-wrapper-row2" + idx} className="relative mx-12 h-18 w-auto">
              {/* Light mode logo */}
              <Image
                src={logo.src}
                alt={logo.name}
                width="180"
                height="72"
                className="h-18 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:hidden"
              />
              {/* Dark mode logo */}
              <Image
                src={logo.darkSrc || logo.src}
                alt={logo.name}
                width="180"
                height="72"
                className="hidden h-18 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:block"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
