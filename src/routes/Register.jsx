import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormError from "../components/FormError"
import TitleForm from "../components/TitleForm"
import { formValidate } from "../utils/formValidate"
import InputsForm from "../components/InputsForm"
import Button from "../components/Button"
import ButtonLoading from "../components/ButtonLoading"

const Register = () => {
  const [loading, setLoading] = useState(false)
  const { registerUser } = useContext(UserContext)
  const { required, patternEmail, minLength, validateEquals, validateTrim } = formValidate()
  const navigate = useNavigate()

  const { register, handleSubmit, setError, getValues, formState: { errors } } = useForm()

  const onSubmit = async({email, password}) => {
    try {
      setLoading(true)
      await registerUser(email, password)
      console.log('Usuario creado correctamente', email,password)
      navigate('/login')
    } catch (error) {
      console.log(error.code)
      const { code, message } = erroresFirebase(error.code)
      setError(code,{message})
    } finally {
      setLoading(false)
    }
  }

  return (
  <div>
    <TitleForm text='Register' />
    <form onSubmit={handleSubmit(onSubmit)}>

      <InputsForm
      type="text"
      placeholder="Ingresa tu email"
      {...register('email',{
        required,
        pattern: patternEmail
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
        validate: validateTrim,
      })}
      label='Ingresa tu contraseña'
      error={errors.password}
      >
      <FormError error={errors.password}/>
      </InputsForm>

      <InputsForm
      type="password"
      placeholder="Repite tu contraseña"
      {...register('repassword',{
        required,
        validate: validateEquals(getValues('password'))
      })}
      label='Repite tu contraseña'
      error={errors.repassword}
      >
      <FormError error={errors.repassword}/>
      </InputsForm>

      {
          loading ? <ButtonLoading /> : <Button type='submit' text='Registrarse'/>  
      }

    </form>
    <small>
      Ya tienes una cuenta? Ingresa <NavLink to="/login">Aqui</NavLink>
    </small>
  </div>
  );
}

export default Register
