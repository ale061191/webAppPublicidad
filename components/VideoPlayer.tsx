'use client';

import { useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  name?: string;
  className?: string;
}

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      src={url}
      className={`w-full h-full object-contain ${className}`}
      playsInline
      muted
      loop
      controls={false}
    />
  );
}