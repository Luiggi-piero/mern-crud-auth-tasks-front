import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';  // para cambiar de ruta
import { useAuth } from '../context/AuthContext';

function RegisterPage() {

  // register : registrar inputs
  // handleSubmit : se ejecuta al enviar el formulario
  const { register,
    handleSubmit,
    formState: { errors }  // extraigo los errores del estado del formulario
  } = useForm()
  const { signup, isAuthenticated, errors: registerErrors } = useAuth() // hook que obtiene el contexto
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks') // navega a la ruta desde http://localhost:5173/ -> http://localhost:5173/tasks
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md rounded-md p-10'>
        {
          registerErrors.map((error, i) => (
            <div key={i} className='bg-red-500 p-2 text-white'>
              {error}
            </div>
          ))
        }
        <h1 className='text-3xl font-bold my-2'>Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('username', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Username'
          />
          {
            errors.username && (
              <p className='text-red-500'>Username is required</p>
            )
          }

          <input
            type="email"
            {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Email'
          />
          {
            errors.email && (
              <p className='text-red-500'>Email is required</p>
            )
          }

          <input
            type="password"
            {...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Password'
          />
          {
            errors.password && (
              <p className='text-red-500'>Password is required</p>
            )
          }
          <button
            type='submit'
            className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
          >
            Register
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Already have an account?
          <Link
            to='/login'
            className="text-sky-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage