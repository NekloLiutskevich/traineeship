import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useStore } from 'shared/stores'
import styles from './styles.module.scss'

export const RegisterPage: React.FC = () => {
  const { authStore } = useStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // debugger
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
