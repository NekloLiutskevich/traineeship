import React from 'react'
import { ToDoList } from 'widgets/ToDoList'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '0 0 40px' }}>Dashboard</h1>
      <ToDoList />
    </div>
  )
}
