import { createClient } from '@supabase/supabase-js'

// Supabase client for server-side operations (API routes)
// Uses service role key for admin operations
export function createServerSupabaseClient() {
  // Support both VITE_ and NEXT_PUBLIC_ prefixes
  const supabaseUrl = process.env.VITE_SUPABASE_BASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Supabase client for client-side operations (browser)
// Uses anon key for client operations
export function createClientSupabaseClient() {
  // Support both VITE_ and NEXT_PUBLIC_ prefixes
  const supabaseUrl = process.env.VITE_SUPABASE_BASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
