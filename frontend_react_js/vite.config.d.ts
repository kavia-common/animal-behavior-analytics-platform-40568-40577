/**
 * Vite configuration for dev and preview behind nginx.
 * - No dev proxy configured to avoid 502 when backend is down.
 * - Path alias for "@/..."
 * - Explicit server and preview ports and host binding.
 * - strictPort to avoid auto-increment which can break nginx upstreams.
 * - base derived from env if provided, otherwise root.
 */
declare const _default: import("vite").UserConfigFnObject;
export default _default;
