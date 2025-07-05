import { getDatabase, ref, push, get, set, onValue, update } from 'firebase/database'
import { app } from 'entities/Auth/api/auth'
import { type IParamsDb } from 'entities/ToDo/api/types'
import { firebaseDbConfig } from './config'

const db = getDatabase(app, firebaseDbConfig.databaseURL)

class Api {
  async getTodos(uid: string, callback: (data: Record<string, IParamsDb>) => void) {
    const todosRef = ref(db, `users/${uid}/todos`)

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val() || {}
      callback(data)
    })
  }

  async addTodo(uid: string, task: string) {
    const todosRef = ref(db, `users/${uid}/todos`)
    const newTodoRef = push(todosRef)

    try {
      await set(newTodoRef, {
        task,
        completed: false,
        createdAt: Date.now(),
      })

      // await this.getTodos(uid)
      console.log('✅ Задача добавлена')
    } catch (error) {
      console.error('❌ Ошибка при записи задачи:', error)
    }
  }

  async updateTodo(uid: string, todoId: string, updates: Partial<IParamsDb>) {
    const todoRef = ref(db, `users/${uid}/todos/${todoId}`)

    await update(todoRef, updates)
  }
}

export const ToDoApi = new Api()
