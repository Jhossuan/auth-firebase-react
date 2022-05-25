import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import ButtonLoading from "../components/ButtonLoading"
import FormError from "../components/FormError"
import InputsForm from "../components/InputsForm"
import TitleForm from "../components/TitleForm"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase"
import { formValidate } from "../utils/formValidate"

const Login = () => {

  const [loading, setLoading] = useState(false)

  const {loginUser} = useContext(UserContext)
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const { required, patternEmail, minLength } = formValidate()

  const navigate = useNavigate()

  const onSubmit = async({email, password}) => {
    try {
        setLoading(true)
        await loginUser(email, password)
        navigate('/')
    } catch (error) {
        console.log(error.code)
        const { code, message } = erroresFirebase(error.code)
        setError(code,{message})
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="containerLogin">
      <TitleForm text='Login'/>
      <form onSubmit={handleSubmit(onSubmit)}>

        <InputsForm
        type="email"
        placeholder="Ingresa tu email"
        {...register('email',{
          required,
          pattern: patternEmail,
        })}
        label='Ingresa tu email'
        error={errors.email}
        >
        <FormError error={errors.email}/>
        </InputsForm>

        <InputsForm
        type="password"
        placeholder="Contraseña"
        {...register('password',{
          required,
          minLength,
        })}
        label='Ingresa tu contraseña'
        error={errors.password}
        >
        <FormError error={errors.password}/>
        </InputsForm>
        {
          loading ? <ButtonLoading /> : <Button type='submit' text='Ingresar'/>  
        }

      </form>
      <small>
        No tienes una cuenta? Registrate <NavLink to="/register">Aqui</NavLink>
      </small>
    </div>
  );
}

export default Login
