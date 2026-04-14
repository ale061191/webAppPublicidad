import { NextRequest, NextResponse } from 'next/server';

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://peaceful-curlew-702.convex.cloud';

export async function GET() {
  try {
    const response = await fetch(`${CONVEX_URL}/api/getDashboardStats`, {
      headers: {
        'Authorization': 'Bearer ' + process.env.CONVEX_DEPLOY_KEY,
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ 
      totalTotems: 0, 
      onlineTotems: 0, 
      totalMedia: 0, 
      activeMedia: 0,
      totalPlaylists: 0, 
      uptime: 0 
    }, { status: 200 });
  }
}