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
        <div className={classNames(styles.messages)}>
          <div className='container'>{messagesStore.message}</div>
        </div>
      )}
    </>
  )
})
