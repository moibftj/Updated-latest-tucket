# 🚀 Quick Reference - Tucker Trips Development

## 🔑 API Keys & Credentials

### Z.AI Claude Code
- **API Key**: `d1dcbd4b831a44caa6fb1749a3be0444.6c2hi0jaLKN1aQyp`
- **Base URL**: `https://api.z.ai/api/anthropic`
- **Config File**: `~/.claude/settings.json`

### Z.AI Secondary Key
- **API Key**: `f1a00b2514824f838f15cbffe114745d.zQMDs9jK66ILAsvT`

### Supabase (Configure in `.env.local`)
- **URL**: Get from https://app.supabase.com/
- **Anon Key**: Public key for client-side
- **Service Role**: Private key for server-side (keep secret!)

## 🎯 Common Commands

### Development
```bash
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### AI Coding Assistant
```bash
pnpm claude           # Launch Claude Code
pnpm ai               # Shorthand for Claude Code
claude                # Direct command (if in PATH)
```

### Deployment
```bash
pnpm netlify          # Netlify CLI
pnpm netlify:dev      # Local Netlify environment
pnpm netlify:deploy   # Deploy to Netlify
pnpm netlify:status   # Check deployment status
```

### Testing
```bash
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

## 🤖 Claude Code Usage

### Launch Claude Code
```bash
cd /workspaces/New-latest-Tucker-1
claude
```

### Useful Claude Commands
- `/status` - Check current model and configuration
- `/model` - Switch between GLM models
- `/help` - View all available commands
- `/reset` - Clear conversation context
- `/exit` or `Ctrl+C` - Exit Claude Code

### Model Selection
- **GLM-4.6** (Default): Best for complex tasks, refactoring, architecture
- **GLM-4.5-Air**: Best for quick edits, simple questions, fast iterations

## 📁 Project Structure

```
tucker-trips/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (monolithic route.js)
│   ├── error.js           # Error boundary
│   ├── global-error.js    # Root error boundary
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ErrorBoundary.js  # Error boundary component
│   └── ClientErrorHandler.js # Global error handler
├── lib/                   # Utilities
│   ├── api.js            # API client
│   ├── supabase.js       # Supabase client
│   └── supabase-errors.js # Error handling
├── .env.local            # Environment variables (not committed)
└── ZAI_SUPABASE_SETUP.md # This setup guide
```

## 🔒 Security Reminders

- ✅ `.env.local` is in `.gitignore` (never commit secrets!)
- ✅ Service role key only used server-side
- ✅ Client-side uses anon key with RLS
- ✅ JWT secret for token signing

## 🐛 Quick Troubleshooting

### Claude Code not working?
```bash
# Check installation
claude --version

# Check configuration
cat ~/.claude/settings.json

# Reinstall if needed
npm install -g @anthropic-ai/claude-code
```

### Supabase connection errors?
```bash
# Verify .env.local exists and has correct values
cat .env.local | grep SUPABASE

# Check Supabase client
# In browser console or Node:
# Should not show "Missing Supabase environment variables"
```

### Build failing?
```bash
# Check for errors
pnpm lint

# Clear Next.js cache
rm -rf .next
pnpm dev
```

## 📚 Documentation Links

- **Full Setup Guide**: [ZAI_SUPABASE_SETUP.md](./ZAI_SUPABASE_SETUP.md)
- **Error Boundaries**: [ERROR_BOUNDARIES.md](./ERROR_BOUNDARIES.md)
- **Implementation Summary**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Main README**: [README.md](./README.md)
- **Deployment**: [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)

## 🎓 Learning Resources

- **Z.AI Platform**: https://open.bigmodel.cn/
- **Supabase Docs**: https://supabase.com/docs
- **Next.js 14**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com/

---

💡 **Pro Tip**: Keep this file open while developing for quick reference to commands and credentials!
