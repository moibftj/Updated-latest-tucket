-- Tucker Trips Supabase Schema
-- Run this in your Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  is_online BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_last_seen ON users(last_seen);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT DEFAULT 'future' CHECK (status IN ('future', 'taken')),
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'public')),
  description TEXT DEFAULT '',
  cover_photo TEXT DEFAULT '',
  trip_images TEXT DEFAULT '',
  weather TEXT DEFAULT '',
  overall_comment TEXT DEFAULT '',
  airlines JSONB DEFAULT '[]'::jsonb,
  accommodations JSONB DEFAULT '[]'::jsonb,
  segments JSONB DEFAULT '[]'::jsonb,
  shared_with JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for trips
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trips_visibility ON trips(visibility);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON trips(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trips_shared_with ON trips USING GIN(shared_with);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, recipient_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Users can read all user data (for discovery/chat)
CREATE POLICY "Users can read all users"
  ON users FOR SELECT
  USING (true);

-- Users can update only their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id);

-- Allow user registration (insert)
CREATE POLICY "Anyone can insert users"
  ON users FOR INSERT
  WITH CHECK (true);

-- RLS Policies for trips table
-- Users can read their own trips
CREATE POLICY "Users can read own trips"
  ON trips FOR SELECT
  USING (user_id = auth.uid()::text);

-- Users can read public trips
CREATE POLICY "Users can read public trips"
  ON trips FOR SELECT
  USING (visibility = 'public');

-- Users can read trips shared with them
CREATE POLICY "Users can read shared trips"
  ON trips FOR SELECT
  USING (shared_with ? auth.uid()::text);

-- Users can insert their own trips
CREATE POLICY "Users can insert own trips"
  ON trips FOR INSERT
  WITH CHECK (user_id = auth.uid()::text);

-- Users can update their own trips
CREATE POLICY "Users can update own trips"
  ON trips FOR UPDATE
  USING (user_id = auth.uid()::text);

-- Users can delete their own trips
CREATE POLICY "Users can delete own trips"
  ON trips FOR DELETE
  USING (user_id = auth.uid()::text);

-- RLS Policies for messages table
-- Users can read messages they sent or received
CREATE POLICY "Users can read own messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid()::text OR recipient_id = auth.uid()::text);

-- Users can insert messages they send
CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid()::text);

-- Users can update messages they received (for marking as read)
CREATE POLICY "Users can update received messages"
  ON messages FOR UPDATE
  USING (recipient_id = auth.uid()::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on trips
CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions (if using service role key, this may not be needed)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
