import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import React from 'react'
import { LoginPage } from 'pages/login'
import { RegisterPage } from 'pages/register'
import { DashboardPage } from 'pages/dashboard'
import { StatisticPage } from 'pages/statistic'
import { Layout } from 'app/layouts/Layout'
import { ProtectedRoute } from 'app/route/protectedRoute'

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path='/' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/statistic' element={<StatisticPage />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(routes)

export const AppRouter = () => <RouterProvider router={router} />
