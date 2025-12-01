import axios from 'axios';

/**
 * Axios API client configured to be resilient in dev/preview environments.
 * Reads base URL from environment variables if provided; otherwise uses "/api".
 * Always keep mock-friendly behavior: callers decide when to use real backend via feature flags.
 *
 * Supported env vars (set via .env, not hardcoded here):
 * - REACT_APP_API_BASE
 * - REACT_APP_BACKEND_URL
 * - REACT_APP_FEATURE_FLAGS (CSV; should include "backendEnabled" to use backend)
 */
const API_BASE =
  (import.meta as any).env?.REACT_APP_API_BASE ||
  (import.meta as any).env?.REACT_APP_BACKEND_URL ||
  '/api';

export const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Soft-fail response interceptor
client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('[API client] Request failed (non-blocking in preview):', error?.message || error);
    }
    return Promise.reject(error);
  }
);

/**
 * PUBLIC_INTERFACE
 * Returns true if feature flags indicate backend usage is enabled.
 */
export function isBackendEnabled(): boolean {
  const flags = ((import.meta as any).env?.REACT_APP_FEATURE_FLAGS as string) || '';
  return flags.split(',').map((s) => s.trim()).includes('backendEnabled');
}
