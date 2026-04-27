-- Agregar client_id a totems si no existe
ALTER TABLE totems ADD COLUMN IF NOT EXISTS client_id INTEGER;

-- Agregar client_id a media si no existe  
ALTER TABLE media ADD COLUMN IF NOT EXISTS client_id INTEGER;

-- Crear tabla de playlists (vincula clientes con totems y media)
CREATE TABLE IF NOT EXISTS playlists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  client_id INTEGER NOT NULL,
  totem_id INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agregar playlist_id a media si no existe
ALTER TABLE media ADD COLUMN IF NOT EXISTS playlist_id INTEGER;

-- Habilitar RLS
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all playlists" ON playlists;
CREATE POLICY "Allow all playlists" ON playlists FOR ALL USING (true) WITH CHECK (true);

-- Resultado
SELECT '✅ Flujo configurado: Clients → Totems → Media → Playlists' AS resultado;