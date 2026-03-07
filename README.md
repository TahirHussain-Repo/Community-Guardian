# README

## Candidate Name
Tahir Hussain

---

## Demo Video
https://youtu.be/QCArhW96U6E

---

## Scenario Chosen
**Scenario 3 — Community Guardian: Incident Awareness Dashboard**

This application helps communities track and understand safety and digital-security incidents reported by residents. The dashboard aggregates incident reports, allows filtering by category/severity/status, and generates a safety digest summarizing patterns and recommended actions.

The goal is to provide **clear and responsible insights without exaggerating risk**, especially when incidents may still be unverified.

---

## Estimated Time Spent
Approximately **5 hours**.

Time breakdown (approximately):

| Task | Time |
|-----|------|
Project setup & architecture | ~15 minutes |
Dashboard UI + incident table | ~45 minutes |
Filtering & search functionality | ~30 minutes |
Create & update incident flow | ~1 hour |
AI digest + fallback implementation | ~1 hour |
JSON persistence via API routes | ~1 hour |
Testing & polish | ~30 minutes |

---

# Quick Start

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- OpenAI API key

---

## Run Commands

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
.env.local
```

Add your API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the application:

```bash
http://localhost:3000
```

## Test Commands

Run tests using Vitest:

```bash
npm test
```

Two tests are included:

- **Happy path test:** verifies fallback digest generation with valid incidents
- **Edge case test:** verifies graceful handling when no incidents are present

---

# AI Disclosure

### Did you use an AI assistant (Copilot, ChatGPT, etc.)?

**Yes**

AI assistance was used as a productivity tool for brainstorming implementation approaches, debugging small issues, and refining documentation.

---

### How did you verify the suggestions?

All suggestions were verified by:

- manually reviewing the code
- running the application locally
- validating expected behavior through testing
- confirming API responses and error handling

I also ensured that suggested code followed the intended architecture and did not introduce unnecessary dependencies or complexity.

---

### Give one example of a suggestion you rejected or changed

One AI suggestion recommended automatically generating AI digests every time the filter state changed.

I rejected that approach because it would:

- trigger unnecessary API calls
- increase latency
- potentially consume excessive API usage

Instead, I implemented a **manual "Generate AI Digest" button** while displaying a **rule-based fallback digest by default**, which provides a better user experience and more predictable system behavior.

---

# Tradeoffs & Prioritization

### What did you cut to stay within the 4–6 hour limit?

To stay within the time limit, I intentionally avoided adding:

- a full database integration
- user authentication
- incident attachments or media uploads
- map-based visualization
- moderation workflows for verifying reports

Instead, I focused on implementing the **core flows and reliability features required by the prompt**.

---

### What would you build next if you had more time?

If more time were available, I would add:

- a database-backed persistence layer (PostgreSQL or Supabase)
- authentication for moderators and community admins
- geospatial mapping of incidents
- trend analysis and incident clustering
- automated verification workflows for flagged incidents
- notification alerts for high-severity incidents

---

### Known Limitations

- Incidents are stored in a **local JSON file** for simplicity, which is suitable for local development but not production environments.
- The AI digest depends on the OpenAI API and may be unavailable if the API key is missing or rate limits occur.
- The fallback digest uses rule-based heuristics rather than advanced analytics.
- Incident reports rely on manual input and may include unverified information.

To mitigate these limitations, the system:

- clearly labels AI-generated summaries
- includes a responsible AI notice
- automatically falls back to deterministic summarization when AI is unavailable.

---
