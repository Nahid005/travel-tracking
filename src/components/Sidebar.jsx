import Logo from './Logo'
import AppNav from './AppNav'
import styles from './Sidebar.module.css'
import { Outlet } from 'react-router'

function Sidebar() {
  return <div className={styles.sidebar}>
    <Logo />
    <AppNav />
    <Outlet />

    <footer className={styles.footer}>
      <p>&copy; Worldwise travel tracker</p>
    </footer>
  </div>
}

export default Sidebar
