"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Login() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 my-20">
      <Form />
      <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 items-center justify-center">
        <div className="max-w-sm mx-auto px-8">
          <p
            className={cn(
              "font-semibold text-xl text-neutral-800 dark:text-neutral-200"
            )}
          >
            Real systems. Real results.
          </p>
          <div className="mt-8 space-y-6 text-sm text-neutral-600 dark:text-neutral-400">
            <div>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                &quot;75+ workflows deployed across our sales, marketing, and ops teams. Pipeline up 3x in 4 months.&quot;
              </p>
              <p className="mt-2 text-xs">— SaaS Founder, YC W23</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                &quot;Bespoke systems that actually work. No templates. No fluff. Just revenue growth.&quot;
              </p>
              <p className="mt-2 text-xs">— VP Operations, Series B</p>
            </div>
          </div>
        </div>

        <GridLineHorizontal
          className="top-0  left-1/2 -translate-x-1/2"
          offset="-10px"
        />
        <GridLineHorizontal
          className="bottom-0 top-auto  left-1/2 -translate-x-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="left-10  top-1/2 -translate-y-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="right-10 left-auto top-1/2 -translate-y-1/2"
          offset="-10px"
        />
        {/* <GridLineVertical className="left-80 transform" /> */}
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="bg-gray-50 dark:bg-neutral-950">
      <div className="flex items-center w-full justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 max-w-2xl mx-auto">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-neutral-600 dark:text-white">
              Get AI Automation Playbooks
            </h2>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Access proven frameworks, templates, and implementation guides. Join operators scaling with AI.
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form
                action="https://app.kit.com/forms/8620753/subscriptions"
                className="seva-form formkit-form space-y-6"
                method="post"
                data-sv-form="8620753"
                data-uid="c3298fa5a7"
                data-format="inline"
                data-version="5"
                data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Check your inbox to receive your free automation opportunity audit.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
              >
                <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                  >
                    Email address
                  </label>

                  <div className="mt-2">
                    <input
                      id="email"
                      name="email_address"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="formkit-input block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-input text-neutral-600 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    data-element="submit"
                    className="formkit-submit bg-neutral-600 relative z-10 hover:bg-neutral-600/90 text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center w-full dark:text-neutral-600 dark:bg-white dark:hover:bg-neutral-100 dark:hover:shadow-xl"
                  >
                    <div className="formkit-spinner hidden"><div></div><div></div><div></div></div>
                    <span>Get Free Resources</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  What you&apos;ll get:
                </h3>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Automation opportunity audit framework
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Outreach workflow templates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Content repurposing playbooks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Weekly newsletter with real implementations
                  </li>
                </ul>
                <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-6">
                  <Link
                    href="https://newsletter.lemonbrand.io"
                    target="_blank"
                    className="text-neutral-600 dark:text-white underline"
                  >
                    Browse newsletter archive →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-neutral-600 px-2 py-1  relative z-20"
    >
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-neutral-600 dark:text-white">DevStudio</span>
    </Link>
  );
};

export const FeaturedTestimonials = ({
  className,
  containerClassName,
}: {
  textClassName?: string;
  className?: string;
  showStars?: boolean;
  containerClassName?: string;
}) => {
  const images = [
    {
      name: "John Doe",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      name: "Robert Johnson",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Jane Smith",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Emily Davis",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Tyler Durden",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      name: "Dora",
      src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  return (
    <div className={cn("flex flex-col items-center ", containerClassName)}>
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center mb-2",
          className
        )}
      >
        <div className="flex flex-row items-center mb-4 sm:mb-0">
          {images.map((image, idx) => (
            <div className="-mr-4  relative group" key={image.name}>
              <div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    zIndex: 30,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-full overflow-hidden border-2  border-neutral-200  relative"
                >
                  <Image
                    height={100}
                    width={100}
                    src={image.src}
                    alt={image.name}
                    className="object-cover object-top  md:h-14 md:w-14 h-8 w-8 "
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute w-[calc(100%+var(--offset))] h-[var(--height)] left-[calc(var(--offset)/2*-1)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute h-[calc(100%+var(--offset))] w-[var(--width)] top-[calc(var(--offset)/2*-1)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
