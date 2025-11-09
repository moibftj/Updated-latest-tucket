import { z } from 'zod'

/**
 * Validation schema for user registration
 */
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

/**
 * Validation schema for user login
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

/**
 * Validation schema for trip creation/update
 */
export const tripSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['future', 'taken']).optional(),
  visibility: z.enum(['public', 'private']).optional(),
  description: z.string().optional(),
  coverPhoto: z.string().optional(),
  tripImages: z.array(z.string()).optional(),
  weather: z.string().optional(),
  overallComment: z.string().optional(),
  airlines: z.array(z.string()).optional(),
  accommodations: z.array(z.string()).optional(),
  segments: z.array(z.any()).optional(),
  sharedWith: z.array(z.string()).optional(),
})

/**
 * Validation schema for message sending
 */
export const messageSchema = z.object({
  recipientId: z.string().uuid('Invalid recipient ID'),
  content: z.string().min(1, 'Message content is required').max(1000, 'Message too long'),
})

/**
 * Validation schema for profile update
 */
export const profileUpdateSchema = z.object({
  name: z.string().min(1, 'Name must not be empty if provided').optional(),
  bio: z.string().max(500, 'Bio too long').optional(),
})
