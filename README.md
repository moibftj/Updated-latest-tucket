# Tucker Trips

A Next.js 14 travel planning application with full-stack architecture. Users can plan trips, chat with other travelers, and share their adventures.

## 📚 Documentation

- [Quick Start](#quick-start) - Get the app running locally
- [Z.AI & Supabase Setup](#zai--supabase-setup) - Configure AI coding assistant and database ⭐ NEW
- [Webflow MCP Integration](#webflow-mcp-integration) - AI-powered content management
- [Tech Stack](#tech-stack) - Technologies used
- [Development](#development) - Development workflows
- [Deployment](#deployment) - Deploy to production
- [Troubleshooting](#troubleshooting) - Common issues and solutions

📖 **Detailed Guides:**

- [ZAI_SUPABASE_SETUP.md](./ZAI_SUPABASE_SETUP.md) - **Z.AI Claude Code & Supabase configuration** ⭐ NEW
- [WEBFLOW_MCP_GUIDE.md](./WEBFLOW_MCP_GUIDE.md) - Complete Webflow MCP setup and usage guide
- [WEBFLOW_SDK_USAGE.md](./WEBFLOW_SDK_USAGE.md) - Webflow JavaScript SDK integration guide
- [ERROR_BOUNDARIES.md](./ERROR_BOUNDARIES.md) - Error boundary implementation and best practices
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - 2025 error handling enhancements
- [SECURITY.md](./SECURITY.md) - Security best practices
- [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md) - Detailed deployment guide

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm package manager
- Git configured properly (see Git Setup below)

### Installation

```bash
# Clone the repository
git clone https://github.com/aqeelwebbing/New-latest-Tucker-1
cd New-latest-Tucker-1

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

### Git Setup (Important!)

**If you encounter Git commit errors (GPG signing, author invalid):**

#### Quick Fix

```bash
# Run the automated setup script
./setup-git.sh
```

#### Manual Setup

```bash
# Configure user details
git config --local user.name "Aqeel Jamil"
git config --local user.email "186092537+aqeelwebbing@users.noreply.github.com"

# Disable GPG signing (prevents Codespaces authentication issues)
git config --local commit.gpgsign false
```

#### Common Git Issues

- **GPG signing errors**: Run `git config --local commit.gpgsign false`
- **Author invalid**: Ensure correct email with `git config --local user.email "186092537+aqeelwebbing@users.noreply.github.com"`
- **Authentication issues**: Check `gh auth status` and re-authenticate if needed

## Z.AI & Supabase Setup

### AI-Powered Development with Z.AI Claude Code

Tucker Trips is configured to work with Z.AI's GLM models through Claude Code for AI-assisted development.

**✅ Already Configured:**
- Claude Code installed globally
- Z.AI API credentials configured in `~/.claude/settings.json`
- GLM-4.6 and GLM-4.5-Air models ready to use

**Quick Start:**

```bash
# Launch Claude Code in your project
cd /workspaces/New-latest-Tucker-1
claude

# Or use the npm script
pnpm claude
pnpm ai  # Shorthand
```

**Available Models:**
- **GLM-4.6** (Opus & Sonnet): Most powerful for complex tasks
- **GLM-4.5-Air** (Haiku): Faster for quick operations

### Supabase Database Setup

1. **Get your Supabase credentials** from https://app.supabase.com/
2. **Update `.env.local`** with your project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=$(openssl rand -base64 32)
```

3. **Apply database schema**:

```bash
# The schema is in supabase/migrations/
# Upload via Supabase Dashboard → SQL Editor
```

📖 **Full Setup Guide**: [ZAI_SUPABASE_SETUP.md](./ZAI_SUPABASE_SETUP.md)

## Webflow MCP Integration

This project includes integration with Webflow's Model Context Protocol (MCP) server, enabling AI agents to interact with Webflow APIs for content management and design operations.

### Quick Reference

- **JavaScript SDK**: For programmatic API access → [WEBFLOW_SDK_USAGE.md](./WEBFLOW_SDK_USAGE.md)
- **MCP Server**: For AI agent interactions → [WEBFLOW_MCP_GUIDE.md](./WEBFLOW_MCP_GUIDE.md)

**Already installed:**

- `webflow-api` (v3.2.1) - JavaScript SDK for server-side operations
- MCP scripts in `package.json` for AI agent integration

### Webflow Prerequisites

- Node.js 22.3.0 or higher (for MCP server)
- A Webflow account
- Webflow API token (for local setup) or OAuth (for remote setup)

### Remote Setup (Recommended)

The remote MCP server uses OAuth for authentication and includes a companion app for live canvas syncing.

#### Cursor Configuration

1. The `.cursor/mcp.json` file is already configured:

   ```json
   {
     "mcpServers": {
       "webflow": {
         "url": "https://mcp.webflow.com/sse"
       }
     }
   }
   ```

2. Open Cursor Settings → MCP & Integrations
3. Cursor will automatically open an OAuth login page to authorize your Webflow sites
4. Open your site in Webflow Designer
5. Launch the "Webflow MCP Bridge App" from the Apps panel (press E)
6. Wait for the app to connect

#### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.webflow.com/sse"]
    }
  }
}
```

### Local Setup

For local development, you can run the MCP server with your own Webflow API token.

#### Get Your Webflow API Token

1. Go to [Webflow API Playground](https://developers.webflow.com/data/reference/authorization)
2. Log in and generate a token
3. Copy the token and add it to `.env.local`:

```bash
WEBFLOW_TOKEN=your_webflow_api_token_here
```

#### Run MCP Server Locally

```bash
# Using npm script
pnpm mcp:webflow

# Or directly
WEBFLOW_TOKEN="your_token" npx -y webflow-mcp-server@latest
```

#### Cursor Local Configuration

Update `.cursor/mcp.json` for local mode:

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "your_webflow_token"
      }
    }
  }
}
```

### Example Prompts

Once connected, try these AI prompts:

- "Analyze my last 5 blog posts and suggest 3 new topic ideas with SEO keywords"
- "Find older blog posts that mention similar topics and add internal links to my latest post"
- "Create a hero section card on my home page with a CTA button and responsive design"
- "Give me a link to open [MY_SITE_NAME] in the Webflow Designer"

### Troubleshooting Webflow MCP

#### Reset OAuth Token

```bash
rm -rf ~/.mcp-auth
```

#### Node.js Version Issues

The MCP server requires Node.js 22.3.0 or higher. Check your version:

```bash
node -v
```

If needed, upgrade Node.js or use nvm:

```bash
nvm install 22.3.0
nvm use 22.3.0
```

#### NPM Cache Issues

```bash
npm cache clean --force
```

#### Connection Issues

1. Ensure the Webflow MCP Bridge App is published in your workspace
2. Verify the app is running in the Webflow Designer (Apps panel → E)
3. Check that your Webflow API token is valid
4. Restart your AI client (Cursor or Claude Desktop)

### Resources

- [Webflow MCP Documentation](https://github.com/webflow/mcp-server)
- [Webflow API Documentation](https://developers.webflow.com/data/reference)
- [Webflow JavaScript SDK](https://www.npmjs.com/package/webflow-api)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes (single-file pattern)
- **Database**: Supabase (PostgreSQL) with UUID IDs
- **Authentication**: JWT tokens
- **UI Components**: shadcn/ui + Radix UI
- **Deployment**: Netlify

## Project Structure

```text
app/
├── api/[[...path]]/route.js    # All API endpoints (monolithic pattern)
├── globals.css                 # Global styles
├── layout.js                   # Root layout
└── page.js                     # Main application entry

components/
├── ui/                         # shadcn/ui components
├── Dashboard.js                # Main dashboard
├── EnhancedTripModal.js        # Trip creation modal
└── ...                         # Other business components

lib/
├── api.js                      # Centralized API client
├── supabase.js                 # Database configuration
└── utils.js                    # Utility functions
```

## Development

### Running the Application

```bash
# Standard development
pnpm dev

# Alternative dev modes
pnpm dev:no-reload     # Without hot reload
pnpm dev:webpack       # Webpack polling mode
```

### API Development

All API routes are in `app/api/[[...path]]/route.js`. To add a new endpoint:

1. Add route logic inside `handleRoute()` function
2. Use existing patterns for authentication and database access
3. Follow the Supabase pattern: UUID `id` fields, camelCase conversion

### Testing

```bash
# Run backend tests
python backend_test.py

# Update test results
# Edit test_result.md when behavior changes
```

## Deployment

### Environment Variables

Required environment variables (set in `.env.local` and Netlify):

```bash
VITE_SUPABASE_BASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SERVICE_ROLE_KEY=your_service_role_key
```

### Netlify Deployment

1. Configure environment variables in Netlify dashboard
2. Deploy automatically via GitHub integration
3. Build configuration is in `netlify.toml`

## Architecture Notes

- **Single-file API**: All backend routes in one file for this project
- **UUID Primary Keys**: Uses UUID v4 for all database tables
- **JWT Auth**: Stored in localStorage, verified server-side
- **Monolithic by Design**: Intentionally simple architecture

## Contributing

1. Follow existing code patterns
2. Update `test_result.md` when changing behavior
3. Use the established Git configuration
4. Keep the single-file API pattern intact

## Troubleshooting

### Git Issues

- Run `./setup-git.sh` for automated configuration
- Check `.gitconfig.template` for manual setup

### Development Issues

- Use `pnpm dev:webpack` if file watching doesn't work
- Check environment variables in `.env.local`
- Verify Supabase connection in API routes

### Deployment Issues

- Ensure all environment variables are set in Netlify
- Check `netlify.toml` configuration
- Verify build process with `pnpm build`
