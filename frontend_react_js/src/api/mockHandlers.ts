import animals from '@/data/mockAnimals.json';
import behaviorsRaw from '@/data/mockBehaviors.json';
import reports from '@/data/mockReports.json';
import { BEHAVIOR_TYPES } from '@/lib/constants';

function normalizeBehaviorType(t: string): string {
  // Map previous simple labels into the canonical taxonomy
  const map: Record<string, string> = {
    Foraging: 'Foraging',
    Resting: 'Resting or Sleeping',
    Grooming: 'Grooming',
    Walking: 'Pacing or Movement',
    Alert: 'Social Interaction'
  };
  return BEHAVIOR_TYPES.includes(t as any) ? t : (map[t] || 'Other');
}

const behaviors = (behaviorsRaw as any[]).map(b => ({ ...b, type: normalizeBehaviorType(b.type) }));

export const mocks = {
  getSelectedAnimal: async () => {
    // Enrich with extra fields used in profile card
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
    // Ensure all taxonomy categories exist
    BEHAVIOR_TYPES.forEach(t => { byType[t] = 0; });
    behaviors.forEach((b: any) => { byType[b.type] = (byType[b.type] || 0) + 1; });
    return Object.entries(byType).map(([type, count]) => ({ type, count }));
  },
  getDurationBreakdown: async () => {
    const byType: Record<string, number> = {};
    BEHAVIOR_TYPES.forEach(t => { byType[t] = 0; });
    behaviors.forEach((b: any) => { byType[b.type] = (byType[b.type] || 0) + b.durationMin; });
    return Object.entries(byType).map(([label, value]) => ({ label, value }));
  },
  getDailyHeatmap: async () => {
    const hours = Array(24).fill(0);
    behaviors.forEach((b: any) => { const h = Math.floor(b.startMin / 60); hours[h] += 1; });
    return hours;
  },
  getBehaviorTypes: async () => {
    return Array.from(new Set(behaviors.map((b: any) => b.type)));
  },
  getBehaviors: async () => {
    return behaviors;
  },
  getReports: async () => {
    return reports;
  }
};
