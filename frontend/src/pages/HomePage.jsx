import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-4xl font-bold text-cyan-400">TodoList MERN</h1>
      <p className="text-slate-300">Frontend base con React, Router y Tailwind.</p>
      <div className="flex gap-4">
        <Link to="/login" className="rounded bg-cyan-500 px-4 py-2 font-medium text-slate-950">
          Login
        </Link>
        <Link to="/register" className="rounded border border-slate-700 px-4 py-2 font-medium text-white">
          Register
        </Link>
      </div>
    </main>
  )
}

export default HomePage