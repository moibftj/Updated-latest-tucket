-- Disable RLS for Custom JWT Authentication
--
-- This app uses custom JWT authentication instead of Supabase Auth.
-- The RLS policies reference auth.uid() which only works with Supabase Auth.
-- Since we use the service role key in the API layer, all security is enforced there.
--
-- Security is maintained through:
-- 1. JWT token verification in API routes (app/api/[[...path]]/route.js)
-- 2. Service role key usage (bypasses RLS)
-- 3. API-layer validation and authorization checks
--
-- Future improvement: Consider migrating to Supabase Auth or implementing
-- custom RLS functions that work with JWT tokens.

-- Disable Row Level Security on all tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE trips DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Drop existing RLS policies (they don't work with custom JWT)
DROP POLICY IF EXISTS "Users can read all users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Anyone can insert users" ON users;

DROP POLICY IF EXISTS "Users can read own trips" ON trips;
DROP POLICY IF EXISTS "Users can read public trips" ON trips;
DROP POLICY IF EXISTS "Users can read shared trips" ON trips;
DROP POLICY IF EXISTS "Users can insert own trips" ON trips;
DROP POLICY IF EXISTS "Users can update own trips" ON trips;
DROP POLICY IF EXISTS "Users can delete own trips" ON trips;

DROP POLICY IF EXISTS "Users can read own messages" ON messages;
DROP POLICY IF EXISTS "Users can insert messages" ON messages;
DROP POLICY IF EXISTS "Users can update received messages" ON messages;

-- Add helpful comment
COMMENT ON TABLE users IS 'RLS disabled - security enforced at API layer with custom JWT';
COMMENT ON TABLE trips IS 'RLS disabled - security enforced at API layer with custom JWT';
COMMENT ON TABLE messages IS 'RLS disabled - security enforced at API layer with custom JWT';
