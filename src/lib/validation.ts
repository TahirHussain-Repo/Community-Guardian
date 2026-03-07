import { IncidentCategory, IncidentSeverity } from "@/lib/types";
import { INCIDENT_CATEGORIES, INCIDENT_SEVERITIES } from "@/lib/constants";

export type IncidentFormValues = {
  title: string;
  description: string;
  category: string;
  location: string;
  severity: string;
  source: string;
};

export type IncidentFormErrors = Partial<
  Record<keyof IncidentFormValues, string>
>;

export function validateIncidentForm(
  values: IncidentFormValues
): IncidentFormErrors {
  const errors: IncidentFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.location.trim()) {
    errors.location = "Location is required.";
  }

  if (!values.source.trim()) {
    errors.source = "Source is required.";
  }

  if (!values.category.trim()) {
    errors.category = "Category is required.";
  } else if (
    !INCIDENT_CATEGORIES.includes(values.category as IncidentCategory)
  ) {
    errors.category = "Please select a valid category.";
  }

  if (!values.severity.trim()) {
    errors.severity = "Severity is required.";
  } else if (
    !INCIDENT_SEVERITIES.includes(values.severity as IncidentSeverity)
  ) {
    errors.severity = "Please select a valid severity.";
  }

  return errors;
}