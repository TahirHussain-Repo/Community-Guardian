"use client";

import { useState } from "react";
import { INCIDENT_CATEGORIES, INCIDENT_SEVERITIES } from "@/lib/constants";
import { Incident } from "@/lib/types";
import {
  IncidentFormErrors,
  IncidentFormValues,
  validateIncidentForm,
} from "@/lib/validation";

type IncidentFormProps = {
  onAddIncident: (incident: Incident) => void;
  onClose?: () => void;
};

const initialValues: IncidentFormValues = {
  title: "",
  description: "",
  category: "",
  location: "",
  severity: "",
  source: "",
};

function formatLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function IncidentForm({ onAddIncident, onClose }: IncidentFormProps) {
  const [values, setValues] = useState<IncidentFormValues>(initialValues);
  const [errors, setErrors] = useState<IncidentFormErrors>({});

  function handleChange(
    field: keyof IncidentFormValues,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateIncidentForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newIncident: Incident = {
      id: `inc_${Date.now()}`,
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category as Incident["category"],
      location: values.location.trim(),
      severity: values.severity as Incident["severity"],
      status: "unverified",
      source: values.source.trim(),
      timestamp: new Date().toISOString(),
    };

    onAddIncident(newIncident);
    setValues(initialValues);
    setErrors({});
  }

  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Add Incident</h2>
          <p className="mt-1 text-sm text-gray-600">
            Create a new synthetic safety or digital-security incident.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a short incident title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the incident"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              value={values.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {INCIDENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {formatLabel(category)}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Severity
            </label>
            <select
              value={values.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select severity</option>
              {INCIDENT_SEVERITIES.map((severity) => (
                <option key={severity} value={severity}>
                  {formatLabel(severity)}
                </option>
              ))}
            </select>
            {errors.severity && (
              <p className="mt-1 text-xs text-red-600">{errors.severity}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Location
            </label>
            <input
              type="text"
              value={values.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-600">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Source
            </label>
            <input
              type="text"
              value={values.source}
              onChange={(e) => handleChange("source", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter source"
            />
            {errors.source && (
              <p className="mt-1 text-xs text-red-600">{errors.source}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Incident
        </button>
      </form>
    </div>
  );
}