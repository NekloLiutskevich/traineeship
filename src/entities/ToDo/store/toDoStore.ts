import { makeAutoObservable, runInAction, reaction } from 'mobx'
import { getDatabase, ref, push, set, onValue } from 'firebase/database'
import { type IParamsDb } from 'entities/ToDo/api/types'
import { ToDoApi } from 'entities/ToDo/api/todo'
import { usersStore } from 'entities/Users'
import { app } from 'entities/Auth/api/auth'
import { Card } from 'entities/Card/model/Card'
import { firebaseDbConfig } from '../api/config'

const db = getDatabase(app, firebaseDbConfig.databaseURL)

class ToDoStore {
  private _tasksMap = new Map<string, Card>()

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => usersStore.user,
      (user) => {
        if (user) {
          this.subscribeToTodos(user.id)
        }
      }
    )
  }

  async subscribeToTodos(id: string): Promise<void> {
    return await ToDoApi.getTodos(id, (result) => {
      runInAction(() => {
        this.clearTasks()

        for (const [todoId, todo] of Object.entries(result)) {
          const card = new Card({
            id: todoId,
            ...todo,
          })
          this._tasksMap.set(todoId, card)
        }
      })
    })
  }

  async saveToDoToDb(id: string, task: string) {
    return ToDoApi.addTodo(id, task)
  }

  async getTodosFromDb() {}

  get getTasks() {
    return Array.from(this._tasksMap.values())
  }

  clearTasks = () => {
    this._tasksMap.clear()
  }
}

export const toDoStore = new ToDoStore()
