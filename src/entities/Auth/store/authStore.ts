import { makeAutoObservable, runInAction } from 'mobx'
import { onAuthStateChanged } from 'firebase/auth'
import type { TypeMessages } from 'shared/ui/Messages/store/messagesStore'
import { parseError } from 'shared/helpers/parseError'
import { AuthApi, authFirebase } from 'entities/Auth/api/auth'
import { type IUserCredentialResponse } from 'entities/Auth/api/types'
import { usersStore } from 'entities/Users'

type TypeResponse = {
  type: TypeMessages
  message: string
  credentials?: IUserCredentialResponse
}

class AuthStore {
  loading = true
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.observeAuthState()
  }

  private observeAuthState() {
    onAuthStateChanged(authFirebase, (user) => {
      runInAction(() => {
        if (user) usersStore.addItem(user)
        this.loading = false
      })
    })
  }

  async login(email: string, password: string): Promise<TypeResponse> {
    try {
      runInAction(() => {
        this.loading = true
      })

      const result = await AuthApi.login({
        email: email,
        password: password,
      })

      runInAction(() => {
        if (result.user) usersStore.addItem(result.user)
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

      const result = await AuthApi.register({
        email: email,
        password: password,
      })

      runInAction(() => {
        if (result.user) usersStore.addItem(result.user)
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
      await AuthApi.logout()

      runInAction(() => {
        usersStore.clearItems()
      })
    } catch (error: unknown) {
      runInAction(() => {
        this.error = parseError(error)
      })
    }
  }
}

export const authStore = new AuthStore()
