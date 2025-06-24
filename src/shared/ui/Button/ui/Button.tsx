import { FC, useMemo, useEffect, MouseEvent } from 'react'
import {ButtonStore} from "shared/ui/Button/store/buttonStore";
import styles from './styles.module.scss'


type IButtonProps = {
    id: number
    text: string
}

export const Button: FC<IButtonProps> = ({ text, id }) => {
    const store = useMemo(() => new ButtonStore(), [id])

    useEffect(() => {
        store.setText(text)
    }, [])

    const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        console.log(e);
    }

    return <div className={styles.wrap} onMouseDown={onMouseDown}>{store.title}</div>
}