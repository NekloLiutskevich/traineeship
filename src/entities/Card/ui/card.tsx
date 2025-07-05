import React, { type ChangeEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Button, Textarea } from 'shared/ui'
import type { Card } from 'entities/Card/model/Card'
import styles from './styles.module.scss'

type CardProps = {
  card: Card
}

export const CardItem = observer(({ card }: CardProps) => {
  const [task, setTask] = useState('')

  const createdDate = new Date(card.createdAt).toLocaleDateString()
  const createdTime = new Date(card.createdAt).toLocaleTimeString()
  const updatedDate = card.updatedAt ? new Date(card.updatedAt).toLocaleDateString() : null
  const updatedTime = card.updatedAt ? new Date(card.updatedAt).toLocaleTimeString() : null

  return (
    <div className={classNames(styles.cardItem)}>
      <div className={classNames(styles.cardInfo)}>
        <div className={classNames(styles.cardHeader)}>
          Status: {card.completed ? 'Done' : 'In Progress'}
        </div>

        <div className={classNames(styles.cardContentWrap)}>
          <Textarea
            name='card-task'
            value={card.task}
            readOnly={!card.edit}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTask(e.target.value)}
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
        <Button type='button' aria-label='Remove' onClick={() => {}}>
          Remove
        </Button>
        <Button type='button' aria-label='Edit' onClick={() => {}}>
          Edit
        </Button>
        <Button type='button' aria-label='Done' onClick={() => {}}>
          {!card.completed ? 'Done' : 'Start'}
        </Button>
      </div>
    </div>
  )
})
