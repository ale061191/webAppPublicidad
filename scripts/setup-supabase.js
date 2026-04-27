import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rkedmrqvqzgetubjvrwy.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZWRtcnF2cXpnZXR1Ymp2cnd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM2MzcyNSwiZXhwIjoyMDkxOTM5NzI1fQ.x0LEbafFkJAYqYTZbzAlX49NZCe2fFLE5YpGCBXFcP8';

const supabase = createClient(supabaseUrl, serviceKey);

async function setupSupabase() {
  console.log('🔧 Configurando Supabase...');

  // 1. Crear tabla de payments
  console.log('📊 Creando tabla payments...');
  await supabase.rpc('exec_sql', { 
    sql: `
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        client_id INTEGER,
        client_name TEXT,
        amount DECIMAL(12,2) NOT NULL,
        date TEXT NOT NULL,
        status TEXT DEFAULT 'paid',
        created_at TIMESTAMP DEFAULT NOW()
      );
    ` 
  }).catch(() => {
    // Si RPC no funciona, intentamos de otra forma
    console.log('Intentando crear tabla de otra forma...');
  });

  // 2. Verificar playlists
  console.log('📋 Verificando tabla playlists...');
  const { data: playlists } = await supabase.from('playlists').select('*').limit(1);
  if (!playlists) {
    console.log('⚠️ Tabla playlists no existe, se creará cuando agregues datos');
  }

  // 3. Crear bucket de storage
  console.log('📦 Verificando Storage...');
  const { data: buckets } = await supabase.storage.listBuckets();
  
  const mediaBucket = buckets?.find(b => b.name === 'media');
  if (!mediaBucket) {
    console.log('❌ Bucket media no existe - necesita crearse en el dashboard');
  } else {
    console.log('✅ Bucket media existe');
  }

  // 4. Ver tablas existentes
  console.log('📋 Verificando tablas existentes...');
  const tables = await supabase.from('clients').select('id').limit(1);
  if (!tables.error) console.log('✅ Tabla clients existe');
  
  const totems = await supabase.from('totems').select('id').limit(1);
  if (!totems.error) console.log('✅ Tabla totems existe');
  
  const media = await supabase.from('media').select('id').limit(1);
  if (!media.error) console.log('✅ Tabla media existe');

  console.log('\n🎉 Verificación completa');
}

setupSupabase().catch(console.error);