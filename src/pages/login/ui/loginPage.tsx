import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Input, messagesStore } from 'shared/ui'
import { authStore } from 'entities/Auth'
import { usersStore } from 'entities/Users'

import styles from './styles.module.scss'

export const LoginPage = observer(() => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await authStore.login(email, password)

    messagesStore.updateMessage(result.type, result.message)

    if (result.type === 'success') {
      navigate('/dashboard')
    }
  }

  if (usersStore.user) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div className={classNames(styles.wrap)}>
      <h1 style={{ textAlign: 'center', margin: '0 0 40px' }}>Login</h1>
      <form className={classNames('section', 'mb-2')} onSubmit={handleSubmit}>
        <div className='mb-2'>
          <Input
            label='Email:'
            tabIndex={0}
            type='email'
            id='login-email'
            placeholder='email@sample.com'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-2'>
          <Input
            label='Password:'
            type='password'
            id='login-password'
            placeholder=''
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={classNames(styles.formFooter)}>
          <Button type='submit' aria-label='Log In'>
            Log In
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'center' }}>
        <Link to='/register'>Register Page</Link>
      </div>
    </div>
  )
})
