"use client";

import { useEffect, useState } from "react";
import { Incident } from "@/lib/types";
import { generateFallbackDigest } from "@/lib/fallbackDigest";

type DigestResult = {
  summary: string;
  highlights: string[];
  actions: string[];
  mode: "ai" | "fallback";
};

type DigestPanelProps = {
  incidents: Incident[];
};

export default function DigestPanel({ incidents }: DigestPanelProps) {
  const [digest, setDigest] = useState<DigestResult>(
    generateFallbackDigest(incidents)
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDigest(generateFallbackDigest(incidents));
    setMessage("Showing rule-based digest for current results.");
  }, [incidents]);

  async function handleGenerateDigest() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ incidents }),
      });

      if (!response.ok) {
        throw new Error("Digest request failed.");
      }

      const data = await response.json();

      const isValidDigest =
        data &&
        Array.isArray(data.highlights) &&
        Array.isArray(data.actions) &&
        typeof data.summary === "string";

      setDigest(
        isValidDigest ? data : generateFallbackDigest(incidents)
      );

      if (isValidDigest && data.mode === "ai") {
        setMessage("AI digest generated successfully.");
      } else {
        setMessage("AI unavailable. Showing rule-based fallback digest.");
      }
    } catch (error) {
      console.error(error);
      const fallback = generateFallbackDigest(incidents);
      setDigest(fallback);
      setMessage("AI unavailable. Showing rule-based fallback digest.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-[400px] flex-col rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
      <div className="shrink-0 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Safety Digest</h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate a calm, actionable digest for the currently visible incidents.
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            (digest.mode ?? "fallback") === "ai"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {(digest.mode ?? "fallback") === "ai" ? "AI Digest" : "Rule-Based Digest"}
        </span>
      </div>

      <div className="mt-4 shrink-0">
        <button
          type="button"
          onClick={handleGenerateDigest}
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating AI Digest..." : "Generate AI Digest"}
        </button>

        {message && (
          <p className="mt-2 text-xs text-gray-600">{message}</p>
        )}
      </div>

      <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
        <div className="rounded-xl border border-gray-300 bg-white p-4">
          <p className="text-sm font-medium text-gray-900">Summary</p>
          <p className="mt-2 text-sm leading-6 text-gray-700">{digest.summary ?? "No summary available."}</p>
        </div>

        <div className="rounded-xl border border-gray-300 bg-white p-4">
          <p className="text-sm font-medium text-gray-900">Highlights</p>
          {(digest.highlights ?? []).length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {(digest.highlights ?? []).map((highlight, index) => (
                <li key={index}>• {highlight}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No highlights available.</p>
          )}
        </div>

        <div className="rounded-xl border border-gray-300 bg-white p-4">
          <p className="text-sm font-medium text-gray-900">Recommended Actions</p>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {(digest.actions ?? []).map((action, index) => (
              <li key={index}>• {action}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-xs text-yellow-800 leading-relaxed">
            <strong>Responsible AI Notice:</strong> AI-generated summaries may be
            imperfect or incomplete. Always review the underlying incidents,
            especially reports marked as <strong>unverified</strong>, before taking
            action. If the AI service is unavailable, the system automatically falls
            back to a rule-based digest to ensure continuity and transparency.
        </div>
      </div>
    </div>
  );
}