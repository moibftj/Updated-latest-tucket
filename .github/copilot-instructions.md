# Tucker Trips - AI Coding Instructions

## Project Overview
Tucker Trips is a Next.js 14 travel planning application with a complete full-stack architecture. The app allows users to plan, document, and share travel adventures with features including trip management, live chat, and social interactions.

## Critical Design Constraints
- **Landing Page**: DO NOT modify the landing page design (`app/page.js` unauthenticated state)
- All improvements should focus on authenticated features, backend logic, performance, and code quality

## Architecture & Key Patterns


### Single-File API Handler (`app/api/[[...path]]/route.js`)
- **Critical**: All API routes are handled in one monolithic file using Next.js catch-all routes
- Routes are determined by parsing `params.path` array (e.g., `/api/auth/login` → `path = ['auth', 'login']`)
- All HTTP methods (GET, POST, PATCH, DELETE) route through `handleRoute()` function
- Each route section is clearly commented (AUTH ROUTES, USER ROUTES, MESSAGE ROUTES, TRIP ROUTES)
- MongoDB operations use direct client calls, not an ORM
- Always handle CORS with `handleCORS()` wrapper for all responses

### Authentication Flow
- JWT tokens stored in localStorage on client side
- Token verification via `verifyToken()` helper extracts `userId` from JWT payload
- Protected routes check `Authorization: Bearer <token>` header
- User authentication state managed in main `app/page.js` with `checkAuth()` on mount
- Online presence tracking via heartbeat system (`POST /api/users/heartbeat`)

### MongoDB Data Patterns
- Collections: `users`, `trips`, `messages`
- All documents use custom `id` field (UUID v4) instead of MongoDB `_id`
- Responses always strip MongoDB `_id` with destructuring: `const { _id, ...data } = result`
- Connection singleton pattern: `connectToMongo()` reuses client instance
- **User Model**: `{ id, email, password, name, bio, lastSeen, isOnline }`
- **Trip Model**: `{ id, userId, title, destination, startDate, endDate, status: 'future'|'taken', visibility: 'private'|'public', segments: [], description, coverPhoto }`
- **Message Model**: `{ id, senderId, recipientId, content, read: boolean, createdAt }`

### UI Component Architecture
- **shadcn/ui + Radix**: All UI components in `/components/ui/` follow shadcn patterns
- **CVA Pattern**: Components use `class-variance-authority` for variant-based styling (see `button.jsx`)
- **Utility Function**: `cn()` in `/lib/utils.js` combines `clsx` and `tailwind-merge`
- **Component Structure**: Business components in `/components/`, UI primitives in `/components/ui/`

## Tucker Trips — concise AI coding instructions

This short guide helps an AI coding agent become productive quickly in the Tucker Trips repository.
Keep guidance short, actionable and reference real files below.

## High-level architecture (why it matters)
- Next.js 14 frontend + API routes. Single-file API handler: `app/api/[[...path]]/route.js` — all backend routes and methods live here. Modify carefully: new endpoints are added as new branches inside `handleRoute()`.
- MongoDB used directly via a `connectToMongo()` singleton. Documents use a custom `id` (UUID v4) instead of `_id`.
- Client stores JWT in localStorage; server extracts userId with `verifyToken()` and checks Authorization header.

## Key files to read before coding
- `app/api/[[...path]]/route.js` — monolithic API router and DB usage examples.
- `app/page.js` — top-level auth check and bootstrapping (checkAuth, heartbeat logic).
- `components/` and `components/ui/` — business components vs shadcn/Radix UI primitives.
- `lib/utils.js` — common helpers (notably `cn()` for classNames).
- `next.config.js` — webpack polling and dev-container optimizations.
- `backend_test.py` and `test_result.md` — testing protocol and agent coordination.

## Project-specific conventions (follow these exactly)
- Package manager: pnpm. Use `pnpm dev` / `pnpm build && pnpm start` (see `package.json`).
- API pattern: add route logic inside `handleRoute()` and return via `handleCORS(NextResponse.json(...))`.
- Use UUID `id` fields on all documents (users, trips, messages). When returning DB results, existing code strips `_id` — follow that pattern.
- UI: use `'use client'` for interactive components. Import shadcn components from `@/components/ui/*`.

## How to add an API endpoint (example)
1. Edit `app/api/[[...path]]/route.js`.
2. Follow existing route sections (look for comment headers: AUTH, USERS, MESSAGES, TRIPS).
3. If protected, call `verifyToken(request)` and get userId.
4. Perform DB operations via the established `connectToMongo()` client and return the result after stripping `_id`.

## Running & testing
- Development (dev container optimized): `pnpm dev` (the repo config expects NODE_OPTIONS memory tuning).
- Alternate dev modes: `pnpm dev:no-reload`, `pnpm dev:webpack` (see `package.json` scripts).
- Backend tests: `python backend_test.py` (uses `requests`; configure `BASE_URL` as needed).

## Quick pitfalls to avoid
- Do not split the API into new files — the codebase intentionally uses the single catch-all route.
- Don’t assume MongoDB documents use `_id` — code expects `id`.
- When changing auth behavior, update `app/page.js` and the way tokens are read from localStorage.

## Agent testing & coordination
- Update `test_result.md` when you implement or change behavior so the testing agent can pick it up.
- Mark `needs_retesting: true` when API or DB behavior changes.

## Where to add small improvements
- Add unit-like integration tests in `tests/` if you expand behavior; keep them simple and fast.
- Small, safe changes (readme updates, comments in `route.js`, helper refactors) are encouraged; large structural changes require human review.

If anything above is unclear or you want more detail for a particular area (API examples, test runs, or UX components), tell me which area to expand and I will iterate.
