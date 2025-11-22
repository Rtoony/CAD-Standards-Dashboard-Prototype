# ACME CAD Standards Library - Architecture Strategy

## Current State: Phase 1 (Prototype)
The application currently runs as a Single Page Application (SPA) using React. Data is mocked via a Service Layer (`dataService.ts`) that mimics a database connection with artificial latency.

## Target State: Phase 2 (Production)
The goal is to decouple the UI from the Data Source to support a local or network-based SQLite database.

### The "Service Layer" Pattern
We strictly adhere to a Service Layer pattern to ensure the React UI never knows *where* the data comes from.

```
[ React UI (App.tsx) ]  <-- calls -->  [ Data Service (dataService.ts) ]  <-- queries -->  [ SQLite DB / Mock Data ]
```

### Database Schema (UCCS)
The database is structured around the **Unified Civil Classification System (UCCS)**.
See `db/schema.sql` for the exact table definitions.

1.  **Atomic Tiers:** We do not store "Layer Names". We store the 6 atomic tiers (Discipline, Category, Element, Modifier, Status, Type) and generate names dynamically.
2.  **User Persistence:** User favorites and settings are stored in `user_preferences` and `user_favorites` tables.

### Future LLM Instructions
If you are an LLM picking up this project:
1.  **DO NOT** hardcode data into `App.tsx` or `constants.ts`.
2.  **ALWAYS** route data operations through `services/dataService.ts`.
3.  **MAINTAIN** the SQL schema in `db/schema.sql` as the source of truth for data structure.
4.  **PRESERVE** the "Dark Industrial/Steampunk" aesthetic in the UI components.
