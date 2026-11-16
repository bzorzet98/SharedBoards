import { useDashboard } from '../../hooks/app/useDashboard'

const Dashboard = () => {
  const { user, handleLogout } = useDashboard()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          SharedBoards
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Mis boards
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Creá y gestioná tus espacios de trabajo
          </p>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{ border: '2px dashed var(--border)' }}>
          <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            No tenés boards todavía
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Creá tu primer board para empezar
          </p>
          <button
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
            }}
          >
            Crear board
          </button>
        </div>
      </main>
    </div>
  )
}

export default Dashboard    