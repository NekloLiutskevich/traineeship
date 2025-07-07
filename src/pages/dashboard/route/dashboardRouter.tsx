import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { DashboardPage } from 'pages/dashboard/ui/dashboardPage'

export const DashboardRouter = observer(() => {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
    </Routes>
  )
})
