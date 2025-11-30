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
- npm run dev – start dev server at :3000
- npm run build – typecheck and build
- npm run preview – preview prod build

## Getting Started
1. Install deps:
   npm install
2. Run dev:
   npm run dev
3. Open http://localhost:3000 – default route redirects to /dashboard

## Notes
- All data is mocked under src/data and api/mockHandlers.ts
- WebSocket is simulated with setInterval in src/hooks/useSocket.ts
- Video assets are placeholders at src/assets/video/*.mp4 – replace with actual files as needed
- Design system colors defined in tailwind.config.cjs
