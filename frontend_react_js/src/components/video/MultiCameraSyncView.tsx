import React from 'react';
import VideoPlayer from './VideoPlayer';

type Props = { sources: string[] };

// PUBLIC_INTERFACE
export default function MultiCameraSyncView({ sources }: Props) {
  /** Two-camera side-by-side playback (mock sync) */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sources.slice(0, 2).map((s, i) => (
        <div key={i} className="card p-2">
          <VideoPlayer src={s} />
        </div>
      ))}
    </div>
  );
}
