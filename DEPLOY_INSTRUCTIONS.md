# Deployment Instructions

## Step 1: Deploy Database Schema to Supabase

1. Go to your Supabase project dashboard: https://app.supabase.com/project/ugxzjmzrmvbnhfejwjse
2. Navigate to the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` and paste it into the SQL editor
5. Click **Run** or press `Ctrl+Enter` to execute the schema

This will create:
- Tables: `users`, `trips`, `messages`
- Indexes for performance optimization
- Row Level Security (RLS) policies
- Function: `update_updated_at_column()`
- Trigger: `update_trips_updated_at`
- Proper permissions and grants

## Step 2: Verify Schema Deployment

After running the schema, verify in the Supabase dashboard:
1. Go to **Table Editor** → Check that `users`, `trips`, and `messages` tables exist
2. Go to **Database** → **Functions** → Verify `update_updated_at_column` exists
3. Go to **Database** → **Triggers** → Verify `update_trips_updated_at` exists

## Step 3: Deploy to Netlify

The application will be deployed to Netlify with the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ugxzjmzrmvbnhfejwjse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE3MjMsImV4cCI6MjA3NjAyNzcyM30.Y3NpD7piNUGGFb69wUbr2KofHyIXkvIfct0Z9XXz8Bw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak
JWT_SECRET=jQL3k+NkwrDHI6t5efaVlX/b+lmeUAWuXc4MuUJ7rKT7n3+MYUb+Qdrlkc/9Tkj1MneTqRSqH7pBlbnJVTY9hQ==
```

These must be configured in Netlify before deployment.

## Done!

Once both steps are complete, your Tucker Trips application will be fully functional with:
- User authentication
- Trip management
- Real-time messaging
- Public/private trip visibility
- Trip sharing capabilities
