import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { isBackendEnabled } from '@/api/client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * PUBLIC_INTERFACE
 * Connects to backend WebSocket if configured (REACT_APP_WS_URL), otherwise simulates events via timer.
 * On message: invalidate React Query caches to update charts/timelines; also bubble event to caller.
 */
export function useSocket(onEvent: (evt: any) => void) {
  const qc = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const WS_URL = (import.meta as any).env?.REACT_APP_WS_URL as string | undefined;
    const shouldUseWs = !!WS_URL && isBackendEnabled();

    if (shouldUseWs) {
      const s = io(WS_URL, { transports: ['websocket'], path: undefined, autoConnect: true });
      socketRef.current = s;

      const onMessage = (evt: any) => {
        try {
          onEvent(evt);
        } catch {}
        // Refresh relevant caches
        qc.invalidateQueries({ queryKey: ['behaviorCounts'] });
        qc.invalidateQueries({ queryKey: ['durationBreakdown'] });
        qc.invalidateQueries({ queryKey: ['dailyHeatmap'] });
        qc.invalidateQueries({ queryKey: ['analyticsSummary'] });
        qc.invalidateQueries({ queryKey: ['behaviors'] });
      };

      s.on('connect', () => {
        // eslint-disable-next-line no-console
        console.info('[WS] connected');
      });
      s.on('disconnect', () => {
        // eslint-disable-next-line no-console
        console.info('[WS] disconnected');
      });
      // Generic event channel from backend; also listen to wildcard-like names as needed
      s.on('event', onMessage);
      s.on('BEHAVIOR_DETECTED', onMessage);
      s.on('ANALYTICS_UPDATED', onMessage);

      return () => {
        s.off('event', onMessage);
        s.off('BEHAVIOR_DETECTED', onMessage);
        s.off('ANALYTICS_UPDATED', onMessage);
        s.disconnect();
        socketRef.current = null;
      };
    }

    // Fallback: simulate events on an interval if WS not configured
    const interval = setInterval(() => {
      const evt = { type: 'BEHAVIOR_DETECTED', payload: { type: 'Foraging', at: Date.now() } };
      try {
        onEvent(evt);
      } catch {}
      qc.invalidateQueries({ queryKey: ['behaviorCounts'] });
      qc.invalidateQueries({ queryKey: ['durationBreakdown'] });
      qc.invalidateQueries({ queryKey: ['dailyHeatmap'] });
      qc.invalidateQueries({ queryKey: ['analyticsSummary'] });
    }, 5000);

    return () => clearInterval(interval);
  }, [onEvent, qc]);
}
