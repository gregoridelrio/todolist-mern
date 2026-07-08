import api from '../api/axios'

export const getTasks = async () => {
  const response = await api.get('/tasks')
  return response.data.tasks
}

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData)
  return response.data.task
}

export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`)
}