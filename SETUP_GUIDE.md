# TuckerTrips - Complete Setup Guide

**Last Updated:** November 9, 2025
**Status:** Production-Ready (with critical fixes applied)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account ([sign up free](https://app.supabase.com))
- (Optional) Brevo account for email features

### 1. Clone & Install
```bash
cd /path/to/project
pnpm install
```

### 2. Set Up Supabase

#### Create Project
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Choose organization, name project (e.g., "tuckertrips")
4. Set database password (save it!)
5. Select region closest to your users
6. Wait 2-3 minutes for setup

#### Run Database Migrations
1. Go to **SQL Editor** in Supabase dashboard
2. Run migrations **in this exact order**:

**Migration 1 - Initial Schema:**
```sql
-- Copy entire contents of supabase/migrations/20250101000000_initial_schema.sql
-- Paste into SQL Editor and click "Run"
```

**Migration 2 - Disable RLS (Critical Fix):**
```sql
-- Copy entire contents of supabase/migrations/20250109000000_disable_rls_for_custom_auth.sql
-- Paste into SQL Editor and click "Run"
```

**Migration 3 - Storage Buckets:**
```sql
-- Copy entire contents of supabase/migrations/20250109000001_create_storage_buckets.sql
-- Paste into SQL Editor and click "Run"
```

**Migration 4 - Fix Date Types:**
```sql
-- Copy entire contents of supabase/migrations/20250109000002_fix_date_types.sql
-- Paste into SQL Editor and click "Run"
```

#### Get API Credentials
1. Go to **Settings** → **API** in Supabase dashboard
2. Copy these values:
   - **Project URL** (e.g., `https://abc123xyz.supabase.co`)
   - **anon/public key** (starts with `eyJhbG...`)
   - **service_role key** (starts with `eyJhbG...`) ⚠️ Keep secret!

### 3. Configure Environment

The `.env.local` file is already created with a secure JWT secret. **Update it with your Supabase credentials:**

```bash
# Edit .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important:**
- ✅ JWT_SECRET already generated (don't change it)
- ✅ Don't commit `.env.local` to git
- ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code

### 4. Run Development Server

```bash
pnpm dev
```

App runs at: **http://localhost:3000**

### 5. Test the App

1. **Sign Up:** Create a new account
2. **Create Trip:** Add your first trip with photos
3. **Chat:** If multiple users online, test real-time chat
4. **Share Trip:** Make a trip public and view in Discover

---

## ✅ What Was Fixed (November 9, 2025)

### Critical Fixes Applied

1. **RLS Authentication Mismatch** ✅
   - **Issue:** RLS policies used `auth.uid()` (Supabase Auth) but app uses custom JWT
   - **Fix:** Disabled RLS, security enforced at API layer
   - **Files:** `supabase/migrations/20250109000000_disable_rls_for_custom_auth.sql`

2. **File Upload Implementation** ✅
   - **Issue:** UI existed but files never uploaded
   - **Fix:** Full Supabase Storage integration
   - **Files:**
     - `lib/storage.js` - upload utilities
     - `app/api/[[...path]]/route.js` - `/api/upload` endpoint
     - `components/NewTripModal.js` - actual upload on submit
     - `supabase/migrations/20250109000001_create_storage_buckets.sql`

3. **Date Storage Types** ✅
   - **Issue:** Dates stored as TEXT (bad for sorting/filtering)
   - **Fix:** Converted to proper DATE type
   - **Files:** `supabase/migrations/20250109000002_fix_date_types.sql`

4. **Environment Validation** ✅
   - **Issue:** App crashed with unclear errors if env vars missing
   - **Fix:** Validation on startup with helpful error messages
   - **Files:** `lib/env-validation.js`

5. **Chat Polling → Realtime** ✅
   - **Issue:** Inefficient polling (messages every 3s, users every 10s)
   - **Fix:** Supabase Realtime subscriptions
   - **Files:**
     - `hooks/useRealtimeMessages.js`
     - `hooks/useRealtimeOnlineUsers.js`
     - `components/ChatPanel.js` (updated)

6. **Environment Setup** ✅
   - **Issue:** No `.env.local` file
   - **Fix:** Created with secure JWT secret
   - **Files:** `.env.local` (not committed)

---

## 📦 Project Structure

```
Updated-latest-tucket/
├── app/                          # Next.js 14 App Router
│   ├── api/[[...path]]/         # Single catch-all API route
│   ├── contact/                 # Static pages
│   ├── help/
│   ├── privacy/
│   ├── terms/
│   ├── layout.js                # Root layout
│   └── page.js                  # Landing page
├── components/                   # React components
│   ├── trips/                   # Trip-related components
│   ├── ui/                      # shadcn/ui components (65+)
│   ├── AuthModal.js             # Login/Signup
│   ├── ChatPanel.js             # Real-time chat
│   ├── Dashboard.js             # Main app
│   ├── LandingPage.js           # Marketing page
│   ├── NewTripModal.js          # Trip creation
│   └── ...
├── hooks/                        # Custom React hooks
│   ├── useRealtimeMessages.js   # Real-time chat messages
│   └── useRealtimeOnlineUsers.js # Real-time online status
├── lib/                          # Utilities
│   ├── api.js                   # API client
│   ├── env-validation.js        # Environment validation
│   ├── storage.js               # File upload utilities
│   ├── supabase.js              # Supabase clients
│   └── ...
├── supabase/                     # Database
│   └── migrations/              # SQL migrations
│       ├── 20250101000000_initial_schema.sql
│       ├── 20250109000000_disable_rls_for_custom_auth.sql
│       ├── 20250109000001_create_storage_buckets.sql
│       └── 20250109000002_fix_date_types.sql
├── .env.local                    # Environment config (YOU create this)
├── .env.example                  # Template
├── package.json                  # Dependencies
├── CLAUDE.md                     # Project instructions
└── README.md                     # Original README

```

---

## 🗄️ Database Schema

### Tables

**users**
- id (TEXT, PK)
- email (UNIQUE)
- password (hashed bcrypt)
- name, bio
- last_seen, is_online
- created_at

**trips**
- id (TEXT, PK)
- user_id (FK → users)
- title, destination
- start_date, end_date (DATE type) ✅ Fixed
- status ('future' | 'taken')
- visibility ('private' | 'public')
- trip_images (comma-separated URLs) ✅ Now working
- airlines, accommodations (JSONB arrays)
- shared_with (JSONB array of user IDs)
- created_at, updated_at

**messages**
- id (TEXT, PK)
- sender_id, recipient_id (FK → users)
- content
- read (BOOLEAN)
- created_at

### Storage Buckets

**trip-images** ✅ New
- Max file size: 10MB
- Allowed types: JPEG, PNG, WebP, GIF
- Public access: Yes

**avatars** ✅ New (future use)
- Max file size: 2MB
- Allowed types: JPEG, PNG, WebP
- Public access: Yes

---

## 🔒 Security Model

### Authentication
- **Method:** Custom JWT (7-day expiry)
- **Storage:** localStorage (⚠️ XSS risk - acceptable for MVP)
- **Hashing:** bcryptjs (10 rounds)

### Authorization
- **RLS:** Disabled (auth.uid() incompatible with custom JWT)
- **Security Layer:** API route with JWT verification
- **Service Role:** Used server-side only (bypasses RLS)

### Best Practices Applied
✅ Passwords hashed before storage
✅ JWT secret 512-bit strength
✅ Service role key never exposed to client
✅ CORS configured for allowed origins
✅ Input validation with Zod

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Users
- `PATCH /api/users/profile` - Update profile
- `POST /api/users/heartbeat` - Keep online
- `GET /api/users/online` - Get online users

### Trips
- `POST /api/trips` - Create trip
- `GET /api/trips` - Get user's trips (paginated)
- `GET /api/trips/public/all` - Get public trips (paginated)
- `GET /api/trips/shared` - Get shared trips (paginated)
- `GET /api/trips/:id` - Get single trip
- `PATCH /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `POST /api/trips/:id/share` - Share via email

### Upload ✅ New
- `POST /api/upload` - Upload files to Supabase Storage

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get conversation

---

## 🎨 Features

### Implemented ✅
- [x] User authentication (JWT)
- [x] Trip CRUD operations
- [x] File uploads to Supabase Storage
- [x] Real-time chat (Supabase Realtime)
- [x] Online user detection
- [x] Trip sharing (email invites)
- [x] Public trip discovery
- [x] Pagination (backend + frontend)
- [x] Responsive design
- [x] Error boundaries
- [x] Loading states
- [x] Environment validation

### Not Implemented ❌
- [ ] Search trips by destination/dates
- [ ] Filter trips
- [ ] Friend/follower system
- [ ] Trip comments/likes
- [ ] Notifications system
- [ ] Map view integration
- [ ] AI trip summaries
- [ ] Analytics/insights
- [ ] Email service (requires Brevo setup)

---

## 🚢 Deployment

### Option 1: Netlify (Recommended)

**Already configured!** (`netlify.toml` exists)

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Environment Variables:**
Set these in Netlify dashboard → Site Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL` (your production URL)

### Option 2: Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

Add same environment variables in Vercel dashboard.

### Post-Deployment Checklist
- [ ] Test signup/login
- [ ] Test trip creation with file upload
- [ ] Test chat functionality
- [ ] Test trip sharing
- [ ] Verify images display correctly
- [ ] Check all environment variables loaded
- [ ] Test on mobile device

---

## 🐛 Troubleshooting

### "Missing environment variable" error
- ✅ Check `.env.local` exists
- ✅ Verify all required vars are set
- ✅ Restart dev server (`pnpm dev`)

### File upload fails
- ✅ Check storage buckets exist in Supabase
- ✅ Run migration `20250109000001_create_storage_buckets.sql`
- ✅ Verify file size < 10MB
- ✅ Check file type is image (JPEG/PNG/WebP/GIF)

### Chat not real-time
- ✅ Check Supabase Realtime is enabled (should be by default)
- ✅ Verify network connection
- ✅ Open browser console for errors

### Database errors
- ✅ Ensure all migrations ran in correct order
- ✅ Check Supabase service is running
- ✅ Verify service role key is correct

### Can't login/signup
- ✅ Check JWT_SECRET is set in `.env.local`
- ✅ Open Network tab in browser DevTools
- ✅ Check API response for specific error

---

## 📚 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- shadcn/ui (Radix UI)
- Framer Motion
- Sonner (toasts)

**Backend:**
- Next.js API Routes
- Supabase (PostgreSQL)
- JWT authentication
- bcryptjs
- Zod validation

**Real-time:**
- Supabase Realtime ✅ New
- WebSocket subscriptions

**Storage:**
- Supabase Storage ✅ New

**Deployment:**
- Netlify / Vercel
- PostgreSQL (Supabase)

---

## 🤝 Contributing

### Code Style
- Use functional components
- Prefer hooks over classes
- Use Tailwind for styling
- Follow ESLint rules

### Before Committing
1. Run `pnpm lint`
2. Test authentication flow
3. Test file uploads
4. Check console for errors

---

## 📝 Next Steps (Recommended)

1. **Set up Email Service** (Optional)
   - Create Brevo account
   - Get SMTP credentials
   - Update `.env.local`
   - Test trip sharing emails

2. **Add Search & Filtering**
   - Implement trip search by destination
   - Add date range filtering
   - Add status filtering (future/taken)

3. **Improve Security**
   - Consider migrating to Supabase Auth
   - Implement CSRF protection
   - Add rate limiting
   - Move JWT to httpOnly cookies

4. **Add Tests**
   - Unit tests for components
   - Integration tests for API
   - E2E tests with Playwright

5. **Performance Optimization**
   - Implement image optimization
   - Add lazy loading
   - Cache API responses
   - Bundle size optimization

6. **Analytics**
   - Add Google Analytics
   - Track trip creation
   - Monitor errors (Sentry)

---

## 🆘 Support

**Issues?**
- Check this guide first
- Review error logs in browser console
- Check Supabase logs in dashboard
- Verify environment variables

**Still stuck?**
- Open an issue with:
  - Exact error message
  - Steps to reproduce
  - Browser/OS info
  - Screenshots if applicable

---

## ✨ Credits

**Built with:**
- Next.js Team
- Supabase Team
- shadcn (for amazing UI components)
- Radix UI Team
- Tailwind CSS Team

**Project:** TuckerTrips - Full-Stack Travel Diary App
**Version:** 1.0.0 (Production-Ready)
**License:** Proprietary

---

**Happy Traveling! 🌍✈️**
