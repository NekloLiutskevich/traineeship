import { createRoot } from 'react-dom/client'
import { AppRouter } from 'app/route/appRouter'
import './styles/main.scss'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(<AppRouter />)
}
