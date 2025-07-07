import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Icon, IconName } from 'shared/ui/Icon'
import { Button, messagesStore } from 'shared/ui'
import { authStore } from 'entities/Auth'
import { type User } from 'entities/Users/model/User'
import styles from './styles.module.scss'

type IUserCard = {
  item: User | null
}

export const Header = observer(({ item }: IUserCard) => {
  const navigate = useNavigate()
  const date = new Date().toLocaleDateString()

  const handleLogout = async () => {
    await authStore.logout()
    navigate('/', { replace: true })
    messagesStore.updateMessage('warning', 'You have been logged out')
  }

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.headerInner, 'container')}>
        <Link to='/' className={styles.headerLogo} tabIndex={-1} aria-label='Home'>
          <Icon icon={IconName.logoIcon} />
        </Link>
        <div className={classNames(styles.headerInfo)}>{date}</div>
        <div className={classNames(styles.headerAuth, { [styles.headerAuthActive]: item })}>
          <Icon icon={IconName.userIcon} className='headerAuthIcon' />
          {item && <span className={classNames(styles.headerAuthName)}>{item.email}</span>}

          {item ? (
            <div className={classNames(styles.headerDropdown, 'section')}>
              <Button type='submit' aria-label='Logout' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
})
