import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

export default function Login() {
  const { login, error, setError } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  const handleChange = e => {
    setError('')
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // simulate async
    const ok = login(form.email, form.password)
    setLoading(false)
    if (ok) navigate('/')
  }

  const quickLogin = (role) => {
    const creds = role === 'student'
      ? { email: 'student@vitality.edu', password: 'student123' }
      : { email: 'admin@vitality.edu',   password: 'admin123' }
    setForm(creds)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span style={{ fontSize: '1.6rem' }}>🌿</span>
          <span className="auth-logo">Vitality<span>Hub</span></span>
        </div>
        <p style={{ color: 'var(--vh-text-muted)', marginBottom: 28, fontSize: 14 }}>
          Welcome back! Sign in to continue.
        </p>

        {/* Quick login pills */}
        <div className="d-flex gap-2 mb-4">
          <button className="quick-login-pill" onClick={() => quickLogin('student')}>
            👤 Student Demo
          </button>
          <button className="quick-login-pill admin" onClick={() => quickLogin('admin')}>
            ⚙️ Admin Demo
          </button>
        </div>

        <div className="auth-divider"><span>or sign in manually</span></div>

        {/* Error */}
        {error && (
          <div className="auth-error fade-in">
            <i className="bi bi-exclamation-circle me-2" />{error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <i className="bi bi-envelope auth-input-icon" />
              <input
                className="vh-input ps-5"
                type="email"
                name="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <i className="bi bi-lock auth-input-icon" />
              <input
                className="vh-input ps-5 pe-5"
                type={showPw ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(p => !p)}>
                <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-vh-primary w-100 py-3" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
              : <><i className="bi bi-box-arrow-in-right me-2" />Sign In</>
            }
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: 14, color: 'var(--vh-text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--vh-sage)', fontWeight: 700 }}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}
