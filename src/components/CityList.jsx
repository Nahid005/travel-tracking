import CityItem from './CityItem'
import styles from './CityList.module.css'
import Error from './Error'
import Spinner from './Spinner'

function CityList({ cities, isError, isLoading }) {
  if (isLoading) return <Spinner />
  if (isError) return <Error message={ isError } />
  return <ul className={styles.cityList}>
    {
        cities.map(city => <CityItem key={ city.id } city={ city } />)
    }
  </ul>
}

export default CityList
