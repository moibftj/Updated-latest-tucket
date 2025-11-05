import {
  getSupabase,
  verifyToken,
  unauthorizedResponse,
  successResponse,
  errorResponse,
} from '../lib/middleware'
import { profileUpdateSchema } from '../lib/schemas'
import { z } from 'zod'

/**
 * PATCH /api/users/profile
 * Update user profile
 */
export async function handleUpdateProfile(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Validate input
    const validatedData = profileUpdateSchema.parse(body)

    const updateData = {}
    if (validatedData.name) updateData.name = validatedData.name
    if (validatedData.bio !== undefined) updateData.bio = validatedData.bio

    await supabase.from('users').update(updateData).eq('id', decoded.userId)

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .single()

    return successResponse(
      {
        user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' },
      },
      request
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse('Validation failed', 400, request)
    }
    throw error
  }
}

/**
 * POST /api/users/heartbeat
 * Update user's last seen timestamp
 */
export async function handleHeartbeat(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()

  await supabase
    .from('users')
    .update({ last_seen: new Date().toISOString(), is_online: true })
    .eq('id', decoded.userId)

  return successResponse({ success: true }, request)
}

/**
 * GET /api/users/online
 * Get list of online users (excluding current user)
 */
export async function handleGetOnlineUsers(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()

  // Consider users online if they've been seen in the last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: onlineUsers } = await supabase
    .from('users')
    .select('id, name, email, bio, last_seen')
    .neq('id', decoded.userId)
    .gte('last_seen', fiveMinutesAgo)
    .eq('is_online', true)

  return successResponse(onlineUsers || [], request)
}
