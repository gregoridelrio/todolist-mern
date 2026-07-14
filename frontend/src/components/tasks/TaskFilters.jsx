function TaskFilters({ filters, onChange }) {
  const handleInputChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value })
  }

  const handleClear = () => {
    onChange({ search: '', tag: '', completed: '' })
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder="Buscar por título..."
        className="flex-1 min-w-[180px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
      />

      <input
        type="text"
        name="tag"
        value={filters.tag}
        onChange={handleInputChange}
        placeholder="Filtrar por tag..."
        className="w-40 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
      />

      <select
        name="completed"
        value={filters.completed}
        onChange={handleInputChange}
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
      >
        <option value="">Todas</option>
        <option value="true">Completadas</option>
        <option value="false">Pendientes</option>
      </select>

      {(filters.search || filters.tag || filters.completed) && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 hover:border-slate-500"
        >
          Limpiar
        </button>
      )}
    </div>
  )
}

export default TaskFilters