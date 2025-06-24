import { makeAutoObservable} from 'mobx'

export class ButtonStore {
    private _title = ''

    constructor() {
        makeAutoObservable(this)
    }

    get title() {
        return this._title + ' Test'
    }

    setText = (value: string) => {
        this._title = value
    }
}