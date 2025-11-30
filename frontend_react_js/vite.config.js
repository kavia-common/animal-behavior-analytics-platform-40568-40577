import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
/**
 * Vite configuration.
 * - No dev proxy configured to avoid 502 when backend is down.
 * - Path alias for "@/..."
 * - Explicit server and preview ports for consistency.
 */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        strictPort: true, // fail fast if port taken; platform will manage
        // No proxy here. If backend is reachable, the app can call it via full URL or API_BASE env.
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
});
