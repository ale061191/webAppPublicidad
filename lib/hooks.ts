'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

export function useDB(table: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: result } = await supabase.from(table).select('*');
    setData(result || []);
    setLoading(false);
  }, [table]);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (item: any) => {
    const { data: result } = await supabase.from(table).insert(item).select();
    await fetch();
    return result?.[0];
  };

  const update = async (id: number, item: any) => {
    const { data: result } = await supabase.from(table).update(item).eq('id', id).select();
    await fetch();
    return result?.[0];
  };

  const remove = async (id: number) => {
    await supabase.from(table).delete().eq('id', id);
    await fetch();
  };

  return { data, loading, create, update, remove, refresh: fetch };
}

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.from('users').select('*').limit(1).single();
      setUser(data);
      if (data) {
        localStorage.setItem('voltaje_profile', JSON.stringify({ displayName: data.name, email: data.email }));
        window.dispatchEvent(new Event('profile-updated'));
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const updateUser = async (updates: any) => {
    if (!user) return;
    const { data } = await supabase.from('users').update(updates).eq('id', user.id).select();
    if (data?.[0]) {
      setUser(data[0]);
      localStorage.setItem('voltaje_profile', JSON.stringify({ displayName: data[0].name, email: data[0].email }));
      window.dispatchEvent(new Event('profile-updated'));
    }
    return data?.[0];
  };

  return { user, loading, updateUser };
}