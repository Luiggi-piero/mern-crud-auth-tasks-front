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
  const { createTask, getTask, updateTask } = useTasks()
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

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format()
    }

    if (params.id) {
      updateTask(params.id, dataValid)
    } else {
      createTask(dataValid);
    }
    navigate('/tasks');
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