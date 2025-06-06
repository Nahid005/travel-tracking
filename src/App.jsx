import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesContextProvider } from './context/CitiesContext'
import { AuthProvider } from './context/AuthenticationContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CitiesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/product' element={<Product />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/app' element={<ProtectedRoute>
              <AppLayout />
              </ProtectedRoute>}>
              <Route index element={<Navigate replace to='cities' />}/>
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />}/>
              <Route path='countries' element={<CountryList/>} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesContextProvider>
    </AuthProvider>
  )
}
export default App
