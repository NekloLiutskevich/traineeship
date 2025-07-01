import React, { useState } from 'react'
import classNames from 'classnames'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useStore } from 'shared/stores'
import styles from './styles.module.scss'

export const LoginPage: React.FC = () => {
  const { authStore, messagesStore } = useStore()
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

  if (authStore.user) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div className={classNames(styles.wrap)}>
      <h1 style={{ textAlign: 'center', margin: '0 0 40px' }}>Login</h1>
      <form className={classNames('section', 'mb-2')} onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor='login-email'>Email:</label>
          <input
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
          <label htmlFor='login-password'>Password:</label>
          <input
            type='password'
            id='login-password'
            placeholder=''
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={classNames(styles.formFooter)}>
          <button type='submit' aria-label='Log In'>
            Log In
          </button>
        </div>
      </form>
      <div style={{ textAlign: 'center' }}>
        <Link to='/register'>Register Page</Link>
      </div>
    </div>
  )
}
