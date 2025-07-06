import { getDatabase, ref, push, set, onValue, update, remove } from 'firebase/database'
import { app } from 'entities/Auth/api/auth'
import { type IParamsDb } from 'entities/ToDo/api/types'
import { loaderStore } from 'entities/Loader'
import { firebaseDbConfig } from './config'

const db = getDatabase(app, firebaseDbConfig.databaseURL)

class Api {
  getTodos(uid: string, callback: (data: Record<string, IParamsDb>) => void) {
    const todosRef = ref(db, `users/${uid}/todos`)

    loaderStore.setLoading(true)

    return onValue(todosRef, (snapshot) => {
      const data = snapshot.val() || {}
      callback(data)
      loaderStore.setLoading(false)
    })
  }

  async addTodo(uid: string, task: string) {
    const todosRef = ref(db, `users/${uid}/todos`)
    const newTodoRef = push(todosRef)

    loaderStore.setLoading(true)

    try {
      await set(newTodoRef, {
        task,
        completed: false,
        createdAt: Date.now(),
      })

      console.log('✅ Задача добавлена')
      return newTodoRef.key || undefined
    } catch (error) {
      console.error('❌ Ошибка при записи задачи:', error)
      return undefined
    } finally {
      loaderStore.setLoading(false)
    }
  }

  async updateTodo(uid: string, todoId: string, updates: Partial<IParamsDb>) {
    const todoRef = ref(db, `users/${uid}/todos/${todoId}`)

    loaderStore.setLoading(true)
    await update(todoRef, updates)
    loaderStore.setLoading(false)
  }

  async removeTodo(uid: string, todoId: string) {
    const todoRef = ref(db, `users/${uid}/todos/${todoId}`)

    loaderStore.setLoading(true)

    try {
      await remove(todoRef)
      console.log('🗑️ Задача удалена')
    } catch (error) {
      console.error('❌ Ошибка при удалении задачи:', error)
    } finally {
      loaderStore.setLoading(false)
    }
  }
}

export const ToDoApi = new Api()
