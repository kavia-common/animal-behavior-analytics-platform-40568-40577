import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// PUBLIC_INTERFACE
export function useSocket(onEvent: (evt: any) => void) {
  /** WebSocket client stub that emits mock events locally */
  useEffect(() => {
    let interval: any;
    // Simulate socket by setInterval (no backend dependency)
    interval = setInterval(() => {
      onEvent({ type: 'BEHAVIOR_DETECTED', payload: { type: 'Foraging', at: Date.now() } });
    }, 5000);
    return () => clearInterval(interval);
  }, [onEvent]);
}
