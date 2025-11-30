/**
 * Vite configuration.
 * - No dev proxy configured to avoid 502 when backend is down.
 * - Path alias for "@/..."
 * - Explicit server and preview ports for consistency.
 */
declare const _default: import("vite").UserConfig;
export default _default;
