const { Client } = require('pg');

const client = new Client({
  host: 'db.rkedmrqvqzgetubjvrwy.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Ezequiel19932878+',
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  await client.connect();
  console.log('Connected! Creating tables...');

  const sql = `
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      business_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      logo_url TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TEXT DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      image TEXT,
      client_id INTEGER REFERENCES clients(id)
    );

    CREATE TABLE IF NOT EXISTS totems (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      serial TEXT NOT NULL,
      location TEXT NOT NULL,
      status TEXT DEFAULT 'offline',
      last_sync TEXT,
      latency TEXT DEFAULT '0ms',
      preview_url TEXT,
      client_id INTEGER REFERENCES clients(id)
    );

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
      tags TEXT[],
      is_active BOOLEAN DEFAULT false,
      client_id INTEGER REFERENCES clients(id),
      is_global BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS playlists (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      totem_id INTEGER REFERENCES totems(id),
      items INTEGER[],
      is_active BOOLEAN DEFAULT false,
      client_id INTEGER REFERENCES clients(id)
    );
  `;

  await client.query(sql);
  console.log('Tables created!');

  await client.query(`
    ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE totems ENABLE ROW LEVEL SECURITY;
    ALTER TABLE media ENABLE ROW LEVEL SECURITY;
    ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
  `);
  console.log('RLS enabled!');

  await client.query(`
    CREATE POLICY "allow_all_clients" ON clients FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "allow_all_users" ON users FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "allow_all_totems" ON totems FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "allow_all_media" ON media FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "allow_all_playlists" ON playlists FOR ALL USING (true) WITH CHECK (true);
  `);
  console.log('Policies created!');

  await client.query(`
    INSERT INTO users (name, email, role) VALUES ('Admin Root', 'admin@voltaje.plus', 'admin')
    ON CONFLICT (email) DO NOTHING
  `);
  console.log('Default user created!');

  await client.end();
  console.log('Done!');
}

setup().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});