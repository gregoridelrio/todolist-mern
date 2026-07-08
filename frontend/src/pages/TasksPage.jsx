import { useEffect, useState } from 'react'
import { getTasks, createTask, deleteTask, updateTask } from '../services/taskService'
import TaskList from '../components/tasks/TaskList'
import TaskForm from '../components/tasks/TaskForm'
import Header from '../components/Header'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar las tareas')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleCreateTask = async (taskData) => {
    const newTask = await createTask(taskData)
    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  const handleDeleteTask = async (taskId) => {
    const previousTasks = tasks

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))

    try {
      await deleteTask(taskId)
    } catch (err) {
      setTasks(previousTasks)
      setError(err.response?.data?.message || 'Error al borrar la tarea')
    }
  }

  const handleToggleComplete = async (task) => {
    const previousTasks = tasks

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    )

    try {
      await updateTask(task._id, { completed: !task.completed })
    } catch (err) {
      setTasks(previousTasks)
      setError(err.response?.data?.message || 'Error al actualizar la tarea')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="px-6 py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-3xl font-bold text-cyan-400">Mis tareas</h1>

          <TaskForm onCreate={handleCreateTask} />

          {loading && <p className="text-slate-400">Cargando tareas...</p>}

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {!loading && !error && (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default TasksPage