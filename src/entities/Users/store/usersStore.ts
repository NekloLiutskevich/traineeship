import { makeAutoObservable } from 'mobx'
import { User } from 'entities/Users/model/User'
import { type IUserResponse } from 'entities/Auth/api/types'

class UsersStore {
  private _itemsMap: Map<string, User> = new Map()

  constructor() {
    makeAutoObservable(this)
  }

  addItem = (user: IUserResponse) => {
    this._itemsMap.set(user.uid, new User(user))
  }

  clearItems = () => {
    this._itemsMap.clear()
  }

  get user() {
    return this.items[0] || null
  }

  get items() {
    return Array.from(this._itemsMap.values())
  }
}

export const usersStore = new UsersStore()
