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

### State Management Patterns
- Local state with React hooks (no external state management)
- `Dashboard.js` manages main app state: `user`, `trips`, `activeSection`
- API calls use fetch with manual token headers: `{ Authorization: \`Bearer ${localStorage.getItem('token')}\` }`
- Real-time features through polling (heartbeat system for online status)

## Development Workflows

### Running the Application
```bash
# Package manager: pnpm (not yarn/npm)
# Development with memory optimization for dev containers
pnpm dev              # Uses NODE_OPTIONS='--max-old-space-size=512'

# Alternative dev modes
pnpm dev:no-reload    # Without hot reload for performance
pnpm dev:webpack      # Webpack-specific optimizations

# Production build
pnpm build && pnpm start
```

### Dev Container Optimizations
- Webpack configured with polling (2s intervals) instead of file watching
- `aggregateTimeout: 300ms` to batch rebuilds
- `node_modules` excluded from watch to reduce CPU/memory
- `onDemandEntries` limits in-memory pages to 2 with 10s max inactive age
- See `next.config.js` webpack section for tuning parameters

### Database Operations
- MongoDB connection via environment variables: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`
- No migrations - collections created on first write
- Direct MongoDB client usage, no schema validation
- Connection singleton pattern prevents multiple connections

### Testing & Quality Assurance
- **Backend Testing**: Comprehensive Python test suite in `backend_test.py`
  - Tests full user journey: registration → profile → messaging → trips
  - Runs against live deployment (`BASE_URL` configurable)
  - Tests authentication, CRUD operations, real-time features
  - Usage: `python backend_test.py` (requires `requests` library)
- **AI Agent Testing Protocol**: Uses `test_result.md` for agent coordination
  - YAML-structured task tracking with status history
  - Main agent updates before delegating to testing agent
  - Tracks stuck tasks and testing priorities
- **Performance**: Webpack optimized for dev containers with reduced file watching

## Key File Locations

### Core Application Files
- `app/page.js` - Main app component with auth routing
- `app/api/[[...path]]/route.js` - Complete backend API
- `components/Dashboard.js` - Main authenticated user interface
- `components/ui/` - shadcn/ui component library

### Configuration
- `next.config.js` - Standalone build, MongoDB external packages, CORS headers, webpack polling
- `tailwind.config.js` - Extended shadcn theme with custom animations
- `package.json` - **pnpm** package manager (v9.12.3), extensive Radix UI dependencies
- `components.json` - shadcn/ui config (style: "new-york", tsx: false, icon: lucide)

## Data Models

### Trip Schema
```javascript
{
  id: string,           // UUID
  userId: string,       // Owner ID
  title: string,
  destination: string,
  startDate: string,
  endDate: string,
  status: 'future' | 'taken',
  visibility: 'private' | 'public',
  segments: Array,      // Itinerary items (flights, hotels, etc.)
  description: string,
  coverPhoto: string,
  // ... additional metadata
}
```

### Message Schema
```javascript
{
  id: string,
  senderId: string,
  recipientId: string,
  content: string,
  read: boolean,
  createdAt: Date
}
```

### User Schema
```javascript
{
  id: string,           // UUID
  email: string,
  password: string,     // bcrypt hashed
  name: string,
  bio: string,
  lastSeen: Date,
  isOnline: boolean
}
```

## Common Patterns

### API Route Addition
1. Add new route case in `handleRoute()` function
2. Follow pattern: `if (route === '/new/endpoint' && method === 'POST')`
3. Extract JWT with `verifyToken(request)` for protected routes
4. Return with `handleCORS(NextResponse.json(...))`

### Component Creation
1. Use `'use client'` directive for interactive components
2. Import UI components: `import { Button } from '@/components/ui/button'`
3. Style with Tailwind classes, use `cn()` for conditional styling
4. Follow naming: PascalCase for components, kebab-case for files

### Modal Patterns
Components like `EnhancedTripModal.js` use:
- Radix Dialog primitives for accessibility
- State managed in parent component
- `onSuccess` callback pattern for data updates
- Consistent `open`/`onClose` prop interface
- **Multi-step forms**: See `EnhancedTripModal.js` for pattern with `currentStep` state
  - Step navigation with validation before advancing
  - Form state accumulation across steps
  - Segments stored as arrays (airlines, accommodations)
  - Final submission combines all steps into single API call

### Form & Input Patterns
- Use Radix primitives with shadcn wrappers (e.g., `RadioGroup`, `Input`, `Textarea`)
- Custom components like `StarRating` follow controlled component pattern
- Toast notifications via `sonner`: `toast.success()`, `toast.error()`
- Form arrays managed with spread operators: `[...prev.airlines, newItem]`

## Environment Setup
- Requires MongoDB connection string in `MONGO_URL`
- JWT secret in `JWT_SECRET` 
- Optional `CORS_ORIGINS` for production deployments
- Uses standalone Next.js build for containerization

## AI Agent Testing Protocol
This project uses a specialized multi-agent testing system via `test_result.md`:

### Key Patterns
- **YAML Task Tracking**: All tasks tracked with `implemented`, `working`, `stuck_count`, `priority`
- **Status History**: Each task maintains detailed history with agent attribution
- **Communication Log**: Agent coordination through `agent_communication` array
- **Testing Delegation**: Main agent updates `test_result.md` before calling testing agent

### Usage Guidelines
- Always read `test_result.md` before making changes to understand current state
- Update task status history when implementing features
- Use `needs_retesting: true` to flag items for testing agent
- Track persistent issues via `stuck_count` increments
- Reference `test_plan.current_focus` for priority guidance

### File Structure
```yaml
user_problem_statement: "..."
backend:
  - task: "Feature name"
    implemented: true/false
    working: true/false/"NA"
    file: "path/to/file"
    stuck_count: 0
    priority: "high"/"medium"/"low"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"/"testing"/"user"
        comment: "Detailed description"
```