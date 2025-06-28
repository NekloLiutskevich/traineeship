import { createContext, useContext } from 'react'
import type { AuthStore } from './authStore'

type Stores = {
  authStore: AuthStore
}

export const StoresContext = createContext<Stores>({} as Stores)
export const useStore = () => useContext(StoresContext)
