import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { Loader } from 'shared/ui/Loader'
import { authStore } from 'entities/Auth'

export const LayoutRefresh = observer(() => {
  if (!authStore.isChecked) {
    return <Loader store={authStore.loaderStore} />
  }

  return <Outlet />
})
