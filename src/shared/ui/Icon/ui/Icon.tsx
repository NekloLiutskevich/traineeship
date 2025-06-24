import {FC, MouseEvent, useEffect, useMemo} from 'react'
import {ButtonStore} from "shared/ui/Button/store/buttonStore";
import styles from './styles.module.scss'
import {Button, ENUMKeysButton} from 'shared/ui'


type IIconProps = {
    id: number
    text: string
}

export const Icon: FC<IIconProps> = ({ text, id }) => {
    const store = useMemo(() => new ButtonStore(), [id])

    const test = ENUMKeysButton.icon2



    useEffect(() => {
        store.setText(text)
    }, [])

    const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        console.log(e);
    }

    return <div className={styles.wrap} onMouseDown={onMouseDown}>
        {store.title}
        <Button text={'test'} key={'test'} />
        <Button text={'test'} key={'icon1112'} />
        <Button text={'test'} key={'icon2'} />
        <Button text={'test'} />
    </div>
}