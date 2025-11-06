#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const supabaseUrl = 'https://ugxzjmzrmvbnhfejwjse.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak'

async function setupDatabase() {
  console.log('🚀 Setting up Tucker Trips database schema...')

  try {
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Read the schema file
    const schemaPath = path.join(__dirname, 'supabase/migrations/20250101000000_initial_schema.sql')
    const schemaSql = fs.readFileSync(schemaPath, 'utf8')

    console.log('📄 Schema file loaded successfully')

    // Execute the schema SQL
    console.log('🔧 Executing schema migration...')

    // Split the SQL file into individual statements
    const statements = schemaSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log(`📝 Found ${statements.length} SQL statements to execute`)

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]

      if (statement.trim()) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`)

        try {
          const { error } = await supabase.rpc('exec_sql', { sql_query: statement })

          if (error) {
            // Try direct SQL execution via REST API
            const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey
              },
              body: JSON.stringify({ sql_query: statement })
            })

            if (!response.ok) {
              console.warn(`⚠️  Statement ${i + 1} failed:`, await response.text())
            } else {
              console.log(`✅ Statement ${i + 1} executed successfully`)
            }
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`)
          }
        } catch (err) {
          console.warn(`⚠️  Statement ${i + 1} error:`, err.message)
        }
      }
    }

    // Alternative approach: Use direct SQL via HTTP
    console.log('🔄 Trying alternative approach with direct SQL execution...')

    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sql',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
        'Prefer': 'return=minimal'
      },
      body: schemaSql
    })

    if (response.ok) {
      console.log('✅ Schema applied successfully!')
    } else {
      throw new Error(`Schema application failed: ${await response.text()}`)
    }

    // Test the setup by checking if tables exist
    console.log('🔍 Verifying table creation...')

    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['users', 'trips', 'messages'])

    if (tablesError) {
      console.warn('⚠️  Could not verify tables:', tablesError.message)
    } else {
      console.log('✅ Tables found:', tables.map(t => t.table_name).join(', '))
    }

    console.log('🎉 Database schema setup completed!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('1. Visit your Supabase dashboard: https://app.supabase.com/project/ugxzjmzrmvbnhfejwjse')
    console.log('2. Go to the Table Editor to see your new tables')
    console.log('3. Test your deployed app at: https://tucker-trips-app.netlify.app')

  } catch (error) {
    console.error('❌ Database setup failed:', error.message)
    console.log('')
    console.log('📝 Manual setup required:')
    console.log('1. Go to your Supabase dashboard: https://app.supabase.com/project/ugxzjmzrmvbnhfejwjse')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy and paste the contents of supabase/migrations/20250101000000_initial_schema.sql')
    console.log('4. Run the SQL script')
    process.exit(1)
  }
}

// Run the setup
setupDatabase()