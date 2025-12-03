import React from "react";
import Modal from "../ui/Modal";
import VideoPlayer from "./VideoPlayer";

/** Player modal with AI overlay meta and actions */
// PUBLIC_INTERFACE
export default function VideoModal({
  open,
  onClose,
  src,
  meta,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  meta?: {
    camera?: string;
    start?: string;
    end?: string;
    confidence?: number;
    environment?: { [k: string]: any };
  };
}) {
  return (
    <Modal open={open} onClose={onClose} title="Video Player">
      <div className="space-y-4">
        <VideoPlayer src={src} />
        <div className="grid gap-3 md:grid-cols-2 text-sm" style={{ color: "var(--color-text)" }}>
          <div className="space-y-1">
            <div><span className="text-[var(--color-text-muted)]">Camera:</span> {meta?.camera ?? '—'}</div>
            <div><span className="text-[var(--color-text-muted)]">Timestamp:</span> {meta?.start ?? '—'} → {meta?.end ?? '—'}</div>
            <div><span className="text-[var(--color-text-muted)]">Confidence:</span> {meta?.confidence?.toFixed(2) ?? '—'}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--color-text-muted)]">Environment:</div>
            <div className="rounded border p-2 text-xs" style={{ borderColor: "var(--color-border)" }}>
              {meta?.environment
                ? Object.entries(meta.environment).map(([k, v]) => <div key={k}>{k}: {String(v)}</div>)
                : "No additional context"}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="px-3 py-1.5 rounded text-white" style={{ background: "var(--color-primary)" }}>Download</button>
          <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--color-border)" }}>Share link</button>
          <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--color-border)" }} onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
}
