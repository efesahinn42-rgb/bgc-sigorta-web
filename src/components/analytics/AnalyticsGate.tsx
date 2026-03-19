"use client";

import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { useConsent } from "@/components/consent/ConsentProvider";

export function AnalyticsGate() {
  const { consent, isHydrated } = useConsent();

  if (!isHydrated || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
      <Analytics />
    </>
  );
}
