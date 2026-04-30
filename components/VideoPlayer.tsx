'use client';

import { useRef, useState } from 'react';

interface VideoPlayerProps {
  url: string;
  name?: string;
  className?: string;
}

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className={`relative w-full h-full bg-black flex items-center justify-center overflow-hidden ${className}`}>
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 bg-black/80">
          <svg className="w-8 h-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-400 text-xs font-mono break-all">{error}</span>
        </div>
      )}
      <video
        ref={videoRef}
        src={url}
        className={`w-full h-full object-contain ${error ? 'hidden' : ''}`}
        playsInline
        muted
        loop
        autoPlay
        controls={false}
        onError={(e) => {
          const target = e.target as HTMLVideoElement;
          const errorCode = target.error?.code;
          const errorMessage = target.error?.message || 'Error desconocido';
          let errorType = '';
          
          switch(errorCode) {
            case 1: errorType = 'ABORTED'; break;
            case 2: errorType = 'NETWORK'; break;
            case 3: errorType = 'DECODE (Formato no soportado)'; break;
            case 4: errorType = 'SRC_NOT_SUPPORTED'; break;
            default: errorType = 'UNKNOWN';
          }
          
          console.error(`Error de video (${errorType}):`, errorMessage, url);
          setError(`Error: ${errorType}`);
        }}
      />
    </div>
  );
}