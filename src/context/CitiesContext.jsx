import { createContext, useContext, useEffect, useState } from 'react'

const CitiesContext = createContext()

function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/cities')
        if (!response.ok) {
          throw new Error('Server is not working')
        }
        const data = await response.json()
        setCities(data)
      } catch (error) {
        setIsError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/cities/${id}`)
      if (!response.ok) {
        throw new Error('Server is not working')
      }
      const data = await response.json()
      setCurrentCity(data)
    } catch (error) {
      setIsError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return <CitiesContext.Provider value={{ cities, isLoading, isError, getCity, currentCity }}>
  { children }
  </CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error('Cities contenxt was used outsider the provider')
  return context
}

export { CitiesContextProvider, useCities }
