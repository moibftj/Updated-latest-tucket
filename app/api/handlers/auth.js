import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import {
  getSupabase,
  handleCORS,
  verifyToken,
  unauthorizedResponse,
  errorResponse,
  successResponse,
} from '../lib/middleware'
import { registerSchema, loginSchema } from '../lib/schemas'

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function handleRegister(request) {
  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Validate input with Zod
    const { email, password, name } = registerSchema.parse(body)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      return errorResponse('User already exists', 409, request)
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
      created_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('users').insert([user])

    if (error) throw error

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return handleCORS(
      NextResponse.json(
        {
          user: { id: user.id, email: user.email, name: user.name, bio: user.bio },
          token,
        },
        { status: 201 }
      ),
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
 * POST /api/auth/login
 * Login user
 */
export async function handleLogin(request) {
  try {
    const body = await request.json()
    const supabase = getSupabase()

    // Validate input with Zod
    const { email, password } = loginSchema.parse(body)

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return errorResponse('Invalid credentials', 401, request)
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return errorResponse('Invalid credentials', 401, request)
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

    return successResponse(
      {
        user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' },
        token,
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
 * GET /api/auth/me
 * Get current user info
 */
export async function handleGetMe(request) {
  const decoded = verifyToken(request)
  if (!decoded) {
    return unauthorizedResponse(request)
  }

  const supabase = getSupabase()
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', decoded.userId)
    .single()

  if (error || !user) {
    return errorResponse('User not found', 404, request)
  }

  return successResponse(
    {
      user: { id: user.id, email: user.email, name: user.name, bio: user.bio || '' },
    },
    request
  )
}
