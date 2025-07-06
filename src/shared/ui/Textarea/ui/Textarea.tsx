import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type ITextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  theme?: 'default'
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ theme = 'default', ...props }, ref) => {
    return <textarea ref={ref} {...props} className={classNames(styles.textarea, styles[theme])} />
  }
)

Textarea.displayName = 'Textarea'
