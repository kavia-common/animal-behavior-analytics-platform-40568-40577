import React, { useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import type Player from 'video.js/dist/types/player';

type Props = { sources: string[] };

/**
 * PUBLIC_INTERFACE
 * Multi-camera sync view: side-by-side players with synchronized play/pause and scrubbing.
 */
export default function MultiCameraSyncView({ sources }: Props) {
  const players = useRef<Player[]>([]);

  const attach = (idx: number) => (p: Player) => {
    players.current[idx] = p;
    // Wire up rate and play/pause sync
    const syncOthers = (cb: (pl: Player) => void) => {
      players.current.forEach((pl, i) => {
        if (pl && i !== idx) cb(pl);
      });
    };
    (p as any).on('play', () => syncOthers((pl) => (pl as any).play && (pl as any).play()));
    (p as any).on('pause', () => syncOthers((pl) => (pl as any).pause && (pl as any).pause()));
    (p as any).on('ratechange', () => {
      const r = (p as any).playbackRate?.() || 1;
      syncOthers((pl) => (pl as any).playbackRate && (pl as any).playbackRate(r));
    });
    (p as any).on('timeupdate', () => {
      // light sync: if drift > 0.5s, align
      const t = (p as any).currentTime?.() || 0;
      syncOthers((pl) => {
        const otherT = (pl as any).currentTime?.() || 0;
        if (Math.abs(otherT - t) > 0.5) (pl as any).currentTime?.(t);
      });
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sources.slice(0, 2).map((s, i) => (
        <div key={i} className="card p-2">
          <VideoPlayer src={s} onReady={attach(i)} />
        </div>
      ))}
    </div>
  );
}
