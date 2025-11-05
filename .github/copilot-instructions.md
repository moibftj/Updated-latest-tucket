# Tucker Trips — AI Coding Instructions

This guide helps AI coding agents become productive quickly in the Tucker Trips repository.

## High-level architecture (why it matters)
- **Next.js 14** full-stack application with API routes and server components.
- Single-file API handler: `app/api/[[...path]]/route.js` — all backend routes and methods live here. Modify carefully: new endpoints are added as new branches inside `handleRoute()`.
- **Supabase** backend (PostgreSQL database + Auth). All database operations use Supabase client with row-level security (RLS) policies.
- Client stores JWT in localStorage; server extracts userId with `verifyToken()` and checks Authorization header.

## Key files to read before coding
- `app/api/[[...path]]/route.js` — monolithic API router and Supabase usage examples.
- `app/page.js` — top-level auth check and bootstrapping (checkAuth, heartbeat logic).
- `components/` and `components/ui/` — business components vs shadcn/Radix UI primitives.
- `lib/utils.js` — common helpers (notably `cn()` for classNames).
- `next.config.js` — webpack polling and dev-container optimizations.
- `backend_test.py` and `test_result.md` — testing protocol and agent coordination.

## Project-specific conventions (follow these exactly)
- Package manager: **pnpm**. Use `pnpm dev` / `pnpm build && pnpm start` (see `package.json`).
- API pattern: add route logic inside `handleRoute()` and return via `handleCORS(NextResponse.json(...))`.
- **Supabase integration**: Use Supabase client for all database operations. Tables: `users`, `trips`, `messages`. All tables use UUID primary keys (`id`).
- UI: Next.js 14 client components with `'use client'` directive. Import shadcn components from `@/components/ui/*`.

## How to add an API endpoint (example)
1. Edit `app/api/[[...path]]/route.js`.
2. Follow existing route sections (look for comment headers: AUTH, USERS, MESSAGES, TRIPS).
3. If protected, call `verifyToken(request)` and get userId.
4. Perform database operations via Supabase client (e.g., `supabase.from('trips').select()`) and return the result.

## Running & testing
- Development (dev container optimized): `pnpm dev` (the repo config expects NODE_OPTIONS memory tuning).
- Alternate dev modes: `pnpm dev:no-reload`, `pnpm dev:webpack` (see `package.json` scripts).
- Backend tests: `python backend_test.py` (uses `requests`; configure `BASE_URL` as needed).

## Quick pitfalls to avoid
- Do not split the API into new files — the codebase intentionally uses the single catch-all route.
- Use Supabase client for all database operations, not MongoDB.
- When changing auth behavior, update `app/page.js` and the way tokens are read from localStorage.

## Agent testing & coordination
- Update `test_result.md` when you implement or change behavior so the testing agent can pick it up.
- Mark `needs_retesting: true` when API or database behavior changes.

## Environment Variables

**Critical**: Environment variables are stored in `.env.local` (gitignored) and configured in Netlify.

**Supabase Configuration:**
```bash
VITE_SUPABASE_BASE_URL=https://wcnguiercwrdhsielhno.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjbmd1aWVyY3dyZGhzaWVsaG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDI5MjIsImV4cCI6MjA3NzY3ODkyMn0.YUBNAfNLrG5Gnh_Om1I7DQgtDBv3p27YjjO4ZiFHMl4
SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjbmd1aWVyY3dyZGhzaWVsaG5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjEwMjkyMiwiZXhwIjoyMDc3Njc4OTIyfQ.ECkuKr0AUtM9Ra8AICiHGt7EH5EQY_H8zSPWAoIxuTI
```

**Deployment:**
- Netlify deployment configured via `netlify.toml`
- Environment variables must be set in Netlify dashboard: Site settings → Environment variables
- Local development uses `.env.local` file (never commit this file)

## Where to add small improvements
- Add unit-like integration tests in `tests/` if you expand behavior; keep them simple and fast.
- Small, safe changes (readme updates, comments in `route.js`, helper refactors) are encouraged; large structural changes require human review.

If anything above is unclear or you want more detail for a particular area (API examples, test runs, or UX components), tell me which area to expand and I will iterate.
