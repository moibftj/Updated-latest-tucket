import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
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
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // ============ AUTH ROUTES ============
    
    // POST /api/auth/register
    if (route === '/auth/register' && method === 'POST') {
      const body = await request.json()
      const { email, password, name } = body

      if (!email || !password || !name) {
        return handleCORS(NextResponse.json(
          { error: 'Email, password, and name are required' },
          { status: 400 }
        ))
      }

      // Check if user exists
      const existingUser = await db.collection('users').findOne({ email })
      if (existingUser) {
        return handleCORS(NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
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
        lastSeen: new Date(),
        isOnline: false,
        createdAt: new Date()
      }

      await db.collection('users').insertOne(user)

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )

      return handleCORS(NextResponse.json({
        user: { id: user.id, email: user.email, name: user.name, bio: user.bio },
        token
      }))
    }

    // POST /api/auth/login
    if (route === '/auth/login' && method === 'POST') {
      const body = await request.json()
      const { email, password } = body

      if (!email || !password) {
        return handleCORS(NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        ))
      }

      // Find user
      const user = await db.collection('users').findOne({ email })
      if (!user) {
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
      await db.collection('users').updateOne(
        { id: user.id },
        { $set: { lastSeen: new Date(), isOnline: true } }
      )

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

      const user = await db.collection('users').findOne({ id: decoded.userId })
      if (!user) {
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

      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: updateData }
      )

      const user = await db.collection('users').findOne({ id: decoded.userId })
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

      await db.collection('users').updateOne(
        { id: decoded.userId },
        { $set: { lastSeen: new Date(), isOnline: true } }
      )

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
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      
      const onlineUsers = await db.collection('users')
        .find({ 
          id: { $ne: decoded.userId },
          lastSeen: { $gte: fiveMinutesAgo },
          isOnline: true
        })
        .project({ id: 1, name: 1, email: 1, bio: 1, lastSeen: 1 })
        .toArray()

      const cleanedUsers = onlineUsers.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedUsers))
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
        senderId: decoded.userId,
        recipientId,
        content,
        read: false,
        createdAt: new Date()
      }

      await db.collection('messages').insertOne(message)

      const { _id, ...messageData } = message
      return handleCORS(NextResponse.json(messageData))
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
      
      const messages = await db.collection('messages')
        .find({
          $or: [
            { senderId: decoded.userId, recipientId: otherUserId },
            { senderId: otherUserId, recipientId: decoded.userId }
          ]
        })
        .sort({ createdAt: 1 })
        .toArray()

      // Mark messages as read
      await db.collection('messages').updateMany(
        { senderId: otherUserId, recipientId: decoded.userId, read: false },
        { $set: { read: true } }
      )

      const cleanedMessages = messages.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedMessages))
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
        userId: decoded.userId,
        title,
        destination,
        startDate,
        endDate: endDate || startDate,
        status: status || 'future',
        visibility: visibility || 'private',
        description: description || '',
        coverPhoto: coverPhoto || '',
        tripImages: tripImages || '',
        weather: weather || '',
        overallComment: overallComment || '',
        airlines: airlines || [],
        accommodations: accommodations || [],
        segments: segments || [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('trips').insertOne(trip)

      // Remove MongoDB _id
      const { _id, ...tripData } = trip
      return handleCORS(NextResponse.json(tripData))
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

      const trips = await db.collection('trips')
        .find({ userId: decoded.userId })
        .sort({ createdAt: -1 })
        .toArray()

      const cleanedTrips = trips.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleanedTrips))
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
      const trip = await db.collection('trips').findOne({ 
        id: tripId, 
        userId: decoded.userId 
      })

      if (!trip) {
        return handleCORS(NextResponse.json(
          { error: 'Trip not found' },
          { status: 404 }
        ))
      }

      const { _id, ...tripData } = trip
      return handleCORS(NextResponse.json(tripData))
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

      const result = await db.collection('trips').findOneAndUpdate(
        { id: tripId, userId: decoded.userId },
        { 
          $set: { 
            ...body,
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      )

      if (!result) {
        return handleCORS(NextResponse.json(
          { error: 'Trip not found' },
          { status: 404 }
        ))
      }

      const { _id, ...tripData } = result
      return handleCORS(NextResponse.json(tripData))
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
      const result = await db.collection('trips').deleteOne({ 
        id: tripId, 
        userId: decoded.userId 
      })

      if (result.deletedCount === 0) {
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
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
