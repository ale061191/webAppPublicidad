'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  name: string;
  className?: string;
}

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      src={url}
      className={`w-full h-full object-contain ${className}`}
      playsInline
      autoPlay
      muted
      loop
      controls={false}
    />
  );
}