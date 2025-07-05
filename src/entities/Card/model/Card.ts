import { makeAutoObservable } from 'mobx'

export class Card {
  id: string
  task: string
  completed: boolean
  createdAt: number
  updatedAt?: number
  edit = false

  constructor(card: {
    id: string
    task: string
    completed: boolean
    createdAt: number
    updatedAt?: number
  }) {
    this.id = card.id
    this.task = card.task
    this.completed = card.completed
    this.createdAt = card.createdAt
    this.updatedAt = card.updatedAt
    makeAutoObservable(this)
  }

  toggleEditMode() {
    this.edit = !this.edit
  }
}
