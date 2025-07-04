import React from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { useStore } from 'shared/stores'
import styles from './styles.module.scss'

export const Messages: React.FC = observer(() => {
  const { messagesStore } = useStore()
  return (
    <>
      {messagesStore.visible && (
        <div
          className={classNames(styles.messages, 'section', {
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
