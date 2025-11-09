import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { createServerSupabaseClient } from '@/lib/supabase'

// Supabase client (singleton pattern)
let supabase = null

/**
 * Get or create Supabase client
 * @returns {SupabaseClient} Supabase client instance
 */
export function getSupabase() {
  if (!supabase) {
    supabase = createServerSupabaseClient()
  }
  return supabase
}

/**
 * Helper function to handle CORS with improved security
 * @param {NextResponse} response - Next.js response object
 * @param {Request} request - Request object with origin header
 * @returns {NextResponse} Response with CORS headers
 */
export function handleCORS(response, request = null) {
  // Define allowed origins - avoid wildcard when credentials are used
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://*.netlify.app',
        'https://*.vercel.app',
      ]

  const origin = request?.headers.get('origin')

  // If we have an origin header and credentials are allowed, be specific about CORS
  if (origin) {
    const isAllowed =
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(origin) ||
      allowedOrigins.some((allowed) => {
        if (allowed.includes('*')) {
          const pattern = allowed.replace('*', '.*')
          return new RegExp(pattern).test(origin)
        }
        return false
      })

    if (isAllowed) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
  } else if (allowedOrigins.includes('*')) {
    // Only use wildcard if no specific origin and explicitly allowed
    response.headers.set('Access-Control-Allow-Origin', '*')
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

/**
 * Verify JWT token from request
 * @param {Request} request - Request object with Authorization header
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export function verifyToken(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

/**
 * Create unauthorized response
 * @param {Request} request - Request object for CORS
 * @returns {NextResponse} 401 response
 */
export function unauthorizedResponse(request) {
  return handleCORS(
    NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    request
  )
}

/**
 * Create error response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Request} request - Request object for CORS
 * @returns {NextResponse} Error response
 */
export function errorResponse(message, status = 400, request = null) {
  return handleCORS(
    NextResponse.json({ error: message }, { status }),
    request
  )
}

/**
 * Create success response
 * @param {Object} data - Response data
 * @param {Request} request - Request object for CORS
 * @returns {NextResponse} Success response
 */
export function successResponse(data, request = null) {
  return handleCORS(NextResponse.json(data), request)
}

/**
 * Format trip object from database format to API format
 * @param {Object} trip - Trip object from database
 * @returns {Object} Formatted trip object
 */
export function formatTrip(trip) {
  return {
    id: trip.id,
    userId: trip.user_id,
    title: trip.title,
    destination: trip.destination,
    startDate: trip.start_date,
    endDate: trip.end_date,
    status: trip.status,
    visibility: trip.visibility,
    description: trip.description,
    coverPhoto: trip.cover_photo,
    tripImages: trip.trip_images,
    weather: trip.weather,
    overallComment: trip.overall_comment,
    airlines: trip.airlines,
    accommodations: trip.accommodations,
    segments: trip.segments,
    sharedWith: trip.shared_with,
    createdAt: trip.created_at,
    updatedAt: trip.updated_at,
    userName: trip.users?.name || 'Unknown User',
  }
}

/**
 * Get pagination parameters from URL search params
 * @param {Request} request - Request object
 * @param {number} defaultLimit - Default limit value
 * @returns {Object} Pagination parameters { page, limit, offset }
 */
export function getPaginationParams(request, defaultLimit = 10) {
  const { searchParams } = new URL(request.url)
  let page = parseInt(searchParams.get('page') || '1', 10)
  let limit = parseInt(searchParams.get('limit') || String(defaultLimit), 10)

  // Validate page and limit
  if (isNaN(page) || page < 1) {
    page = 1
  }
  // Limit must be between 1 and 100
  if (isNaN(limit) || limit < 1) {
    limit = defaultLimit
  } else if (limit > 100) {
    limit = 100
  }
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

/**
 * Create pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 * @returns {Object} Pagination metadata
 */
export function createPaginationMeta(page, limit, total) {
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit

  return {
    page,
    limit,
    total,
    totalPages,
    hasMore: offset + limit < total,
  }
}
