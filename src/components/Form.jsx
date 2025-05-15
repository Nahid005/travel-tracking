// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'

import styles from './Form.module.css'
import Button from './Button'
import { useNavigate } from 'react-router'
import useUrlPosition from '../hooks/useUrlPosition'
import Spinner from './Spinner'
import Error from './Error'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const { lat, lng } = useUrlPosition()
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const baseURL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

  useEffect(() => {
    async function getCity() {
      try {
        setIsLoading(true)
        const response = await fetch(`${baseURL}?latitude=${lat}&longitude=${lng}`)
        if (!response.ok) throw new Error('something went wrong')
        const data = await response.json()
        setCityName(data.city || data.locality)
        setCountry(data.countryName)
      } catch (error) {
        setIsError(error)
      } finally {
        setIsLoading(false)
      }
    }

    getCity()
  }, [lat, lng])

  function handleSubmit(e) {
    e.preventDefault()

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng }
    }

    console.log(newCity)
  }

  if (!isLoading) <Spinner />
  if (!isError) <Error message={isError} />

  return (
    <form className={styles.form} onClick={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={(e) => { e.preventDefault(); navigate(-1) }}>&larr; Back</Button>
      </div>
    </form>
  )
}

export default Form
