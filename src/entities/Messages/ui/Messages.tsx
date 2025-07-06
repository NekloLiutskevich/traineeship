import React from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { messagesStore } from 'entities/Messages/store/messagesStore'
import styles from './styles.module.scss'

export const Messages: React.FC = observer(() => {
  return (
    <>
      {messagesStore.visible && (
        <div
          className={classNames(styles.messages, 'section', {
            [styles.warning]: messagesStore.type === 'warning',
            [styles.error]: messagesStore.type === 'error',
            [styles.success]: messagesStore.type === 'success',
          })}
        >
          <div className='container'>{messagesStore.message}</div>
        </div>
      )}
    </>
  )
})
