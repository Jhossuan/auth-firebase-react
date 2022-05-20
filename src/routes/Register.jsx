import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormError from "../components/FormError"

const Register = () => {
  const { registerUser } = useContext(UserContext)
  const navigate = useNavigate()

  const { register, handleSubmit, setError, getValues, formState: { errors } } = useForm()

  const onSubmit = async({email, password}) => {
    try {
      await registerUser(email, password)
      console.log('Usuario creado correctamente', email,password)
      navigate('/login')
    } catch (error) {
      console.log(error.code)
      setError('firebase',{
        message: erroresFirebase(error.code)
      })
    }
  }

  return (
  <div>
    <h2>Register</h2>
    <FormError error={errors.firebase}/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Enter your email..."
        {...register('email',{
          required: {
            value: true,
            message: 'Obligatory field'
          },
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Formato de email incorrecto'
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
          },
          minLength: {
            value: 6,
            message: 'Min 6 characters'
          },
        })}
      />
      <FormError error={errors.password}/>

      <input
        type="password"
        placeholder="Repeat your password..."
        {...register('repassword',{
          required:{
            value: true,
          },
          validate: {
              equals: (value) => {
                const { password } = getValues();
                return password === value || 'Password should match'
              }
          }
        })}
      />
      <FormError error={errors.repassword}/>

      <button type="submit">Register</button>
    </form>
  </div>
  );
}

export default Register
