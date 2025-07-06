import { makeAutoObservable, runInAction, reaction } from 'mobx'
import { type IParamsDb } from 'entities/ToDo/api/types'
import { ToDoApi } from 'entities/ToDo/api/todo'
import { usersStore } from 'entities/Users'
import { Card } from 'entities/Card/model/Card'

class ToDoStore {
  private _tasksMap = new Map<string, Card>()
  private _userId: string | undefined
  private _unsubscribe?: () => void

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => usersStore.user,
      (user) => {
        if (user) {
          this._unsubscribe?.()

          this._unsubscribe = ToDoApi.getTodos(user.id, (result) => {
            runInAction(() => {
              this.initTasks(result)
            })
          })

          this._userId = user.id
          this.subscribeToTodos(this._userId)
        }
      }
    )
  }

  private initTasks = (response: Record<string, IParamsDb>) => {
    this.clearTasks()

    for (const [todoId, todo] of Object.entries(response)) {
      this._tasksMap.set(
        todoId,
        new Card({
          id: todoId,
          ...todo,
        })
      )
    }
  }

  private addLastUpdatedTime(params: object): object {
    return Object.assign(params, { updatedAt: Date.now() })
  }

  subscribeToTodos(id: string): () => void {
    return ToDoApi.getTodos(id, (result) => {
      runInAction(() => {
        this.initTasks(result)
      })
    })
  }

  async saveToDoToDb(task: string) {
    if (!this._userId) return

    return ToDoApi.addTodo(this._userId, task)
  }

  async updateToDoToDb(taskId: string, params: Partial<IParamsDb>) {
    if (!this._userId) return

    return ToDoApi.updateTodo(this._userId, taskId, this.addLastUpdatedTime(params))
  }

  async removeToDoFromDb(taskId: string) {
    if (!this._userId) return

    return ToDoApi.removeTodo(this._userId, taskId)
  }

  get getTasks() {
    return Array.from(this._tasksMap.values()).reverse()
  }

  clearTasks = () => {
    this._tasksMap.clear()
  }
}

export const toDoStore = new ToDoStore()
