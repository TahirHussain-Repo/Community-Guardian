# Design Documentation

## Technical Stack

Frontend
- Next.js (App Router)
- React
- TailwindCSS

Backend
- Next.js API routes

AI
- OpenAI GPT model for summarization

Testing
- Vitest

---

## Architecture

The application follows a lightweight full-stack architecture:

Frontend (React UI)
↓
Next.js API Routes
↓
Local JSON storage
↓
AI digest + fallback summarization

This approach keeps the project simple while demonstrating end-to-end functionality.

---

## AI Design

The AI feature generates a digest summarizing incident patterns.

The prompt instructs the model to:

- remain calm and factual
- avoid exaggerating risk
- acknowledge unverified incidents

This reduces the risk of misleading summaries.

---

## Fallback Strategy

If the AI request fails due to:

- API errors
- network issues
- invalid responses

the system automatically falls back to rule-based summarization.

This guarantees that the feature remains usable even when AI is unavailable.

---

## Future Enhancements

Potential improvements include:

- database persistence
- authentication
- incident verification workflow
- geospatial incident maps
- trend analysis