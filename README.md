# Tucker Trips

A Next.js 14 travel planning application with full-stack architecture. Users can plan trips, chat with other travelers, and share their adventures.

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Git configured properly (see Git Setup below)

### Installation
```bash
# Clone the repository
git clone https://github.com/aqeelwebbing/New-latest-Tucker-1
cd New-latest-Tucker-1

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

### Git Setup (Important!)

**If you encounter Git commit errors (GPG signing, author invalid):**

#### Quick Fix:
```bash
# Run the automated setup script
./setup-git.sh
```

#### Manual Setup:
```bash
# Configure user details
git config --local user.name "Aqeel Jamil"
git config --local user.email "186092537+aqeelwebbing@users.noreply.github.com"

# Disable GPG signing (prevents Codespaces authentication issues)
git config --local commit.gpgsign false
```

#### Common Git Issues:
- **GPG signing errors**: Run `git config --local commit.gpgsign false`
- **Author invalid**: Ensure correct email with `git config --local user.email "186092537+aqeelwebbing@users.noreply.github.com"`
- **Authentication issues**: Check `gh auth status` and re-authenticate if needed

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes (single-file pattern)
- **Database**: Supabase (PostgreSQL) with UUID IDs
- **Authentication**: JWT tokens
- **UI Components**: shadcn/ui + Radix UI
- **Deployment**: Netlify

## Project Structure

```
app/
├── api/[[...path]]/route.js    # All API endpoints (monolithic pattern)
├── globals.css                 # Global styles
├── layout.js                   # Root layout
└── page.js                     # Main application entry

components/
├── ui/                         # shadcn/ui components
├── Dashboard.js                # Main dashboard
├── EnhancedTripModal.js        # Trip creation modal
└── ...                         # Other business components

lib/
├── api.js                      # Centralized API client
├── supabase.js                 # Database configuration
└── utils.js                    # Utility functions
```

## Development

### Running the Application
```bash
# Standard development
pnpm dev

# Alternative dev modes
pnpm dev:no-reload     # Without hot reload
pnpm dev:webpack       # Webpack polling mode
```

### API Development
All API routes are in `app/api/[[...path]]/route.js`. To add a new endpoint:

1. Add route logic inside `handleRoute()` function
2. Use existing patterns for authentication and database access
3. Follow the Supabase pattern: UUID `id` fields, camelCase conversion

### Testing
```bash
# Run backend tests
python backend_test.py

# Update test results
# Edit test_result.md when behavior changes
```

## Deployment

### Environment Variables
Required environment variables (set in `.env.local` and Netlify):
```bash
VITE_SUPABASE_BASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SERVICE_ROLE_KEY=your_service_role_key
```

### Netlify Deployment
1. Configure environment variables in Netlify dashboard
2. Deploy automatically via GitHub integration
3. Build configuration is in `netlify.toml`

## Architecture Notes

- **Single-file API**: All backend routes in one file for this project
- **UUID Primary Keys**: Uses UUID v4 for all database tables
- **JWT Auth**: Stored in localStorage, verified server-side
- **Monolithic by Design**: Intentionally simple architecture

## Contributing

1. Follow existing code patterns
2. Update `test_result.md` when changing behavior
3. Use the established Git configuration
4. Keep the single-file API pattern intact

## Troubleshooting

### Git Issues
- Run `./setup-git.sh` for automated configuration
- Check `.gitconfig.template` for manual setup

### Development Issues
- Use `pnpm dev:webpack` if file watching doesn't work
- Check environment variables in `.env.local`
- Verify Supabase connection in API routes

### Deployment Issues
- Ensure all environment variables are set in Netlify
- Check `netlify.toml` configuration
- Verify build process with `pnpm build`