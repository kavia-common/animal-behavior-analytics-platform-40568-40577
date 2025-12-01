import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { client, isBackendEnabled } from './client';
import { mocks } from './mockHandlers';

// Types for backend payloads (lightweight; align with backend spec where needed)
type AnalyticsSummary = {
  sessions: string[];
  counts_by_behavior: Record<string, number>;
  durations_by_behavior: Record<string, number>;
  trendlines: Record<string, [string, number][]>;
  heatmap: Record<string, Record<string, number>>;
  heatmap_meta: Record<string, string>;
};

type BaselineComparison = {
  session_id: string;
  baseline_id: string;
  metric_deltas: Record<string, Record<string, number>>;
  notable_flags: string[];
};

type DiversityIndexResult = {
  session_id: string;
  index: number;
  max_index: number;
  normalized: number;
  color_band: string;
  interpretation: string;
  support: Record<string, number>;
};

type IngestEvent = {
  id: string;
  animal_id: string;
  behavior_id: string;
  session_id: string;
  camera_id: string;
  start_ts: string;
  end_ts: string;
  confidence: number; // 0..1
  metadata?: Record<string, any>;
};

/**
 * PUBLIC_INTERFACE
 * Low-level API calls with graceful fallback to mocks when backend feature flag is off.
 */
export const api = {
  getSelectedAnimal: async () => {
    if (!isBackendEnabled()) return mocks.getSelectedAnimal();
    // For MVP: pick first animal from /animals as 'selected'
    const res = await client.get('/animals');
    const a = Array.isArray(res.data) && res.data.length ? res.data[0] : null;
    if (!a) return mocks.getSelectedAnimal();
    // Map backend Animal -> UI expected fields
    return {
      id: a.id,
      name: a.name,
      tag: (a.tags && a.tags[0]) || a.id,
      lastSeen: new Date().toISOString().slice(0, 16).replace('T', ' '),
      sex: 'Unknown',
      age: Math.round(a.age_years ?? 0),
      enclosure: 'Unknown',
      status: 'Healthy',
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
  },

  getBehaviorCounts: async () => {
    if (!isBackendEnabled()) return mocks.getBehaviorCounts();
    // Derive from analytics summary counts_by_behavior
    const res = await client.get<AnalyticsSummary>('/analytics/summary');
    const entries = Object.entries(res.data.counts_by_behavior).map(([type, count]) => ({ type, count }));
    if (!entries.length) return mocks.getBehaviorCounts();
    return entries;
  },

  getDurationBreakdown: async () => {
    if (!isBackendEnabled()) return mocks.getDurationBreakdown();
    const res = await client.get<AnalyticsSummary>('/analytics/summary');
    const entries = Object.entries(res.data.durations_by_behavior).map(([label, value]) => ({
      label,
      value: Math.round((value || 0) / 60), // seconds -> minutes (approx)
    }));
    if (!entries.length) return mocks.getDurationBreakdown();
    return entries;
  },

  getDailyHeatmap: async () => {
    if (!isBackendEnabled()) return mocks.getDailyHeatmap();
    const res = await client.get<AnalyticsSummary>('/analytics/summary');
    // Flatten heatmap camera->minuteISO->count into 24 bins
    const hours = Array(24).fill(0);
    Object.values(res.data.heatmap || {}).forEach((minuteMap) => {
      Object.entries(minuteMap).forEach(([isoMinute, count]) => {
        const h = new Date(isoMinute).getHours();
        hours[h] += count || 0;
      });
    });
    return hours;
  },

  getBehaviorTypes: async () => {
    if (!isBackendEnabled()) return mocks.getBehaviorTypes();
    const res = await client.get('/behaviors');
    const labels = (res.data || []).map((b: any) => b.label || b.category || b.id).filter(Boolean);
    return Array.from(new Set(labels));
  },

  getBehaviors: async () => {
    // No direct endpoint for events in the preview API. Fall back to mocks.
    return mocks.getBehaviors();
  },

  getReports: async () => {
    if (!isBackendEnabled()) return mocks.getReports();
    const res = await client.get('/reports');
    if (!Array.isArray(res.data) || !res.data.length) return mocks.getReports();
    // Map backend -> UI
    return res.data.map((r: any) => ({
      id: r.id,
      type: 'summary',
      start: r.sessions?.[0] || '2025-11-01',
      end: r.sessions?.[1] || '2025-11-07',
      createdAt: r.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    }));
  },

  getAnalyticsSummary: async (params?: { sessionId?: string | string[]; reportId?: string; heatmapScaling?: 'fixed' | 'auto' | 'session' }) => {
    if (!isBackendEnabled()) {
      // Build from mocks
      const [counts, durations, heat] = await Promise.all([mocks.getBehaviorCounts(), mocks.getDurationBreakdown(), mocks.getDailyHeatmap()]);
      const counts_by_behavior: Record<string, number> = {};
      counts.forEach((c: any) => (counts_by_behavior[c.type] = c.count));
      const durations_by_behavior: Record<string, number> = {};
      durations.forEach((d: any) => (durations_by_behavior[d.label] = (d.value || 0) * 60));
      const heatmap: Record<string, Record<string, number>> = {
        'Cam A': {},
      };
      const today = new Date().toISOString().slice(0, 10);
      heat.forEach((v: number, hour: number) => {
        const key = `${today}T${String(hour).padStart(2, '0')}:00:00Z`;
        heatmap['Cam A'][key] = v;
      });
      const summary: AnalyticsSummary = {
        sessions: Array.isArray(params?.sessionId) ? params?.sessionId : params?.sessionId ? [params.sessionId] : [],
        counts_by_behavior,
        durations_by_behavior,
        trendlines: {},
        heatmap,
        heatmap_meta: { scaling: params?.heatmapScaling || 'auto' },
      };
      return summary;
    }
    const res = await client.get<AnalyticsSummary>('/analytics/summary', { params });
    return res.data;
  },

  getBaselineComparison: async (sessionId: string, baselineId: string) => {
    if (!isBackendEnabled()) {
      // Synthesize a comparison from mocks
      const counts = await mocks.getBehaviorCounts();
      const metric_deltas: Record<string, Record<string, number>> = {};
      counts.forEach((c: any) => {
        metric_deltas[c.type] = {
          count_delta_pct: Math.round((Math.random() * 40 - 20) * 10) / 10,
          duration_delta_pct: Math.round((Math.random() * 40 - 20) * 10) / 10,
        };
      });
      const result: BaselineComparison = {
        session_id: sessionId,
        baseline_id: baselineId,
        metric_deltas,
        notable_flags: Object.entries(metric_deltas)
          .filter(([, v]) => Math.abs(v.count_delta_pct) > 15 || Math.abs(v.duration_delta_pct) > 15)
          .slice(0, 3)
          .map(([k]) => `Significant change in ${k}`),
      };
      return result;
    }
    const res = await client.get<BaselineComparison>('/analytics/baseline-comparison', {
      params: { sessionId, baselineId },
    });
    return res.data;
  },

  getDiversityIndex: async (sessionId: string) => {
    if (!isBackendEnabled()) {
      // Shannon-like over mock duration shares
      const durations = await mocks.getDurationBreakdown();
      const total = durations.reduce((a: number, b: any) => a + (b.value || 0), 0);
      const p: Record<string, number> = {};
      durations.forEach((d: any) => (p[d.label] = total ? d.value / total : 0));
      const index = -Object.values(p).reduce((acc, pi) => (pi > 0 ? acc + pi * Math.log(pi) : acc), 0);
      const max_index = Math.log(durations.length || 1);
      const normalized = max_index ? index / max_index : 0;
      const color_band = normalized > 0.66 ? 'high' : normalized > 0.33 ? 'medium' : 'low';
      const interpretation =
        color_band === 'high'
          ? 'High diversity of behaviors observed.'
          : color_band === 'medium'
          ? 'Moderate diversity of behaviors.'
          : 'Low diversity; dominated by a few behaviors.';
      const result: DiversityIndexResult = {
        session_id: sessionId,
        index,
        max_index,
        normalized,
        color_band,
        interpretation,
        support: p,
      };
      return result;
    }
    const res = await client.get<DiversityIndexResult>('/analytics/diversity-index', { params: { sessionId } });
    return res.data;
  },

  ingestEvent: async (payload: IngestEvent) => {
    if (!isBackendEnabled()) {
      // no-op; pretend success
      return { ok: true, mocked: true };
    }
    const res = await client.post('/ingest/event', payload);
    return res.data;
  },

  // Export URLs
  exportReportJsonUrl: (reportId: string) => `${client.defaults.baseURL}/export/reports/${encodeURIComponent(reportId)}.json`,
  exportReportCsvUrl: (reportId: string) => `${client.defaults.baseURL}/export/reports/${encodeURIComponent(reportId)}.csv`,
};

/**
 * PUBLIC_INTERFACE
 * React Query hooks for typical data fetches.
 */
export function useAnimals() {
  return useQuery({ queryKey: ['selectedAnimal'], queryFn: api.getSelectedAnimal });
}

// PUBLIC_INTERFACE
export function useBehaviors() {
  return useQuery({ queryKey: ['behaviors'], queryFn: api.getBehaviors });
}

// PUBLIC_INTERFACE
export function useReports() {
  return useQuery({ queryKey: ['reports'], queryFn: api.getReports });
}

// PUBLIC_INTERFACE
export function useAnalyticsSummary(params?: { sessionId?: string | string[]; reportId?: string; heatmapScaling?: 'fixed' | 'auto' | 'session' }) {
  return useQuery({ queryKey: ['analyticsSummary', params], queryFn: () => api.getAnalyticsSummary(params) });
}

// PUBLIC_INTERFACE
export function useIngestEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.ingestEvent,
    onSuccess: () => {
      // refresh caches commonly affected
      qc.invalidateQueries({ queryKey: ['behaviorCounts'] });
      qc.invalidateQueries({ queryKey: ['durationBreakdown'] });
      qc.invalidateQueries({ queryKey: ['dailyHeatmap'] });
      qc.invalidateQueries({ queryKey: ['analyticsSummary'] });
      qc.invalidateQueries({ queryKey: ['behaviors'] });
    },
  });
}
