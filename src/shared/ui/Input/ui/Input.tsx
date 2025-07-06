import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type IInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  theme?: 'default'
  label?: string
  placeholder?: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ theme = 'default', ...props }, ref) => {
    return (
      <>
        {props.label && (
          <label htmlFor={props.id} className={classNames(styles.label)}>
            {props.label}
          </label>
        )}
        <input ref={ref} {...props} className={classNames(styles.input, styles[theme])} />
      </>
    )
  }
)

Input.displayName = 'Input'
