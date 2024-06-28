import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import {
  useNavigate,
  useParams // para obtener un objeto con los datos dinamicos de la url (parámetros)
} from 'react-router-dom';
import { useEffect } from 'react';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);

function TaskFormPage() {

  const {
    register,
    handleSubmit,
    setValue  // manejar los valores de los campos registrados en react-hook-form
  } = useForm()
  const { createTask, getTask, updateTask, loading, changeLoading } = useTasks()
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title) // establece en el campo title lo que viene en task.title
        setValue('description', task.description) // establece en el campo description lo que viene en task.description
        setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'))
      }
    }

    loadTask()
  }, [])

  useEffect(() => {
    if (!loading) {
      navigate('/tasks');
      changeLoading(true);
    }
  }, [loading])

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      //  Formato que debe tener date: 2024-06-28T00:00:00Z
      // date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()

      // Con dayjs().tz('America/Lima') obtenemos este formato: 2024-06-27T10:49:49-05:00
      // entonces se debe formatear a 'YYYY-MM-DDTHH:mm:ss[Z]'
      date: data.date ? dayjs.utc(data.date).format() : dayjs().tz('America/Lima').format('YYYY-MM-DDTHH:mm:ss[Z]')
    }

    if (params.id) {
      updateTask(params.id, dataValid)
    } else {
      createTask(dataValid);
    }
    // navigate('/tasks');
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type="text"
            placeholder="Title"
            {...register('title')}
            autoFocus
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="description">Description</label>
          <textarea
            id='description'
            placeholder="Description"
            rows='3'
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          >
          </textarea>

          <label htmlFor="date">Date</label>
          <input
            id='date'
            type="date"
            name="date"
            {...register('date')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <button type='submit' className='bg-indigo-500 px-3 py-2 rounded-md'>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage