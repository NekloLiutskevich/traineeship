import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Messages } from 'shared/ui'
import { authStore } from 'entities/Auth'
import { usersStore } from 'entities/Users'
import { Header } from 'widgets/Header'

export const Layout = observer(() => {
  if (authStore.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header item={usersStore.user} />
      <Messages />
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
})
