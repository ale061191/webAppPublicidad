'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Download, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  name: string;
  className?: string;
}

export function VideoPlayer({ url, name, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    setIsPaused(true);
    setHasEnded(false);
  }, [url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPaused(false);
        setHasEnded(false);
      }).catch(() => {});
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

  return (
    <div className={`relative flex flex-col items-center justify-center bg-black w-full h-full ${className}`}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
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
    </div>
  );
}