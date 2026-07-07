import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-4xl font-bold text-cyan-400">404</h1>
      <p className="text-slate-300">Esta página no existe.</p>
      <Link to="/" className="rounded bg-cyan-500 px-4 py-2 font-medium text-slate-950">
        Volver al inicio
      </Link>
    </main>
  )
}

export default NotFoundPage