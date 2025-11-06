import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase'
import { logger } from '@/lib/logger'

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Supabase client (singleton pattern)
let supabase = null

function getSupabase() {
  if (!supabase) {
    supabase = createServerSupabaseClient()
  }
  return supabase
}

// Helper function to handle CORS - improved security
function handleCORS(response, request = null) {
  // Define allowed origins - avoid wildcard when credentials are used
  const allowedOrigins = process.env.CORS_ORIGINS ? 
    process.env.CORS_ORIGINS.split(',').map(o => o.trim()) : 
    ['http://localhost:3000', 'https://localhost:3000', 'https://*.netlify.app', 'https://*.vercel.app']
  
  const origin = request?.headers.get('origin')
  
  // If we have an origin header and credentials are allowed, be specific about CORS
  if (origin) {
    const isAllowed = allowedOrigins.includes('*') || 
                     allowedOrigins.includes(origin) ||
                     allowedOrigins.some(allowed => {
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

// Verify JWT token
function verifyToken(request) {
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

// OPTIONS handler for CORS
export async function OPTIONS(request) {
  return handleCORS(new NextResponse(null, { status: 200 }), request)
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      logger.error('Missing Supabase environment variables')
      return handleCORS(NextResponse.json(
        {
          error: 'Server configuration error',
          code: 'CONFIG_ERROR'
        },
        { status: 500 }
      ), request)
    }

    if (!process.env.JWT_SECRET) {
      logger.error('Missing JWT_SECRET environment variable')
      return handleCORS(NextResponse.json(
        {
          error: 'Server configuration error',
          code: 'CONFIG_ERROR'
        },
        { status: 500 }
      ), request)
    }

    const supabase = getSupabase()

    // ============ AUTH ROUTES ============
    
    // POST /api/auth/register
    if (route === '/auth/register' && method === 'POST') {
      try {
        const body = await request.json()

        // Validate input with Zod
        const { email, password, name } = registerSchema.parse(body)

        // Check if user exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single()

        if (existingUser) {
          return handleCORS(NextResponse.json(
            { error: 'User already exists' },
            { status: 409 }
          ))
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = {
          id: uuidv4(),
          email,
          password: hashedPassword,
          name,
          bio: '',
          last_seen: new Date().toISOString(),
          is_online: false,
          created_at: new Date().toISOString()
        }

        const { error } = await supabase
          .from('users')
          .insert([user])

        if (error) throw error

        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )

        return handleCORS(NextResponse.json({
          user: { id: user.id, email: user.email, name: user.name, bio: user.bio },
          token
        }, { status: 201 }))
      } catch (error) {
        if (error instanceof z.ZodError) {
          return handleCORS(NextResponse.json(
            { error: 'Validation failed', details: error.errors },
            { status: 400 }
          ))
        }
        throw error
      }
    }

    // POST /api/auth/login
    if (route === '/auth/login' && method === 'POST') {
      try {
        const body = await request.json()

        // Validate input with Zod
        const { email, password } = loginSchema.parse(body)

        // Find user
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single()

        if (error || !user) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          ))
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          return handleCORS(NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
          ))
        }

        // Update last seen and online status
        await supabase
          .from('users')
          .update({ last_seen: new Date().toISOString(), is_online: true })
          .eq('id', user.id)

        // Generate JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )

        return handleCORS(NextResponse.json({
          user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' },
          token
        }))
      } catch (error) {
        if (error instanceof z.ZodError) {
          return handleCORS(NextResponse.json(
            { error: 'Validation failed', details: error.errors },
            { status: 400 }
          ))
        }
        throw error
      }
    }

    // GET /api/auth/me
    if (route === '/auth/me' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.userId)
        .single()

      if (error || !user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' }
      }))
    }

    // ============ USER ROUTES ============

    // PATCH /api/users/profile
    if (route === '/users/profile' && method === 'PATCH') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const body = await request.json()
      const { name, bio } = body

      const updateData = {}
      if (name) updateData.name = name
      if (bio !== undefined) updateData.bio = bio

      await supabase
        .from('users')
        .update(updateData)
        .eq('id', decoded.userId)

      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.userId)
        .single()

      return handleCORS(NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' }
      }))
    }

    // POST /api/users/heartbeat
    if (route === '/users/heartbeat' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      await supabase
        .from('users')
        .update({ last_seen: new Date().toISOString(), is_online: true })
        .eq('id', decoded.userId)

      return handleCORS(NextResponse.json({ success: true }))
    }

    // GET /api/users/online
    if (route === '/users/online' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      // Consider users online if they've been seen in the last 5 minutes
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      
      const { data: onlineUsers } = await supabase
        .from('users')
        .select('id, name, email, bio, last_seen')
        .neq('id', decoded.userId)
        .gte('last_seen', fiveMinutesAgo)
        .eq('is_online', true)

      return handleCORS(NextResponse.json(onlineUsers || []))
    }

    // ============ MESSAGE ROUTES ============

    // POST /api/messages
    if (route === '/messages' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const body = await request.json()
      const { recipientId, content } = body

      if (!recipientId || !content) {
        return handleCORS(NextResponse.json(
          { error: 'Recipient and content are required' },
          { status: 400 }
        ))
      }

      const message = {
        id: uuidv4(),
        sender_id: decoded.userId,
        recipient_id: recipientId,
        content,
        read: false,
        created_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('messages')
        .insert([message])

      if (error) throw error

      return handleCORS(NextResponse.json({
        id: message.id,
        senderId: message.sender_id,
        recipientId: message.recipient_id,
        content: message.content,
        read: message.read,
        createdAt: message.created_at
      }))
    }

    // GET /api/messages/:userId
    if (route.startsWith('/messages/') && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const otherUserId = path[1]
      
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${decoded.userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${decoded.userId})`)
        .order('created_at', { ascending: true })

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', otherUserId)
        .eq('recipient_id', decoded.userId)
        .eq('read', false)

      // Convert snake_case to camelCase for client
      const formattedMessages = (messages || []).map(msg => ({
        id: msg.id,
        senderId: msg.sender_id,
        recipientId: msg.recipient_id,
        content: msg.content,
        read: msg.read,
        createdAt: msg.created_at
      }))

      return handleCORS(NextResponse.json(formattedMessages))
    }

    // ============ TRIP ROUTES ============

    // POST /api/trips
    if (route === '/trips' && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const body = await request.json()
      const { 
        title, 
        destination, 
        startDate, 
        endDate, 
        segments, 
        status, 
        visibility,
        description,
        coverPhoto,
        tripImages,
        weather,
        overallComment,
        airlines,
        accommodations
      } = body

      if (!title || !destination || !startDate) {
        return handleCORS(NextResponse.json(
          { error: 'Title, destination, and start date are required' },
          { status: 400 }
        ))
      }

      const trip = {
        id: uuidv4(),
        user_id: decoded.userId,
        title,
        destination,
        start_date: startDate,
        end_date: endDate || startDate,
        status: status || 'future',
        visibility: visibility || 'private',
        description: description || '',
        cover_photo: coverPhoto || '',
        trip_images: tripImages || '',
        weather: weather || '',
        overall_comment: overallComment || '',
        airlines: airlines || [],
        accommodations: accommodations || [],
        segments: segments || [],
        shared_with: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('trips')
        .insert([trip])

      if (error) throw error

      // Convert to camelCase for response
      return handleCORS(NextResponse.json({
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
        updatedAt: trip.updated_at
      }))
    }

    // GET /api/trips
    if (route === '/trips' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      // Get pagination params from query string
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1', 10)
      const limit = parseInt(searchParams.get('limit') || '10', 10)
      const offset = (page - 1) * limit

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

      // Convert to camelCase
      const formattedTrips = (trips || []).map(trip => ({
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
        updatedAt: trip.updated_at
      }))

      return handleCORS(NextResponse.json({
        trips: formattedTrips,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
          hasMore: offset + limit < (count || 0)
        }
      }))
    }

    // GET /api/trips/public/all - Get all public trips
    if (route === '/trips/public/all' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      // Get pagination params from query string
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1', 10)
      const limit = parseInt(searchParams.get('limit') || '12', 10)
      const offset = (page - 1) * limit

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

      // Convert to camelCase with user info
      const formattedTrips = (trips || []).map(trip => ({
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
        userName: trip.users?.name || 'Unknown User'
      }))

      return handleCORS(NextResponse.json({
        trips: formattedTrips,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
          hasMore: offset + limit < (count || 0)
        }
      }))
    }

    // GET /api/trips/shared - Get trips shared with current user
    if (route === '/trips/shared' && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      // Get pagination params from query string
      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1', 10)
      const limit = parseInt(searchParams.get('limit') || '12', 10)
      const offset = (page - 1) * limit

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

      // Convert to camelCase with user info
      const formattedTrips = (trips || []).map(trip => ({
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
        userName: trip.users?.name || 'Unknown User'
      }))

      return handleCORS(NextResponse.json({
        trips: formattedTrips,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
          hasMore: offset + limit < (count || 0)
        }
      }))
    }

    // GET /api/trips/:id
    if (route.startsWith('/trips/') && method === 'GET') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const tripId = path[1]
      const { data: trip, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .eq('user_id', decoded.userId)
        .single()

      if (error || !trip) {
        return handleCORS(NextResponse.json(
          { error: 'Trip not found' },
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({
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
        updatedAt: trip.updated_at
      }))
    }

    // PATCH /api/trips/:id
    if (route.startsWith('/trips/') && method === 'PATCH') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const tripId = path[1]
      const body = await request.json()

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
        return handleCORS(NextResponse.json(
          { error: 'Trip not found' },
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({
        id: updatedTrip.id,
        userId: updatedTrip.user_id,
        title: updatedTrip.title,
        destination: updatedTrip.destination,
        startDate: updatedTrip.start_date,
        endDate: updatedTrip.end_date,
        status: updatedTrip.status,
        visibility: updatedTrip.visibility,
        description: updatedTrip.description,
        coverPhoto: updatedTrip.cover_photo,
        tripImages: updatedTrip.trip_images,
        weather: updatedTrip.weather,
        overallComment: updatedTrip.overall_comment,
        airlines: updatedTrip.airlines,
        accommodations: updatedTrip.accommodations,
        segments: updatedTrip.segments,
        sharedWith: updatedTrip.shared_with,
        createdAt: updatedTrip.created_at,
        updatedAt: updatedTrip.updated_at
      }))
    }

    // POST /api/trips/:id/share - Share a trip with someone via email
    if (route.startsWith('/trips/') && route.endsWith('/share') && method === 'POST') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const tripId = path[1]
      const body = await request.json()
      const { recipientEmail } = body

      if (!recipientEmail) {
        return handleCORS(NextResponse.json(
          { error: 'Recipient email is required' },
          { status: 400 }
        ))
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(recipientEmail)) {
        return handleCORS(NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        ))
      }

      // Get the trip to verify ownership and get details
      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .select(`
          *,
          users!trips_user_id_fkey (name)
        `)
        .eq('id', tripId)
        .eq('user_id', decoded.userId)
        .single()

      if (tripError || !trip) {
        return handleCORS(NextResponse.json(
          { error: 'Trip not found or you do not have permission to share it' },
          { status: 404 }
        ))
      }

      try {
        // Check if recipient is already a user
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('id, name, email')
          .eq('email', recipientEmail.toLowerCase())
          .single()

        let recipientUserId = null
        let isNewUser = true

        if (!userError && existingUser) {
          // User exists, share with them directly
          recipientUserId = existingUser.id
          isNewUser = false

          // Add user to shared_with array if not already there
          const currentSharedWith = trip.shared_with || []
          if (!currentSharedWith.includes(recipientUserId)) {
            const { error: updateError } = await supabase
              .from('trips')
              .update({
                shared_with: [...currentSharedWith, recipientUserId],
                updated_at: new Date().toISOString()
              })
              .eq('id', tripId)

            if (updateError) {
              return handleCORS(NextResponse.json(
                { error: 'Failed to share trip' },
                { status: 500 }
              ))
            }
          }

          // Send email to existing user
          const EmailService = (await import('@/lib/email-service')).default
          await EmailService.sendTripToExistingUser(
            recipientEmail,
            {
              id: trip.id,
              title: trip.title,
              destination: trip.destination,
              startDate: trip.start_date,
              endDate: trip.end_date
            },
            trip.users?.name || 'Someone'
          )

        } else {
          // User doesn't exist, send invitation email
          // In the future, you might want to create a pending share record
          const EmailService = (await import('@/lib/email-service')).default
          await EmailService.sendTripInvitation(
            recipientEmail,
            {
              id: trip.id,
              title: trip.title,
              destination: trip.destination,
              startDate: trip.start_date,
              endDate: trip.end_date,
              rating: trip.rating,
              description: trip.description
            },
            trip.users?.name || 'Someone'
          )
        }

        return handleCORS(NextResponse.json({
          success: true,
          message: isNewUser
            ? `Invitation sent to ${recipientEmail}`
            : `Trip shared with ${existingUser.name || recipientEmail}`,
          isNewUser,
          recipientEmail,
          sharedTrip: {
            id: trip.id,
            title: trip.title,
            destination: trip.destination
          }
        }))

      } catch (emailError) {
        console.error('Error sending email:', emailError)
        return handleCORS(NextResponse.json(
          { error: 'Trip shared but failed to send email notification' },
          { status: 500 }
        ))
      }
    }

    // DELETE /api/trips/:id
    if (route.startsWith('/trips/') && method === 'DELETE') {
      const decoded = verifyToken(request)
      if (!decoded) {
        return handleCORS(NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ))
      }

      const tripId = path[1]
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId)
        .eq('user_id', decoded.userId)

      if (error) {
        return handleCORS(NextResponse.json(
          { error: 'Trip not found' },
          { status: 404 }
        ))
      }

      return handleCORS(NextResponse.json({ success: true }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ))

  } catch (error) {
    // Log full error details server-side only
    logger.error('API Error:', {
      message: error.message,
      stack: error.stack,
      route,
      method,
      timestamp: new Date().toISOString()
    })
    
    // Return sanitized error to client - no sensitive info
    return handleCORS(NextResponse.json(
      {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    ), request)
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
