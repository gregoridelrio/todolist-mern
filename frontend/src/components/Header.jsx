import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <p className="text-sm text-slate-400">
          Hola, <span className="font-medium text-white">{user?.name}</span>
        </p>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:border-red-500/50 hover:text-red-400"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Header