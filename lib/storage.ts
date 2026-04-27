'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, bucket: string = 'media', folder: string = '') => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      console.log(`[Storage] Uploading to bucket "${bucket}", path: ${filePath}`);

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('[Storage] Upload error:', uploadError);
        throw uploadError;
      }

      console.log('[Storage] Upload successful, data:', data);

      setProgress(100);

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('[Storage] Public URL:', urlData.publicUrl);

      setUploading(false);
      return { path: filePath, url: urlData.publicUrl };
    } catch (err: any) {
      console.error('[Storage] Caught error:', err);
      setError(err.message || 'Error uploading file');
      setUploading(false);
      return null;
    }
  };

  const deleteFile = async (path: string, bucket: string = 'media') => {
    try {
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (deleteError) throw deleteError;
      return true;
    } catch (err: any) {
      setError(err.message || 'Error deleting file');
      return false;
    }
  };

  const getPublicUrl = (path: string, bucket: string = 'media') => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  return { uploadFile, deleteFile, getPublicUrl, uploading, progress, error };
}

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/settings`,
    });

    if (error) throw error;
  };

  return { user, session, loading, signIn, signUp, signOut, resetPassword };
}