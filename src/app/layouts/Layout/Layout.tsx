import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Loader } from 'shared/ui/Loader'
import { Messages } from 'shared/ui'
import { authStore } from 'entities/Auth'
import { usersStore } from 'entities/Users'

import { Header } from 'widgets/Header'

export const Layout = observer(() => {
  return (
    <>
      <Header item={usersStore.user} />
      <Messages />
      <Loader store={authStore.loaderStore} />
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
})
