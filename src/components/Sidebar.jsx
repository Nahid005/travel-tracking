import Logo from './Logo'
import AppNav from './PageNav'
import styles from './Sidebar.module.css'

function Sidebar() {
  return <div className={styles.sidebar}>
    <Logo />
    <AppNav />
  </div>
}

export default Sidebar
