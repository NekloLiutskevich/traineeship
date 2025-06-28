import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, Navigate } from 'react-router-dom'
import { useStore } from '../../shared/stores'

export const LoginPage = observer(() => {
  const { authStore } = useStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const run = async () => {
      // const result = await authStore.register(email, password)
      const result2 = await authStore.login(email, password)
      // console.log('🔍 Login result:', result)
      console.log('🔍 Register result:', result2)
    }

    run()
  }, [])

  if (authStore.user) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div>
      Login Page
      <Link to='/register'>Register Page</Link>
      <br />
      <Link to='/statistic'>Statistic Page</Link>
      <br />
      <Link to='/dashboard'>Dashboard Page</Link>
    </div>
  )
})
