import { makeAutoObservable, runInAction } from 'mobx'
import type { UserCredential } from 'firebase/auth'

export type TypeMessages = 'success' | 'error' | 'warning'

export class MessagesStore {
  private _message: string | UserCredential = ''
  private _type: TypeMessages | '' = ''
  visible: boolean

  constructor() {
    this.visible = false
    makeAutoObservable(this)
  }

  updateMessage(type: TypeMessages, message: string): void {
    this._type = type
    this._message = message
    this.visible = true
    this.clearMessage()
  }

  clearMessage() {
    setTimeout(() => {
      runInAction(() => {
        this._type = ''
        this._message = ''
        this.visible = false
      })
    }, 5000)
  }

  get type() {
    return this._type
  }

  get message(): string {
    return <string>this._message
  }
}

export const messagesStore = new MessagesStore()
