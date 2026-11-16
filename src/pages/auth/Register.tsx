import { Link } from 'react-router-dom'
import { useRegisterForm } from '../../hooks/auth/useRegisterForm'

const Register = () => {
  const {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error, loading, handleRegister
  } = useRegisterForm()

  const inputStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
  }

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
          <h2 className="text-2xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}>
            Crear cuenta
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            Completá tus datos para comenzar
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Nombre completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Pérez"
                required
                className="px-4 py-3 rounded-lg outline-none transition-all"
                style={inputStyle}
              />
            </div>

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
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-4 py-3 rounded-lg outline-none transition-all"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-4 py-3 rounded-lg outline-none transition-all"
                style={inputStyle}
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
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-6 text-sm text-center">
            <p style={{ color: 'var(--text-secondary)' }}>
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" style={{ color: 'var(--accent)' }}>
                Ingresá
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register