import { type FC, useMemo, useEffect, type MouseEvent } from 'react'
import { ButtonStore } from 'shared/ui/Button/store/buttonStore'
import styles from './styles.module.scss'

export enum ENUMKeysButton {
  test = 1,
  icon1 = 2,
  icon2 = '1212',
  icon1112 = '1212',
}

type IButtonProps = {
  key?: 'test' | 'icon1' | 'icon2' | 'icon1112'
  id?: number
  text: string
}

export const Button: FC<IButtonProps> = ({ text, id }) => {
  const store = useMemo(() => new ButtonStore(), [id])

  useEffect(() => {
    store.setText(text)
  }, [])

  const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    console.log(e)
  }

  return (
    <div className={styles.wrap} onMouseDown={onMouseDown}>
      {store.title}
    </div>
  )
}
