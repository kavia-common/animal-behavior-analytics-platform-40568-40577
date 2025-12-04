import React, { useRef, useState } from 'react';

type Props = {
  src: string;
  meta?: any;
  onClose: () => void;
};

// PUBLIC_INTERFACE
export default function VideoModal({ src, meta, onClose }: Props) {
  /** Modal video player stub with play/pause/speed and behavior label */
  const ref = useRef<HTMLVideoElement>(null);
  const [speed, setSpeed] = useState(1);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <div className="video-modal" role="dialog" aria-modal="true">
      <div className="video-modal-content">
        <div className="video-modal-header">
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <strong>Playback</strong>
            {meta?.behavior && <span className="ui-badge">Behavior: {meta.behavior}</span>}
            {meta?.start != null && <span className="ui-badge">Start: {meta.start}s</span>}
          </div>
          <button className="video-close" onClick={onClose}>Close</button>
        </div>
        <div style={{ background: '#000' }}>
          <video ref={ref} src={src} style={{ width: '100%', height: 'auto' }} controls />
        </div>
        <div className="video-modal-controls">
          <button className="ui-btn ui-btn-primary" onClick={toggle}>Play/Pause</button>
          <label className="ui-label" style={{ margin: 0 }}>Speed</label>
          <select
            className="ui-select"
            style={{ width: 120 }}
            value={speed}
            onChange={(e) => {
              const s = Number(e.target.value);
              setSpeed(s);
              if (ref.current) ref.current.playbackRate = s;
            }}
          >
            {[0.5, 1, 1.5, 2].map(s => <option key={s} value={s}>{s}x</option>)}
          </select>
          <div style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 12 }}>
            Bounding boxes overlay (stub)
          </div>
        </div>
      </div>
    </div>
  );
}
