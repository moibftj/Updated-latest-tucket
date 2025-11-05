# Webflow Integration Summary

This document summarizes the Webflow integrations available in Tucker Trips.

## ✅ What's Installed

### 1. Webflow JavaScript SDK (`webflow-api`)

- **Version**: 3.2.1
- **Purpose**: Programmatic API access for server-side operations
- **Location**: `node_modules/webflow-api`
- **Configuration**: `lib/webflow.js`

### 2. Webflow MCP Server Integration

- **Purpose**: AI agent interactions (Cursor, Claude Desktop)
- **Configuration**: `.cursor/mcp.json`, `claude_desktop_config.json`
- **Scripts**: `pnpm mcp:webflow`, `pnpm mcp:webflow:help`

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| [WEBFLOW_SDK_USAGE.md](./WEBFLOW_SDK_USAGE.md) | Complete JavaScript SDK integration guide |
| [WEBFLOW_MCP_GUIDE.md](./WEBFLOW_MCP_GUIDE.md) | MCP server setup and AI agent usage |
| [README.md](./README.md#webflow-mcp-integration) | Quick start and overview |

## 🚀 Quick Start

### Option 1: JavaScript SDK (Programmatic API)

```bash
# 1. Add token to .env.local
echo "WEBFLOW_TOKEN=your_token_here" >> .env.local

# 2. Test the connection
pnpm test:webflow

# 3. Use in your code
import { webflowClient, listSites } from '@/lib/webflow';
const sites = await listSites();
```

### Option 2: MCP Server (AI Agents)

```bash
# 1. For Cursor (OAuth - Recommended)
# Already configured in .cursor/mcp.json
# Just open Cursor Settings → MCP & Integrations → Authorize Webflow

# 2. For local MCP server
export WEBFLOW_TOKEN="your_token"
pnpm mcp:webflow
```

## 🔧 Available Resources

### Code Files

- `lib/webflow.js` - Pre-configured Webflow client with helper functions
- `test-webflow-sdk.js` - SDK test script with colored output

### Configuration Files

- `.cursor/mcp.json` - Cursor MCP integration
- `claude_desktop_config.json` - Claude Desktop MCP integration
- `.env.example` - Environment variable template

### npm Scripts

```json
{
  "test:webflow": "Test Webflow SDK connection",
  "mcp:webflow": "Run Webflow MCP server locally",
  "mcp:webflow:help": "Show MCP setup instructions"
}
```

## 🎯 Use Cases

### JavaScript SDK Best For:

- ✅ API routes (`app/api/[[...path]]/route.js`)
- ✅ Server-side data fetching
- ✅ Scheduled tasks/cron jobs
- ✅ Bulk operations
- ✅ Custom integrations

### MCP Server Best For:

- ✅ AI agent commands ("List my Webflow sites")
- ✅ Interactive development in Cursor
- ✅ Natural language workflows
- ✅ Quick prototyping
- ✅ Content creation with Claude

## �� API Examples

### List Sites

```javascript
import { webflowClient } from '@/lib/webflow';

const sites = await webflowClient.sites.list();
console.log(sites);
```

### Create CMS Item

```javascript
const item = await webflowClient.collections.items.createItem(
  'collection_id',
  {
    fieldData: {
      name: 'New Blog Post',
      slug: 'new-blog-post',
    },
    isDraft: false,
  }
);
```

### Update Page

```javascript
await webflowClient.pages.update('page_id', {
  title: 'Updated Title',
  seo: {
    description: 'Updated meta description',
  },
});
```

## 🧪 Testing

```bash
# Test SDK connection
pnpm test:webflow

# Or with explicit token
WEBFLOW_TOKEN="your_token" node test-webflow-sdk.js
```

Expected output:
```
🧪 Testing Webflow JavaScript SDK...

Test 1: Listing sites...
✅ Found 2 site(s):
   1. Tucker Trips Marketing
   2. Blog Site

Test 2: Getting site details...
✅ Site details retrieved

✅ All tests passed! SDK is working correctly.
```

## 🔒 Security Notes

1. **Never commit tokens**: `.env.local` is gitignored
2. **Rotate regularly**: Generate new tokens periodically
3. **Scope properly**: Use minimal required permissions
4. **Server-side only**: Never expose tokens in client code

## 🐛 Troubleshooting

### SDK not found error

```bash
pnpm install webflow-api
```

### Authentication errors

1. Check token in `.env.local`
2. Verify token at: https://webflow.com/dashboard/account/apps
3. Ensure token hasn't been revoked

### MCP connection issues

1. Check Node.js version: `node -v` (must be ≥ 22.3.0)
2. Verify OAuth authorization in Cursor settings
3. See WEBFLOW_MCP_GUIDE.md for detailed troubleshooting

## 📦 Package Details

```json
{
  "webflow-api": {
    "version": "3.2.1",
    "description": "Official Webflow JavaScript SDK",
    "repository": "https://github.com/webflow/js-webflow-api"
  }
}
```

## 🔗 Resources

- [Webflow REST API Docs](https://developers.webflow.com/reference/rest-introduction)
- [JavaScript SDK GitHub](https://github.com/webflow/js-webflow-api)
- [MCP Server Docs](https://developers.webflow.com/docs/mcp-server)
- [SDK Reference](https://developers.webflow.com/reference/sdk-introduction)

## 🎓 Next Steps

1. ✅ SDK installed
2. ⏭️ Add `WEBFLOW_TOKEN` to `.env.local`
3. ⏭️ Run `pnpm test:webflow` to verify connection
4. ⏭️ Read [WEBFLOW_SDK_USAGE.md](./WEBFLOW_SDK_USAGE.md) for API examples
5. ⏭️ Build your first Webflow integration!

---

**Need help?** Check the detailed guides or open an issue.
