import { makeAutoObservable, runInAction } from 'mobx'
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
import type { TypeMessages } from 'shared/ui/Messages/store/messagesStore'
import { firebaseConfig } from '../lib/firebase/config'
import { parseError } from '../helpers/parseError'

type TypeResponse = {
  type: TypeMessages
  message: string
  credentials?: UserCredential
}

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
      runInAction(() => {
        this.user = user ?? null
        this.loading = false
      })
    })
  }

  async login(email: string, password: string): Promise<TypeResponse> {
    try {
      runInAction(() => {
        this.loading = true
      })

      const result = await signInWithEmailAndPassword(auth, email, password)

      runInAction(() => {
        this.user = result.user
        this.error = null
      })

      return {
        type: 'success',
        message: '',
        credentials: result,
      }
    } catch (error: unknown) {
      const parsedError = parseError(error)

      runInAction(() => {
        this.error = parsedError
      })

      return {
        type: 'error',
        message: parsedError,
      }
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async register(email: string, password: string): Promise<TypeResponse> {
    try {
      runInAction(() => {
        this.loading = true
      })

      const result = await createUserWithEmailAndPassword(auth, email, password)

      runInAction(() => {
        this.user = result.user
        this.error = null
      })

      return {
        type: 'success',
        message: '',
        credentials: result,
      }
    } catch (error: unknown) {
      const parsedError = parseError(error)

      runInAction(() => {
        this.error = parsedError
      })

      return {
        type: 'error',
        message: parsedError,
      }
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async logout() {
    try {
      await signOut(auth)

      runInAction(() => {
        this.user = null
      })
    } catch (error: unknown) {
      runInAction(() => {
        this.error = parseError(error)
      })
    }
  }
}

export const authStore = new AuthStore()
