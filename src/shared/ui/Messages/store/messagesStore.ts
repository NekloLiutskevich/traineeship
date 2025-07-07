import { makeAutoObservable, runInAction } from 'mobx'

export type ITypeMessages = 'success' | 'error' | 'warning'

export class MessagesStore {
  private _message = ''
  private _type: ITypeMessages | '' = ''
  visible: boolean

  constructor() {
    this.visible = false
    makeAutoObservable(this)
  }

  updateMessage(type: ITypeMessages, message: string): void {
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

  get message() {
    return this._message
  }
}

export const messagesStore = new MessagesStore()
