import axios from './axios';

export const getTasksRequest = (page) => axios.get(`/tasks?page=${page}`)

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)

export const createTaskRequest = (task) => axios.post('/tasks', task)

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task)

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`)