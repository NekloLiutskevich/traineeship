import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { usersStore } from 'entities/Users'
import type { User } from 'entities/Users/model/User'
import { ToDoList } from 'widgets/ToDoList'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '0 0 40px' }}>Dashboard</h1>
      <ToDoList user={usersStore.user} />
      {/* Dashboard Page*/}
      {/* <Link to='/statistic'>Statistic Page</Link>*/}
    </div>
  )
}
