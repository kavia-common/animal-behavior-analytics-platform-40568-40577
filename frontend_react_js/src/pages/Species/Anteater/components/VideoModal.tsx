import React, { useRef, useState } from 'react';

type Props = { src: string; meta?: any; onClose: () => void; };

// PUBLIC_INTERFACE
export default function VideoModal({ src, meta, onClose }: Props) {
  /** Modal bg surface/border/shadow; controls Play/Pause/Speed/Skip; metadata layout */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rate, setRate] = useState(1);

  return (
    <div className="video-modal" role="dialog" aria-modal="true">
      <div className="video-modal-content">
        <div className="video-modal-header">
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <strong>Video Preview</strong>
            {meta?.behavior && <span className="text-muted" style={{ fontSize: 12 }}>• {meta.behavior}</span>}
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px 10px', borderRadius: 8 }}>Close</button>
        </div>
        <div style={{ background:'#000' }}>
          <video ref={videoRef} src={src} controls className="bg-surface" style={{ width: '100%', height:'auto' }} />
        </div>
        <div className="video-modal-controls">
          <button className="btn-primary" style={{ borderRadius: 8, padding:'8px 10px' }} onClick={() => {
            const v = videoRef.current; if (!v) return;
            if (v.paused) v.play(); else v.pause();
          }}>Play/Pause</button>
          <button className="border-default bg-surface text-body" style={{ borderRadius: 8, padding:'8px 10px' }} onClick={() => {
            const v = videoRef.current; if (!v) return;
            v.currentTime += 5;
          }}>Skip +5s</button>
          <select className="border-default bg-surface text-body" style={{ borderRadius: 8, padding:'8px 10px' }} value={rate} onChange={(e) => {
            const r = Number(e.target.value); setRate(r);
            if (videoRef.current) videoRef.current.playbackRate = r;
          }}>
            {[0.5,1,1.5,2].map(r => <option key={r} value={r}>{r}x</option>)}
          </select>
          <div className="text-muted" style={{ marginLeft:'auto', fontSize: 12 }}>Bounding boxes (stub)</div>
        </div>
        <div style={{ padding: '10px 14px', display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap: 8 }}>
          <div className="border-default bg-surface" style={{ padding: 8, borderRadius: 8 }}><strong>Timestamp:</strong> {new Date().toISOString()}</div>
          <div className="border-default bg-surface" style={{ padding: 8, borderRadius: 8 }}><strong>Duration:</strong> {meta?.end ? `${meta.end - meta.start}s` : '—'}</div>
          <div className="border-default bg-surface" style={{ padding: 8, borderRadius: 8 }}><strong>Confidence:</strong> 0.84</div>
          <div className="border-default bg-surface" style={{ padding: 8, borderRadius: 8 }}><strong>Camera:</strong> Cam-A</div>
          <div className="border-default bg-surface" style={{ padding: 8, borderRadius: 8 }}><strong>Environment:</strong> Sunny</div>
        </div>
      </div>
    </div>
  );
}
