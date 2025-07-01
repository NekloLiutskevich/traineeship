import { createContext, useContext } from 'react'
import { authStore } from './authStore'
import { messagesStore } from '../ui/Messages/store/messagesStore'

export const stores = {
  authStore,
  messagesStore,
}

export type Stores = typeof stores

export const StoresContext = createContext<Stores>(stores)
export const useStore = () => useContext(StoresContext)
