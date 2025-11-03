# Tucker Trips - AI Coding Instructions

## Project Overview
Tucker Trips is a Next.js 14 travel planning application with full-stack architecture. Users can plan trips, chat with other travelers, and share their adventures. Built with Next.js 14, MongoDB, JWT auth, and shadcn/ui components.

## Critical Constraints
- **DO NOT modify**: Landing page design (`LandingPage.js` component) - it's locked
- **Focus areas**: Authenticated features, backend APIs, performance, code quality

## Architecture Overview

### Single-File API Pattern (`app/api/[[...path]]/route.js`)
**Critical**: All API routes live in ONE file using Next.js catch-all routes `[[...path]]`

**How routes work:**
- `/api/auth/login` → `params.path = ['auth', 'login']`
- Parse path array in `handleRoute()` to determine which code to execute
- All HTTP methods (GET/POST/PATCH/DELETE) funnel through single `handleRoute()` function
- Sections clearly marked: `// ============ AUTH ROUTES ============`

**Adding a new endpoint:**
```javascript
// In app/api/[[...path]]/route.js, inside handleRoute()

// POST /api/trips/share
if (route === '/trips/share' && method === 'POST') {
    const decoded = verifyToken(request) // if protected
      if (!decoded) return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
        
          const body = await request.json()
            // ... your logic
              const { _id, ...result } = data  // Strip MongoDB _id
                return handleCORS(NextResponse.json(result))
}
```

**Never split into separate route files** - monolithic by design for this project.

### MongoDB Patterns
- **Connection**: Singleton pattern via `connectToMongo()` - reuses one client
- **Custom IDs**: All documents use `id: uuidv4()` instead of MongoDB `_id`
- **Response pattern**: Always strip `_id` → `const { _id, ...data } = result`
- **Collections**: `users`, `trips`, `messages`

**Data models:**
```javascript
// User
{ id, email, password, name, bio, lastSeen, isOnline, createdAt }

// Trip
{ id, userId, title, destination, startDate, endDate, status: 'future'|'taken', 
  visibility: 'private'|'public', segments: [], description, coverPhoto, 
    tripImages, weather, overallComment, airlines: [], accommodations: [], 
      sharedWith: [], createdAt, updatedAt }

      // Message
      { id, senderId, recipientId, content, read: boolean, createdAt }
      ```

      ### Authentication Flow
      1. Client stores JWT in `localStorage.getItem('token')`
      2. Server verifies via `verifyToken(request)` → extracts `userId` from JWT payload
      3. Protected routes check `Authorization: Bearer <token>` header
      4. `app/page.js` manages auth state on mount with `authApi.getMe()`
      5. Heartbeat system: `userApi.heartbeat()` keeps user online (5-min window)

      ### Client-Side API Layer (`lib/api.js`)
      Centralized API client with automatic auth headers:

      ```javascript
      import { tripApi, authApi, userApi, messageApi } from '@/lib/api'

      // Usage examples
      const trips = await tripApi.getAll()
      await authApi.login({ email, password })
      await userApi.updateProfile({ name, bio })
      await messageApi.send({ recipientId, content })
      ```

      **Never use raw `fetch()`** - always use these helpers for consistency.

      ### UI Component Architecture
      - **shadcn/ui + Radix**: Primitives in `/components/ui/` (buttons, dialogs, inputs)
      - **Business logic**: `/components/` (Dashboard, EnhancedTripModal, ChatPanel)
      - **CVA styling**: Use `class-variance-authority` for variants (see `button.jsx`)
      - **Utility**: `cn()` from `lib/utils.js` merges Tailwind classes (clsx + tailwind-merge)
      - **Client components**: Mark with `'use client'` for interactivity

      **Component pattern:**
      ```javascript
      'use client'
      import { Button } from '@/components/ui/button'
      import { cn } from '@/lib/utils'

      export default function MyComponent() {
          return <Button variant="outline" className={cn("extra-class")}>Click</Button>
      }
      ```

      ### Dashboard Structure
      - **Main**: `Dashboard.js` - orchestrates sections and state
      - **Sidebar**: `DashboardSidebar.js` - navigation (Home, My Trips, Future, Shared, Discover)
      - **Sections**: `HomeSection.js`, `TripsSection.js` - render trip grids
      - **Modals**: `EnhancedTripModal.js` - multi-step trip creation (5 steps with segments)
      - **Trip metadata**: `TRIP_SECTION_META` object defines section behavior (titles, empty states, permissions)

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
      
      }
}