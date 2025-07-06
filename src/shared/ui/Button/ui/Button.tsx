import React, { type FC } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'default'
}

export const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={classNames({
        [styles.default]: !props.theme || props.theme === 'default',
      })}
    >
      {children}
    </button>
  )
}
