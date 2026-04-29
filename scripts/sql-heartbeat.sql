-- Agregar columna para tracking de heartbeat si no existe
ALTER TABLE totems ADD COLUMN IF NOT EXISTS last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Agregar columna para estado de conexión
ALTER TABLE totems ADD COLUMN IF NOT EXISTS is_display_connected BOOLEAN DEFAULT false;

-- Resultado
SELECT '✅ Heartbeat columns added to totems' AS resultado;