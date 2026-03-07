import { describe, expect, it } from "vitest";
import { generateFallbackDigest } from "@/lib/fallbackDigest";
import { Incident } from "@/lib/types";

describe("generateFallbackDigest", () => {
  it("generates a fallback digest for valid incidents", () => {
    const incidents: Incident[] = [
      {
        id: "inc_001",
        title: "Fake utility payment email reported",
        description:
          "Residents received an email pretending to be from the city utility office asking for urgent payment.",
        category: "phishing",
        location: "North Frisco",
        severity: "medium",
        status: "unverified",
        source: "Neighborhood Board",
        timestamp: "2026-03-06T09:00:00Z",
      },
      {
        id: "inc_002",
        title: "Fake bank password reset email",
        description:
          "Residents received an email claiming unusual banking activity and requesting password reset through a non-bank link.",
        category: "phishing",
        location: "North Frisco",
        severity: "high",
        status: "verified",
        source: "Community Forum",
        timestamp: "2026-03-06T11:10:00Z",
      },
      {
        id: "inc_003",
        title: "Community center Wi-Fi portal imitation",
        description:
          "A spoofed captive portal appeared near the community center asking users to sign in with email credentials.",
        category: "network_security",
        location: "West Frisco",
        severity: "high",
        status: "verified",
        source: "Remote Work Club",
        timestamp: "2026-03-05T14:35:00Z",
      },
    ];

    const result = generateFallbackDigest(incidents);

    expect(result.mode).toBe("fallback");
    expect(result.summary).toContain("3 incidents were reviewed");
    expect(result.summary).toContain("overall risk level appears high");
    expect(result.highlights.length).toBeGreaterThan(0);
    expect(result.actions.length).toBeGreaterThan(0);
  });

  it("returns a helpful empty-state digest when no incidents are provided", () => {
    const result = generateFallbackDigest([]);

    expect(result.mode).toBe("fallback");
    expect(result.summary).toContain("No incidents matched the current filters");
    expect(result.highlights).toEqual([]);
    expect(result.actions).toEqual([
      "Adjust filters or add a new incident to generate a digest.",
    ]);
  });
});