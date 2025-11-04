# Vercel Deployment Guide - Tucker Trips

## 🚀 Quick Deploy

Your project is ready to deploy to Vercel! Follow these steps:

### Step 1: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate. Choose your preferred method:

- GitHub
- GitLab
- Bitbucket
- Email

### Step 2: Deploy to Production

```bash
vercel --prod
```

Or for a preview deployment:

```bash
vercel
```

## 📋 What Happens During Deployment

1. Vercel detects Next.js automatically
2. Installs dependencies with pnpm
3. Runs `pnpm build`
4. Deploys to Vercel's edge network
5. Provides you with a URL

## 🔐 Environment Variables

After deployment, you need to add environment variables in the Vercel Dashboard or via CLI:

### Option A: Via Vercel Dashboard

1. Go to your project on https://vercel.com
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ugxzjmzrmvbnhfejwjse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTE3MjMsImV4cCI6MjA3NjAyNzcyM30.Y3NpD7piNUGGFb69wUbr2KofHyIXkvIfct0Z9XXz8Bw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak
JWT_SECRET=jQL3k+NkwrDHI6t5efaVlX/b+lmeUAWuXc4MuUJ7rKT7n3+MYUb+Qdrlkc/9Tkj1MneTqRSqH7pBlbnJVTY9hQ==
```

4. Click **Save**
5. Redeploy for changes to take effect

### Option B: Via CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://ugxzjmzrmvbnhfejwjse.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste the anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste the service role key

vercel env add JWT_SECRET production
# Paste the JWT secret
```

Then redeploy:

```bash
vercel --prod
```

## 🔄 Continuous Deployment

### Link to Git Repository

```bash
vercel --prod
# Follow prompts to link to your GitHub repo
```

Once linked, Vercel will automatically deploy:

- **Production**: When you push to `main` branch
- **Preview**: When you open a pull request

## 📊 Project Configuration

Your project is already configured with:

✅ **vercel.json** - Deployment configuration
✅ **next.config.js** - Next.js optimization  
✅ **Package manager**: pnpm (auto-detected)
✅ **Build command**: `pnpm build`
✅ **Output directory**: `.next`

## 🌐 Custom Domain

After deployment, add a custom domain:

### Via Dashboard

1. Go to your project → **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed

### Via CLI

```bash
vercel domains add yourdomain.com
```

## 🧪 Preview Deployments

Test changes before production:

```bash
# Deploy to preview URL
vercel

# Share the preview URL with team
```

Every preview deployment gets a unique URL like:
`tucker-trips-abc123.vercel.app`

## 📈 Monitoring

View deployment logs and analytics:

```bash
# View deployment logs
vercel logs

# Open project in browser
vercel --prod --open
```

Or visit https://vercel.com/dashboard

## 🔧 Troubleshooting

### Build fails

```bash
# Test build locally first
pnpm build

# Check build logs
vercel logs
```

### Environment variables not working

- Ensure they're set for **Production** environment
- Redeploy after adding variables
- Check variable names match exactly

### Domain not working

- Verify DNS propagation (can take 24-48 hours)
- Check DNS records in Vercel dashboard
- Use `dig yourdomain.com` to verify

## 💡 Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# List all deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# View project info
vercel inspect

# Pull environment variables locally
vercel env pull

# Link local project to Vercel project
vercel link
```

## 🎯 Post-Deployment Checklist

- [ ] Deployment successful
- [ ] Environment variables added
- [ ] Test user registration
- [ ] Test trip creation
- [ ] Test messaging
- [ ] Verify Supabase connection
- [ ] Check API routes work
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

## 🚀 Next Steps

1. **Run the deployment**:

   ```bash
   vercel login
   vercel --prod
   ```

2. **Add environment variables** (via dashboard or CLI)

3. **Test your live site**

4. **Share with users**!

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Community**: https://github.com/vercel/vercel/discussions

---

**Ready to deploy?** Run: `vercel --prod`
