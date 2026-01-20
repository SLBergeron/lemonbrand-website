"use client";

import { useState, useEffect } from "react";

type Currency = "CAD" | "USD";

interface CurrencyInfo {
  currency: Currency;
  isUSA: boolean;
}

/**
 * Hook to determine currency based on user's country.
 * Uses cookie set by middleware from Vercel geo headers.
 * Falls back to CAD for non-US visitors.
 */
export function useCurrency(): CurrencyInfo {
  const [currency, setCurrency] = useState<Currency>("CAD");

  useEffect(() => {
    // Read country from cookie set by middleware
    const cookies = document.cookie.split(";");
    const countryCookie = cookies.find((c) => c.trim().startsWith("user-country="));

    if (countryCookie) {
      const country = countryCookie.split("=")[1]?.trim();
      if (country === "US") {
        setCurrency("USD");
      }
    }
  }, []);

  return {
    currency,
    isUSA: currency === "USD",
  };
}

/**
 * Format price with appropriate currency label.
 * Prices are assumed to be roughly equivalent (no conversion).
 */
export function formatPrice(amount: string | number, currency: Currency): string {
  const amountStr = typeof amount === "number" ? amount.toLocaleString() : amount;
  return `$${amountStr} ${currency}`;
}
