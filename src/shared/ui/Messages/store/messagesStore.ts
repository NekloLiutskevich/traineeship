import { makeAutoObservable } from 'mobx'

type TypeMessages = 'success' | 'error' | 'warning'

export class MessagesStore {
  private _message = ''
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
    // this.clearMessage()
  }

  clearMessage() {
    setTimeout(() => {
      this._type = ''
      this._message = ''
      this.visible = false
    }, 3000)
  }

  get type() {
    return this._type
  }

  get message() {
    return this._message
  }
}

export const messagesStore = new MessagesStore()
