import { useState } from 'react'

function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const taskData = {
        title,
        description,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      await onCreate(taskData)

      setTitle('')
      setDescription('')
      setTags('')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la tarea')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        required
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-cyan-400"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        rows={2}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-cyan-400"
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags separados por coma (ej: urgente, casa)"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 outline-none focus:border-cyan-400"
      />

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
      >
        {submitting ? 'Añadiendo...' : 'Añadir tarea'}
      </button>
    </form>
  )
}

export default TaskForm