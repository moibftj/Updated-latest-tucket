-- Fix Date Storage Types
--
-- Problem: start_date and end_date are stored as TEXT instead of proper DATE types
-- This prevents proper sorting, filtering, and date comparisons
--
-- Solution: Convert TEXT columns to DATE type with proper data migration

-- Step 1: Add new columns with correct types
ALTER TABLE trips
ADD COLUMN start_date_new DATE,
ADD COLUMN end_date_new DATE;

-- Step 2: Migrate existing data (convert TEXT to DATE)
-- Handle various date formats (ISO 8601, US format, etc.)
UPDATE trips
SET
  start_date_new = CASE
    WHEN start_date ~ '^\d{4}-\d{2}-\d{2}' THEN start_date::DATE
    WHEN start_date ~ '^\d{2}/\d{2}/\d{4}' THEN TO_DATE(start_date, 'MM/DD/YYYY')
    WHEN start_date ~ '^\d{1,2}/\d{1,2}/\d{4}' THEN TO_DATE(start_date, 'M/D/YYYY')
    ELSE NULL
  END,
  end_date_new = CASE
    WHEN end_date ~ '^\d{4}-\d{2}-\d{2}' THEN end_date::DATE
    WHEN end_date ~ '^\d{2}/\d{2}/\d{4}' THEN TO_DATE(end_date, 'MM/DD/YYYY')
    WHEN end_date ~ '^\d{1,2}/\d{1,2}/\d{4}' THEN TO_DATE(end_date, 'M/D/YYYY')
    ELSE NULL
  END
WHERE start_date IS NOT NULL OR end_date IS NOT NULL;

-- Step 3: Drop old TEXT columns
ALTER TABLE trips
DROP COLUMN start_date,
DROP COLUMN end_date;

-- Step 4: Rename new columns to original names
ALTER TABLE trips
RENAME COLUMN start_date_new TO start_date;
ALTER TABLE trips
RENAME COLUMN end_date_new TO end_date;

-- Step 5: Add NOT NULL constraints (dates are required)
ALTER TABLE trips
ALTER COLUMN start_date SET NOT NULL;

-- end_date can be NULL for ongoing trips
-- ALTER TABLE trips
-- ALTER COLUMN end_date SET NOT NULL;

-- Step 6: Add check constraint to ensure end_date >= start_date
ALTER TABLE trips
ADD CONSTRAINT check_trip_dates CHECK (
  end_date IS NULL OR end_date >= start_date
);

-- Step 7: Create index for date-based queries (performance optimization)
CREATE INDEX IF NOT EXISTS idx_trips_start_date ON trips(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_trips_date_range ON trips(start_date, end_date);

-- Add helpful comment
COMMENT ON COLUMN trips.start_date IS 'Trip start date (required, must be <= end_date)';
COMMENT ON COLUMN trips.end_date IS 'Trip end date (optional, must be >= start_date)';

-- Function to get current trips (ongoing)
CREATE OR REPLACE FUNCTION get_current_trips(user_id_param TEXT)
RETURNS TABLE (
  id TEXT,
  title TEXT,
  destination TEXT,
  start_date DATE,
  end_date DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.title,
    t.destination,
    t.start_date,
    t.end_date
  FROM trips t
  WHERE
    t.user_id = user_id_param
    AND t.start_date <= CURRENT_DATE
    AND (t.end_date IS NULL OR t.end_date >= CURRENT_DATE)
  ORDER BY t.start_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get upcoming trips (future)
CREATE OR REPLACE FUNCTION get_upcoming_trips(user_id_param TEXT, days_ahead INT DEFAULT 90)
RETURNS TABLE (
  id TEXT,
  title TEXT,
  destination TEXT,
  start_date DATE,
  end_date DATE,
  days_until_trip INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.title,
    t.destination,
    t.start_date,
    t.end_date,
    (t.start_date - CURRENT_DATE)::INT as days_until_trip
  FROM trips t
  WHERE
    t.user_id = user_id_param
    AND t.start_date > CURRENT_DATE
    AND t.start_date <= CURRENT_DATE + days_ahead
  ORDER BY t.start_date ASC;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_current_trips IS 'Returns trips that are currently ongoing';
COMMENT ON FUNCTION get_upcoming_trips IS 'Returns trips starting within the next N days (default 90)';
