import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import LayoutForms from './components/LayoutForms'

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/'
        element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>
        <Route path='/' element={<LayoutForms/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
