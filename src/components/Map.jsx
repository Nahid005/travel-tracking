import { useNavigate } from 'react-router'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import useGeolocation from '../hooks/useGeolocation'
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition'

function Map() {
  const { lat, lng } = useUrlPosition()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()
  const { isLoading, position, getPosition } = useGeolocation()

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (position) setMapPosition([position.lat, position.lng])
  }, [position])

  return <div className={styles.mapContainer}>
    <Button type='position' onClick={() => getPosition()}>{isLoading ? 'Loading...' : 'Use your position' }</Button>
    <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {
      cities.map(city => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>)
    }
    <ChangeCenter position={mapPosition} />
    <DetectForm />
  </MapContainer>
  </div>
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectForm() {
  const navigate = useNavigate()
  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map
