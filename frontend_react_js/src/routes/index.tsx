import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { DashboardPage, TimelinePage, ReportsPage, ErrorPage, NotFoundPage } from "../pages";
import LoginPage from "../pages/Login/LoginPage";
import AnimalSelectionPage from "../pages/Animals/AnimalSelectionPage";
import VideoLibraryPage from "../pages/VideoLibrary/VideoLibraryPage";
import AnalyticsDashboardPage from "../pages/Analytics/AnalyticsDashboardPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/animals", element: <AnimalSelectionPage /> },

      { path: "/", element: <DashboardPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/timeline", element: <TimelinePage /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/library", element: <VideoLibraryPage /> },
      { path: "/analytics", element: <AnalyticsDashboardPage /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
