# VizAI – Giant Anteater Behavior Monitoring (Frontend)

Vite + React + TypeScript + Tailwind CSS frontend for the VizAI Behavior Monitoring MVP.

## Tech
- React 18, TypeScript, Vite
- Tailwind CSS
- Redux Toolkit (global state)
- React Query (data fetching)
- Axios (API client)
- Socket.io-client (stubbed)
- Recharts + Chart.js
- Video.js player
- React Hook Form + Zod

## Scripts
- npm run dev – start dev server at :3000 (binds 0.0.0.0 for nginx)
- npm run build – typecheck and build
- npm run preview – preview prod build (binds 0.0.0.0:3000)

## Getting Started
1. Install deps:
   npm install
2. Run dev:
   npm run dev
3. Open http://localhost:3000 – default route redirects to /dashboard
4. If troubleshooting nginx/proxy, open http://localhost:3000/hello to verify React mounted.

## Notes
- All data is mocked under src/data and api/mockHandlers.ts. The app renders fully without any backend.
- No Vite dev proxy is configured to avoid 502 Bad Gateway when backend is unavailable.
- To connect a backend later, set REACT_APP_API_BASE or REACT_APP_BACKEND_URL in a .env file. The API layer can be switched accordingly.
- Optional base path: set REACT_APP_BASE_PATH if serving under a subpath (e.g., /frontend/). Vite's base will use it.
- WebSocket is simulated with setInterval in src/hooks/useSocket.ts
- Video assets are placeholders at src/assets/video/*.mp4 – replace with actual files as needed
- Design system colors defined in tailwind.config.cjs
