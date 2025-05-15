import { useCities } from '../context/CitiesContext'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Error from './Error'
import Spinner from './Spinner'

function CountryList () {
  const { isLoading, isError, cities } = useCities()
  if (isLoading) <Spinner />
  if (isError) <Error message={isError} />

  const countrys = cities.reduce((acc, curr) => {
    if (!acc.map((el) => el.country).includes(curr.country)) {
      return [...acc, { country: curr.country, emoji: curr.emoji }]
    } else {
      return acc
    }
  }, [])

  return (
    <ul className={styles.countryList}>
      {
        countrys.map(country => <CountryItem key={country.country} country={country} />)
      }
    </ul>
  )
}

export default CountryList
