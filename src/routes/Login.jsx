import { useContext } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormError from "../components/FormError"
import InputsForm from "../components/InputsForm"
import TitleForm from "../components/TitleForm"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase"
import { formValidate } from "../utils/formValidate"

const Login = () => {

  const {loginUser, setActive} = useContext(UserContext)
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const { required, patternEmail, minLength } = formValidate()

  const navigate = useNavigate()

  const onSubmit = async({email, password}) => {
    try {
      await loginUser(email, password)
      console.log('Sesion iniciada correctamente...')
      navigate('/')
      setActive(true)
    } catch (error) {
      console.log(error.code)
      const { code, message } = erroresFirebase(error.code)
      setError(code,{message})
    }
  }

  return (
    <div className="containerLogin">
      <TitleForm text='Login'/>
      <form onSubmit={handleSubmit(onSubmit)}>

        <InputsForm
        type="email"
        placeholder="Enter your email..."
        {...register('email',{
          required,
          pattern: patternEmail,
        })}
        label='Ingresa tu email'
        >
        <FormError error={errors.email}/>
        </InputsForm>

        <InputsForm
        type="password"
        placeholder="Enter your password..."
        {...register('password',{
          required,
          minLength,
        })}
        label='Ingresa tu password'
        >
        <FormError error={errors.password}/>
        </InputsForm>

        <Button type='submit' text='Ingresar'/>

      </form>
      <small>
        No tienes una cuenta? Registrate <NavLink to="/register">Aqui</NavLink>
      </small>
    </div>
  );
}

export default Login
