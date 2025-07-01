import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { ReactComponent as Logo } from 'shared/assets/icons/logo.svg'
import { authStore } from 'entities/Auth'
import { usersStore } from 'entities/Users'
import { type User } from 'entities/Users/model/User'
import styles from './styles.module.scss'

type IUserCard = {
  item: User
}

export const Header = observer(({ item }: IUserCard) => {
  const navigate = useNavigate()
  const date = new Date().toLocaleDateString()

  const handleLogout = async () => {
    await authStore.logout()
    navigate('/', { replace: true })
  }

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames(styles.headerInner, 'container')}>
        <Link to='/' className={styles.headerLogo} tabIndex={-1} aria-label='Home'>
          <Logo aria-hidden='true' />
        </Link>
        <div className={classNames(styles.headerInfo)}>{date}</div>
        <div className={styles.headerAuth}>
          {item ? <button onClick={handleLogout}>Logout</button> : null}
        </div>
      </div>
    </header>
  )
})
