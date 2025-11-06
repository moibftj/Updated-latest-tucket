# Z.AI & Supabase Configuration Guide

This guide walks you through configuring Z.AI with Claude Code and linking your project to Supabase.

## ✅ Prerequisites

- Node.js 18 or newer (✓ Currently using v22.17.0)
- Access to Z.AI Open Platform
- Supabase project credentials

## 🤖 Z.AI Claude Code Setup

### Step 1: Install Claude Code

Claude Code has been installed globally:

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2: Configuration Complete

The Claude Code settings have been configured at `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "d1dcbd4b831a44caa6fb1749a3be0444.6c2hi0jaLKN1aQyp",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.6",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.6"
  }
}
```

**Model Mapping:**
- **GLM-4.6** (Opus & Sonnet): Most powerful model for complex tasks
- **GLM-4.5-Air** (Haiku): Faster, lighter model for quick tasks

### Step 3: Start Using Claude Code

Navigate to your project and launch Claude Code:

```bash
cd /workspaces/New-latest-Tucker-1
claude
```

When prompted:
- Select "Yes" to use the configured API key
- Grant Claude Code permission to access files in your folder

**Useful Commands:**
- `/status` - Check current model status
- `/help` - View all available commands
- `/model` - Switch between models

## 🗄️ Supabase Configuration

### Environment Variables Setup

A `.env.local` file has been created with placeholders for your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

### How to Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**: https://app.supabase.com/
2. **Select your project**
3. **Navigate to**: Settings → API
4. **Copy the following values**:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
openssl rand -base64 32
```

Copy the output and paste it as `JWT_SECRET` in `.env.local`

### Update `.env.local`

Edit `/workspaces/New-latest-Tucker-1/.env.local` and replace all placeholder values with your actual credentials.

## 🚀 Quick Start

### 1. Configure Environment Variables

```bash
# Edit .env.local with your actual Supabase credentials
nano .env.local
```

### 2. Verify Supabase Connection

The project already has Supabase client configured in `lib/supabase.js`:
- Server-side client: Uses service role key
- Client-side client: Uses anon key

### 3. Test the Setup

```bash
# Run development server
pnpm dev

# In another terminal, start Claude Code
claude
```

## 📝 Available NPM Scripts

```bash
# Development
pnpm dev                # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server

# Deployment
pnpm netlify            # Access Netlify CLI
pnpm netlify:dev        # Run local Netlify dev environment
pnpm netlify:deploy     # Deploy to Netlify
pnpm netlify:status     # Check deployment status

# Testing
pnpm test               # Run tests
pnpm test:watch         # Run tests in watch mode
pnpm lint               # Run ESLint
```

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Protect Service Role Key** - Only use server-side, never expose to client
3. **Rotate API Keys** - Regularly rotate Z.AI and Supabase keys
4. **Use Row Level Security** - Enable RLS on all Supabase tables

## 📚 Additional Resources

- **Z.AI Documentation**: https://open.bigmodel.cn/
- **Supabase Documentation**: https://supabase.com/docs
- **Claude Code Documentation**: https://docs.anthropic.com/claude/docs
- **Tucker Trips Documentation**: See `ERROR_BOUNDARIES.md`, `IMPLEMENTATION_SUMMARY.md`

## 🆘 Troubleshooting

### Claude Code Issues

```bash
# Check Claude Code is installed
claude --version

# Check configuration
cat ~/.claude/settings.json

# Re-check model status
claude
/status
```

### Supabase Connection Issues

```bash
# Verify environment variables are loaded
pnpm dev

# Check for errors in terminal
# Common issues:
# - Missing NEXT_PUBLIC_SUPABASE_URL
# - Missing NEXT_PUBLIC_SUPABASE_ANON_KEY
# - Incorrect URL format (should be https://<project-ref>.supabase.co)
```

### API Key Issues

If you see authentication errors:
1. Verify API keys are correctly copied (no extra spaces)
2. Check if API keys are still valid
3. Ensure you're using the correct environment (dev/prod)

## ✅ Configuration Checklist

- [x] Node.js 18+ installed
- [x] Claude Code installed globally
- [x] `~/.claude/settings.json` configured with Z.AI credentials
- [x] `.env.local` file created
- [ ] Supabase credentials added to `.env.local`
- [ ] JWT secret generated and added
- [ ] Test development server runs successfully
- [ ] Test Claude Code launches successfully

---

**Next Steps:**
1. Fill in your actual Supabase credentials in `.env.local`
2. Test the application: `pnpm dev`
3. Launch Claude Code: `claude`
4. Start building with AI assistance!
