import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TimelinePage from './pages/Timeline/TimelinePage';
import ReportsPage from './pages/Reports/ReportsPage';
import { store } from './store';
import './styles/globals.css';

// Lightweight hello component to isolate any rendering issues
function Hello() {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontFamily: 'sans-serif' }}>Hello from VizAI Frontend</h1>
      <p>If you can see this, Vite and React mounted successfully.</p>
    </div>
  );
}

const router = createBrowserRouter([
  // Minimal route for sanity-check in preview environments
  { path: '/hello', element: <Hello /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/timeline', element: <TimelinePage /> },
      { path: '/reports', element: <ReportsPage /> }
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
