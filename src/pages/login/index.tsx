import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Link, Navigate } from 'react-router-dom'
import { useStore } from 'shared/stores'
import styles from './styles.module.scss'

export const LoginPage = observer(() => {
  const { authStore } = useStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { messagesStore } = useStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // messagesStore.updateMessage('success', 'Данные успешно сохранены!')
    // debugger
    return false
  }
  //
  // useEffect(() => {
  //   const run = async () => {
  //     // const result = await authStore.register(email, password)
  //     const result2 = await authStore.login(email, password)
  //     // console.log('🔍 Login result:', result)
  //     console.log('🔍 Register result:', result2)
  //   }
  //
  //   run()
  // }, [])

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

        <div className={classNames(styles.formFooter)}>
          <button type='submit'>Log In</button>
        </div>
      </form>
      <div style={{ textAlign: 'center' }}>
        <Link to='/register'>Register Page</Link>
      </div>
    </div>
  )
})
