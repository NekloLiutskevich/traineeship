import { getDatabase, ref, push, set, onValue, update, remove } from 'firebase/database'
import { app } from 'entities/Auth/api/auth'
import { type IParamsDb, type IResponseDb } from 'entities/ToDo/api/types'
import { firebaseDbConfig } from './config'

const db = getDatabase(app, firebaseDbConfig.databaseURL)

class Api {
  getTodos(uid: string, callback: (data: Record<string, IResponseDb>) => void) {
    const todosRef = ref(db, `users/${uid}/todos`)

    return onValue(todosRef, (snapshot) => {
      callback(snapshot.val() || {})
    })
  }

  async addTodo(uid: string, task: string) {
    const todosRef = ref(db, `users/${uid}/todos`)
    const newTodoRef = push(todosRef)

    await set(newTodoRef, {
      task,
      completed: false,
      createdAt: Date.now(),
    })

    return newTodoRef.key || undefined
  }

  async updateTodo(uid: string, todoId: string, updates: Partial<IParamsDb>) {
    const todoRef = ref(db, `users/${uid}/todos/${todoId}`)

    return update(todoRef, updates)
  }

  async removeTodo(uid: string, todoId: string) {
    const todoRef = ref(db, `users/${uid}/todos/${todoId}`)

    return remove(todoRef)
  }
}

export const ToDoApi = new Api()
