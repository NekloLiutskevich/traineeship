import React, { type ChangeEvent, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Button, Textarea } from 'shared/ui'
import { toDoStore } from 'entities/ToDo'
import type { Card } from 'entities/Card/model/Card'
import styles from './styles.module.scss'

type CardProps = {
  card: Card
}

export const CardItem = observer(({ card }: CardProps) => {
  const [task, setTask] = useState(card.task)

  const createdDate = new Date(card.createdAt).toLocaleDateString()
  const createdTime = new Date(card.createdAt).toLocaleTimeString()
  const updatedDate = card.updatedAt ? new Date(card.updatedAt).toLocaleDateString() : null
  const updatedTime = card.updatedAt ? new Date(card.updatedAt).toLocaleTimeString() : null
  const initialTaskValue = card.task

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEditClick = () => {
    card.setEditMode(true)
    textareaRef.current?.focus()

    const textLength = textareaRef.current?.value.length || 0
    textareaRef.current?.setSelectionRange(textLength, textLength)
  }

  return (
    <div className={classNames(styles.cardItem, { [styles.cardItemComplete]: card.completed })}>
      <div className={classNames(styles.cardInfo)}>
        <div className={classNames(styles.cardHeader)}>
          Status: {card.completed ? 'Done' : 'In Progress'}
        </div>

        <div className={classNames(styles.cardContentWrap)}>
          <Textarea
            ref={textareaRef}
            name='card-task'
            value={task}
            readOnly={!card.edit}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTask(e.target.value)}
            onBlur={() => card.setEditMode(false)}
          />
        </div>

        <div className={classNames(styles.cardFooter)}>
          <div>
            <div>Created:</div>
            {createdDate} {createdTime}
          </div>
          {card.updatedAt && (
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

            if (confirmation) toDoStore.removeToDoFromDb(card.id)
          }}
        >
          Remove
        </Button>

        {initialTaskValue === task ? (
          <Button
            type='button'
            aria-label='Edit'
            onClick={handleEditClick}
            disabled={card.completed}
          >
            Edit
          </Button>
        ) : (
          <Button
            type='button'
            aria-label='Update'
            onClick={() => {
              toDoStore.updateToDoToDb(card.id, {
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
            toDoStore.updateToDoToDb(card.id, {
              completed: !card.completed,
            })
          }}
        >
          {!card.completed ? 'Done' : 'Start'}
        </Button>
      </div>
    </div>
  )
})
