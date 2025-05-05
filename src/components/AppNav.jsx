import { NavLink } from 'react-router'
import styles from './AppNav.module.css'
import Logo from './Logo'

function AppNav() {
  return (
    <nav className={styles.nav}>
      <Logo/>
      <ul>
        <li>
          <NavLink to={'/'}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={'/product'}>Product</NavLink>
        </li>
        <li>
          <NavLink to={'/login'}>Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav
