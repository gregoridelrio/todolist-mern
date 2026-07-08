import { useEffect, useState } from 'react'
import { getTasks, createTask } from '../services/taskService'
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

          {!loading && !error && <TaskList tasks={tasks} />}
        </div>
      </main>
    </div>
  )
}

export default TasksPage