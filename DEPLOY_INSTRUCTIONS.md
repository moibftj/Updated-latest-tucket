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

## Step 3: Configure Environment Variables in Netlify

Before deploying, you need to configure environment variables in your Netlify dashboard:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
JWT_SECRET=<your-jwt-secret>
```

### Where to find these values:

- **NEXT_PUBLIC_SUPABASE_URL**: Go to your Supabase project → Settings → API → Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Go to your Supabase project → Settings → API → Project API keys → anon/public key
- **SUPABASE_SERVICE_ROLE_KEY**: Go to your Supabase project → Settings → API → Project API keys → service_role key (keep this secret!)
- **JWT_SECRET**: Generate a secure random string using: `node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"`

### Deploy to Netlify

Once environment variables are configured, deploy using the Netlify CLI or connect your Git repository for automatic deployments.

## Done!

Once both steps are complete, your Tucker Trips application will be fully functional with:
- User authentication
- Trip management
- Real-time messaging
- Public/private trip visibility
- Trip sharing capabilities
