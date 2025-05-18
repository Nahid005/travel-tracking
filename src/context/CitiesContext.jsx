import { createContext, useContext, useEffect, useReducer } from 'react'
const CitiesContext = createContext()
const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  isError: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: action.payload }
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false }
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false }
    case 'cities/created':
      return { ...state, cities: [...state.cities, action.payload], isLoading: false }
    case 'cities/deleted':
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload), isLoading: false }
    case 'error':
      return { ...state, isError: action.payload }
    default:
      console.log('no action found')
  }
}

function CitiesContextProvider({ children }) {
  const [{ isLoading, cities, currentCity, isError }, dispatch] = useReducer(reducer, initialState)

  const baseURL = 'http://localhost:3000'

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: 'loading', payload: true })
        const response = await fetch(`${baseURL}/cities`)
        if (!response.ok) {
          throw new Error('Server is not working')
        }
        const data = await response.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        dispatch({ type: 'error', payload: error.message })
      } finally {
        dispatch({ type: 'loading', payload: false })
      }
    }
    getCities()
  }, [])

  async function getCity(id) {
    try {
      dispatch({ type: 'loading', payload: true })
      const response = await fetch(`${baseURL}/cities/${id}`)
      if (!response.ok) {
        throw new Error('Server is not working')
      }
      const data = await response.json()
      dispatch({ type: 'city/loaded', payload: data })
    } catch (error) {
      dispatch({ type: 'error', payload: error.message })
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }

  async function createCity(city) {
    try {
      dispatch({ type: 'loading', payload: true })
      const response = await fetch(`${baseURL}/cities`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch({ type: 'cities/created', payload: data })
    } catch (error) {
      dispatch({ type: 'error', payload: error.message })
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading', payload: true })
      await fetch(`${baseURL}/cities/${id}`, {
        method: 'DELETE'
      })
      dispatch({ type: 'cities/deleted', payload: id })
    } catch (error) {
      dispatch({ type: 'error', payload: error.message })
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }

  return <CitiesContext.Provider value={{ cities, isLoading, isError, getCity, currentCity, createCity, deleteCity }}>
  { children }
  </CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error('Cities contenxt was used outsider the provider')
  return context
}

export { CitiesContextProvider, useCities }
