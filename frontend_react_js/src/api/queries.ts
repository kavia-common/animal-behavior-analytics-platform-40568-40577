import { mocks } from './mockHandlers';

/**
 * PUBLIC_INTERFACE
 * API facade using local mocks to ensure the app renders without any backend dependency.
 * If/when a backend is integrated, this layer can conditionally switch to real clients
 * based on environment flags.
 */
export const api = {
  getSelectedAnimal: () => mocks.getSelectedAnimal(),
  getBehaviorCounts: () => mocks.getBehaviorCounts(),
  getDurationBreakdown: () => mocks.getDurationBreakdown(),
  getDailyHeatmap: () => mocks.getDailyHeatmap(),
  getBehaviorTypes: () => mocks.getBehaviorTypes(),
  getBehaviors: () => mocks.getBehaviors(),
  getReports: () => mocks.getReports(),
};
