import { makeAutoObservable } from 'mobx'
import { type IResponseDb } from 'entities/ToDo/api/types'

export class ToDo {
  id: string
  task: string
  completed: boolean
  createdAt: number
  updatedAt?: number
  edit = false

  constructor(card: IResponseDb & { id: string }) {
    this.id = card.id
    this.task = card.task
    this.completed = card.completed
    this.createdAt = card.createdAt
    this.updatedAt = card.updatedAt
    makeAutoObservable(this)
  }

  setEditMode(value: boolean) {
    this.edit = value
  }
}
