import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function markStaleDisconnected() {
  await supabase
    .from('totems')
    .update({ is_display_connected: false })
    .or('last_heartbeat.lt.now()-20 seconds,last_heartbeat.is.null');
}

export async function GET() {
  try {
    await markStaleDisconnected();
    
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

    console.log('[Heartbeat POST] totemId:', totemId, 'timestamp:', timestamp);

    const { error } = await supabase
      .from('totems')
      .update({
        last_heartbeat: timestamp || new Date().toISOString(),
        is_display_connected: true
      })
      .eq('id', totemId);

    if (error) {
      console.error('[Heartbeat] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[Heartbeat] Success for totem:', totemId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Heartbeat API error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}