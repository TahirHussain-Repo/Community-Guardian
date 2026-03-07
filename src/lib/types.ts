export type IncidentCategory = "phishing" | "scam" | "burgalary" | "neighborhood_hazard" | "network_security" | "misinformation";;
export type IncidentSeverity = "low" | "medium" | "high";
export type IncidentStatus = "unverified" | "verified" | "dismissed" |"resolved";

export interface Incident {
    id: string;
    title: string;
    description: string;
    category: IncidentCategory;
    location: string;
    severity: IncidentSeverity;
    status: IncidentStatus;
    source: string;
    timestamp: string;
}