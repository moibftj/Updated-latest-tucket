# Tucker Trips - Netlify Deployment Guide (Supabase)

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup)
- A [Supabase account](https://supabase.com) with a configured project
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, you'll need to set up the following environment variables in Netlify:

### Required Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL

   ```
   Example: https://wcnguiercwrdhsielhno.supabase.co
   ```

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anonymous key

   ```
   Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **SUPABASE_SERVICE_ROLE_KEY** - Your Supabase service role key (admin access)

   ```
   Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Note: Keep this secret! Never expose in client code
   ```

4. **JWT_SECRET** - A secure random string for JWT token signing

   ```
   Example: tucker-trips-supabase-jwt-secret-key-minimum-32-characters-long-secure
   Note: Generate a secure random string (at least 32 characters)
   ```

5. **CORS_ORIGINS** - Allowed origins for CORS (optional, defaults to \*)
   ```
   Example: https://your-app.netlify.app
   ```

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first deployment)

1. **Push your code to Git**

   ```bash
   git add .
   git commit -m "Refactor application with API client and unified components"
   git push origin main
   ```

2. **Log in to Netlify**

   - Go to https://app.netlify.com
   - Sign in with your Git provider

3. **Create a new site**

   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select the `New-latest-Tucker` repository

4. **Configure build settings**

   - Build command: `pnpm build`
   - Publish directory: `.next`
   - These should be auto-detected from `netlify.toml`

5. **Add environment variables**

   - In the deployment settings, go to "Environment variables"
   - Add all required variables listed above
   - Click "Add" for each variable

6. **Deploy**

   - Click "Deploy site"
   - Netlify will build and deploy your application
   - You'll get a URL like `https://random-name-123456.netlify.app`

7. **Custom Domain (Optional)**
   - Go to "Domain settings"
   - Add your custom domain
   - Follow Netlify's instructions to configure DNS

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**

   ```bash
   netlify login
   ```

3. **Initialize Netlify site**

   ```bash
   netlify init
   ```

   - Follow the prompts to create a new site or link to an existing one
   - Choose "Create & configure a new site"
   - Select your team
   - Give your site a name (or leave blank for auto-generated)

4. **Set environment variables**

   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
   netlify env:set SUPABASE_SERVICE_ROLE_KEY "your-service-role-key"
   netlify env:set JWT_SECRET "your-jwt-secret"
   netlify env:set CORS_ORIGINS "https://your-domain.netlify.app"
   ```

5. **Deploy**

   ```bash
   # Deploy to production
   netlify deploy --prod

   # Or first deploy to preview
   netlify deploy
   # Then if everything looks good:
   netlify deploy --prod
   ```

## Supabase Setup

If you don't have a Supabase project yet:

1. **Create Supabase account**

   - Go to https://supabase.com
   - Sign up for a free account

2. **Create a new project**

   - Click "New Project"
   - Choose your organization
   - Set project name, database password, and region
   - Click "Create new project"

3. **Run the database schema**

   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase-schema.sql` from your project root
   - Paste and run the SQL to create all tables and policies
   - Verify tables are created in the Table Editor

4. **Get your API keys**

   - Go to Project Settings → API
   - Copy the following:
     - Project URL → Use as `NEXT_PUBLIC_SUPABASE_URL`
     - `anon` `public` key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` `secret` key → Use as `SUPABASE_SERVICE_ROLE_KEY`

5. **Configure Row Level Security (RLS)**

   - RLS policies are automatically created by the schema
   - Verify in Authentication → Policies
   - The schema includes policies for users, trips, and messages

6. **Optional: Disable email confirmation**
   - Go to Authentication → Settings
   - Under "Email Auth", toggle off "Enable email confirmations"
   - This allows testing without email verification

## Verifying Deployment

After deployment:

1. **Check build logs**

   - In Netlify dashboard, go to "Deploys"
   - Click on the latest deploy
   - Review the build logs for any errors

2. **Test your application**

   - Visit your Netlify URL
   - Test user registration
   - Test login
   - Create a test trip
   - Verify all features work

3. **Check function logs**
   - Go to "Functions" tab in Netlify
   - Monitor for any runtime errors

## Troubleshooting

### Build fails with "pnpm not found"

- The `netlify.toml` should handle this automatically
- Verify `NETLIFY_USE_PNPM = "true"` is set in `netlify.toml`

### Database connection fails

- Verify all Supabase environment variables are correctly set
- Check that `supabase-schema.sql` has been run in your Supabase project
- Verify service role key is correct (not the anon key)
- Check Supabase project is active (not paused)

### JWT errors

- Ensure `JWT_SECRET` is at least 32 characters
- Verify it's set in Netlify environment variables

### CORS errors

- Set `CORS_ORIGINS` to your Netlify domain
- Clear browser cache and try again

### RLS Policy errors

- Verify all RLS policies were created from `supabase-schema.sql`
- Check policies in Supabase dashboard → Authentication → Policies
- Ensure service role key is being used for server-side operations

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Database connection is working
- [ ] User registration works
- [ ] Login/logout works
- [ ] Trip creation works
- [ ] Chat functionality works
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active (automatic with Netlify)
- [ ] Performance is acceptable
- [ ] No errors in function logs

## Continuous Deployment

Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Your site will automatically rebuild and redeploy!

## Performance Optimization

1. **Enable caching**

   - Netlify automatically caches static assets
   - Configure cache headers in `next.config.js` if needed

2. **Monitor performance**

   - Use Netlify Analytics (paid feature)
   - Monitor function execution times
   - Optimize database queries if needed

3. **Upgrade MongoDB tier**
   - Free tier has limitations
   - Consider M2/M5 for production use

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/overview/
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

## Cost Estimation

### Free Tier Includes:

- Netlify: 100GB bandwidth/month, 300 build minutes/month
- Supabase: 500MB database, 2GB bandwidth, 50MB file storage

### Estimated costs for moderate usage:

- Netlify Pro: $19/month (1TB bandwidth, 1000 build minutes)
- Supabase Pro: $25/month (8GB database, 50GB bandwidth, 100GB storage)

**Total**: ~$44/month for production-ready hosting

---

**Note**: This application has been migrated to Supabase PostgreSQL:

- ✅ Full Supabase integration with Row Level Security (RLS)
- ✅ PostgreSQL relational database with foreign keys and indexes
- ✅ Automatic authentication and authorization via RLS policies
- ✅ Server-side API using Supabase service role key
- ✅ Client-side operations using anon key (future enhancement)
- ✅ Schema file included (`supabase-schema.sql`)

All changes are production-ready and tested! 🚀
