"use client";
import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export function CookieBanner() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // If desktop, show immediately
      if (!mobile) {
        setShowBanner(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only run scroll logic if we know it's mobile and banner isn't shown yet
    if (isMobile !== true || showBanner) {
      return;
    }

    // On mobile, wait for scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBanner(true);
      }
    };

    // Check initial scroll position
    if (window.scrollY > 300) {
      setShowBanner(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, showBanner]);

  const handleAccept = () => {
    // Enable analytics when user accepts
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "accepted");
      // Add your analytics initialization here when you set it up
      // Example: initializeAnalytics();
    }
  };

  const handleDecline = () => {
    // Block analytics when user declines
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie-consent", "declined");
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <CookieConsent
      location="none"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="lemonbrand-cookie-consent"
      expires={365}
      overlay={false}
      buttonClasses="cookie-accept-button"
      declineButtonClasses="cookie-decline-button"
      containerClasses="cookie-consent-container"
      contentClasses="cookie-consent-content"
      buttonWrapperClasses={isMobile ? "w-full flex flex-col gap-2" : ""}
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgb(229 229 229)",
        borderRadius: "0.75rem",
        padding: isMobile ? "0.75rem" : "0.875rem 1rem",
        alignItems: isMobile ? "flex-start" : "center",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "0.5rem" : "0.75rem",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        position: "fixed",
        bottom: "1.5rem",
        right: isMobile ? "1rem" : "1.5rem",
        left: isMobile ? "1rem" : "auto",
        width: isMobile ? "calc(100% - 2rem)" : "40vw",
        maxWidth: isMobile ? "calc(100vw - 2rem)" : "none",
        minHeight: isMobile ? "auto" : "10vh",
        zIndex: 999,
      }}
      buttonStyle={{
        background: "rgb(249 115 22)",
        color: "white",
        fontSize: "0.8125rem",
        fontWeight: "500",
        borderRadius: "0.375rem",
        padding: "0.5rem 1rem",
        border: "none",
        cursor: "pointer",
        transition: "all 200ms",
        whiteSpace: "nowrap",
        flexShrink: 0,
        width: isMobile ? "100%" : "auto",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "rgb(82 82 82)",
        fontSize: "0.8125rem",
        fontWeight: "500",
        borderRadius: "0.375rem",
        padding: "0.5rem 1rem",
        border: "1px solid rgb(229 229 229)",
        cursor: "pointer",
        transition: "all 200ms",
        whiteSpace: "nowrap",
        flexShrink: 0,
        width: isMobile ? "100%" : "auto",
      }}
      contentStyle={{
        margin: "0",
        fontSize: "0.8125rem",
        lineHeight: "1.375rem",
        color: "rgb(64 64 64)",
        flex: isMobile ? "none" : "1",
        width: isMobile ? "100%" : "auto",
      }}
    >
      <>
        <style jsx global>{`
          @media (max-width: 768px) {
            .cookie-consent-container {
              box-sizing: border-box !important;
            }
            .cookie-consent-container > div {
              display: flex !important;
              flex-direction: column !important;
              width: 100% !important;
              gap: 0.5rem !important;
              box-sizing: border-box !important;
            }
            .cookie-accept-button,
            .cookie-decline-button {
              width: 100% !important;
              display: block !important;
              box-sizing: border-box !important;
              margin: 0 !important;
            }
            .cookie-consent-content {
              width: 100% !important;
              box-sizing: border-box !important;
            }
          }
        `}</style>
        <span>
          <strong>Quick heads up:</strong> This site uses cookies for basic analytics.
          No creepy tracking.{" "}
          <Link
            href="/cookies"
            className="underline hover:text-orange-500 transition-colors"
          >
            See what we collect
          </Link>
        </span>
      </>
    </CookieConsent>
  );
}
