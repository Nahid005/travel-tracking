import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import { useEffect, useState } from 'react'
import CityList from './components/CityList'

function App() {
  const [cities, setCities] = useState([])
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product' element={<Product />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isError={isError} isLoading={isLoading} />}/>
          <Route path='cities' element={<CityList cities={cities} isError={isError} isLoading={isLoading} />} />
          <Route path='countries' element={<p>countries</p>} />
          <Route path='form' element={<p>form</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
