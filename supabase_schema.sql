-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TEXT DEFAULT NOW()
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  image TEXT,
  client_id INTEGER REFERENCES clients(id)
);

-- Tabla de totems
CREATE TABLE IF NOT EXISTS totems (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  serial TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'offline',
  last_sync TEXT,
  latency TEXT DEFAULT '0ms',
  preview_url TEXT,
  client_id INTEGER REFERENCES clients(id)
);

-- Tabla de media
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'video',
  format TEXT DEFAULT 'mp4',
  size TEXT DEFAULT '0 MB',
  duration TEXT DEFAULT '30S',
  resolution TEXT DEFAULT '1920x1080',
  thumbnail_url TEXT,
  url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  client_id INTEGER REFERENCES clients(id),
  is_global BOOLEAN DEFAULT false
);

-- Tabla de playlists
CREATE TABLE IF NOT EXISTS playlists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  totem_id INTEGER REFERENCES totems(id),
  items INTEGER[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  client_id INTEGER REFERENCES clients(id)
);

-- Habilitar RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE totems ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para desarrollo
CREATE POLICY "Allow all" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON totems FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON media FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON playlists FOR ALL USING (true) WITH CHECK (true);

-- Insertar usuario inicial
INSERT INTO users (name, email, role) VALUES ('Admin Root', 'admin@voltaje.plus', 'admin') ON CONFLICT (email) DO NOTHING;