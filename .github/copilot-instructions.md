# Tucker Trips - AI Coding Instructions

## Project Overview
Tucker Trips is a Next.js 14 travel planning application with a complete full-stack architecture. The app allows users to plan, document, and share travel adventures with features including trip management, live chat, and social interactions.

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

### MongoDB Data Patterns
- Collections: `users`, `trips`, `messages`
- All documents use custom `id` field (UUID v4) instead of MongoDB `_id`
- Responses always strip MongoDB `_id` with destructuring: `const { _id, ...data } = result`
- Connection singleton pattern: `connectToMongo()` reuses client instance

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
# Development with memory optimization
yarn dev              # Uses NODE_OPTIONS='--max-old-space-size=512'

# Alternative dev modes
yarn dev:no-reload    # Without hot reload
yarn dev:webpack      # Webpack-specific optimizations
```

### Database Operations
- MongoDB connection via environment variables: `MONGO_URL`, `DB_NAME`, `JWT_SECRET`
- No migrations - collections created on first write
- Direct MongoDB client usage, no schema validation

### Testing
- Backend API testing via Python script `backend_test.py`
- Tests cover full user journey: registration → profile → messaging → trips
- Tests run against live deployment URL
- No frontend unit tests currently implemented

## Key File Locations

### Core Application Files
- `app/page.js` - Main app component with auth routing
- `app/api/[[...path]]/route.js` - Complete backend API
- `components/Dashboard.js` - Main authenticated user interface
- `components/ui/` - shadcn/ui component library

### Configuration
- `next.config.js` - Standalone build, MongoDB external packages, CORS headers
- `tailwind.config.js` - Extended shadcn theme with custom animations
- `package.json` - Yarn package manager, extensive Radix UI dependencies

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

## Environment Setup
- Requires MongoDB connection string in `MONGO_URL`
- JWT secret in `JWT_SECRET` 
- Optional `CORS_ORIGINS` for production deployments
- Uses standalone Next.js build for containerization