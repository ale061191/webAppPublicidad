'use client';

import { useState, useEffect } from 'react';

const CONVEX_URL = 'https://peaceful-curlew-702.convex.cloud';

export function useTotems() {
  const [totems, setTotems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CONVEX_URL}/api/query:getTotems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => { setTotems(data || []); setLoading(false); })
      .catch(() => { setTotems([]); setLoading(false); });
  }, []);

  return { totems, loading };
}

export function useMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CONVEX_URL}/api/query:getMedia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => { setMedia(data || []); setLoading(false); })
      .catch(() => { setMedia([]); setLoading(false); });
  }, []);

  return { media, loading };
}

export function useDashboardStats() {
  const [stats, setStats] = useState({ totalTotems: 0, onlineTotems: 0, totalMedia: 0, activeMedia: 0, totalPlaylists: 0, uptime: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CONVEX_URL}/api/query:getDashboardStats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => { setStats(data || stats); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  return { stats, loading };
}