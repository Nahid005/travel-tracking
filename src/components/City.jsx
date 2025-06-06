import { useNavigate, useParams } from 'react-router'
import styles from './City.module.css'
import { useCities } from '../context/CitiesContext'
import { useEffect } from 'react'
import Spinner from './Spinner'
import Error from './Error'
import Button from './Button'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(new Date(date))

function City() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentCity, getCity, isLoading, isError } = useCities()

  useEffect(() => {
    getCity(id)
  }, [id])

  const { cityName, emoji, date, notes } = currentCity

  if (!isLoading) <Spinner />
  if (!isError) <Error message={'Data Not found'} />

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <Button onClick={() => navigate(-1)} type={'back'}> Back </Button>
      </div>
    </div>
  )
}

export default City
