import React from 'react'
import { createRoot } from 'react-dom/client'
import { StoresContext } from '../shared/stores'
import { authStore } from '../shared/stores/authStore'
import { App } from './app'
import './styles/main.scss'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <StoresContext.Provider value={{ authStore }}>
        <App />
      </StoresContext.Provider>
    </React.StrictMode>
  )
}
