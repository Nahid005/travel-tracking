import Map from '../components/Map'
import Sidebar from '../components/Sidebar'
import styles from '../pages/AppLayout.module.css'

function AppLayout() {
  return <div className={styles.app}>
    <Sidebar />
    <Map />
  </div>
}

export default AppLayout
