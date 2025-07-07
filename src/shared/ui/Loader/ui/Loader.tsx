import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { Icon, IconName } from 'shared/ui/Icon'
import { type LoaderStore } from 'shared/ui/Loader/store/loaderStore'
import styles from './styles.module.scss'

type ILoaderProps = {
  store: LoaderStore
}

export const Loader = observer(({ store }: ILoaderProps) => {
  return (
    <div className={classNames(styles.loader, { [styles.loaderActive]: store.getLoading })}>
      <Icon icon={IconName.loadingIcon} className={styles.loaderIcon} />
    </div>
  )
})
