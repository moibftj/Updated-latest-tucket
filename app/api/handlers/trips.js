import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import {
  getSupabase,
  verifyToken,
  unauthorizedResponse,
  successResponse,
  errorResponse,
  formatTrip,
  getPaginationParams,
  createPaginationMeta,
} from '../lib/middleware'
import { tripSchema } from '../lib/schemas'

/**
 * POST /api/trips
 * Create a new trip
 */
export async function handleCreateTrip(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Validate input
    const validatedData = tripSchema.parse(body)

    const trip = {
      id: uuidv4(),
      user_id: decoded.userId,
      title: validatedData.title,
      destination: validatedData.destination,
      start_date: validatedData.startDate,
      end_date: validatedData.endDate || validatedData.startDate,
      status: validatedData.status || 'future',
      visibility: validatedData.visibility || 'private',
      description: validatedData.description || '',
      cover_photo: validatedData.coverPhoto || '',
      trip_images: validatedData.tripImages || '',
      weather: validatedData.weather || '',
      overall_comment: validatedData.overallComment || '',
      airlines: validatedData.airlines || [],
      accommodations: validatedData.accommodations || [],
      segments: validatedData.segments || [],
      shared_with: validatedData.sharedWith || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('trips').insert([trip])

    if (error) throw error

    // Use formatTrip but without user info
    const formattedTrip = formatTrip(trip)
    delete formattedTrip.userName // Remove as it's not needed for create

    return successResponse(formattedTrip, request)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse('Validation failed', 400, request)
    }
    throw error
  }
}

/**
 * GET /api/trips
 * Get user's trips with pagination
 */
export async function handleGetUserTrips(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { page, limit, offset } = getPaginationParams(request, 10)

  // Get total count
  const { count } = await supabase
    .from('trips')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', decoded.userId)

  // Get paginated trips
  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', decoded.userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const formattedTrips = (trips || []).map((trip) => {
    const formatted = formatTrip(trip)
    delete formatted.userName
    return formatted
  })

  return successResponse(
    {
      trips: formattedTrips,
      pagination: createPaginationMeta(page, limit, count || 0),
    },
    request
  )
}

/**
 * GET /api/trips/public/all
 * Get all public trips with pagination
 */
export async function handleGetPublicTrips(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { page, limit, offset } = getPaginationParams(request, 12)

  // Get total count
  const { count } = await supabase
    .from('trips')
    .select('*', { count: 'exact', head: true })
    .eq('visibility', 'public')

  // Get paginated trips
  const { data: trips } = await supabase
    .from('trips')
    .select(`
      *,
      users (name)
    `)
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const formattedTrips = (trips || []).map((trip) => formatTrip(trip))

  return successResponse(
    {
      trips: formattedTrips,
      pagination: createPaginationMeta(page, limit, count || 0),
    },
    request
  )
}

/**
 * GET /api/trips/shared
 * Get trips shared with current user
 */
export async function handleGetSharedTrips(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { page, limit, offset } = getPaginationParams(request, 12)

  // Get total count
  const { count } = await supabase
    .from('trips')
    .select('*', { count: 'exact', head: true })
    .contains('shared_with', [decoded.userId])

  // Find trips where current user is in the shared_with array
  const { data: trips } = await supabase
    .from('trips')
    .select(`
      *,
      users (name)
    `)
    .contains('shared_with', [decoded.userId])
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const formattedTrips = (trips || []).map((trip) => formatTrip(trip))

  return successResponse(
    {
      trips: formattedTrips,
      pagination: createPaginationMeta(page, limit, count || 0),
    },
    request
  )
}

/**
 * GET /api/trips/:id
 * Get a specific trip by ID
 */
export async function handleGetTripById(request, tripId) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { data: trip, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .eq('user_id', decoded.userId)
    .single()

  if (error || !trip) {
    return errorResponse('Trip not found', 404, request)
  }

  const formattedTrip = formatTrip(trip)
  delete formattedTrip.userName

  return successResponse(formattedTrip, request)
}

/**
 * PATCH /api/trips/:id
 * Update a trip
 */
export async function handleUpdateTrip(request, tripId) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const body = await request.json()
  const supabase = getSupabase()

  // Convert camelCase to snake_case
  const updateData = {}
  if (body.title !== undefined) updateData.title = body.title
  if (body.destination !== undefined) updateData.destination = body.destination
  if (body.startDate !== undefined) updateData.start_date = body.startDate
  if (body.endDate !== undefined) updateData.end_date = body.endDate
  if (body.status !== undefined) updateData.status = body.status
  if (body.visibility !== undefined) updateData.visibility = body.visibility
  if (body.description !== undefined) updateData.description = body.description
  if (body.coverPhoto !== undefined) updateData.cover_photo = body.coverPhoto
  if (body.tripImages !== undefined) updateData.trip_images = body.tripImages
  if (body.weather !== undefined) updateData.weather = body.weather
  if (body.overallComment !== undefined) updateData.overall_comment = body.overallComment
  if (body.airlines !== undefined) updateData.airlines = body.airlines
  if (body.accommodations !== undefined) updateData.accommodations = body.accommodations
  if (body.segments !== undefined) updateData.segments = body.segments
  if (body.sharedWith !== undefined) updateData.shared_with = body.sharedWith
  updateData.updated_at = new Date().toISOString()

  const { data: updatedTrip, error } = await supabase
    .from('trips')
    .update(updateData)
    .eq('id', tripId)
    .eq('user_id', decoded.userId)
    .select()
    .single()

  if (error || !updatedTrip) {
    return errorResponse('Trip not found', 404, request)
  }

  const formattedTrip = formatTrip(updatedTrip)
  delete formattedTrip.userName

  return successResponse(formattedTrip, request)
}

/**
 * DELETE /api/trips/:id
 * Delete a trip
 */
export async function handleDeleteTrip(request, tripId) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId)
    .eq('user_id', decoded.userId)

  if (error) {
    return errorResponse('Trip not found', 404, request)
  }

  return successResponse({ success: true }, request)
}
