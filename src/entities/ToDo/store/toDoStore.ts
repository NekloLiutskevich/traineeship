import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { LoaderStore } from 'shared/ui/Loader'
import { type IParamsDb, type IResponseDb } from 'entities/ToDo/api/types'
import { ToDoApi } from 'entities/ToDo/api/todo'
import { usersStore } from 'entities/Users'
import { ToDo } from 'entities/ToDo/model/ToDo'

class ToDoStore {
  private _tasksMap: Map<string, ToDo> = new Map()
  private _loaderStore = new LoaderStore()

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => usersStore.user,
      (user) => {
        if (user) {
          this.subscribeToTodos()
        }
      }
    )
  }

  get loaderStore() {
    return this._loaderStore
  }

  private initTasks = (response: Record<string, IResponseDb>) => {
    this.clearTasks()

    for (const [todoId, todo] of Object.entries(response)) {
      this._tasksMap.set(
        todoId,
        new ToDo({
          id: todoId,
          ...todo,
        })
      )
    }
  }

  private addLastUpdatedTime(params: object): object {
    return Object.assign(params, { updatedAt: Date.now() })
  }

  subscribeToTodos = () => {
    if (!usersStore.user) return

    this._loaderStore.setLoading(true)

    return ToDoApi.getTodos(usersStore.user.id, (result) => {
      runInAction(() => {
        this.initTasks(result)
        this._loaderStore.setLoading(false)
      })
    })
  }

  async saveToDoToDb(task: string) {
    if (!usersStore.user) return

    return ToDoApi.addTodo(usersStore.user.id, task)
  }

  async updateToDoToDb(taskId: string, params: Partial<IParamsDb>) {
    if (!usersStore.user) return

    return ToDoApi.updateTodo(usersStore.user.id, taskId, this.addLastUpdatedTime(params))
  }

  async removeToDoFromDb(taskId: string) {
    if (!usersStore.user) return

    return ToDoApi.removeTodo(usersStore.user.id, taskId)
  }

  get getTasks() {
    return Array.from(this._tasksMap.values()).reverse()
  }

  clearTasks = () => {
    this._tasksMap.clear()
  }
}

export const toDoStore = new ToDoStore()
