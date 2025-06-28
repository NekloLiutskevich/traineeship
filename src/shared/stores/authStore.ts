import { makeAutoObservable } from 'mobx'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type UserCredential,
  type User,
} from 'firebase/auth'
import { firebaseConfig } from '../lib/firebase/config'
import { parseError } from '../helpers/parseError'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export class AuthStore {
  user: User | null = null
  loading = true
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.observeAuthState()
  }

  private observeAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }

      this.loading = false
    })
  }

  async login(email: string, password: string): Promise<UserCredential | null> {
    try {
      this.loading = true
      const result = await signInWithEmailAndPassword(auth, email, password)
      this.user = result.user
      this.error = null
      return result
    } catch (error: unknown) {
      this.error = parseError(error)
      return null
    } finally {
      this.loading = false
    }
  }

  async register(email: string, password: string): Promise<UserCredential | null> {
    try {
      this.loading = true
      const result = await createUserWithEmailAndPassword(auth, email, password)
      this.user = result.user
      this.error = null
      return result
    } catch (error: unknown) {
      this.error = parseError(error)
      return null
    } finally {
      this.loading = false
    }
  }

  async logout() {
    try {
      await signOut(auth)
      this.user = null
    } catch (error: unknown) {
      this.error = parseError(error)
    }
  }
}

export const authStore = new AuthStore()
