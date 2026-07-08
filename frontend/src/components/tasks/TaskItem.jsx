function TaskItem({ task, onDelete }) {
  return (
    <li className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-sm text-slate-400">{task.description}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {task.completed && (
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Completada
            </span>
          )}
          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg border border-slate-700 px-2 py-1 text-xs font-medium text-slate-400 transition hover:border-red-500/50 hover:text-red-400"
          >
            Borrar
          </button>
        </div>
      </div>

      {task.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
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