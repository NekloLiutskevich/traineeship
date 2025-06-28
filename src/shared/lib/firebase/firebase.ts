import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth'
import { firebaseConfig } from './config'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = async (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const logout = () => {
  return signOut(auth)
}

export const getCurrentUser = () => auth.currentUser
