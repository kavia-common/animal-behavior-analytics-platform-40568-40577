import axios from 'axios';

/**
 * Axios API client configured to be resilient in dev/preview environments.
 * It reads base URL from environment variables if provided and otherwise
 * defaults to a relative "/api" path. All actual query functions in the app
 * currently use local mocks, so this client should not block rendering when a
 * backend is unavailable.
 *
 * Supported env vars (set via .env, not hardcoded here):
 * - REACT_APP_API_BASE
 * - REACT_APP_BACKEND_URL
 */
const API_BASE =
  (import.meta as any).env?.REACT_APP_API_BASE ||
  (import.meta as any).env?.REACT_APP_BACKEND_URL ||
  '/api';

export const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

// Add a safe response interceptor so any accidental network calls won't crash rendering in dev.
// They should be handled at call sites, but this is an extra guard for preview environments.
client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    // In dev/preview, log and rethrow; callers (if any) should catch or use mocks.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('[API client] Request failed (non-blocking in preview):', error?.message || error);
    }
    return Promise.reject(error);
  }
);
