import React from 'react'
import { Outlet } from 'react-router-dom'
import { Messages } from 'shared/ui'
import { Header } from '../Header'

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Messages />
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
}
