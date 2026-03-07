import { describe, expect, it } from "vitest";
import { validateIncidentForm } from "@/lib/validation";

describe("validateIncidentForm", () => {
  it("returns validation errors for missing required fields", () => {
    const result = validateIncidentForm({
      title: "",
      description: "",
      category: "",
      location: "",
      severity: "",
      source: "",
    });

    expect(result.title).toBe("Title is required.");
    expect(result.description).toBe("Description is required.");
    expect(result.category).toBe("Category is required.");
    expect(result.location).toBe("Location is required.");
    expect(result.severity).toBe("Severity is required.");
    expect(result.source).toBe("Source is required.");
  });
});