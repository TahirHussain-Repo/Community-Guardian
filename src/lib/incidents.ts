import incidentsData from "@/data/incidents.json";
import { Incident } from "@/lib/types";

export function getInitialIncidents(): Incident[] {
    return incidentsData as Incident[];
}