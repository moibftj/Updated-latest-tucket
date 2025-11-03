#!/bin/bash

# Deploy schema to Supabase using the service role key
# This script executes the SQL file via Supabase REST API

SUPABASE_URL="https://ugxzjmzrmvbnhfejwjse.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHpqbXpybXZibmhmZWp3anNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MTcyMywiZXhwIjoyMDc2MDI3NzIzfQ.6EX6uG1YWEIUfgccXAm_ni8csR0jKMbY5FnPfGxjtak"
SCHEMA_FILE="supabase-schema.sql"

echo "Deploying schema to Supabase..."
echo "Supabase URL: $SUPABASE_URL"
echo ""

# Read the SQL file
SQL_CONTENT=$(cat "$SCHEMA_FILE")

# Execute via Supabase REST API
curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(jq -Rs . < "$SCHEMA_FILE")}" \
  -v

echo ""
echo "Schema deployment completed!"
