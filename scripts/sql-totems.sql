-- Agregar columnas faltantes a totems si no existen
ALTER TABLE totems ADD COLUMN IF NOT EXISTS latency TEXT DEFAULT '0ms';
ALTER TABLE totems ADD COLUMN IF NOT EXISTS lastSync TEXT;
ALTER TABLE totems ADD COLUMN IF NOT EXISTS last_heartbeat TIMESTAMP WITH TIME ZONE;
ALTER TABLE totems ADD COLUMN IF NOT EXISTS is_display_connected BOOLEAN DEFAULT false;

-- Resultado
SELECT '✅ Columnas agregadas a totems: latency, lastSync, last_heartbeat, is_display_connected' AS resultado;