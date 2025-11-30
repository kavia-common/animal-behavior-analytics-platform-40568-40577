import { mocks } from './mockHandlers';

export const api = {
  getSelectedAnimal: () => mocks.getSelectedAnimal(),
  getBehaviorCounts: () => mocks.getBehaviorCounts(),
  getDurationBreakdown: () => mocks.getDurationBreakdown(),
  getDailyHeatmap: () => mocks.getDailyHeatmap(),
  getBehaviorTypes: () => mocks.getBehaviorTypes(),
  getBehaviors: () => mocks.getBehaviors(),
  getReports: () => mocks.getReports()
};
