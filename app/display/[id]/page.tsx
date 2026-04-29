'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useDB } from '@/lib/hooks';
import { Play, Pause, Monitor, Lock, Clock, RefreshCw, AlertCircle } from 'lucide-react';

type DisplayState = 'enter_code' | 'playing' | 'error';

export default function DisplayPage() {
  const params = useParams();
  const totemId = parseInt(params.id as string);
  
  const [displayState, setDisplayState] = useState<DisplayState>('enter_code');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedCode, setLoadedCode] = useState<string>('000000');
  
  const settingsDB = useDB('system_settings');
  
  useEffect(() => {
    console.log('[Display] settingsDB.loading:', settingsDB.loading);
    console.log('[Display] settingsDB.data:', settingsDB.data);
    
    if (settingsDB.data && settingsDB.data.length > 0) {
      const found = settingsDB.data.find((s: any) => s.key === 'display_code');
      console.log('[Display] Found code:', found?.value);
      if (found?.value) {
        setLoadedCode(found.value);
        return;
      }
    }
    
    const localCode = localStorage.getItem('voltaje_display_code');
    console.log('[Display] Local code:', localCode);
    if (localCode) {
      setLoadedCode(localCode);
    }
  }, [settingsDB.data, settingsDB.loading]);
  
  useEffect(() => {
    try {
      const doc = document as any;
      if (doc.screen?.orientation?.lock) {
        doc.screen.orientation.lock('portrait').catch(() => {});
      }
    } catch (e) {}
  }, []);
  
  useEffect(() => {
    const preventRotation = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener('orientationchange', preventRotation);
    window.addEventListener('orientationchange', preventRotation);
    return () => {
      document.removeEventListener('orientationchange', preventRotation);
      window.removeEventListener('orientationchange', preventRotation);
    };
  }, []);
  
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
  
  useEffect(() => {
    if (displayState === 'playing' && document.documentElement) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
    
    function enableImmersive() {
      if (typeof window !== 'undefined' && 'Android' in window) {
        try {
          (window as any).Android.enableImmersiveMode();
        } catch (e) {}
      }
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
    
    if (displayState === 'playing') {
      enableImmersive();
      const timer = setTimeout(enableImmersive, 100);
      return () => clearTimeout(timer);
    }
  }, [displayState]);
  
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Display] Input code:', code, 'Expected:', loadedCode);
    if (code === loadedCode) {
      setDisplayState('playing');
      setError('');
    } else {
      setError('Código incorrecto');
      setCode('');
    }
  };
  
  useEffect(() => {
    if (!isPlaying || playlist.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }, (currentItem?.duration_secs || 10) * 1000);
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, playlist.length, currentItem?.duration_secs]);

  if (displayState === 'enter_code') {
    return (
      <html lang="es">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="theme-color" content="#000000" />
          <meta name="screen-orientation" content="portrait" />
          <meta name="orientation" content="portrait" />
          <style>{`@media screen and (orientation: landscape) { html { transform: rotate(90deg); } }`}</style>
        </head>
        <body style={{ margin: 0, padding: 0, backgroundColor: '#000', overflow: 'hidden' }}>
          <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#000', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Monitor style={{ width: '5rem', height: '5rem', color: '#75ff9e', margin: '0 auto 1.5rem' }} />
                <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>VOLTAJE ADS</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginTop: '0.5rem' }}>Tótem #{totemId}</p>
              </div>
              
              <form onSubmit={handleCodeSubmit} style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(117,255,158,0.2)',
                borderRadius: '1rem',
                padding: '2rem'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Lock style={{ width: '2rem', height: '2rem', color: '#75ff9e', margin: '0 auto 0.5rem' }} />
                  <h2 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Ingresa el código de acceso</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Código de seguridad del sistema</p>
                </div>
                
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(117,255,158,0.3)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center',
                    letterSpacing: '0.5em',
                    outline: 'none'
                  }}
                  placeholder="------"
                  autoFocus
                />
                
                {error && (
                  <div style={{ color: '#ff6b6b', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={code.length !== 6}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: code.length === 6 ? '#75ff9e' : 'rgba(117,255,158,0.3)',
                    color: '#000',
                    fontWeight: 'bold',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: code.length === 6 ? 'pointer' : 'not-allowed',
                    opacity: code.length === 6 ? 1 : 0.5,
                    marginTop: '1rem',
                    fontSize: '1rem'
                  }}
                >
                  ACCEDER
                </button>
              </form>
              
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', marginTop: '2rem' }}>
                Sistema de publicidad voltaje
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }
  
  if (playlist.length === 0) {
    return (
      <html lang="es">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body style={{ margin: 0, padding: 0, backgroundColor: '#000', overflow: 'hidden' }}>
          <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#000', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <AlertCircle style={{ width: '4rem', height: '4rem', color: '#FFD93D', marginBottom: '1rem' }} />
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>Playlist vacía</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Este tótem no tiene contenido asignado</p>
          </div>
        </body>
      </html>
    );
  }
  
  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#000', 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0
      }}
    >
      <video
        key={currentMedia?.id}
        src={currentMedia?.url}
        autoPlay
        muted
        loop={false}
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#000'
        }}
        onEnded={() => setCurrentIndex((prev) => (prev + 1) % playlist.length)}
        onError={() => {
          setTimeout(() => setCurrentIndex((prev) => (prev + 1) % playlist.length), 3000);
        }}
      />
      
      <div style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        gap: 8,
        opacity: 0,
        transition: 'opacity 0.3s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            padding: 8,
            cursor: 'pointer'
          }}
        >
          {isPlaying ? (
            <Pause style={{ width: 20, height: 20, color: '#fff' }} />
          ) : (
            <Play style={{ width: 20, height: 20, color: '#fff' }} />
          )}
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            padding: 8,
            cursor: 'pointer'
          }}
        >
          <RefreshCw style={{ width: 20, height: 20, color: '#fff' }} />
        </button>
        <button
          onClick={() => setDisplayState('enter_code')}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            padding: 8,
            cursor: 'pointer'
          }}
        >
          <Lock style={{ width: 20, height: 20, color: '#fff' }} />
        </button>
      </div>
      
      <div style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
      >
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock style={{ width: 12, height: 12 }} />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
      >
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          borderRadius: '9999px', 
          padding: '0.5rem 0.75rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          {currentIndex + 1} / {playlist.length}
        </div>
      </div>
    </div>
  );
}