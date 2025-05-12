import { useSearchParams } from 'react-router'
import styles from './Map.module.css'

function Map() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return <div className={styles.mapContainer}>
    <p>position: {lat}:{lng}</p>
    <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>Change</button>
  </div>
}

export default Map
