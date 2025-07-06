import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Messages } from 'shared/ui'
import { authStore } from 'entities/Auth'
import { usersStore } from 'entities/Users'
import { Loader } from 'entities/Loader'
import { Header } from 'widgets/Header'

export const Layout = observer(() => {
  if (!authStore.isChecked) {
    return <Loader />
  }

  return (
    <>
      <Header item={usersStore.user} />
      <Messages />
      <Loader />
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
})
