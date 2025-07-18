import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Button, Input, messagesStore } from 'shared/ui'
import { authStore } from 'entities/Auth'

import styles from './styles.module.scss'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordConfirmation) {
      messagesStore.updateMessage('error', 'Passwords do not equal')
      return
    }

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
          <Input
            label='Email:'
            tabIndex={0}
            type='email'
            id='register-email'
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
            id='register-password'
            placeholder=''
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mb-2'>
          <Input
            label='Confirm password:'
            type='password'
            id='register-password-confirm'
            placeholder=''
            value={passwordConfirmation}
            required
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className={classNames(styles.formFooter)}>
          <Button type='submit' aria-label='Sign Up'>
            Sign Up
          </Button>
        </div>
      </form>
      <div style={{ textAlign: 'center' }}>
        <Link to='/'>Login Page</Link>
      </div>
    </div>
  )
}
