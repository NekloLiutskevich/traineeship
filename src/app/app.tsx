import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { DashboardPage } from '../pages/dashboard'
import { StatisticPage } from '../pages/statistic'

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/statistic' element={<StatisticPage />} />
      </Routes>
    </Router>
  )
}
