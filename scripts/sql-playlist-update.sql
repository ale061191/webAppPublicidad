-- Agregar columna de actualización de playlist a totems
ALTER TABLE totems ADD COLUMN IF NOT EXISTS playlist_updated_at TIMESTAMP WITH TIME ZONE;

SELECT '✅ Columna playlist_updated_at agregada a totems' AS resultado;