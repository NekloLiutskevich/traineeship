import React from 'react'
import { Link } from 'react-router-dom'

export const LoginPage: React.FC = () => {
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
}
