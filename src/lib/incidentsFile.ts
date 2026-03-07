import fs from "fs/promises";
import path from "path";
import { Incident } from "@/lib/types";

const incidentsFilePath = path.join(process.cwd(), "src", "data", "incidents.json");

export async function readIncidentsFromFile(): Promise<Incident[]> {
  const fileContents = await fs.readFile(incidentsFilePath, "utf-8");
  return JSON.parse(fileContents) as Incident[];
}

export async function writeIncidentsToFile(incidents: Incident[]): Promise<void> {
  await fs.writeFile(
    incidentsFilePath,
    JSON.stringify(incidents, null, 2),
    "utf-8"
  );
}