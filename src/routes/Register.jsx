import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { registerUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await registerUser(email, password)
      console.log('Usuario creado correctamente', email,password)
      navigate('/login')
    } catch (error) {
      console.log(error.code)
      console.log('Este usuario ya se encuentra registrado...')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e)=> setEmail(e.target.value) } type="text" placeholder="Enter your email..."/>
      <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter your password..."/>
      {/* <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Repeat your password..."/> */}
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
