import { Incident } from "@/lib/types";

export type FallbackDigestResult = {
  summary: string;
  highlights: string[];
  actions: string[];
  mode: "fallback";
};

function formatCategory(category: string) {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function countByCategoryAndLocation(incidents: Incident[]) {
  const grouped = new Map<string, number>();

  for (const incident of incidents) {
    const key = `${incident.category}__${incident.location}`;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  }

  return Array.from(grouped.entries())
    .map(([key, count]) => {
      const [category, location] = key.split("__");
      return { category, location, count };
    })
    .sort((a, b) => b.count - a.count);
}

function getTopSeverity(incidents: Incident[]) {
  if (incidents.some((incident) => incident.severity === "high")) return "high";
  if (incidents.some((incident) => incident.severity === "medium")) return "medium";
  return "low";
}

function buildActions(incidents: Incident[]): string[] {
  const actions = new Set<string>();

  if (incidents.some((incident) => incident.category === "phishing")) {
    actions.add(
      "Verify suspicious emails, texts, and payment requests through trusted official channels."
    );
  }

  if (incidents.some((incident) => incident.category === "network_security")) {
    actions.add(
      "Avoid logging into unfamiliar portals and review account security settings, including password updates and MFA."
    );
  }

  if (
    incidents.some(
      (incident) =>
        incident.category === "burglary" ||
        incident.category === "neighborhood_hazard"
    )
  ) {
    actions.add(
      "Stay alert to repeated neighborhood patterns and report urgent physical safety concerns to appropriate local contacts."
    );
  }

  if (incidents.some((incident) => incident.category === "misinformation")) {
    actions.add(
      "Treat unverified claims cautiously until they are confirmed by trusted or official sources."
    );
  }

  if (actions.size === 0) {
    actions.add(
      "Review recent incidents carefully and prioritize follow-up on any repeated or high-severity reports."
    );
  }

  return Array.from(actions).slice(0, 3);
}

export function generateFallbackDigest(
  incidents: Incident[]
): FallbackDigestResult {
  if (incidents.length === 0) {
    return {
      summary:
        "No incidents matched the current filters, so no digest was generated.",
      highlights: [],
      actions: ["Adjust filters or add a new incident to generate a digest."],
      mode: "fallback",
    };
  }

  const grouped = countByCategoryAndLocation(incidents);
  const topGroups = grouped.slice(0, 3);
  const highestSeverity = getTopSeverity(incidents);
  const verifiedCount = incidents.filter(
    (incident) => incident.status === "verified"
  ).length;
  const unverifiedCount = incidents.filter(
    (incident) => incident.status === "unverified"
  ).length;

  const summary = `${incidents.length} incidents were reviewed in fallback mode. The overall risk level appears ${highestSeverity}. ${verifiedCount} reports are marked verified, while ${unverifiedCount} remain unverified and should be reviewed carefully.`;

  const highlights = topGroups.map((group) => {
    const categoryLabel = formatCategory(group.category);
    const incidentWord = group.count === 1 ? "incident" : "incidents";
    return `${group.count} ${incidentWord} related to ${categoryLabel} were reported in ${group.location}.`;
  });

  const actions = buildActions(incidents);

  return {
    summary,
    highlights,
    actions,
    mode: "fallback",
  };
}