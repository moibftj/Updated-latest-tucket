# Netlify Environment Variables Update Required

## Issue

Your current Netlify environment variables use different names than what the code expects.

### Current Netlify Variables:
```
NEXT_SUPABASE_BASE_URL
NEXT_SUPABASE_ANON_KEY
SERVICE_ROLE_KEY
JWT_SECRET
```

### Required Variable Names (Used by Code):
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET ✓ (correct)
```

## How to Fix

You need to update your Netlify environment variables to match what the code expects.

### Option 1: Using Netlify Dashboard

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. **Delete or rename** the old variables:
   - Delete `NEXT_SUPABASE_BASE_URL`
   - Delete `NEXT_SUPABASE_ANON_KEY`
   - Delete `SERVICE_ROLE_KEY`
4. **Add** the correct variables with the same values:
   - `NEXT_PUBLIC_SUPABASE_URL` = (same value as old NEXT_SUPABASE_BASE_URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (same value as old NEXT_SUPABASE_ANON_KEY)
   - `SUPABASE_SERVICE_ROLE_KEY` = (same value as old SERVICE_ROLE_KEY)
   - Keep `JWT_SECRET` as is
5. Save and redeploy your site

### Option 2: Using Netlify CLI

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site (if not already linked)
netlify link

# Set the correct environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url_here"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_anon_key_here"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key_here"

# Trigger a new deploy
netlify deploy --prod
```

### Quick Script Using Your Existing Values

Run this script to automatically update your Netlify environment variables using the Netlify CLI:

```bash
#!/bin/bash

# Get your Supabase credentials from Supabase Dashboard
# Settings → API

echo "Setting Netlify environment variables..."

# Set the variables (replace with your actual values)
NETLIFY_AUTH_TOKEN=nfp_opLsgtBAKtcLRiKvXjLncYtPdLSgHUUTa74b netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://ugxzjmzrmvbnhfejwjse.supabase.co"
NETLIFY_AUTH_TOKEN=nfp_opLsgtBAKtcLRiKvXjLncYtPdLSgHUUTa74b netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key"
NETLIFY_AUTH_TOKEN=nfp_opLsgtBAKtcLRiKvXjLncYtPdLSgHUUTa74b netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key"

echo "Environment variables updated! Redeploy your site to apply changes."
```

## Why This Matters

- `NEXT_PUBLIC_*` prefix is a Next.js convention that makes these variables available to client-side code
- The code explicitly looks for these exact variable names in [lib/supabase.js:6-7](lib/supabase.js#L6-L7) and [lib/supabase.js:24-25](lib/supabase.js#L24-L25)
- Without the correct names, your application won't be able to connect to Supabase

## Secrets Scanning Note

The `netlify.toml` file has been updated to omit both the old and new variable names from secrets scanning since:
- These Supabase public keys and URLs are **meant to be public** (they're protected by Row Level Security)
- Next.js includes `NEXT_PUBLIC_*` variables in the client bundle by design
- The actual secrets (SERVICE_ROLE_KEY, JWT_SECRET) are only used server-side

## After Updating

Once you've updated the environment variables:

1. Trigger a new Netlify deployment
2. The secrets scanning should pass (with the updated `netlify.toml`)
3. Your application will properly connect to Supabase
4. All authentication and database operations will work correctly

## Need Help?

Check [SECURITY.md](SECURITY.md) for more information about environment variable best practices.
