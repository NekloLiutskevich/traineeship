import { makeAutoObservable } from 'mobx'

export class LoaderStore {
  private _loading = false

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading: boolean) {
    this._loading = loading
  }

  get getLoading() {
    return this._loading
  }
}
