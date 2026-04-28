'use client';

import { useState, useEffect, useRef } from 'react';
import { useDB } from '@/lib/hooks';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Monitor, X, ChevronLeft, List, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Player() {
  const totemsDB = useDB('totems');
  const clientsDB = useDB('clients');
  const mediaDB = useDB('media');
  const playlistDB = useDB('playlist_items');
  
  const [selectedTotemId, setSelectedTotemId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showTotemSelector, setShowTotemSelector] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playlistItems = playlistDB.data
    .filter((p: any) => p.totem_id === selectedTotemId && p.is_active)
    .sort((a: any, b: any) => a.position - b.position);

  const playlistWithMedia = playlistItems.map((item: any) => {
    const media = mediaDB.data.find((m: any) => m.id === item.media_id);
    const client = clientsDB.data.find((c: any) => c.id === item.client_id);
    return {
      ...item,
      media,
      client,
    };
  }).filter((item: any) => item.media);

  useEffect(() => {
    if (playlistWithMedia.length > 0 && videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex, playlistWithMedia]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isPlaying && playlistWithMedia.length > 0) {
      const currentItem = playlistWithMedia[currentIndex];
      const duration = (currentItem?.duration_secs || 10) * 1000;

      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % playlistWithMedia.length);
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex, playlistWithMedia]);

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    } else if (isPlaying && videoRef.current && playlistWithMedia[currentIndex]?.media?.type !== 'image') {
      videoRef.current.play().catch(() => {});
    }
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlistWithMedia.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlistWithMedia.length) % playlistWithMedia.length);
  };

  const currentItem = playlistWithMedia[currentIndex];
  const currentMedia = currentItem?.media;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/90 to-transparent">
        <Link href="/totems" className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        
        <button 
          onClick={() => setShowTotemSelector(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          <Monitor className="w-5 h-5 text-primary" />
          <span className="text-white text-sm font-bold">
            {totemsDB.data.find((t: any) => t.id === selectedTotemId)?.name || 'Seleccionar Tótem'}
          </span>
          <List className="w-4 h-4 text-white/60" />
        </button>
        
        <button onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <Maximize2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content - 9:16 Vertical Format */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {currentMedia ? (
            <>
              {currentMedia.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  playsInline
                  onEnded={handleNext}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.name}
                  className="w-full h-full object-cover"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-6">
                <Monitor className="w-16 h-16 mx-auto text-primary/30 mb-4" />
                <p className="text-white/50 text-lg font-bold mb-2">No hay playlist configurada</p>
                <p className="text-white/30 text-sm mb-4">Selecciona un tótem para ver su playlist</p>
                <Link href="/totems" className="inline-block px-4 py-2 bg-primary text-black font-bold rounded-lg">
                  Ir a Tótems
                </Link>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

          {/* Media Info */}
          {currentMedia && (
            <div className="absolute bottom-24 left-0 right-0 p-4">
              <p className="text-white font-bold text-lg truncate">{currentMedia.name}</p>
              <div className="flex items-center gap-2 mt-1">
                {currentItem?.client && (
                  <span className="flex items-center gap-1 text-white/60 text-xs">
                    <Building2 className="w-3 h-3" />
                    {currentItem.client.business_name || currentItem.client.name}
                  </span>
                )}
                <span className="text-white/40 text-xs">•</span>
                <span className="text-white/40 text-xs">{currentItem?.duration_secs || 10}s</span>
              </div>
            </div>
          )}

          {/* Client Badge */}
          {currentItem?.client && (
            <div className="absolute top-20 left-4 px-3 py-1 bg-primary/90 rounded-full">
              <span className="text-black text-xs font-bold uppercase">{currentItem.client.business_name || currentItem.client.name}</span>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="absolute top-4 left-4 right-4">
            <div className="flex gap-1">
              {playlistWithMedia.map((_: any, idx: number) => (
                <div 
                  key={idx}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-primary' : idx < currentIndex ? 'bg-primary/50' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
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

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${playlistWithMedia.length > 0 ? ((currentIndex + 1) / playlistWithMedia.length) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-white/40 text-[10px] mt-1">
            <span>{currentIndex + 1} / {playlistWithMedia.length}</span>
            <span>{currentItem?.duration_secs || 10}s por item</span>
          </div>
        </div>
      </div>

      {/* Totem Selector Modal */}
      {showTotemSelector && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] p-4">
          <div className="glass-panel w-full max-w-md rounded-xl p-6 relative z-[71]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Seleccionar Tótem</h3>
              <button onClick={() => setShowTotemSelector(false)} className="p-2 hover:bg-surface-container-high rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {totemsDB.data.length === 0 ? (
                <p className="text-sm text-on-surface-variant">No hay tótems disponibles</p>
              ) : (
                totemsDB.data.map((totem: any) => {
                  const itemCount = playlistDB.data.filter((p: any) => p.totem_id === totem.id && p.is_active).length;
                  return (
                    <button
                      key={totem.id}
                      type="button"
                      onClick={() => {
                        setSelectedTotemId(totem.id);
                        setCurrentIndex(0);
                        setShowTotemSelector(false);
                      }}
                      className={`w-full p-4 rounded text-left flex items-center gap-3 cursor-pointer transition-all ${
                        selectedTotemId === totem.id 
                          ? 'bg-primary text-black' 
                          : 'bg-surface-container-low hover:bg-surface-container-high'
                      }`}
                    >
                      <Monitor className={`w-6 h-6 ${selectedTotemId === totem.id ? 'text-black' : 'text-primary'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${selectedTotemId === totem.id ? 'text-black' : ''}`}>{totem.name}</p>
                        <p className={`text-xs ${selectedTotemId === totem.id ? 'text-black/60' : 'text-on-surface-variant'}`}>
                          {itemCount} items en playlist
                        </p>
                      </div>
                      {selectedTotemId === totem.id && (
                        <div className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}