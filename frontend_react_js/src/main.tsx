import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TimelinePage from './pages/Timeline/TimelinePage';
import ReportsPage from './pages/Reports/ReportsPage';
import ReportsBuilderPage from './pages/Reports/ReportsBuilderPage';
import ReportsSavedPage from './pages/Reports/ReportsSavedPage';
import ReportsScheduledPage from './pages/Reports/ReportsScheduledPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NotFoundPage from './pages/System/NotFoundPage';
import ErrorPage from './pages/System/ErrorPage';
import NetworkRetryPage from './pages/System/NetworkRetryPage';
import { store } from './store';
import './styles/globals.css';
import './styles/theme.css';

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
      { path: '/reports', element: <ReportsPage /> },
      { path: '/reports/builder', element: <ReportsBuilderPage /> },
      { path: '/reports/saved', element: <ReportsSavedPage /> },
      { path: '/reports/scheduled', element: <ReportsScheduledPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/not-found', element: <NotFoundPage /> },
      { path: '/error', element: <ErrorPage /> },
      { path: '/network-retry', element: <NetworkRetryPage /> }
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
