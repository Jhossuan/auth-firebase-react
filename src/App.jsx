import { Route, Routes } from 'react-router-dom'

import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Perfil from './routes/Perfil'

import Navbar from './components/Navbar'
import RequireAuth from './components/layouts/LayoutRequireAuth'
import LayoutForms from './components/layouts/LayoutForms'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider'

function App() {

  const { user } = useContext(UserContext)
  if(user === false){
    return <p>Cargando...</p>
  }

  return (
    <div className="App">
      <Navbar/>
      <Routes>

        <Route path='/' element={<RequireAuth/>}>
          <Route index element={<Home />}/>
          <Route path='perfil' element={<Perfil />}/>
        </Route>

        <Route path='/' element={<LayoutForms/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </div>
  )
}

export default App
