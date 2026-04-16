const https = require('https');
const http = require('http');

const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrZWRtcnF2cXpnZXR1Ymp2cnd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM2MzcyNSwiZXhwIjoyMDkxOTM5NzI1fQ.x0LEbafFkJAYqYTZbzAlX49NZCe2fFLE5YpGCBXFcP8';

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'https://rkedmrqvqzgetubjvrwy.supabase.co');
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      }
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });

    req.on('error', reject);

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function createTables() {
  console.log('Creating tables via SQL function...');

  // First, try to create tables using postgrest
  const tables = [
    { name: 'clients', data: { name: '__init__', business_name: '__init__', email: 'init@temp.com' } },
    { name: 'users', data: { name: 'Admin Init', email: 'init@temp.com', role: 'admin' } },
    { name: 'totems', data: { name: '__init__', serial: 'SN-001', location: 'init' } },
    { name: 'media', data: { name: '__init__', type: 'video', format: 'mp4', size: '0 MB', duration: '30S', resolution: '1920x1080' } },
    { name: 'playlists', data: { name: '__init__' } }
  ];

  for (const t of tables) {
    try {
      const res = await request('POST', `/rest/v1/${t.name}`, t.data);
      console.log(`${t.name}: status ${res.status}`);
    } catch (e) {
      console.log(`${t.name}: error ${e.message}`);
    }
  }
}

createTables().catch(console.error);