/**
 * Webflow API Client
 * 
 * This module provides a configured Webflow API client for server-side operations.
 * For AI agent interactions, use the Webflow MCP server instead.
 * 
 * @see https://developers.webflow.com/reference/rest-introduction
 * @see WEBFLOW_MCP_GUIDE.md for AI agent integration
 */

import { Webflow } from 'webflow-api';

/**
 * Initialize Webflow API client
 * Requires WEBFLOW_TOKEN environment variable
 */
export const webflowClient = new Webflow({
  token: process.env.WEBFLOW_TOKEN,
});

/**
 * Example: List all sites
 * @returns {Promise<Array>} Array of site objects
 */
export async function listSites() {
  try {
    const sites = await webflowClient.sites.list();
    return sites;
  } catch (error) {
    console.error('Error fetching Webflow sites:', error);
    throw new Error('Failed to fetch Webflow sites');
  }
}

/**
 * Example: Get site details
 * @param {string} siteId - The Webflow site ID
 * @returns {Promise<Object>} Site details
 */
export async function getSite(siteId) {
  try {
    const site = await webflowClient.sites.get(siteId);
    return site;
  } catch (error) {
    console.error(`Error fetching site ${siteId}:`, error);
    throw new Error('Failed to fetch site details');
  }
}

/**
 * Example: Create a CMS collection item
 * @param {string} collectionId - The collection ID
 * @param {Object} itemData - The item data (fieldData and isDraft)
 * @returns {Promise<Object>} Created item
 */
export async function createCollectionItem(collectionId, itemData) {
  try {
    const item = await webflowClient.collections.items.createItem(
      collectionId,
      itemData
    );
    return item;
  } catch (error) {
    console.error('Error creating collection item:', error);
    throw new Error('Failed to create collection item');
  }
}

/**
 * Example: Update a CMS collection item
 * @param {string} collectionId - The collection ID
 * @param {string} itemId - The item ID to update
 * @param {Object} itemData - The updated item data
 * @returns {Promise<Object>} Updated item
 */
export async function updateCollectionItem(collectionId, itemId, itemData) {
  try {
    const item = await webflowClient.collections.items.updateItem(
      collectionId,
      itemId,
      itemData
    );
    return item;
  } catch (error) {
    console.error('Error updating collection item:', error);
    throw new Error('Failed to update collection item');
  }
}

/**
 * Example: Publish a site
 * @param {string} siteId - The Webflow site ID
 * @param {Array<string>} domains - Array of domain names to publish to
 * @returns {Promise<Object>} Publish result
 */
export async function publishSite(siteId, domains) {
  try {
    const result = await webflowClient.sites.publish(siteId, { domains });
    return result;
  } catch (error) {
    console.error('Error publishing site:', error);
    throw new Error('Failed to publish site');
  }
}

export default webflowClient;
