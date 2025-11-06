# Netlify Environment Variables - Complete Setup Guide

## Overview

Tucker Trips uses Netlify for deployment and environment variable management. This guide covers setting up all required environment variables including Supabase and Z.AI Claude integration.

## Required Environment Variables

### Supabase Configuration (Required)

Set these in **Netlify Dashboard** → **Site settings** → **Environment variables**:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
```

### Z.AI Claude Integration (Optional)

For AI-assisted development with Claude Code:

```bash
ZAI_API_KEY=f1a00b2514824f838f15cbffe114745d.zQMDs9jK66ILAsvT
```

**Note:** The Z.AI API key is only needed for local development with Claude Code, not for production deployment.

## Setup Methods

### Option 1: Netlify Dashboard (Recommended)

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable** for each required variable
4. Select **Same value for all deploy contexts** (or customize per environment)
5. Save and trigger a new deployment

### Option 2: Netlify CLI

```bash
# Login to Netlify
netlify login

# Link to your site (if not already linked)
netlify link

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key_here"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key_here"
netlify env:set JWT_SECRET "your_jwt_secret_here"

# Optional: Z.AI API key for local development
netlify env:set ZAI_API_KEY "f1a00b2514824f838f15cbffe114745d.zQMDs9jK66ILAsvT"

# Trigger a new deploy
netlify deploy --prod
```

### Option 3: Using the Update Script

We've included a helper script in the repository:

```bash
# Make the script executable
chmod +x update-netlify-env.sh

# Run the script
./update-netlify-env.sh
```

## Local Development

For local development, create a `.env.local` file (already gitignored):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_jwt_secret_here

# Z.AI Claude Code (Local Development Only)
ZAI_API_KEY=f1a00b2514824f838f15cbffe114745d.zQMDs9jK66ILAsvT
ANTHROPIC_AUTH_TOKEN=d1dcbd4b831a44caa6fb1749a3be0444.6c2hi0jaLKN1aQyp
```

**Important:** Never commit `.env.local` to version control!

## Getting Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
5. Generate a secure JWT secret:
   ```bash
   openssl rand -base64 32
   ```
   Use this for `JWT_SECRET`

## Environment Variable Security

### Public Variables
These are safe to include in client-side code:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Secret Variables
These must NEVER be exposed to client-side code:
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

The `netlify.toml` configuration ensures proper secrets scanning while allowing public variables.

## Netlify Secrets Scanning

The `netlify.toml` file is configured to:
- Allow `NEXT_PUBLIC_*` variables (they're meant to be public)
- Protect actual secrets (SERVICE_ROLE_KEY, JWT_SECRET)
- Omit build artifacts from scanning

## Troubleshooting

### "Cannot connect to Supabase"
- Verify all environment variables are set in Netlify Dashboard
- Check that variable names exactly match (including `NEXT_PUBLIC_` prefix)
- Trigger a new deployment after updating variables

### "Secrets scanning failed"
- The `netlify.toml` is already configured correctly
- Public Supabase URLs/keys are intentionally omitted from scanning
- If issues persist, verify `SECRETS_SCAN_OMIT_KEYS` in `netlify.toml`

### "Claude Code not working"
- Claude Code uses local configuration file (`~/.claude/settings.json`)
- Z.AI API key is for local development only
- See `ZAI_CLAUDE_SETUP.md` for Claude Code configuration

## Migration from Old Variable Names

If you previously used different variable names:

| Old Name | New Name |
|----------|----------|
| `NEXT_SUPABASE_BASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `NEXT_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `SERVICE_ROLE_KEY` | `SUPABASE_SERVICE_ROLE_KEY` |
| `JWT_SECRET` | `JWT_SECRET` (unchanged) |

Use Netlify CLI or Dashboard to update to the new names.

## Deployment Checklist

Before deploying to Netlify:

- [ ] All required environment variables set in Netlify Dashboard
- [ ] Supabase credentials verified and working
- [ ] JWT_SECRET is a strong, randomly generated key
- [ ] `.env.local` exists locally but is gitignored
- [ ] Test deployment successful
- [ ] Authentication flows working
- [ ] Database connections successful

## Additional Resources

- [SECURITY.md](SECURITY.md) - Security best practices
- [ZAI_CLAUDE_SETUP.md](ZAI_CLAUDE_SETUP.md) - Claude Code configuration
- [DEPLOY_INSTRUCTIONS.md](DEPLOY_INSTRUCTIONS.md) - Deployment guide
- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
