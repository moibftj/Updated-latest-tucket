# Webflow JavaScript SDK Usage Guide

This guide covers using the Webflow JavaScript SDK for programmatic access to Webflow's APIs.

## 📦 Installation

The Webflow JavaScript SDK (`webflow-api`) is already installed via pnpm.

```bash
pnpm add webflow-api  # Already done
```

## 🔑 Authentication

### 1. Get Your API Token

1. Go to [Webflow Account Settings](https://webflow.com/dashboard/account/apps)
2. Navigate to **Apps & Integrations** → **API Access**
3. Generate a new API token
4. Copy the token (you won't be able to see it again!)

### 2. Configure Environment Variable

Add to your `.env.local`:

```bash
WEBFLOW_TOKEN=your_webflow_api_token_here
```

⚠️ **Security**: Never commit your API token. It's already excluded in `.env.local` and `.gitignore`.

## 🚀 Quick Start

### Basic Setup

```javascript
import { Webflow } from 'webflow-api';

const webflow = new Webflow({
  token: process.env.WEBFLOW_TOKEN,
});
```

### Using the Pre-configured Client

The repository includes a pre-configured client at `lib/webflow.js`:

```javascript
import { webflowClient, listSites, getSite } from '@/lib/webflow';

// List all your sites
const sites = await listSites();

// Get specific site details
const site = await getSite('site_id_here');
```

## 📚 Common Use Cases

### 1. Sites Management

```javascript
import { webflowClient } from '@/lib/webflow';

// List all sites
const sites = await webflowClient.sites.list();
console.log(sites);

// Get site details
const site = await webflowClient.sites.get('site_id');

// Publish site
await webflowClient.sites.publish('site_id', {
  domains: ['yourdomain.com'],
});
```

### 2. CMS Collections

```javascript
// List collections in a site
const collections = await webflowClient.collections.list('site_id');

// Create a collection item
const newItem = await webflowClient.collections.items.createItem(
  'collection_id',
  {
    fieldData: {
      name: 'My New Blog Post',
      slug: 'my-new-blog-post',
      'post-body': 'This is the content...',
    },
    isDraft: false,
  }
);

// Update a collection item
const updatedItem = await webflowClient.collections.items.updateItem(
  'collection_id',
  'item_id',
  {
    fieldData: {
      name: 'Updated Blog Post Title',
    },
  }
);

// Delete a collection item
await webflowClient.collections.items.deleteItem('collection_id', 'item_id');
```

### 3. Pages Management

```javascript
// List pages
const pages = await webflowClient.pages.list('site_id');

// Get page details
const page = await webflowClient.pages.get('page_id');

// Update page metadata
await webflowClient.pages.update('page_id', {
  title: 'New Page Title',
  slug: 'new-page-slug',
  seo: {
    title: 'SEO Title',
    description: 'SEO Description',
  },
});
```

### 4. Forms & Submissions

```javascript
// List forms
const forms = await webflowClient.forms.list('site_id');

// Get form submissions
const submissions = await webflowClient.forms.submissions.list('form_id');
```

### 5. Assets Management

```javascript
// Upload asset
const asset = await webflowClient.assets.create('site_id', {
  fileName: 'image.jpg',
  fileData: fileBuffer, // Buffer or base64 string
});

// List assets
const assets = await webflowClient.assets.list('site_id');
```

## 🔌 API Routes Integration

### Example: Webflow Proxy Endpoint

Add to `app/api/[[...path]]/route.js`:

```javascript
import { webflowClient } from '@/lib/webflow';

// Inside handleRoute function:

if (path[0] === 'webflow' && method === 'GET') {
  const userId = await verifyToken(request);
  if (!userId) {
    return handleCORS(
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    );
  }

  // List user's Webflow sites
  if (path[1] === 'sites') {
    try {
      const sites = await webflowClient.sites.list();
      return handleCORS(NextResponse.json({ sites }));
    } catch (error) {
      console.error('Webflow API error:', error);
      return handleCORS(
        NextResponse.json(
          { error: 'Failed to fetch sites' },
          { status: 500 }
        )
      );
    }
  }

  // Get collection items
  if (path[1] === 'collections' && path[2] && path[3] === 'items') {
    try {
      const collectionId = path[2];
      const items = await webflowClient.collections.items.listItems(
        collectionId
      );
      return handleCORS(NextResponse.json({ items }));
    } catch (error) {
      console.error('Webflow API error:', error);
      return handleCORS(
        NextResponse.json(
          { error: 'Failed to fetch items' },
          { status: 500 }
        )
      );
    }
  }
}
```

### Frontend Usage

```javascript
// components/WebflowIntegration.js
'use client';

import { useState, useEffect } from 'react';

export default function WebflowIntegration() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSites() {
      try {
        const response = await fetch('/api/webflow/sites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setSites(data.sites);
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSites();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Webflow Sites</h2>
      <ul>
        {sites.map((site) => (
          <li key={site.id}>{site.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🧪 Testing

### Test SDK Connection

Create a test script:

```javascript
// test-webflow.js
import { Webflow } from 'webflow-api';
import 'dotenv/config';

async function testConnection() {
  const webflow = new Webflow({
    token: process.env.WEBFLOW_TOKEN,
  });

  try {
    const sites = await webflow.sites.list();
    console.log('✅ Connected to Webflow!');
    console.log(`Found ${sites.length} sites:`);
    sites.forEach((site) => {
      console.log(`  - ${site.displayName} (${site.id})`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
```

Run with:

```bash
node test-webflow.js
```

## 🆚 SDK vs MCP Server

### When to use JavaScript SDK (this guide):

- ✅ Server-side API routes
- ✅ Scheduled tasks/cron jobs
- ✅ Bulk operations
- ✅ Direct programmatic control
- ✅ Custom integrations

### When to use MCP Server:

- ✅ AI agent interactions (Cursor, Claude Desktop)
- ✅ Natural language commands
- ✅ Interactive development
- ✅ Quick prototyping
- ✅ Content creation workflows

See [WEBFLOW_MCP_GUIDE.md](./WEBFLOW_MCP_GUIDE.md) for MCP server usage.

## 📖 API Reference

Full API documentation:

- [Webflow REST API](https://developers.webflow.com/reference/rest-introduction)
- [JavaScript SDK GitHub](https://github.com/webflow/js-webflow-api)
- [SDK Documentation](https://developers.webflow.com/reference/sdk-introduction)

## 🔒 Security Best Practices

1. **Never expose API tokens**:
   - Keep in `.env.local` (gitignored)
   - Use environment variables in production (Netlify/Vercel)
   - Rotate tokens regularly

2. **Rate limiting**:
   - Webflow API has rate limits (check response headers)
   - Implement caching for frequently accessed data
   - Use webhooks for real-time updates instead of polling

3. **Error handling**:
   - Always wrap API calls in try-catch
   - Log errors server-side only
   - Return sanitized errors to clients

4. **Validation**:
   - Validate all user inputs before sending to Webflow
   - Use Zod schemas for type safety
   - Sanitize collection item data

## 🐛 Troubleshooting

### "Invalid token" error

- Verify token in `.env.local` is correct
- Check token hasn't been revoked in Webflow dashboard
- Ensure token has required scopes

### "Resource not found" error

- Verify IDs are correct (site_id, collection_id, etc.)
- Check if resource exists in Webflow dashboard
- Ensure API token has access to the site

### Rate limit errors

- Check `X-RateLimit-Remaining` response header
- Implement exponential backoff
- Cache responses where appropriate

### TypeScript errors

Install types (if using TypeScript):

```bash
pnpm add -D @types/webflow-api
```

## 📝 Example Scripts

### Backup CMS Data

```javascript
// scripts/backup-webflow.js
import { webflowClient } from '../lib/webflow.js';
import fs from 'fs/promises';

async function backupSite(siteId) {
  const collections = await webflowClient.collections.list(siteId);

  for (const collection of collections) {
    const items = await webflowClient.collections.items.listItems(
      collection.id
    );
    await fs.writeFile(
      `backup-${collection.slug}.json`,
      JSON.stringify(items, null, 2)
    );
    console.log(`✅ Backed up ${collection.displayName}`);
  }
}

backupSite('your_site_id');
```

### Sync Content

```javascript
// scripts/sync-content.js
import { webflowClient } from '../lib/webflow.js';
import { supabase } from '../lib/supabase.js';

async function syncTripsToWebflow(collectionId) {
  // Get trips from Supabase
  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .eq('published', true);

  // Create/update in Webflow
  for (const trip of trips) {
    await webflowClient.collections.items.createItem(collectionId, {
      fieldData: {
        name: trip.title,
        slug: trip.id,
        description: trip.description,
        'start-date': trip.start_date,
        'end-date': trip.end_date,
      },
      isDraft: false,
    });
    console.log(`✅ Synced: ${trip.title}`);
  }
}

syncTripsToWebflow('collection_id');
```

## 🎯 Next Steps

1. Configure `WEBFLOW_TOKEN` in `.env.local`
2. Test connection with `test-webflow.js` script
3. Add API routes for Webflow integration
4. Build frontend components for content management
5. Set up webhooks for real-time sync (optional)

Happy building! 🚀
