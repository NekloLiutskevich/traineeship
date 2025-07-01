import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StoresContext } from 'shared/stores'
import { authStore } from 'shared/stores/authStore'
import { messagesStore } from 'shared/ui/Messages/store/messagesStore'
import { App } from './app'
import './styles/main.scss'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <StoresContext.Provider value={{ authStore, messagesStore }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoresContext.Provider>
    </React.StrictMode>
  )
}
