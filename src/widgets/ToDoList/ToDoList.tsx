import React, { type ChangeEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Button, Textarea, messagesStore } from 'shared/ui'
import { Loader } from 'shared/ui/Loader'
import { toDoStore, ToDoCard } from 'entities/ToDo'
import styles from './styles.module.scss'

export const ToDoList = observer(() => {
  const [task, setTask] = useState('')
  const toDoList = toDoStore.getTasks

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (task.trim().length) {
      await toDoStore.saveToDoToDb(task)
      setTask('')
    } else {
      messagesStore.updateMessage('warning', 'Your task is empty.')
    }
  }

  return (
    <div className={classNames(styles.wrap)}>
      <Loader store={toDoStore.loaderStore} />
      <div className={classNames('section')}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px' }}>
          ToDo List
          {!toDoList.length && ' Is empty'}
        </h2>
        <div className={classNames(styles.todoList)}>
          {toDoList.map((item) => (
            <ToDoCard key={item.id} item={item} />
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
