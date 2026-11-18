import { useNavigate } from 'react-router-dom'
import type { Board } from '../../types'

interface Props {
  board: Board
  onDelete: (id: string) => void
}

const BoardCard = ({ board, onDelete }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className="p-5 rounded-xl cursor-pointer transition-all"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div onClick={() => navigate(`/board/${board.id}`)} className="flex-1">
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {board.name}
          </h3>
          {board.description && (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {board.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(board.id)}
          className="text-sm px-3 py-1 rounded-lg ml-3"
          style={{
            color: '#ef4444',
            backgroundColor: 'transparent',
            border: '1px solid #ef4444',
          }}
        >
          Eliminar
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: board.is_shared ? 'var(--accent)' : 'var(--bg-secondary)',
            color: board.is_shared ? 'var(--accent-text)' : 'var(--text-secondary)',
          }}
        >
          {board.is_shared ? 'Compartido' : 'Personal'}
        </span>
        {board.invite_code && (
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Código: {board.invite_code}
          </span>
        )}
      </div>
    </div>
  )
}

export default BoardCard