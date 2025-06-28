import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      Dashboard Page
      <Link to='/statistic'>Statistic Page</Link>
    </div>
  )
}
