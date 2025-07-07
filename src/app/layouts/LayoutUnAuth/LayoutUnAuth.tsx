import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router-dom'
import { usersStore } from 'entities/Users'
import { DashboardRoutes } from 'pages/dashboard'

export const LayoutUnAuth = observer(() => {
  return !usersStore.user ? <Outlet /> : <Navigate to={`/${DashboardRoutes.root}`} replace />
})
