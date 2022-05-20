import { useContext } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import FormError from "../components/FormError"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase"

const Login = () => {

  const {loginUser, setActive} = useContext(UserContext)
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const onSubmit = async({email, password}) => {
    try {
      await loginUser(email, password)
      console.log('Sesion iniciada correctamente...')
      navigate('/')
      setActive(true)
    } catch (error) {
      console.log(error.code)
      setError('firebase',{
        message: erroresFirebase(error.code)
      })
    }
  }

  return (
    <div className="containerLogin">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.firebase}/>

        <input
          type="email"
          placeholder="Enter your email..."
          {...register('email',{
            required:{
              value:true,
              message: 'Obligatory field'
            }
          })}
        />
        <FormError error={errors.email}/>

        <input
          type="password"
          placeholder="Enter your password..."
          {...register('password',{
            required: {
              value: true,
              message: 'Enter your password'
            }
          })}
        />
        <FormError error={errors.password}/>

        <button type="submit">Login</button>

      </form>
      <small>
        No tienes una cuenta? Registrate <NavLink to="/register">Aqui</NavLink>
      </small>
    </div>
  );
}

export default Login
