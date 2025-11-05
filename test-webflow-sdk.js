#!/usr/bin/env node

/**
 * Webflow SDK Test Script
 * 
 * Tests the Webflow JavaScript SDK connection.
 * Requires WEBFLOW_TOKEN environment variable.
 * 
 * Usage:
 *   WEBFLOW_TOKEN="your_token" node test-webflow-sdk.js
 *   OR
 *   Add WEBFLOW_TOKEN to .env.local and run: node test-webflow-sdk.js
 */

import { Webflow } from 'webflow-api';
import { config } from 'dotenv';

// Load .env.local if it exists
config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

async function testWebflowSDK() {
  console.log(`\n${colors.cyan}🧪 Testing Webflow JavaScript SDK...${colors.reset}\n`);

  // Check for token
  if (!process.env.WEBFLOW_TOKEN) {
    console.error(`${colors.red}❌ Error: WEBFLOW_TOKEN environment variable not set${colors.reset}`);
    console.log(`\n${colors.yellow}ℹ️  Please set your Webflow API token:${colors.reset}`);
    console.log(`   1. Get token from: https://webflow.com/dashboard/account/apps`);
    console.log(`   2. Add to .env.local: WEBFLOW_TOKEN=your_token_here`);
    console.log(`   3. Or run: WEBFLOW_TOKEN="your_token" node test-webflow-sdk.js\n`);
    process.exit(1);
  }

  // Initialize client
  const webflow = new Webflow({
    token: process.env.WEBFLOW_TOKEN,
  });

  try {
    console.log(`${colors.cyan}📡 Connecting to Webflow API...${colors.reset}`);

    // Test 1: List sites
    console.log(`\n${colors.yellow}Test 1: Listing sites...${colors.reset}`);
    const sites = await webflow.sites.list();

    if (!sites || sites.length === 0) {
      console.log(`${colors.yellow}⚠️  No sites found in your account${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ Found ${sites.length} site(s):${colors.reset}`);
      sites.forEach((site, index) => {
        console.log(`   ${index + 1}. ${site.displayName}`);
        console.log(`      ID: ${site.id}`);
        console.log(`      Short Name: ${site.shortName || 'N/A'}`);
        console.log(`      Created: ${site.createdOn || 'N/A'}`);
      });

      // Test 2: Get first site details
      if (sites[0]) {
        console.log(`\n${colors.yellow}Test 2: Getting site details for "${sites[0].displayName}"...${colors.reset}`);
        const siteDetails = await webflow.sites.get(sites[0].id);
        console.log(`${colors.green}✅ Site details retrieved:${colors.reset}`);
        console.log(`   Display Name: ${siteDetails.displayName}`);
        console.log(`   Workspace: ${siteDetails.workspaceId || 'N/A'}`);
        console.log(`   Custom Domains: ${siteDetails.customDomains?.length || 0}`);
      }

      // Test 3: List collections (if any)
      if (sites[0]) {
        console.log(`\n${colors.yellow}Test 3: Listing CMS collections...${colors.reset}`);
        try {
          const collections = await webflow.collections.list(sites[0].id);
          if (!collections || collections.length === 0) {
            console.log(`${colors.yellow}⚠️  No CMS collections found${colors.reset}`);
          } else {
            console.log(`${colors.green}✅ Found ${collections.length} collection(s):${colors.reset}`);
            collections.forEach((collection, index) => {
              console.log(`   ${index + 1}. ${collection.displayName} (${collection.slug})`);
            });
          }
        } catch (error) {
          if (error.message.includes('404')) {
            console.log(`${colors.yellow}⚠️  Site has no CMS collections${colors.reset}`);
          } else {
            throw error;
          }
        }
      }
    }

    // Summary
    console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✅ All tests passed! SDK is working correctly.${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    console.log(`${colors.cyan}📚 Next steps:${colors.reset}`);
    console.log(`   1. Read the SDK guide: ${colors.yellow}WEBFLOW_SDK_USAGE.md${colors.reset}`);
    console.log(`   2. Check out the pre-configured client: ${colors.yellow}lib/webflow.js${colors.reset}`);
    console.log(`   3. Add Webflow API routes to your app\n`);

  } catch (error) {
    console.log(`\n${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.red}❌ Error testing Webflow SDK${colors.reset}`);
    console.log(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error(`${colors.red}Authentication failed. Please check:${colors.reset}`);
      console.log(`   1. Your WEBFLOW_TOKEN is correct`);
      console.log(`   2. The token hasn't been revoked`);
      console.log(`   3. The token has the necessary scopes\n`);
    } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
      console.error(`${colors.red}Access forbidden. The token may not have permission to access this resource.${colors.reset}\n`);
    } else if (error.message.includes('429') || error.message.includes('rate limit')) {
      console.error(`${colors.red}Rate limit exceeded. Please wait before trying again.${colors.reset}\n`);
    } else {
      console.error(`${colors.red}${error.message}${colors.reset}\n`);
      if (error.response) {
        console.log(`${colors.yellow}Response status: ${error.response.status}${colors.reset}`);
        console.log(`${colors.yellow}Response data:${colors.reset}`, error.response.data);
      }
    }

    console.log(`${colors.cyan}💡 Troubleshooting:${colors.reset}`);
    console.log(`   - Check WEBFLOW_SDK_USAGE.md for setup instructions`);
    console.log(`   - Verify your token at: https://webflow.com/dashboard/account/apps`);
    console.log(`   - Ensure you have sites in your Webflow account\n`);

    process.exit(1);
  }
}

// Run the test
testWebflowSDK();
