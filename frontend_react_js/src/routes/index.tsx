import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import TimelinePage from '../pages/Timeline/TimelinePage';
import ReportsPage from '../pages/Reports/ReportsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'reports', element: <ReportsPage /> },
    ],
  },
]);

export default router;
