'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useDB } from '@/lib/hooks';
import { Play, Pause, X, Monitor, Lock, Unlock, Clock, RefreshCw, AlertCircle } from 'lucide-react';

type DisplayState = 'enter_code' | 'playing' | 'error';

export default function DisplayPage() {
  const params = useParams();
  const totemId = parseInt(params.id as string);
  
  const [displayState, setDisplayState] = useState<DisplayState>('enter_code');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  
  const settingsDB = useDB('system_settings');
  const displayCode = useMemo(() => {
    if (settingsDB.data) {
      const found = settingsDB.data.find((s: any) => s.key === 'display_code');
      if (found?.value) return found.value;
    }
    return localStorage.getItem('voltaje_display_code') || '000000';
  }, [settingsDB.data]);
  
  const playlistDB = useDB('playlist_items');
  
  const playlist = useMemo(() => {
    if (!playlistDB.data) return [];
    return playlistDB.data
      .filter((item: any) => item.totem_id === totemId && item.is_active)
      .sort((a: any, b: any) => a.position - b.position);
  }, [playlistDB.data, totemId]);
  
  const mediaDB = useDB('media');
  
  const currentItem = playlist[currentIndex];
  const currentMedia = useMemo(() => {
    if (!currentItem || !mediaDB.data) return null;
    return mediaDB.data.find((m: any) => m.id === currentItem.media_id);
  }, [currentItem, mediaDB.data]);
  
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === displayCode) {
      setDisplayState('playing');
      setError('');
    } else {
      setError('Código incorrecto');
      setCode('');
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (!isPlaying || playlist.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }, (currentItem?.duration_secs || 10) * 1000);
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, playlist.length, currentItem?.duration_secs]);
  
  if (displayState === 'enter_code') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <Monitor className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white font-headline mb-2">VOLTAJE ADS</h1>
            <p className="text-white/50 font-label text-lg">Tótem #{totemId}</p>
          </div>
          
          <form onSubmit={handleCodeSubmit} className="glass-panel rounded-2xl p-8 border border-primary/20">
            <div className="text-center mb-6">
              <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h2 className="text-xl font-bold text-white font-headline">Ingresa el código de acceso</h2>
              <p className="text-white/50 text-sm mt-1">Código de seguridad del sistema</p>
            </div>
            
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full bg-black/30 border border-primary/30 rounded-xl py-4 px-6 text-center text-3xl font-bold text-white tracking-[0.5em] mb-4 focus:outline-none focus:border-primary"
              placeholder="------"
              autoFocus
            />
            
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={code.length !== 6}
              className="w-full py-4 bg-primary text-black font-bold font-label text-lg uppercase tracking-wider rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all"
            >
              <Unlock className="w-5 h-5 inline mr-2" />
              Acceder
            </button>
          </form>
          
          <p className="text-center text-white/20 text-xs mt-8">
            Sistema de publicidad voltaje
          </p>
        </div>
      </div>
    );
  }
  
  if (playlist.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-white"> Playlist vacía</h2>
        <p className="text-white/50 mt-2"> Este tótem no tiene contenido asignado</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
          <Monitor className="w-4 h-4 text-primary" />
          <span className="text-white/70 text-sm font-label">TÓTEM #{totemId}</span>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="glass-panel p-2 rounded-full hover:bg-white/10"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => window.location.reload()}
          className="glass-panel p-2 rounded-full hover:bg-white/10"
        >
          <RefreshCw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setDisplayState('enter_code')}
          className="glass-panel p-2 rounded-full hover:bg-white/10"
        >
          <Lock className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 z-50 flex items-center gap-4">
        <div className="flex items-center gap-2 text-white/30 text-xs">
          <Clock className="w-3 h-3" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {currentMedia ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {currentMedia.type === 'video' ? (
              <video
                key={currentMedia.id}
                src={currentMedia.url}
                autoPlay
                muted
                loop={false}
                className="max-w-full max-h-full object-contain"
                onEnded={() => setCurrentIndex((prev) => (prev + 1) % playlist.length)}
                onError={() => {
                  setTimeout(() => setCurrentIndex((prev) => (prev + 1) % playlist.length), 3000);
                }}
              />
            ) : (
              <img
                key={currentMedia.id}
                src={currentMedia.url}
                alt={currentMedia.name}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        ) : (
          <div className="text-white/50">Cargando...</div>
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 z-50 flex items-center gap-2">
        <div className="glass-panel px-3 py-1 rounded-full">
          <span className="text-white/50 text-xs font-label">
            {currentIndex + 1} / {playlist.length}
          </span>
        </div>
      </div>
    </div>
  );
}