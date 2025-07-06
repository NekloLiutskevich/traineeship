import { makeAutoObservable } from 'mobx'

class Loader {
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

export const loaderStore = new Loader()
