# Webflow MCP Server Integration Guide

This document provides detailed setup and usage instructions for integrating Webflow's Model Context Protocol (MCP) server with the Tucker Trips project.

## What is Webflow MCP?

Webflow's MCP server enables AI agents (like Claude, Cursor, or other AI assistants) to interact directly with Webflow APIs. This allows you to:

- Manage Webflow CMS content programmatically
- Create and update page elements
- Analyze and optimize SEO
- Automate content creation workflows
- Build and modify site structure

## Setup Options

You have two options for integrating Webflow MCP:

1. **Remote Setup (Recommended)**: Uses OAuth authentication and a hosted MCP server
2. **Local Setup**: Runs the MCP server locally with an API token

## Remote Setup (OAuth)

### Step 1: Configure Cursor

The `.cursor/mcp.json` file is already configured for remote access:

```json
{
  "mcpServers": {
    "webflow": {
      "url": "https://mcp.webflow.com/sse"
    }
  }
}
```

### Step 2: Authorize Sites

1. Open Cursor Settings → Cursor Settings → MCP & Integrations
2. Under MCP Tools, verify the Webflow server is listed
3. Cursor will open an OAuth login page in your browser
4. Log in to Webflow and authorize the sites you want to use

### Step 3: Set Up Webflow Designer Bridge

1. Open your Webflow site in the Webflow Designer
2. Press `E` to open the Apps panel
3. Find and launch the "Webflow MCP Bridge App"
4. Wait for the connection indicator to show "Connected"

### Step 4: Start Using AI Commands

You can now use AI prompts to interact with your Webflow site!

**Example prompts:**

- "Give me a link to open my site in the Webflow Designer"
- "List all blog posts from the last 30 days"
- "Create a new blog post about [topic] with SEO optimization"
- "Add a hero section with a CTA button to the homepage"
- "Analyze my site's SEO and suggest improvements"

## Local Setup (API Token)

### Step 1: Get Your Webflow API Token

1. Go to [Webflow API Playground](https://developers.webflow.com/data/reference/authorization)
2. Log in to your Webflow account
3. Generate a new API token
4. Copy the token (you won't be able to see it again)

### Step 2: Configure Environment

1. Copy `.env.example` to `.env.local` if you haven't already:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Webflow token to `.env.local`:

   ```bash
   WEBFLOW_TOKEN=your_webflow_api_token_here
   ```

### Step 3: Update Cursor Configuration

For local mode, update `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "your_actual_token_here"
      }
    }
  }
}
```

**Note:** For security, you can also reference the environment variable:

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "${WEBFLOW_TOKEN}"
      }
    }
  }
}
```

### Step 4: Start the MCP Server

Run the MCP server using the npm script:

```bash
pnpm mcp:webflow
```

Or manually:

```bash
# Bash/Zsh
WEBFLOW_TOKEN="your_token" npx -y webflow-mcp-server@latest

# PowerShell
$env:WEBFLOW_TOKEN="your_token"
npx -y webflow-mcp-server@latest
```

## Claude Desktop Setup

### Remote Configuration

Add to your `claude_desktop_config.json`:

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

### Local Configuration

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "your_token_here"
      }
    }
  }
}
```

After updating the configuration:

1. Save the file
2. Restart Claude Desktop (`Cmd/Ctrl + R`)
3. Follow the same Webflow Designer setup steps as above

## Example Use Cases

### Content Management

```
Create a new blog post with the title "10 Travel Tips for 2025"
and publish it with tags: travel, tips, 2025
```

### SEO Optimization

```
Analyze my last 5 blog posts and suggest:
1. Better meta descriptions
2. Relevant internal links
3. Keyword improvements
```

### Site Design

```
Add a testimonial section to my homepage with:
- 3 customer quotes
- Star ratings
- Responsive card layout
```

### Data Analysis

```
Show me all CMS items created in the last 30 days,
grouped by collection, with publish status
```

## Troubleshooting

### "Connection Failed" Error

**Symptoms:** MCP server fails to connect to Webflow

**Solutions:**

1. Verify your Webflow API token is valid
2. Check that you have the correct permissions
3. Ensure Node.js version is 22.3.0 or higher
4. Restart your AI client

### "OAuth Authorization Failed"

**Symptoms:** Can't authorize sites during OAuth flow

**Solutions:**

1. Clear OAuth cache: `rm -rf ~/.mcp-auth`
2. Make sure you're logged in to Webflow in your browser
3. Try a different browser
4. Check that you have admin access to the workspace

### "Bridge App Not Connecting"

**Symptoms:** Webflow Designer app shows "Disconnected"

**Solutions:**

1. Refresh the Webflow Designer page
2. Close and reopen the MCP Bridge App (Apps panel → E)
3. Verify the MCP server is running
4. Check browser console for errors (F12)

### Node.js Version Issues

**Symptoms:** `node: command not found` or version errors

**Solutions:**

```bash
# Check current version
node -v

# If too old, upgrade with nvm
nvm install 22.3.0
nvm use 22.3.0
nvm alias default 22.3.0
```

### NPM Cache Issues

**Symptoms:** `npx` fails or downloads wrong version

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Try again
npx -y webflow-mcp-server@latest
```

### Permission Errors

**Symptoms:** `EACCES` or `permission denied` errors

**Solutions:**

```bash
# Fix npm global package permissions (Unix/Mac)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or reinstall Node.js using nvm (recommended)
```

## Advanced Configuration

### Multiple Sites

You can configure multiple Webflow sites by running the OAuth flow multiple times or using different API tokens for different environments:

```json
{
  "mcpServers": {
    "webflow-production": {
      "url": "https://mcp.webflow.com/sse"
    },
    "webflow-staging": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "${WEBFLOW_STAGING_TOKEN}"
      }
    }
  }
}
```

### Custom Bridge App

If you need to customize the MCP Bridge App:

1. Clone the repository: `git clone https://github.com/webflow/webflow-mcp-bridge-app`
2. Follow the build instructions in the repo
3. Publish your custom version to your Webflow workspace
4. Use it in place of the default bridge app

## Resources

- [Webflow MCP GitHub Repository](https://github.com/webflow/mcp-server)
- [Webflow API Documentation](https://developers.webflow.com/data/reference)
- [Webflow JavaScript SDK](https://www.npmjs.com/package/webflow-api)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Webflow Developer Community](https://forum.webflow.com/c/developers)

## Security Best Practices

1. **Never commit API tokens**: Always use `.env.local` and ensure it's in `.gitignore`
2. **Use OAuth when possible**: Remote setup is more secure than API tokens
3. **Rotate tokens regularly**: Generate new API tokens every 90 days
4. **Limit token scope**: Only grant necessary permissions
5. **Monitor usage**: Check Webflow's API usage dashboard regularly

## Getting Help

If you encounter issues not covered here:

1. Check the [Webflow MCP Troubleshooting Guide](https://github.com/webflow/mcp-server#troubleshooting)
2. Search [Webflow Developer Forum](https://forum.webflow.com/c/developers)
3. Open an issue on the [MCP Server GitHub](https://github.com/webflow/mcp-server/issues)
4. Contact Webflow Support (for API/account issues)
