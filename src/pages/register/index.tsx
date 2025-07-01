import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useStore } from 'shared/stores'
// import { messagesStore } from 'shared/ui/Messages/store/messagesStore'
import styles from './styles.module.scss'

export const RegisterPage: React.FC = () => {
  const { authStore, messagesStore } = useStore()
  const navigate = useNavigate()

  const [email, setEmail] = useState('k.liutskevich@gmail.com')
  const [password, setPassword] = useState('123456')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await authStore.register(email, password)

    messagesStore.updateMessage(result.type, result.message)

    if (result.type === 'success') {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className={classNames(styles.wrap)}>
      <h1 style={{ textAlign: 'center', margin: '0 0 40px' }}>Register</h1>
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

        <div className='mb-2'>
          <label htmlFor='login-password-confirmation'>Confirm password:</label>
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
          <button type='submit'>Sign Up</button>
        </div>
      </form>
      <div style={{ textAlign: 'center' }}>
        <Link to='/'>Login Page</Link>
      </div>
    </div>
  )
}
