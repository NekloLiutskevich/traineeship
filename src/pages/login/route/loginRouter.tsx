import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { LoginPage } from 'pages/login/ui/loginPage'

export const LoginRouter = observer(() => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
    </Routes>
  )
})
