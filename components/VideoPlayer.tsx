'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  url: string;
  name: string;
  className?: string;
}

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      {error ? (
        <div className="text-red-500 text-xs">Error: {url}</div>
      ) : (
        <video
          ref={videoRef}
          src={url}
          className={`w-full h-full object-contain ${className}`}
          playsInline
          autoPlay
          muted
          loop
          controls={false}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}