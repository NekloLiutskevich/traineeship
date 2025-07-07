import { observer } from 'mobx-react-lite'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { authStore } from 'entities/Auth'
import { LoginRoutes } from 'pages/login'

export const RegisterAccessLayout = observer(() => {
  const [loading, setLoading] = useState<boolean | null>(false)
  const { search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // authStore.checkHash(search).then((status) => {
    if (1) {
      setLoading(false)
    } else {
      navigate(`/${LoginRoutes.root}`)
      setLoading(null)
    }
    // })
  }, [])

  if (loading) return null

  return <Outlet />
})
