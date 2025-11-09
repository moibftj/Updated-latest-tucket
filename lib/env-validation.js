/**
 * Environment Variable Validation
 *
 * Validates that all required environment variables are set before the app starts.
 * This prevents runtime errors and provides clear error messages for configuration issues.
 */

const requiredEnvVars = {
  // Supabase credentials (required)
  NEXT_PUBLIC_SUPABASE_URL: {
    required: true,
    description: 'Supabase project URL',
    example: 'https://yourproject.supabase.co',
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    required: true,
    description: 'Supabase anon/public key',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    required: true,
    description: 'Supabase service role key (server-side only)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },

  // JWT secret (required)
  JWT_SECRET: {
    required: true,
    description: 'Secret key for JWT token signing',
    example: 'Use: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'base64\'))"',
  },

  // App URL (optional, has default)
  NEXT_PUBLIC_APP_URL: {
    required: false,
    description: 'Application URL for email links',
    default: 'http://localhost:3000',
  },

  // Email service (optional)
  BREVO_SMTP_HOST: {
    required: false,
    description: 'Brevo SMTP host (for email features)',
  },
  BREVO_SMTP_PORT: {
    required: false,
    description: 'Brevo SMTP port (for email features)',
  },
  BREVO_SMTP_USER: {
    required: false,
    description: 'Brevo SMTP username (for email features)',
  },
  BREVO_SMTP_PASSWORD: {
    required: false,
    description: 'Brevo SMTP password (for email features)',
  },
}

/**
 * Validates environment variables
 * @returns {Object} { isValid: boolean, errors: string[], warnings: string[] }
 */
export function validateEnvironment() {
  const errors = []
  const warnings = []
  const missing = []

  // Check each required variable
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key]

    if (!value || value === '' || value.includes('your_') || value.includes('yourproject')) {
      if (config.required) {
        missing.push(key)
        errors.push(
          `Missing required environment variable: ${key}\n` +
          `  Description: ${config.description}\n` +
          `  ${config.example ? `Example: ${config.example}` : ''}`
        )
      } else {
        warnings.push(
          `Optional environment variable not set: ${key}\n` +
          `  Description: ${config.description}\n` +
          `  ${config.default ? `Using default: ${config.default}` : 'Feature may not work without this'}`
        )
      }
    }
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    warnings.push(
      'JWT_SECRET is too short. For security, use at least 256 bits (32 characters).\n' +
      '  Generate a strong secret with: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'base64\'))"'
    )
  }

  // Check for placeholder values
  const placeholders = [
    'your_supabase_project_url_here',
    'your_supabase_anon_key_here',
    'your_supabase_service_role_key_here',
    'your_jwt_secret_here',
  ]

  for (const [key, value] of Object.entries(process.env)) {
    if (typeof value === 'string' && placeholders.some(p => value.includes(p))) {
      errors.push(
        `Environment variable ${key} contains placeholder value.\n` +
        `  Please update .env.local with actual credentials.`
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    missing,
  }
}

/**
 * Prints validation results to console
 */
export function printValidationResults(results) {
  if (results.errors.length > 0) {
    console.error('\n❌ ENVIRONMENT CONFIGURATION ERRORS:\n')
    results.errors.forEach(error => {
      console.error(`  ${error}\n`)
    })
    console.error('\n📝 HOW TO FIX:\n')
    console.error('  1. Copy .env.example to .env.local')
    console.error('  2. Update .env.local with your actual credentials')
    console.error('  3. Get Supabase credentials from: https://app.supabase.com → Settings → API')
    console.error('  4. Restart the development server\n')
  }

  if (results.warnings.length > 0) {
    console.warn('\n⚠️  ENVIRONMENT WARNINGS:\n')
    results.warnings.forEach(warning => {
      console.warn(`  ${warning}\n`)
    })
  }

  if (results.isValid) {
    console.log('✅ Environment configuration valid')
    if (results.warnings.length > 0) {
      console.log('   (with some optional features disabled)\n')
    } else {
      console.log('')
    }
  }
}

/**
 * Validates environment and throws if invalid (for app startup)
 */
export function validateEnvironmentOrThrow() {
  const results = validateEnvironment()
  printValidationResults(results)

  if (!results.isValid) {
    throw new Error(
      `Environment configuration is invalid. Found ${results.errors.length} error(s). ` +
      `Please check .env.local and update with your credentials.`
    )
  }

  return results
}

/**
 * Server-side only: Validate environment in API routes
 */
export function validateServerEnvironment() {
  // Only validate server-side vars
  const serverVars = ['SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET']
  const missing = serverVars.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required server environment variables: ${missing.join(', ')}\n` +
      `This usually means .env.local is not loaded correctly.`
    )
  }
}

// Run validation in development (server-side only)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  try {
    validateEnvironmentOrThrow()
  } catch (error) {
    // Don't throw during build - just log
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.error(error.message)
    }
  }
}
