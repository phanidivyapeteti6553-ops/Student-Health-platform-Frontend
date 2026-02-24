/**
 * Profile.jsx
 * -----------
 * Displays the logged-in user's profile details (name, email, role, etc.)
 * in a card layout.
 *
 * Data source: AuthContext (which mirrors localStorage key "vh_user")
 * Logout:      Clears auth state + localStorage, then redirects to /login
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Profile.css'

export default function Profile() {
  /* ── Auth context provides user object and logout fn ─── */
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  /* ── Logout handler ─────────────────────────────────── */
  const handleLogout = () => {
    logout()                  // clears user state & removes vh_user from localStorage
    navigate('/login')        // redirect to login page
  }

  /* ── Guard: shouldn't normally reach this (ProtectedRoute) ── */
  if (!user) {
    return (
      <div className="vh-page">
        <div className="container">
          <div className="profile-container">
            <p style={{ color: 'var(--vh-text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              Please log in to view your profile.
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Format join date for display ───────────────────── */
  const formattedJoinDate = user.joinDate
    ? new Date(user.joinDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'N/A'

  return (
    <div className="vh-page">
      <div className="container">
        <div className="profile-container">

          {/* ── Page header ────────────────────────────── */}
          <div className="profile-header">
            <h1>My Profile</h1>
            <p>Your account information and settings</p>
          </div>

          {/* ── Profile card ───────────────────────────── */}
          <div className="profile-card">

            {/* Avatar & name row */}
            <div className="profile-top">
              <div className="profile-avatar">{user.avatar}</div>
              <div className="profile-info-top">
                <h2>{user.name}</h2>
                <p className="profile-role">
                  {user.role === 'admin' ? '⚙️ Administrator' : '👤 Student'}
                </p>
              </div>
            </div>

            <hr className="profile-divider" />

            {/* ── Account details list ─────────────────── */}
            <div className="profile-details">

              {/* Full name */}
              <div className="detail-row">
                <span className="detail-label">
                  <i className="bi bi-person me-2" />Name:
                </span>
                <span className="detail-value">{user.name}</span>
              </div>

              {/* Email */}
              <div className="detail-row">
                <span className="detail-label">
                  <i className="bi bi-envelope me-2" />Email:
                </span>
                <span className="detail-value">{user.email}</span>
              </div>

              {/* Role */}
              <div className="detail-row">
                <span className="detail-label">
                  <i className="bi bi-shield-check me-2" />Role:
                </span>
                <span className="detail-value">
                  {user.role === 'admin' ? 'Administrator' : 'Student'}
                </span>
              </div>

              {/* User ID */}
              <div className="detail-row">
                <span className="detail-label">
                  <i className="bi bi-fingerprint me-2" />User ID:
                </span>
                <span className="detail-value" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {user.id}
                </span>
              </div>

              {/* Member since */}
              <div className="detail-row">
                <span className="detail-label">
                  <i className="bi bi-calendar-event me-2" />Member Since:
                </span>
                <span className="detail-value">{formattedJoinDate}</span>
              </div>

              {/* Wellness score — students only */}
              {user.role === 'student' && (
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-heart-pulse me-2" />Wellness Score:
                  </span>
                  <span className="detail-value">{user.wellnessScore ?? 50}/100</span>
                </div>
              )}

              {/* Enrolled programs count — students only */}
              {user.role === 'student' && (
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-trophy me-2" />Enrolled Programs:
                  </span>
                  <span className="detail-value">{user.enrolled?.length ?? 0}</span>
                </div>
              )}
            </div>

            <hr className="profile-divider" />

            {/* ── Action buttons ───────────────────────── */}
            <div className="profile-actions">
              {/* Back to dashboard (role-aware) */}
              <button
                className="btn-primary-action"
                onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}
              >
                <i className="bi bi-arrow-left me-2" />
                Back to Dashboard
              </button>

              {/* Logout */}
              <button className="btn-danger-action" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2" />
                Logout
              </button>
            </div>

          </div>{/* end .profile-card */}

        </div>
      </div>
    </div>
  )
}
