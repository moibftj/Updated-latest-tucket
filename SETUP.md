# Tucker Trips - Quick Setup Guide

## 🎯 Current Status

✅ **Fully migrated to Supabase** - Ready to deploy!

## 📋 Prerequisites Completed

- ✅ Supabase project created
- ✅ Environment variables configured
- ✅ Database schema ready to deploy
- ✅ Build tested and passing

## 🚀 Quick Start (3 Steps)

### Step 1: Set Up Database Schema

Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor):

```bash
# Copy the schema file contents
cat supabase-schema.sql
```

Then paste and execute in Supabase SQL Editor.

### Step 2: Verify Environment Variables

Your `.env.local` is already configured with:

```
NEXT_PUBLIC_SUPABASE_URL=https://ugxzjmzrmvbnhfejwjse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
JWT_SECRET=jQL3k+NkwrDHI6t5...
```

### Step 3: Test Locally

```bash
# Start development server
pnpm dev

# Or build and test production
pnpm build
pnpm start
```

## 🌐 Deploy to Netlify

### Option A: Via Netlify Dashboard

1. Push code to GitHub:

   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push origin main
   ```

2. Go to [Netlify](https://app.netlify.com)
3. Import your repository
4. Add environment variables in Site Settings → Environment Variables:

   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ugxzjmzrmvbnhfejwjse.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE3MjMsImV4cCI6MjA3NjAyNzcyM30.Y3NpD7piNUGGFb69wUbr2KofHyIXkvIfct0Z9XXz8Bw`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak`
   - `JWT_SECRET` = `jQL3k+NkwrDHI6t5efaVlX/b+lmeUAWuXc4MuUJ7rKT7n3+MYUb+Qdrlkc/9Tkj1MneTqRSqH7pBlbnJVTY9hQ==`

5. Deploy!

### Option B: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to existing site or create new
netlify init

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://ugxzjmzrmvbnhfejwjse.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE3MjMsImV4cCI6MjA3NjAyNzcyM30.Y3NpD7piNUGGFb69wUbr2KofHyIXkvIfct0Z9XXz8Bw"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak"
netlify env:set JWT_SECRET "jQL3k+NkwrDHI6t5efaVlX/b+lmeUAWuXc4MuUJ7rKT7n3+MYUb+Qdrlkc/9Tkj1MneTqRSqH7pBlbnJVTY9hQ=="

# Deploy
netlify deploy --prod
```

## 🧪 Testing After Deployment

1. **Register a new user**

   - Test email/password validation
   - Verify JWT token is returned

2. **Create a trip**

   - Test future/taken status
   - Test private/public visibility
   - Verify segments, airlines, accommodations

3. **Test messaging**

   - Send messages between users
   - Check read/unread status

4. **Test discovery**
   - View public trips
   - Check shared trips functionality

## 📊 Database Tables

Your Supabase project needs these tables (created by `supabase-schema.sql`):

- **users**: id, email, password, name, bio, last_seen, is_online, created_at
- **trips**: id, user_id, title, destination, dates, status, visibility, segments, etc.
- **messages**: id, sender_id, recipient_id, content, read, created_at

## 🔒 Security Features

✅ Row Level Security (RLS) enabled
✅ Foreign key constraints
✅ Cascade deletes
✅ Indexed queries for performance
✅ Service role key for admin operations
✅ Anon key for client operations (future)

## 📚 Documentation

- Full deployment guide: `DEPLOYMENT.md`
- Migration details: `SUPABASE_MIGRATION.md`
- Database schema: `supabase-schema.sql`

## 🆘 Troubleshooting

**Build fails?**

- Check all env vars are set
- Run `pnpm install` to ensure dependencies

**Database errors?**

- Verify schema is deployed in Supabase
- Check service role key is correct
- View logs in Supabase Dashboard → Logs

**API errors?**

- Check browser console
- Verify Supabase project is active (not paused)
- Check RLS policies are enabled

## ✨ What's New

- ✅ PostgreSQL database (faster, more reliable)
- ✅ Row Level Security for automatic authorization
- ✅ Foreign key constraints for data integrity
- ✅ Better indexing for performance
- ✅ Real-time capabilities ready (future enhancement)

---

**Status**: 🟢 Production Ready
**Last Updated**: November 3, 2025
**Supabase Project**: ugxzjmzrmvbnhfejwjse
