import React, { type ChangeEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useStore } from 'shared/stores'
import { Button, Textarea } from 'shared/ui'
import { toDoStore } from 'entities/ToDo'
import type { User } from 'entities/Users/model/User'
import { CardItem } from 'entities/Card/ui/card'
import styles from './styles.module.scss'

type IUserCard = {
  user: User
}

export const ToDoList = observer(({ user }: IUserCard) => {
  const { messagesStore } = useStore()
  const [task, setTask] = useState('')
  const toDoList = toDoStore.getTasks

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await toDoStore.saveToDoToDb(user.id, task)
    setTask('')
    // await toDoStore.subscribeToTodos(user.id)
    // message
  }

  return (
    <div className={classNames(styles.wrap)}>
      <div className={classNames('section')}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px' }}>
          ToDo List
          {!toDoList.length && ' Is empty'}
        </h2>
        <div className={classNames(styles.todoList)}>
          {toDoList.map((card, index) => (
            <CardItem key={index} card={card} />
          ))}
        </div>
      </div>
      <form className={classNames('section', styles.sectionTasks)} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px' }}>Create new task</h2>

        <div className='mb-2'>
          <Textarea
            name='task'
            value={task}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTask(e.target.value)}
          />
        </div>

        <Button type='submit' aria-label='Add task'>
          Add task
        </Button>
      </form>
    </div>
  )
})
