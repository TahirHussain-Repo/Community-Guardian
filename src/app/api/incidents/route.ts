import { NextRequest, NextResponse } from "next/server";
import { readIncidentsFromFile, writeIncidentsToFile } from "@/lib/incidentsFile";
import { Incident } from "@/lib/types";

export async function GET() {
  try {
    const incidents = await readIncidentsFromFile();
    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Failed to read incidents:", error);
    return NextResponse.json(
      { error: "Failed to load incidents." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newIncident = (await request.json()) as Incident;

    const incidents = await readIncidentsFromFile();
    const updatedIncidents = [newIncident, ...incidents];

    await writeIncidentsToFile(updatedIncidents);

    return NextResponse.json(newIncident, { status: 201 });
  } catch (error) {
    console.error("Failed to create incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { incidentId, newStatus } = body as {
      incidentId: string;
      newStatus: Incident["status"];
    };

    if (!incidentId || !newStatus) {
      return NextResponse.json(
        { error: "incidentId and newStatus are required." },
        { status: 400 }
      );
    }

    const incidents = await readIncidentsFromFile();

    const updatedIncidents = incidents.map((incident) =>
      incident.id === incidentId
        ? { ...incident, status: newStatus }
        : incident
    );

    await writeIncidentsToFile(updatedIncidents);

    const updatedIncident = updatedIncidents.find(
      (incident) => incident.id === incidentId
    );

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error("Failed to update incident:", error);
    return NextResponse.json(
      { error: "Failed to update incident." },
      { status: 500 }
    );
  }
}
