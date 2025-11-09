/**
 * Supabase Storage Utilities
 *
 * Handles file uploads, deletions, and URL generation for trip images and avatars.
 */

import { createServerSupabaseClient, createClientSupabaseClient } from './supabase'
import { v4 as uuidv4 } from 'uuid'

const BUCKETS = {
  TRIP_IMAGES: 'trip-images',
  AVATARS: 'avatars',
}

const MAX_FILE_SIZES = {
  [BUCKETS.TRIP_IMAGES]: 10 * 1024 * 1024, // 10MB
  [BUCKETS.AVATARS]: 2 * 1024 * 1024, // 2MB
}

const ALLOWED_MIME_TYPES = {
  [BUCKETS.TRIP_IMAGES]: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
  [BUCKETS.AVATARS]: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ],
}

/**
 * Validates file before upload
 * @param {File|Blob} file - File to validate
 * @param {string} bucket - Bucket name
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateFile(file, bucket) {
  // Check file exists
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  // Check file size
  const maxSize = MAX_FILE_SIZES[bucket]
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1)
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    }
  }

  // Check mime type
  const allowedTypes = ALLOWED_MIME_TYPES[bucket]
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Generates a unique file path for storage
 * @param {string} userId - User ID
 * @param {string} fileName - Original file name
 * @param {string} folder - Optional folder (e.g., 'trips', 'avatars')
 * @returns {string} File path
 */
export function generateFilePath(userId, fileName, folder = '') {
  const timestamp = Date.now()
  const randomId = uuidv4().slice(0, 8)
  const extension = fileName.split('.').pop()
  const sanitizedName = fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase()

  const baseName = sanitizedName.replace(`.${extension}`, '')
  const uniqueName = `${baseName}_${timestamp}_${randomId}.${extension}`

  if (folder) {
    return `${userId}/${folder}/${uniqueName}`
  }
  return `${userId}/${uniqueName}`
}

/**
 * Uploads a file to Supabase Storage (Server-side)
 * @param {File|Buffer} file - File to upload
 * @param {string} bucket - Bucket name
 * @param {string} filePath - File path in storage
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} { success: boolean, data?: object, error?: string }
 */
export async function uploadFileServer(file, bucket, filePath, options = {}) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: options.upsert || false,
        ...options,
      })

    if (error) {
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      success: true,
      data: {
        path: data.path,
        fullPath: data.fullPath || filePath,
        publicUrl: urlData.publicUrl,
      },
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Uploads a file to Supabase Storage (Client-side)
 * @param {File} file - File to upload
 * @param {string} bucket - Bucket name
 * @param {string} filePath - File path in storage
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} { success: boolean, data?: object, error?: string }
 */
export async function uploadFileClient(file, bucket, filePath, options = {}) {
  try {
    const supabase = createClientSupabaseClient()

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: options.upsert || false,
        ...options,
      })

    if (error) {
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      success: true,
      data: {
        path: data.path,
        fullPath: data.fullPath || filePath,
        publicUrl: urlData.publicUrl,
      },
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Deletes a file from Supabase Storage (Server-side)
 * @param {string} bucket - Bucket name
 * @param {string} filePath - File path to delete
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
export async function deleteFileServer(bucket, filePath) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Deletes a file from Supabase Storage (Client-side)
 * @param {string} bucket - Bucket name
 * @param {string} filePath - File path to delete
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
export async function deleteFileClient(bucket, filePath) {
  try {
    const supabase = createClientSupabaseClient()

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Gets public URL for a file
 * @param {string} bucket - Bucket name
 * @param {string} filePath - File path
 * @returns {string} Public URL
 */
export function getPublicUrl(bucket, filePath) {
  if (!filePath) return null

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`
}

/**
 * Extracts file path from public URL
 * @param {string} url - Public URL
 * @returns {string|null} File path or null
 */
export function extractFilePathFromUrl(url) {
  if (!url) return null

  const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/)
  if (match) {
    return match[2] // Returns the file path
  }
  return null
}

/**
 * Uploads multiple files
 * @param {File[]} files - Array of files
 * @param {string} bucket - Bucket name
 * @param {string} userId - User ID
 * @param {string} folder - Folder name
 * @param {boolean} isServer - Whether to use server-side upload
 * @returns {Promise<Object>} { success: boolean, uploaded: array, failed: array }
 */
export async function uploadMultipleFiles(
  files,
  bucket,
  userId,
  folder = '',
  isServer = false
) {
  const uploadFn = isServer ? uploadFileServer : uploadFileClient
  const results = {
    success: true,
    uploaded: [],
    failed: [],
  }

  for (const file of files) {
    // Validate file
    const validation = validateFile(file, bucket)
    if (!validation.valid) {
      results.failed.push({
        file: file.name,
        error: validation.error,
      })
      results.success = false
      continue
    }

    // Generate unique path
    const filePath = generateFilePath(userId, file.name, folder)

    // Upload file
    const result = await uploadFn(file, bucket, filePath)

    if (result.success) {
      results.uploaded.push({
        file: file.name,
        ...result.data,
      })
    } else {
      results.failed.push({
        file: file.name,
        error: result.error,
      })
      results.success = false
    }
  }

  return results
}

export { BUCKETS }
