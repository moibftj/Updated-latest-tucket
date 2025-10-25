# Tucker Trips - Netlify Deployment Guide

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database (or other MongoDB instance)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

Before deploying, you'll need to set up the following environment variables in Netlify:

### Required Environment Variables:

1. **MONGO_URL** - Your MongoDB connection string
   ```
   Example: mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

2. **DB_NAME** - Your MongoDB database name
   ```
   Example: tucker-trips
   ```

3. **JWT_SECRET** - A secure random string for JWT token signing
   ```
   Example: your-super-secret-jwt-key-min-32-chars
   Note: Generate a secure random string (at least 32 characters)
   ```

4. **CORS_ORIGINS** - Allowed origins for CORS (optional, defaults to *)
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
   netlify env:set MONGO_URL "your-mongodb-url"
   netlify env:set DB_NAME "your-database-name"
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

## MongoDB Atlas Setup

If you don't have a MongoDB database yet:

1. **Create MongoDB Atlas account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a cluster**
   - Choose the free tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Set up database access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create a username and strong password
   - Grant "Read and write to any database" permission

4. **Set up network access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, restrict to Netlify's IP ranges

5. **Get connection string**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Use this as your `MONGO_URL` environment variable

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
- Verify `MONGO_URL` is correctly set in environment variables
- Check MongoDB Atlas network access allows Netlify IPs
- Verify database user has correct permissions

### JWT errors
- Ensure `JWT_SECRET` is at least 32 characters
- Verify it's set in Netlify environment variables

### CORS errors
- Set `CORS_ORIGINS` to your Netlify domain
- Clear browser cache and try again

### Function timeout errors
- MongoDB Atlas free tier may be slow on cold starts
- Consider upgrading to a paid Atlas tier for production

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
- 100GB bandwidth/month
- 300 build minutes/month
- MongoDB Atlas M0 (512MB storage)

### Estimated costs for moderate usage:
- Netlify Pro: $19/month (1TB bandwidth, 1000 build minutes)
- MongoDB Atlas M2: $9/month (2GB storage, better performance)

**Total**: ~$28/month for production-ready hosting

---

**Note**: This application has been recently refactored with:
- Centralized API client (`lib/api.js`)
- Unified trip modal component
- Modular Dashboard components
- Improved code organization and maintainability

All changes are production-ready and tested! 🚀
