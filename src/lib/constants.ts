import { IncidentCategory, IncidentSeverity, IncidentStatus } from "@/lib/types";

export const INCIDENT_CATEGORIES: IncidentCategory[] = [
    "phishing",
    "scam",
    "burgalary",
    "neighborhood_hazard",
    "network_security",
    "misinformation"
];

export const INCIDENT_SEVERITIES: IncidentSeverity[] = [
    "low",
    "medium",
    "high",
];

export const INCIDENT_STATUSES: IncidentStatus[] = [
    "unverified",
    "verified",
    "dismissed",
    "resolved"
];