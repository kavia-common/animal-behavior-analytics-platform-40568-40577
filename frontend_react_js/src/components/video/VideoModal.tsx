import React from "react";
import Modal from "../ui/Modal";
import VideoPlayer from "./VideoPlayer";

/** Player modal with AI overlay meta and actions */
// PUBLIC_INTERFACE
export default function VideoModal({ open, onClose, src }: { open: boolean; onClose: () => void; src: string }) {
  return (
    <Modal open={open} onClose={onClose} title="Video Player">
      <div className="space-y-4">
        <VideoPlayer src={src} />
        <div className="flex items-center justify-between text-sm" style={{ color: "var(--color-text)" }}>
          <div>Timestamp: 2024-08-05 12:00 • Behavior confidence: 0.83</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded text-white" style={{ background: "var(--color-primary)" }}>Download</button>
            <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--color-border)" }}>Share link</button>
            <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--color-border)" }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
