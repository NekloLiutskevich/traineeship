import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { Icon, IconName } from 'shared/ui/Icon'
import { loaderStore } from 'entities/Loader/store/loaderStore'
import styles from './styles.module.scss'

export const Loader = observer(() => {
  return (
    <div className={classNames(styles.loader, { [styles.loaderActive]: loaderStore.getLoading })}>
      <Icon icon={IconName.loadingIcon} className={classNames(styles.loaderIcon)} />
    </div>
  )
})
