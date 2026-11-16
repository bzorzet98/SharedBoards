import { Link } from 'react-router-dom'
import { useResetPassword } from '../../hooks/auth/useResetPassword'

const ResetPassword = () => {
  const { email, setEmail, error, loading, success, handleReset } = useResetPassword()

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16"
        style={{ backgroundColor: 'var(--sidebar-bg)' }}>
        <h1 className="text-4xl font-bold mb-4"
          style={{ color: 'var(--sidebar-text)' }}>
          SharedBoards
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Organizá tus ideas. Compartí con tu equipo.
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8"
        style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-full max-w-md">

          {success ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}>
                Revisá tu email
              </h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                Te enviamos un link para resetear tu contraseña.
              </p>
              <Link to="/login" style={{ color: 'var(--accent)' }}>
                Volver al login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}>
                Recuperar contraseña
              </h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                Ingresá tu email y te enviamos un link para resetearla.
              </p>

              <form onSubmit={handleReset} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="px-4 py-3 rounded-lg outline-none transition-all"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                {error && (
                  <p className="text-sm" style={{ color: '#ef4444' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: loading ? 'var(--text-secondary)' : 'var(--accent)',
                    color: 'var(--accent-text)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Enviando...' : 'Enviar link'}
                </button>
              </form>

              <div className="mt-6 text-sm text-center">
                <Link to="/login" style={{ color: 'var(--accent)' }}>
                  Volver al login
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default ResetPassword