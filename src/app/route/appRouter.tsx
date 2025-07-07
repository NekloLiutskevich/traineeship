import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import React from 'react'
import { RegisterRouter, RegisterRoutes } from 'pages/register'
import { DashboardRouter, DashboardRoutes } from 'pages/dashboard'
import { LoginRouter, LoginRoutes } from 'pages/login'

import { Layout } from 'app/layouts/Layout'
import { LayoutAuth } from 'app/layouts/LayoutAuth/LayoutAuth'
import { LayoutUnAuth } from 'app/layouts/LayoutUnAuth/LayoutUnAuth'
import { LayoutRefresh } from 'app/layouts/LayoutRefresh/LayoutRefresh'

const routes = createRoutesFromElements(
  <Route element={<LayoutRefresh />}>
    <Route path={'/*'} element={<Navigate to={`/${LoginRoutes.root}`} />} />

    <Route element={<LayoutAuth />}>
      <Route element={<Layout />}>
        <Route path={`/${DashboardRoutes.root}/*`} element={<DashboardRouter />} />
      </Route>
    </Route>

    <Route element={<LayoutUnAuth />}>
      <Route element={<Layout />}>
        <Route path={`/${LoginRoutes.root}/*`} element={<LoginRouter />} />
        <Route path={`/${RegisterRoutes.root}/*`} element={<RegisterRouter />} />
      </Route>
    </Route>
  </Route>
)

const router = createBrowserRouter(routes)

export const AppRouter = () => <RouterProvider router={router} />
