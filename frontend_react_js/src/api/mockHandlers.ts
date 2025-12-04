import animals from '@/data/mockAnimals.json';
import behaviorsRaw from '@/data/mockBehaviors.json';
import reports from '@/data/mockReports.json';
import { DEFAULT_BEHAVIORS } from '@/lib/constants';

const ALLOWED = new Set(DEFAULT_BEHAVIORS.map((b: { label: string }) => b.label));

function normalizeBehaviorType(t: string): string {
  // Align incoming labels to the strict 5-behavior set; otherwise drop to 'Foraging' as fallback demo
  const map: Record<string, string> = {
    'Foraging': 'Foraging',
    'Pacing or Movement': 'Pacing',
    'Pacing': 'Pacing',
    'Recumbent': 'Recumbent',
    'Resting or Sleeping': 'Recumbent',
    'Grooming': 'Scratching',
    'Scratching': 'Scratching',
    'Self-directed': 'Self-directed',
    'Social Interaction': 'Self-directed',
  };
  const v = map[t] || t;
  return ALLOWED.has(v) ? v : 'Foraging';
}

const behaviors = (behaviorsRaw as any[]).map((b: any) => ({ ...b, type: normalizeBehaviorType(b.type) }));

export const mocks = {
  getSelectedAnimal: async () => {
    const a = animals[0] as any;
    return {
      ...a,
      sex: 'Female',
      age: 7,
      enclosure: 'Enclosure C',
      status: 'Healthy',
      updatedAt: a.lastSeen
    };
  },
  getBehaviorCounts: async () => {
    const byType: Record<string, number> = {};
    DEFAULT_BEHAVIORS.forEach((t: { label: string }) => { byType[t.label] = 0; });
    behaviors.forEach((b: any) => { byType[b.type as string] = (byType[b.type as string] || 0) + 1; });
    return Object.entries(byType).map(([type, count]) => ({ type, count }));
  },
  getDurationBreakdown: async () => {
    const byType: Record<string, number> = {};
    DEFAULT_BEHAVIORS.forEach((t) => { byType[t.label] = 0; });
    behaviors.forEach((b: any) => { byType[b.type] = (byType[b.type] || 0) + (b.durationMin as number); });
    return Object.entries(byType).map(([label, value]) => ({ label, value }));
  },
  getDailyHeatmap: async () => {
    // No longer used, but keep for compatibility (not rendered)
    const hours: number[] = Array(24).fill(0);
    behaviors.forEach((b: any) => { const h = Math.floor((b.startMin ?? 0) / 60); hours[h] += 1; });
    return hours;
  },
  getBehaviorTypes: async () => {
    return DEFAULT_BEHAVIORS.map((b: { label: string }) => b.label);
  },
  getBehaviors: async () => {
    return behaviors;
  },
  getReports: async () => {
    return reports;
  }
};
