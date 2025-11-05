#!/bin/bash

echo "🔧 Updating Netlify Environment Variables..."

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Install it with: npm install -g netlify-cli"
    exit 1
fi

# Set the correct environment variables
echo "Setting NEXT_PUBLIC_SUPABASE_URL..."
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://ugxzjmzrmvbnhfejwjse.supabase.co"

echo "Setting NEXT_PUBLIC_SUPABASE_ANON_KEY..."
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE3MjMsImV4cCI6MjA3NjAyNzcyM30.Y3NpD7piNUGGFb69wUbr2KofHyIXkvIfct0Z9XXz8Bw"

echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
netlify env:set SUPABASE_SERVICE_ROLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak"

echo "Setting JWT_SECRET..."
netlify env:set JWT_SECRET "jQL3k+NkwrDHI6t5efaVlX/b+lmeUAWuXc4MuUJ7rKT7n3+MYUb+Qdrlkc/9Tkj1MneTqRSqH7pBlbnJVTY9hQ=="

echo "✅ Environment variables updated!"
echo "🚀 Triggering new deployment..."
netlify deploy --prod

echo "🎉 Done! Your app should now work correctly on Netlify."
