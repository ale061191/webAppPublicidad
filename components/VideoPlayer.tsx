'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Download, FileVideo, AlertCircle, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  name: string;
  className?: string;
}

export function VideoPlayer({ url, name, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const checkVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { method: 'HEAD' });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    checkVideo();
  }, [url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPaused(false);
        setHasEnded(false);
      }).catch(() => {
        setError('No se pudo reproducir');
      });
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const handleOpenFull = () => {
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'video.mp4';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-black w-full h-full">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center bg-black w-full h-full ${className}`}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        playsInline
        preload="meta"
        muted
        onPlay={() => {
          setIsPaused(false);
          setHasEnded(false);
        }}
        onPause={() => setIsPaused(true)}
        onEnded={() => {
          setIsPaused(true);
          setHasEnded(true);
        }}
        onClick={togglePlay}
      />

      {isPaused && !hasEnded && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute flex items-center justify-center rounded-full transition-all hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: '#75ff9e',
            width: 60,
            height: 60,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Play className="w-6 h-6 text-black ml-1" fill="black" />
        </button>
      )}

      {hasEnded && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-all cursor-pointer"
          style={{
            width: 60,
            height: 60,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Play className="w-6 h-6 text-black ml-1" fill="black" />
        </button>
      )}

      <div className="absolute bottom-2 right-2 flex gap-1 z-10">
        <button
          type="button"
          onClick={handleOpenFull}
          className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer"
          title="Pantalla completa"
        >
          <Maximize2 className="w-3 h-3 text-white" />
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer"
          title="Descargar"
        >
          <Download className="w-3 h-3 text-white" />
        </button>
      </div>

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="text-red-400 text-xs mb-2">{error}</p>
            <button
              type="button"
              onClick={handleOpenFull}
              className="px-3 py-1.5 rounded text-xs font-bold cursor-pointer"
              style={{ backgroundColor: '#75ff9e', color: '#000' }}
            >
              ABRIR EN NUEVA PESTAÑA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}