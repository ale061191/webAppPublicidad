'use client';

import { useState, useEffect, useRef } from 'react';
import { useDB } from '@/lib/hooks';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Monitor, X } from 'lucide-react';
import Link from 'next/link';

export default function Player() {
  const mediaDB = useDB('media');
  const playlistsDB = useDB('playlists');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeMedia = mediaDB.data.filter((m: any) => m.is_active && m.type === 'video');
  
  const currentMedia = activeMedia[currentIndex] || mediaDB.data[0];

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    } else if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    if (!currentMedia) return;
    
    const interval = setInterval(() => {
      if (isPlaying && activeMedia.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % activeMedia.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, currentMedia, activeMedia.length]);

  const handleNext = () => {
    if (activeMedia.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % activeMedia.length);
    }
  };

  const handlePrev = () => {
    if (activeMedia.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + activeMedia.length) % activeMedia.length);
    }
  };

  const formatDuration = (duration: string) => {
    return duration || '30S';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <X className="w-6 h-6 text-white" />
        </Link>
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          <span className="text-white text-sm font-bold">VOLTAJE PLAYER</span>
        </div>
        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <Maximize2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content - 9:16 Vertical Format */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {currentMedia ? (
            currentMedia.type === 'video' || currentMedia.url?.includes('.mp4') ? (
              <video
                ref={videoRef}
                src={currentMedia.url}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
            ) : (
              <img
                src={currentMedia.url || currentMedia.thumbnailUrl}
                alt={currentMedia.name}
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-16 h-16 mx-auto text-primary/30 mb-4" />
                <p className="text-white/50 text-sm">No hay contenido activo</p>
                <p className="text-white/30 text-xs mt-2">Activa contenido en /media</p>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

          {/* Media Info */}
          <div className="absolute bottom-20 left-0 right-0 p-4">
            <p className="text-white font-bold text-lg truncate">{currentMedia?.name}</p>
            <p className="text-white/60 text-xs">{currentMedia?.duration} | {currentMedia?.resolution}</p>
          </div>

          {/* Client Badge */}
          <div className="absolute top-20 left-4 px-3 py-1 bg-primary/90 rounded-full">
            <span className="text-black text-xs font-bold">PUBLICIDAD</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div 
        className={`fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => setShowControls(true)}
      >
        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={handlePrev}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20"
          >
            <SkipBack className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 bg-primary rounded-full hover:brightness-110"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black" />
            ) : (
              <Play className="w-8 h-8 text-black" />
            )}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20"
          >
            <SkipForward className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/60" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/60" />
            )}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-2">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${((currentIndex + 1) / Math.max(activeMedia.length, 1)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-white/40 text-[10px] mt-1">
            <span>{currentIndex + 1} / {activeMedia.length}</span>
            <span>{formatDuration(currentMedia?.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}