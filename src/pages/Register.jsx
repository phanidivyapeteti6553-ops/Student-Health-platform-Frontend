import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

export default function Register() {
  const { register, error, setError } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '', role: 'student',
  })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  const handleChange = e => {
    setError('')
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const ok = register(form.name, form.email, form.password, form.role)
    setLoading(false)
    if (ok) navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 500 }}>
        {/* Logo */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span style={{ fontSize: '1.6rem' }}>🌿</span>
          <span className="auth-logo">Vitality<span>Hub</span></span>
        </div>
        <p style={{ color: 'var(--vh-text-muted)', marginBottom: 28, fontSize: 14 }}>
          Create your free account and start your wellness journey.
        </p>

        {/* Role toggle */}
        <div className="d-flex gap-2 mb-4">
          <button
            type="button"
            className={`auth-role-btn ${form.role === 'student' ? 'selected' : ''}`}
            onClick={() => setForm(p => ({ ...p, role: 'student' }))}
          >
            🎓 I'm a Student
          </button>
          <button
            type="button"
            className={`auth-role-btn ${form.role === 'admin' ? 'selected' : ''}`}
            onClick={() => setForm(p => ({ ...p, role: 'admin' }))}
          >
            ⚙️ I'm Staff / Admin
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error fade-in">
            <i className="bi bi-exclamation-circle me-2" />{error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="auth-label">Full Name</label>
            <div className="auth-input-wrap">
              <i className="bi bi-person auth-input-icon" />
              <input className="vh-input ps-5" type="text" name="name" placeholder="Jordan Smith" value={form.name} onChange={handleChange} autoComplete="name" />
            </div>
          </div>

          <div className="mb-3">
            <label className="auth-label">University Email</label>
            <div className="auth-input-wrap">
              <i className="bi bi-envelope auth-input-icon" />
              <input className="vh-input ps-5" type="email" name="email" placeholder="you@university.edu" value={form.email} onChange={handleChange} autoComplete="email" />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <i className="bi bi-lock auth-input-icon" />
                <input className="vh-input ps-5 pe-5" type={showPw ? 'text' : 'password'} name="password" placeholder="Min. 8 chars" value={form.password} onChange={handleChange} />
                <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(p => !p)}>
                  <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
            </div>
            <div className="col-6">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrap">
                <i className="bi bi-lock-fill auth-input-icon" />
                <input className="vh-input ps-5" type={showPw ? 'text' : 'password'} name="confirm" placeholder="Repeat password" value={form.confirm} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Password strength */}
          {form.password && (
            <div className="mb-3">
              <div className="pw-strength-bar">
                <div className="pw-strength-fill" style={{ width: `${Math.min(100, (form.password.length / 12) * 100)}%`, background: form.password.length >= 10 ? 'var(--vh-sage)' : form.password.length >= 6 ? 'var(--vh-amber)' : '#e06060' }} />
              </div>
              <small style={{ color: 'var(--vh-text-muted)', fontSize: 11 }}>
                Password strength: {form.password.length >= 10 ? 'Strong ✓' : form.password.length >= 6 ? 'Medium' : 'Weak'}
              </small>
            </div>
          )}

          <div className="mb-4">
            <label className="d-flex align-items-start gap-2" style={{ cursor: 'pointer', fontSize: 13, color: 'var(--vh-text-muted)' }}>
              <input type="checkbox" className="mt-1" required style={{ accentColor: 'var(--vh-sage)' }} />
              I agree to the{' '}
              <a href="#" style={{ color: 'var(--vh-sage)' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: 'var(--vh-sage)' }}>Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-vh-primary w-100 py-3" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Creating account...</>
              : <><i className="bi bi-person-plus me-2" />Create Account</>
            }
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: 14, color: 'var(--vh-text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--vh-sage)', fontWeight: 700 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
