import { createContext, useContext, useState } from "react";
import {
    createTaskRequest,
    getTasksRequest,
    deleteTaskRequest,
    getTaskRequest,
    updateTaskRequest
} from '../api/tasks';

// crear el contexto
export const TasksContext = createContext();

// crear un hook para usar este contexto
export const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) throw new Error('useTasks must be used within an TasksProvider')
    return context;
}

// crear el provider
// eslint-disable-next-line react/prop-types
export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res);
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TasksContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TasksContext.Provider>
    )
}