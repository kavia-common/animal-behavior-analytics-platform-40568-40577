import React, { useRef } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import VideoPlayer from './VideoPlayer';
import MultiCameraSyncView from './MultiCameraSyncView';

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  meta?: Record<string, any>;
};

// PUBLIC_INTERFACE
export default function VideoModal({ open, onClose, src, meta }: Props) {
  /** Video playback modal with controls for skip and speed, plus metadata panel and two-camera view */
  const playerApi = useRef<any>(null);

  const onReady = (p: any) => {
    playerApi.current = p;
  };

  const skip = (sec: number) => {
    if (playerApi.current) playerApi.current.currentTime(playerApi.current.currentTime() + sec);
  };

  const setRate = (rate: number) => {
    if (playerApi.current) playerApi.current.playbackRate(rate);
  };

  return (
    <Modal open={open} onClose={onClose} title="Playback" wide>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <VideoPlayer src={src} onReady={onReady} />
          <div className="mt-2 flex items-center gap-2">
            <Button variant="ghost" onClick={() => skip(-10)}>⏪ -10s</Button>
            <Button variant="ghost" onClick={() => skip(10)}>+10s ⏩</Button>
            <Button variant="ghost" onClick={() => setRate(0.5)}>0.5x</Button>
            <Button variant="ghost" onClick={() => setRate(1)}>1x</Button>
            <Button variant="ghost" onClick={() => setRate(1.5)}>1.5x</Button>
            <Button variant="ghost" onClick={() => setRate(2)}>2x</Button>
          </div>
          <div className="mt-4">
            <MultiCameraSyncView sources={[src, '/src/assets/video/sample2.mp4']} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="card p-3">
            <div className="font-heading font-semibold mb-2">Metadata</div>
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(meta, null, 2)}</pre>
          </div>
          <div className="card p-3">
            <div className="font-heading font-semibold mb-2">Actions</div>
            <div className="flex gap-2">
              <Button size="sm">Download</Button>
              <Button size="sm" variant="secondary">Share</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
