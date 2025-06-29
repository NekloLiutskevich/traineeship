import React from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route } from 'react-router-dom'
import { useStore } from 'shared/stores'
import { Layout } from 'widgets/Layout'
import { LoginPage } from 'pages/login'
import { RegisterPage } from 'pages/register'
import { DashboardPage } from 'pages/dashboard'
import { StatisticPage } from 'pages/statistic'

export const App = observer(() => {
  const { authStore } = useStore()

  if (authStore.loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/statistic' element={<StatisticPage />} />
      </Route>
    </Routes>
  )
})
