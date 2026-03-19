"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

export type ConsentStatus = "accepted" | "rejected" | "unset";

type ConsentContextValue = {
  consent: ConsentStatus;
  isHydrated: boolean;
  setConsent: (value: Exclude<ConsentStatus, "unset">) => void;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentStatus>("unset");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(siteConfig.storageKeys.consent);

    if (storedConsent === "accepted" || storedConsent === "rejected") {
      setConsentState(storedConsent);
    }

    setIsHydrated(true);
  }, []);

  const setConsent = (value: Exclude<ConsentStatus, "unset">) => {
    localStorage.setItem(siteConfig.storageKeys.consent, value);
    localStorage.setItem(siteConfig.storageKeys.consentDate, new Date().toISOString());
    setConsentState(value);
  };

  const contextValue = useMemo(
    () => ({
      consent,
      isHydrated,
      setConsent,
    }),
    [consent, isHydrated]
  );

  return <ConsentContext.Provider value={contextValue}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }

  return context;
}
