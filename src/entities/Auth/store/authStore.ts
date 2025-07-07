import { makeAutoObservable, runInAction } from 'mobx'
import { onAuthStateChanged } from 'firebase/auth'
import type { ITypeMessages } from 'shared/ui'
import { parseError } from 'shared/helpers/parseError'
import { LoaderStore } from 'shared/ui/Loader'
import { AuthApi, authFirebase } from 'entities/Auth/api/auth'
import { type IUserCredentialResponse } from 'entities/Auth/api/types'
import { usersStore } from 'entities/Users'

type TypeResponse = {
  type: ITypeMessages
  message: string
  credentials?: IUserCredentialResponse
}

class AuthStore {
  isChecked = false
  error: string | null = null
  private _loaderStore = new LoaderStore()

  constructor() {
    makeAutoObservable(this)
    this.observeAuthState()
  }

  get loaderStore() {
    return this._loaderStore
  }

  private observeAuthState() {
    onAuthStateChanged(authFirebase, (user) => {
      runInAction(() => {
        if (user) usersStore.addItem(user)
        this.isChecked = true
        this._loaderStore.setLoading(false)
      })
    })
  }

  async login(email: string, password: string): Promise<TypeResponse> {
    try {
      runInAction(() => {
        this._loaderStore.setLoading(true)
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
        message: 'Login successfully',
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
        this._loaderStore.setLoading(false)
      })
    }
  }

  async register(email: string, password: string): Promise<TypeResponse> {
    try {
      runInAction(() => {
        this._loaderStore.setLoading(true)
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
        message: 'Register successfully',
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
        this._loaderStore.setLoading(false)
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
