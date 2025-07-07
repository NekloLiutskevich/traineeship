import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router-dom'
import { usersStore } from 'entities/Users'
import { LoginRoutes } from 'pages/login'

export const LayoutAuth = observer(() => {
  return usersStore.user ? <Outlet /> : <Navigate to={`/${LoginRoutes.root}`} replace />
})
