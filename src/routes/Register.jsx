import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormError from "../components/FormError"
import TitleForm from "../components/TitleForm"
import { formValidate } from "../utils/formValidate"
import InputsForm from "../components/InputsForm"
import Button from "../components/Button"

const Register = () => {
  const { registerUser } = useContext(UserContext)
  const { required, patternEmail, minLength, validateEquals, validateTrim } = formValidate()
  const navigate = useNavigate()

  const { register, handleSubmit, setError, getValues, formState: { errors } } = useForm()

  const onSubmit = async({email, password}) => {
    try {
      await registerUser(email, password)
      console.log('Usuario creado correctamente', email,password)
      navigate('/login')
    } catch (error) {
      console.log(error.code)
      const { code, message } = erroresFirebase(error.code)
      setError(code,{message})
    }
  }

  return (
  <div>
    <TitleForm text='Register' />
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputsForm
      type="text"
      placeholder="Enter your email..."
      {...register('email',{
        required,
        pattern: patternEmail
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
        validate: validateTrim,
      })}
      label='Ingresa tu password'
      >
      <FormError error={errors.password}/>
      </InputsForm>

      <InputsForm
      type="password"
      placeholder="Repeat your password..."
      {...register('repassword',{
        required,
        validate: validateEquals(getValues('password'))
      })}
      label='Repite tu password'
      >
      <FormError error={errors.repassword}/>
      </InputsForm>

      <Button type='submit' text='Registrarse'/>
    </form>
  </div>
  );
}

export default Register
