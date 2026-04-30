import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const [
      { data: clients, error: clientsError },
      { data: media, error: mediaError },
      { data: totems, error: totemsError },
      { data: playlistItems, error: playlistError },
    ] = await Promise.all([
      supabase.from('clients').select('id'),
      supabase.from('media').select('id, is_active'),
      supabase.from('totems').select('id, is_display_connected, last_heartbeat'),
      supabase.from('playlist_items').select('id, is_active'),
    ]);

    console.log('[Dashboard API] Totems raw data:', JSON.stringify(totems));
    console.log('[Dashboard API] Totems error:', totemsError);

    if (clientsError || mediaError || totemsError || playlistError) {
      console.error('[Dashboard API] Database errors:', { clientsError, mediaError, totemsError, playlistError });
      throw new Error('Database query failed');
    }

    const now = new Date();
    const connectedTotems = totems?.filter((t: any) => {
      if (t.is_display_connected === true) return true;
      if (t.last_heartbeat) {
        const lastHeartbeat = new Date(t.last_heartbeat);
        const secondsSince = (now.getTime() - lastHeartbeat.getTime()) / 1000;
        return secondsSince < 30;
      }
      return false;
    }) || [];

    const stats = {
      totalClients: clients?.length || 0,
      totalMedia: media?.length || 0,
      activeMedia: media?.filter((m: any) => m.is_active).length || 0,
      totalTotems: totems?.length || 0,
      connectedTotems: connectedTotems.length || 0,
      disconnectedTotems: (totems?.length || 0) - connectedTotems.length || 0,
      totalPlaylistItems: playlistItems?.length || 0,
      activePlaylistItems: playlistItems?.filter((p: any) => p.is_active).length || 0,
    };

    console.log('[Dashboard API] Final stats:', stats);
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('[Dashboard API] Error:', error);
    return NextResponse.json(
      {
        totalClients: 0,
        totalMedia: 0,
        activeMedia: 0,
        totalTotems: 0,
        connectedTotems: 0,
        disconnectedTotems: 0,
        totalPlaylistItems: 0,
        activePlaylistItems: 0,
      },
      { status: 500 }
    );
  }
}