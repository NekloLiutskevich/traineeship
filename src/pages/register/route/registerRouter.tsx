import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { RegisterPage } from 'pages/register/ui/registerPage'
import { RegisterAccessLayout } from 'pages/register/layout/RegisterAccessLayout'

export const RegisterRouter = observer(() => {
  return (
    <Routes>
      <Route element={<RegisterAccessLayout />}>
        <Route path='/' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
})
