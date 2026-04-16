const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rkedmrqvqzgetubjvrwy.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZWRtcnF2cXpnZXR1Ymp2cnd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM2MzcyNSwiZXhwIjoyMDkxOTM5NzI1fQ.x0LEbafFkJAYqYTZbzAlX49NZCe2fFLE5YpGCBXFcP8';

const supabase = createClient(supabaseUrl, serviceKey);

async function createTables() {
  const tables = ['clients', 'users', 'totems', 'media', 'playlists'];

  for (const table of tables) {
    try {
      // Try to insert a dummy record - if table doesn't exist, this will fail
      const { error } = await supabase.from(table).insert({ name: 'init' }).select();
      if (error && error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log(`Table ${table} does not exist, creating...`);
      } else if (error) {
        console.log(`${table}:`, error.message);
      } else {
        console.log(`${table}: OK`);
      }
    } catch (e) {
      console.log(`Error with ${table}:`, e.message);
    }
  }
}

createTables();