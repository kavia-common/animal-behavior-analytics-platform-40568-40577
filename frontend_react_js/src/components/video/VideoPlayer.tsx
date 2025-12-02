import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

type Props = {
  src: string;
  poster?: string;
  onReady?: (player: Player) => void;
};

// PUBLIC_INTERFACE
export default function VideoPlayer({ src, poster, onReady }: Props) {
  /** Video.js player with default controls; overlay bounding box UI only */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        preload: 'auto',
        fluid: true
      }) as unknown as Player;
      onReady?.(playerRef.current);
    }
    return () => {
      if (playerRef.current && (playerRef.current as any).dispose) {
        (playerRef.current as any).dispose();
      }
      playerRef.current = null;
    };
  }, [onReady]);

  useEffect(() => {
    if (playerRef.current) {
      (playerRef.current as any).src({ src, type: 'video/mp4' });
      if (poster) (playerRef.current as any).poster(poster);
    }
  }, [src, poster]);

  return (
    <div className="relative">
      <video ref={videoRef as any} className="video-js vjs-default-skin rounded" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded" style={{ left: '30%', top: '35%', width: '25%', height: '20%', border: '2px solid var(--color-accent)' }} />
      </div>
    </div>
  );
}
