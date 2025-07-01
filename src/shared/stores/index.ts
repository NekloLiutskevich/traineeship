import { createContext, useContext } from 'react'
import { messagesStore } from '../ui/Messages/store/messagesStore'

export const stores = {
  messagesStore,
}

export type Stores = typeof stores

export const StoresContext = createContext<Stores>(stores)
export const useStore = () => useContext(StoresContext)
