import TaskItem from './TaskItem'

function TaskList({ tasks, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-slate-400">
        No tienes tareas todavía.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}

export default TaskList