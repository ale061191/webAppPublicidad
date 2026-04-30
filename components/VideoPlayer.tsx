'use client';

import { useRef, useState, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  name?: string;
  className?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ url, className = '', autoPlay = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stalled, setStalled] = useState<boolean>(false);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    setStalled(false);
    setHttpStatus(null);
  }, [url]);

  useEffect(() => {
    if (!autoPlay && videoRef.current) {
      if (isHovered) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            // Ignore AbortError caused by rapid mouse enter/leave
            if (err.name !== 'AbortError') {
              console.warn('Play error:', err);
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, autoPlay]);

  const checkNetworkIssue = async () => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      setHttpStatus(response.status);
      if (!response.ok) {
        setError(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(`Network Fetch Failed: ${err.message}`);
    }
  };

  return (
    <div 
      className={`relative w-full h-full bg-black flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 bg-black/60 pointer-events-none">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-primary text-[10px] font-mono tracking-widest uppercase">
            {stalled ? 'Conexión Lenta...' : 'Cargando...'}
          </span>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-20 bg-black/90">
          <svg className="w-8 h-8 text-error mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-error font-bold text-[10px] uppercase mb-1">Error de Reproducción</span>
          <span className="text-error/80 text-[9px] font-mono break-all line-clamp-3">{error}</span>
          {httpStatus === 400 || httpStatus === 403 || httpStatus === 429 ? (
             <span className="text-warning text-[9px] mt-2">Límite de Supabase alcanzado.</span>
          ) : null}
        </div>
      )}
      
      <video
        ref={videoRef}
        src={url}
        className={`w-full h-full object-contain ${error ? 'hidden' : ''} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        playsInline
        muted
        loop
        autoPlay={autoPlay}
        preload={autoPlay ? "metadata" : "none"}
        controls={false}
        onLoadedData={() => { setLoading(false); setStalled(false); }}
        onWaiting={() => setLoading(true)}
        onPlaying={() => { setLoading(false); setStalled(false); }}
        onStalled={() => {
          console.warn('[VideoPlayer] Stalled:', url);
          setStalled(true);
          setLoading(true);
        }}
        onError={(e) => {
          setLoading(false);
          const target = e.target as HTMLVideoElement;
          const errorCode = target.error?.code;
          const errorMessage = target.error?.message || 'Error desconocido';
          let errorType = '';
          
          switch(errorCode) {
            case 1: errorType = 'ABORTED'; break;
            case 2: errorType = 'NETWORK'; checkNetworkIssue(); break;
            case 3: errorType = 'DECODE (Formato inválido)'; break;
            case 4: errorType = 'SRC_NOT_SUPPORTED'; checkNetworkIssue(); break;
            default: errorType = 'UNKNOWN';
          }
          
          console.error(`[VideoPlayer] Error (${errorType}):`, errorMessage, url);
          if (errorCode !== 2 && errorCode !== 4) {
            setError(`${errorType}: ${errorMessage}`);
          } else {
             setError(`Analizando conexión...`);
          }
        }}
      />
    </div>
  );
}