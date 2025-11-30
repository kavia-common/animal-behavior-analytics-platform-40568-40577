import animals from '@/data/mockAnimals.json';
import behaviors from '@/data/mockBehaviors.json';
import reports from '@/data/mockReports.json';

export const mocks = {
  getSelectedAnimal: async () => {
    return animals[0];
  },
  getBehaviorCounts: async () => {
    const byType: Record<string, number> = {};
    behaviors.forEach((b: any) => { byType[b.type] = (byType[b.type] || 0) + 1; });
    return Object.entries(byType).map(([type, count]) => ({ type, count }));
  },
  getDurationBreakdown: async () => {
    const byType: Record<string, number> = {};
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
