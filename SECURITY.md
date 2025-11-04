# Security Guidelines

## Environment Variables

### Local Development

1. **Never commit `.env.local` or any `.env*.local` files**
   - These files contain sensitive credentials
   - They are listed in `.gitignore` and should never be committed
   - Use `.env.example` as a template

2. **Setting up local environment:**
   ```bash
   cp .env.example .env.local
   # Then edit .env.local with your actual credentials
   ```

3. **Required Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (public, safe in client)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key (public, safe in client)
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (**KEEP SECRET!**)
   - `JWT_SECRET` - Your JWT signing secret (**KEEP SECRET!**)

### Deployment

1. **Configure environment variables in your deployment platform:**
   - **Netlify**: Site Settings → Environment Variables
   - **Vercel**: Project Settings → Environment Variables

2. **Never hardcode secrets in:**
   - Source code files
   - Documentation files
   - Configuration files
   - Comments

3. **If secrets are accidentally committed:**
   - Rotate all exposed credentials immediately
   - Remove them from git history
   - Update deployment environments with new credentials

## Understanding Public vs Secret Variables

### Public Variables (Safe in Client Bundle)
These variables are **intended** to be included in your client-side JavaScript bundle:

- `NEXT_PUBLIC_SUPABASE_URL` - The Supabase project URL is public
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - The anon key is designed for client-side use with Row Level Security (RLS)

These values will appear in your compiled JavaScript and that's expected behavior.

### Secret Variables (Server-Side Only)
These must **never** be exposed to the client:

- `SUPABASE_SERVICE_ROLE_KEY` - Bypasses RLS, grants full database access
- `JWT_SECRET` - Used for signing authentication tokens

## Supabase Security

Since you're using Supabase for auth and functions:

1. **Row Level Security (RLS)**
   - Always enable RLS on tables containing sensitive data
   - Write policies that restrict access appropriately
   - Test policies thoroughly

2. **Service Role Key**
   - Only use on the server side
   - Never expose to client code
   - Bypasses all RLS policies

3. **Anon Key**
   - Safe to use in client-side code
   - Respects RLS policies
   - Limited by your database policies

## Netlify Secrets Scanning

The `netlify.toml` file is configured to:
- Omit `NEXT_PUBLIC_*` variables from secrets scanning (they're meant to be public)
- Omit build artifacts (`.next/`, `.netlify/`) from scanning
- Omit files with Supabase Storage signed URLs (public image URLs)

## Best Practices

1. **Rotate secrets regularly**
   - Change JWT_SECRET periodically
   - Rotate service role keys if exposed

2. **Use different secrets per environment**
   - Development, staging, and production should have different secrets
   - Never use production credentials in development

3. **Monitor for secret exposure**
   - Use tools like git-secrets or trufflehog
   - Review pull requests for accidental secret commits
   - Enable Netlify's built-in secrets scanning

4. **Principle of least privilege**
   - Use anon key in client code
   - Only use service role key when absolutely necessary
   - Implement proper RLS policies

## Generating Secure Secrets

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## Questions?

If you're unsure whether a value should be public or secret:
- **If it starts with `NEXT_PUBLIC_`** → Safe for client-side
- **If it's called "service", "admin", or "secret"** → Keep it secret
- **When in doubt** → Treat it as secret

## Supabase Auth Setup

Since you're using Supabase for authentication:

1. Go to your Supabase Dashboard → Authentication → Settings
2. Configure allowed redirect URLs for your domains
3. Set up email templates
4. Configure OAuth providers if needed
5. Review user management settings

For more information:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
