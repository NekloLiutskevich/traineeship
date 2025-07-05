import React, { type FC } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type ITextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  theme?: 'default'
}

export const Textarea: FC<ITextareaProps> = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className={classNames({
        [styles.textarea]: true,
        [styles.default]: !props.theme || props.theme === 'default',
      })}
    />
  )
}
