/**
 * Navbar.jsx
 * ----------
 * Responsive navigation bar.
 *
 * - Logged-IN users  → nav links (role-based) + custom avatar dropdown
 *                       with Profile link & Logout button
 * - Logged-OUT users → Login and Register links only
 *
 * NOTE: Uses React state for the dropdown (no Bootstrap JS required).
 */

import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  /* ── Dropdown open/close state ───────────────────────── */
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /* ── Logout handler ──────────────────────────────────── */
  const handleLogout = () => {
    setDropdownOpen(false)
    logout()           // clears AuthContext state & removes vh_user from localStorage
    navigate('/login')
  }

  /* ── Navigate to profile ─────────────────────────────── */
  const goToProfile = () => {
    setDropdownOpen(false)
    navigate('/profile')
  }

  /* ── Role-based navigation links ─────────────────────── */
  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
    { to: '/programs', label: 'Programs', icon: 'bi-trophy' },
    { to: '/resources', label: 'Resources', icon: 'bi-journal-bookmark' },
    { to: '/support', label: 'Support', icon: 'bi-heart-pulse' },
  ]

  const adminLinks = [
    { to: '/admin', label: 'Admin Panel', icon: 'bi-speedometer2' },
  ]

  const links = user?.role === 'admin' ? adminLinks : studentLinks

  return (
    <nav className="navbar navbar-expand-lg vh-navbar sticky-top">
      <div className="container">

        {/* ── Brand ─────────────────────────────────────── */}
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/'}
        >
          <span style={{ fontSize: '1.4rem' }}>🌿</span>
          Vitality<span>Hub</span>
        </NavLink>

        {/* ── Mobile toggler ────────────────────────────── */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#vhNav"
          style={{ color: 'var(--vh-cream)' }}
        >
          <i className="bi bi-list" style={{ fontSize: '1.5rem', color: 'var(--vh-cream)' }} />
        </button>

        {/* ── Collapsible content ───────────────────────── */}
        <div className="collapse navbar-collapse" id="vhNav">

          {user ? (
            /* ── LOGGED IN ─────────────────────────────── */
            <>
              {/* Role-based nav links */}
              <ul className="navbar-nav mx-auto gap-1">
                {links.map(l => (
                  <li className="nav-item" key={l.to}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                      }
                    >
                      <i className={`bi ${l.icon}`} />
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Right side: role badge + avatar dropdown */}
              <div className="d-flex align-items-center gap-3">
                <span className="vh-role-badge">
                  {user.role === 'admin' ? '⚙️ Admin' : '👤 Student'}
                </span>

                {/* ── Custom React dropdown ────────────── */}
                <div className="vh-dropdown-wrap" ref={dropdownRef} style={{ position: 'relative' }}>

                  {/* Avatar toggle button */}
                  <div
                    className="vh-avatar"
                    role="button"
                    title={user.name}
                    onClick={() => setDropdownOpen(prev => !prev)}
                    style={{ userSelect: 'none' }}
                  >
                    {user.avatar}
                  </div>

                  {/* Dropdown panel */}
                  {dropdownOpen && (
                    <div
                      className="vh-dropdown-menu"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 10px)',
                        minWidth: '200px',
                        background: '#fff',
                        borderRadius: 'var(--vh-radius)',
                        border: '1px solid var(--vh-border)',
                        boxShadow: 'var(--vh-shadow)',
                        zIndex: 1050,
                        animation: 'fadeUp 0.15s ease',
                        overflow: 'hidden',
                      }}
                    >
                      {/* User info header */}
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                        <div style={{ fontWeight: 600, color: 'var(--vh-forest)', fontSize: '14px' }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--vh-text-muted)' }}>
                          {user.email}
                        </div>
                      </div>

                      {/* Profile link */}
                      <button
                        onClick={goToProfile}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          width: '100%', padding: '10px 16px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '14px', color: 'var(--vh-text)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(127,185,154,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <i className="bi bi-person" style={{ color: 'var(--vh-sage)' }} />
                        My Profile
                      </button>

                      <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)' }} />

                      {/* Logout button */}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          width: '100%', padding: '10px 16px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '14px', color: '#c13030',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(193,48,48,0.07)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <i className="bi bi-box-arrow-right" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* ── LOGGED OUT: show Login + Register ──────── */
            <div className="d-flex align-items-center gap-2 ms-auto">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                }
              >
                <i className="bi bi-box-arrow-in-right" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'var(--vh-cream)', color: 'var(--vh-forest)',
                  fontWeight: 600, borderRadius: 'var(--vh-radius-sm)',
                  padding: '0.4rem 1rem', fontSize: '14px',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                <i className="bi bi-person-plus" />
                Register
              </NavLink>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}
