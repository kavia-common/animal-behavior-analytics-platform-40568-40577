import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';

import RegisterPage from '../pages/Auth/RegisterPage';
import LoginScreen from '../pages/Auth/LoginScreen';
import SpeciesSelectPage from '../pages/Species/SpeciesSelectPage';
import SpeciesLayout from '../pages/Species/SpeciesLayout';
import AnteaterDashboard from '../pages/Species/Anteater/Dashboard';
import AnteaterTimeline from '../pages/Species/Anteater/Timeline';
import AnteaterReports from '../pages/Species/Anteater/Reports';
import AnteaterAnalytics from '../pages/Species/Anteater/Analytics';
import NotFoundPage from '../pages/System/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginScreen /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginScreen /> },
      { path: 'select-species', element: <SpeciesSelectPage /> },
      {
        path: 'species/anteater',
        element: <SpeciesLayout />,
        children: [
          { path: 'dashboard', element: <AnteaterDashboard /> },
          { path: 'timeline', element: <AnteaterTimeline /> },
          { path: 'reports', element: <AnteaterReports /> },
          { path: 'analytics', element: <AnteaterAnalytics /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
