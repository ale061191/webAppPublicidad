import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function markStaleDisconnected() {
  const now = new Date();
  const twentySecondsAgo = new Date(now.getTime() - 20000);
  
  const { data: staleTotems } = await supabase
    .from('totems')
    .select('id')
    .or('last_heartbeat.lt.' + twentySecondsAgo.toISOString() + ',last_heartbeat.is.null')
    .eq('is_display_connected', true);
  
  if (staleTotems && staleTotems.length > 0) {
    const staleIds = staleTotems.map(t => t.id);
    await supabase
      .from('totems')
      .update({ is_display_connected: false })
      .in('id', staleIds);
  }
}

export async function GET() {
  try {
    const { data: totems } = await supabase
      .from('totems')
      .select('id, name, is_display_connected, last_heartbeat');
    
    return NextResponse.json({ totems: totems || [] });
  } catch (error) {
    console.error('[Heartbeat GET error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { totemId, timestamp } = body;

    if (!totemId) {
      return NextResponse.json({ error: 'totemId requerido' }, { status: 400 });
    }

    const { error } = await supabase
      .from('totems')
      .update({
        last_heartbeat: timestamp || new Date().toISOString(),
        is_display_connected: true
      })
      .eq('id', totemId);

    if (error) {
      console.error('[Heartbeat POST] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[Heartbeat POST] Success for totem:', totemId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Heartbeat POST error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}