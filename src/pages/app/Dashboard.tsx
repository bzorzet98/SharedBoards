import { useDashboard } from '../../hooks/app/useDashboard'
import { useBoards } from '../../hooks/app/useBoards'
import BoardCard from '../../components/boards/BoardCard'
import CreateBoardModal from '../../components/boards/CreateBoardModal'

const Dashboard = () => {
  const { user, handleLogout } = useDashboard()
  const { boards, loading, error, showCreateModal, setShowCreateModal, createBoard, deleteBoard } = useBoards()

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
            className="px-4 py-2 rounded-lg text-sm font-medium"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Mis boards
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Creá y gestioná tus espacios de trabajo
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-lg font-medium"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
            }}
          >
            + Crear board
          </button>
        </div>

        {error && (
          <p className="text-sm mb-4" style={{ color: '#ef4444' }}>
            {error}
          </p>
        )}

        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Cargando...</p>
        ) : boards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-xl"
            style={{ border: '2px dashed var(--border)' }}>
            <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              No tenés boards todavía
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Creá tu primer board para empezar
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-text)',
              }}
            >
              Crear board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boards.map(board => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={deleteBoard}
              />
            ))}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateBoardModal
          onSubmit={createBoard}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}

export default Dashboard