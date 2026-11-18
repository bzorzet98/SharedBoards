import { useCreateBoardForm } from '../../hooks/app/useCreateBoardForm'
import type { CreateBoardForm } from '../../types'

interface Props {
  onSubmit: (form: CreateBoardForm) => Promise<boolean>
  onClose: () => void
}

const CreateBoardModal = ({ onSubmit, onClose }: Props) => {
  const { form, loading, handleChange, handleSubmit } = useCreateBoardForm(onSubmit, onClose)

  const inputStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Crear board
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Nombre
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Mi board"
              required
              className="px-4 py-3 rounded-lg outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Descripción (opcional)
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="¿De qué se trata este board?"
              className="px-4 py-3 rounded-lg outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="is_shared"
              checked={form.is_shared}
              onChange={(e) => handleChange('is_shared', e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="is_shared" className="text-sm" style={{ color: 'var(--text-primary)' }}>
              Board compartido — invitá a otros usuarios
            </label>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: loading ? 'var(--text-secondary)' : 'var(--accent)',
                color: 'var(--accent-text)',
              }}
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBoardModal