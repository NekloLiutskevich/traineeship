import React, { type ChangeEvent, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Button, Textarea } from 'shared/ui'
import { toDoStore } from 'entities/ToDo/store/toDoStore'
import { type ToDo } from 'entities/ToDo/model/ToDo'
import styles from './styles.module.scss'

type IToDoCardProps = {
  item: ToDo
}

export const ToDoCard = observer(({ item }: IToDoCardProps) => {
  const [task, setTask] = useState(item.task)

  const createdDate = new Date(item.createdAt).toLocaleDateString()
  const createdTime = new Date(item.createdAt).toLocaleTimeString()
  const updatedDate = item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : null
  const updatedTime = item.updatedAt ? new Date(item.updatedAt).toLocaleTimeString() : null
  const initialTaskValue = item.task

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEditClick = () => {
    item.setEditMode(true)
    textareaRef.current?.focus()

    const textLength = textareaRef.current?.value.length || 0
    textareaRef.current?.setSelectionRange(textLength, textLength)
  }

  return (
    <div className={classNames(styles.cardItem, { [styles.cardItemComplete]: item.completed })}>
      <div className={classNames(styles.cardInfo)}>
        <div className={classNames(styles.cardHeader)}>
          Status: {item.completed ? 'Done' : 'In Progress'}
        </div>

        <div className={classNames(styles.cardContentWrap)}>
          <Textarea
            ref={textareaRef}
            name='card-task'
            value={task}
            readOnly={!item.edit}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTask(e.target.value)}
            onBlur={() => item.setEditMode(false)}
          />
        </div>

        <div className={classNames(styles.cardFooter)}>
          <div>
            <div>Created:</div>
            {createdDate} {createdTime}
          </div>
          {item.updatedAt && (
            <div>
              <div>Updated:</div>
              {updatedDate} {updatedTime}
            </div>
          )}
        </div>
      </div>
      <div className={classNames(styles.cardTools)}>
        <Button
          type='button'
          aria-label='Remove'
          onClick={() => {
            const confirmation = confirm('Are you sure you want to remove this task?')

            if (confirmation) void toDoStore.removeToDoFromDb(item.id)
          }}
        >
          Remove
        </Button>

        {initialTaskValue === task ? (
          <Button
            type='button'
            aria-label='Edit'
            onClick={handleEditClick}
            disabled={item.completed}
          >
            Edit
          </Button>
        ) : (
          <Button
            type='button'
            aria-label='Update'
            onClick={() => {
              void toDoStore.updateToDoToDb(item.id, {
                task: task,
              })
            }}
          >
            Update
          </Button>
        )}

        <Button
          type='button'
          aria-label='Done'
          onClick={() => {
            void toDoStore.updateToDoToDb(item.id, {
              completed: !item.completed,
            })
          }}
        >
          {!item.completed ? 'Done' : 'Start'}
        </Button>
      </div>
    </div>
  )
})
