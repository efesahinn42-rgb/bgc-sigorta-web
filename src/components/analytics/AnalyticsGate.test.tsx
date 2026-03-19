import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsGate } from "@/components/analytics/AnalyticsGate";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { siteConfig } from "@/lib/site-config";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

vi.mock("@/components/analytics/GoogleAnalytics", () => ({
  GoogleAnalytics: () => <div data-testid="ga-script" />,
}));

describe("AnalyticsGate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not render analytics before consent is given", async () => {
    render(
      <ConsentProvider>
        <AnalyticsGate />
      </ConsentProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("ga-script")).not.toBeInTheDocument();
      expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
    });
  });

  it("renders analytics after consent is accepted", async () => {
    localStorage.setItem(siteConfig.storageKeys.consent, "accepted");

    render(
      <ConsentProvider>
        <AnalyticsGate />
      </ConsentProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("ga-script")).toBeInTheDocument();
      expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
    });
  });

  it("keeps analytics disabled when consent is rejected", async () => {
    localStorage.setItem(siteConfig.storageKeys.consent, "rejected");

    render(
      <ConsentProvider>
        <AnalyticsGate />
      </ConsentProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("ga-script")).not.toBeInTheDocument();
      expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
    });
  });
});
