import { useState } from 'react'

function TaskItem({ task, onDelete, onToggleComplete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [tags, setTags] = useState(task.tags?.join(', ') || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await onUpdate(task._id, {
        title,
        description,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      })
      setIsEditing(false)
    } catch {

    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDescription(task.description || '')
    setTags(task.tags?.join(', ') || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="rounded-lg border border-cyan-500/40 bg-slate-900 px-4 py-3">
        <form onSubmit={handleSave} className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags separados por coma"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cyan-500"
          />
          <div>
            <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="mt-1 text-sm text-slate-400">{task.description}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs font-medium text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs font-medium text-slate-400 transition hover:border-red-500/50 hover:text-red-400"
          >
            Borrar
          </button>
        </div>
      </div>

      {task.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 pl-7">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </li>
  )
}

export default TaskItem