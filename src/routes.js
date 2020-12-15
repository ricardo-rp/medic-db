import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

import PatientListView from 'src/views/patientList';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import PatientView from 'src/views/patientDetails';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'patient', element: <PatientListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'patient/:id', element: <PatientView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
