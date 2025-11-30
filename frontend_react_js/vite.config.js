import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
/**
 * Vite configuration for dev and preview behind nginx.
 * - No dev proxy configured to avoid 502 when backend is down.
 * - Path alias for "@/..."
 * - Explicit server and preview ports and host binding.
 * - strictPort to avoid auto-increment which can break nginx upstreams.
 * - base derived from env if provided, otherwise root.
 */
export default defineConfig(function (_a) {
    var mode = _a.mode;
    // Allow an optional base path via env, but default to '/'
    var base = process.env.REACT_APP_BASE_PATH || '/';
    // Hostnames that should be allowed by Vite dev server when behind proxies
    var allowedHosts = ['vscode-internal-28620-beta.beta01.cloud.kavia.ai'];
    return {
        base: base,
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            host: true, // bind 0.0.0.0 so nginx can reach it
            port: 3000,
            strictPort: true, // fail fast if port is taken
            allowedHosts: allowedHosts,
            // No proxy: app uses local mocks, no backend dependency
        },
        preview: {
            host: true, // bind 0.0.0.0 for nginx in preview
            port: 3000,
            strictPort: true,
            allowedHosts: allowedHosts,
        },
    };
});
