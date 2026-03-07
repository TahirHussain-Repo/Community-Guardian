"use client";

import { useEffect, useMemo, useState } from "react";
import IncidentForm from "@/components/IncidentForm";
import IncidentList from "@/components/IncidentList";
import DigestPanel from "@/components/DigestPanel";
import Filters from "@/components/Filters";
import { Incident } from "@/lib/types";

export default function HomePage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoadingIncidents, setIsLoadingIncidents] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await fetch("/api/incidents");
        if (!response.ok) {
          throw new Error("Failed to load incidents.");
        }
  
        const data = (await response.json()) as Incident[];
        setIncidents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIncidents(false);
      }
    }
  
    loadIncidents();
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const title = incident.title ?? "";
      const description = incident.description ?? "";
      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || incident.category === selectedCategory;

      const matchesSeverity =
        !selectedSeverity || incident.severity === selectedSeverity;

      const matchesStatus = !selectedStatus || incident.status === selectedStatus;

      return (
        matchesSearch && matchesCategory && matchesSeverity && matchesStatus
      );
    });
  }, [incidents, searchTerm, selectedCategory, selectedSeverity, selectedStatus]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSeverity("");
    setSelectedStatus("");
  }

  async function handleAddIncident(newIncident: Incident) {
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncident),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save new incident.");
      }
  
      const savedIncident = (await response.json()) as Incident;
      setIncidents((prev) => [savedIncident, ...prev]);
      setAddModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStatusChange(
  incidentId: string,
  newStatus: Incident["status"]
  ) {
    try {
      const response = await fetch("/api/incidents", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ incidentId, newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update incident status.");
      }

      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === incidentId
            ? { ...incident, status: newStatus }
            : incident
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-[1600px]">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Guardian</h1>
              <p className="mt-2 max-w-3xl text-sm text-gray-600">
                A lightweight AI-assisted dashboard that turns noisy local safety and
                digital security reports into calm, actionable daily digests.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Incident
            </button>
          </header>

          <section className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Incidents</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {isLoadingIncidents ? "—" : incidents.length}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Visible Results</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {filteredIncidents.length}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">High Severity</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {filteredIncidents.filter((incident) => incident.severity === "high").length}
              </p>
            </div>
          </section>

          <section className="mb-6">
            <Filters
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedSeverity={selectedSeverity}
              selectedStatus={selectedStatus}
              onSearchTermChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onSeverityChange={setSelectedSeverity}
              onStatusChange={setSelectedStatus}
              onClear={clearFilters}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:min-h-[500px] lg:items-stretch">
            <div className="min-w-0">
              <IncidentList 
                incidents={filteredIncidents} 
                onStatusChange={handleStatusChange} 
              />
            </div>

            <div className="min-w-0">
              <DigestPanel incidents={filteredIncidents} />
            </div>
          </section>

          {addModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setAddModalOpen(false)}
            >
              <div
                className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-300 bg-white p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <IncidentForm
                  onAddIncident={handleAddIncident}
                  onClose={() => setAddModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    );
}