import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Login = () => {

  const {setUser, loginUser, setActive} = useContext(UserContext)
  const [email, setEmail] = useState('prueba@test.com')
  const [password, setPassword] = useState('prueba')

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      console.log('Sesion iniciada correctamente...')
      navigate('/')
      setActive(true)
    } catch (error) {
      console.log(error.code)
      console.log('Usuario no encontrado...')
    }
  }

  return (
  <div className="containerLogin">  
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your email..."/>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your password..."/>
        <button type="submit">Login</button>
      </form>
      <small>No tienes una cuenta? Registrate <NavLink to='/register'>Aqui</NavLink></small>
  </div>
  )
}

export default Login
