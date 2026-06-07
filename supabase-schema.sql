-- ============================================================
-- Obelisk Hunt — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Visits table (obelisk data is stored locally in the app)
CREATE TABLE IF NOT EXISTS visits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  obelisk_id  TEXT        NOT NULL,
  visitor_name TEXT,
  photo_url   TEXT,
  note        TEXT,
  visited_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS visits_obelisk_id_idx ON visits (obelisk_id);
CREATE INDEX IF NOT EXISTS visits_visited_at_idx ON visits (visited_at DESC);

-- Open access (no auth — trust your friends!)
ALTER TABLE visits DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- Storage bucket
-- ============================================================
-- In the Supabase dashboard:
--   Storage → New bucket → Name: "obelisk-photos" → Public: ON
--
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('obelisk-photos', 'obelisk-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload and read photos
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'obelisk-photos');

CREATE POLICY "Public upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'obelisk-photos');
