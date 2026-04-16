import { supabase } from './supabase';

export const db = {
  clients: {
    getAll: async () => {
      const { data } = await supabase.from('clients').select('*');
      return data || [];
    },
    create: async (client: any) => {
      const { data, error } = await supabase.from('clients').insert(client).select();
      if (error) throw error;
      return data[0];
    },
    update: async (id: number, client: any) => {
      const { data, error } = await supabase.from('clients').update(client).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    delete: async (id: number) => {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
    },
  },

  users: {
    getAll: async () => {
      const { data } = await supabase.from('users').select('*');
      return data || [];
    },
    getCurrent: async () => {
      const { data } = await supabase.from('users').select('*').limit(1).single();
      return data;
    },
    update: async (id: number, user: any) => {
      const { data, error } = await supabase.from('users').update(user).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
  },

  totems: {
    getAll: async () => {
      const { data } = await supabase.from('totems').select('*');
      return data || [];
    },
    create: async (totem: any) => {
      const { data, error } = await supabase.from('totems').insert(totem).select();
      if (error) throw error;
      return data[0];
    },
    update: async (id: number, totem: any) => {
      const { data, error } = await supabase.from('totems').update(totem).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    delete: async (id: number) => {
      const { error } = await supabase.from('totems').delete().eq('id', id);
      if (error) throw error;
    },
  },

  media: {
    getAll: async () => {
      const { data } = await supabase.from('media').select('*');
      return data || [];
    },
    create: async (media: any) => {
      const { data, error } = await supabase.from('media').insert(media).select();
      if (error) throw error;
      return data[0];
    },
    update: async (id: number, media: any) => {
      const { data, error } = await supabase.from('media').update(media).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    delete: async (id: number) => {
      const { error } = await supabase.from('media').delete().eq('id', id);
      if (error) throw error;
    },
  },

  playlists: {
    getAll: async () => {
      const { data } = await supabase.from('playlists').select('*');
      return data || [];
    },
  },
};