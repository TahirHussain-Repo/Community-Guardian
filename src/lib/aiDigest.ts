import OpenAI from "openai";
import { Incident } from "@/lib/types";

export type AIDigestResult = {
  summary: string;
  highlights: string[];
  actions: string[];
  mode: "ai";
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildIncidentPrompt(incidents: Incident[]) {
  return incidents
    .map((incident, index) => {
      return `${index + 1}. Title: ${incident.title}
Description: ${incident.description}
Category: ${incident.category}
Location: ${incident.location}
Severity: ${incident.severity}
Status: ${incident.status}
Source: ${incident.source}
Timestamp: ${incident.timestamp}`;
    })
    .join("\n\n");
}

export async function generateAIDigest(
  incidents: Incident[]
): Promise<AIDigestResult> {
  const prompt = `
You are helping generate a calm, actionable community safety and digital wellness digest.

Based only on the incidents below:
- write a short summary in calm language
- provide 2 to 3 short highlights
- provide 2 to 3 recommended actions
- clearly acknowledge unverified incidents when relevant
- do not exaggerate risk
- do not invent facts outside the provided incidents

Return valid JSON only in this exact shape:
{
  "summary": "string",
  "highlights": ["string"],
  "actions": ["string"]
}

Incidents:
${buildIncidentPrompt(incidents)}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You generate concise, calm, safety-focused summaries from structured incident reports.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No AI response content returned.");
  }

  const parsed = JSON.parse(content);

  return {
    summary: parsed.summary ?? "",
    highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
    actions: Array.isArray(parsed.actions) ? parsed.actions : [],
    mode: "ai",
  };
}