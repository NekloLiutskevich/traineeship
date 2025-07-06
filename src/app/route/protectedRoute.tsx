import { Navigate, Outlet } from 'react-router-dom'
import { usersStore } from 'entities/Users'

export const ProtectedRoute = () => {
  return usersStore.user ? <Outlet /> : <Navigate to='/' replace />
}
