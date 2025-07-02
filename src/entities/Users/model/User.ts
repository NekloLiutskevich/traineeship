import { makeAutoObservable } from 'mobx'
import type { IUserResponse } from 'entities/Auth/api/types'

export class User {
  id: string
  email: string
  name: string
  isEmailVerified: boolean

  constructor(response: IUserResponse) {
    makeAutoObservable(this)

    this.id = response.uid
    this.email = response.email || ''
    this.name = response.displayName || ''
    this.isEmailVerified = response.emailVerified
  }
}
