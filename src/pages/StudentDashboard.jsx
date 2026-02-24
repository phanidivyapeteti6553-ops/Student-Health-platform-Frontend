import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext.jsx'
import { useWellnessScore, useAppointments } from '../hooks/useData.js'
import ProgressBar from '../components/ProgressBar.jsx'
import './StudentDashboard.css'

/* ── Wellness Ring (SVG) ────────────────────────── */
function WellnessRing({ score }) {
  const r = 46, circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <svg width="110" height="110">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a7c59" />
          <stop offset="100%" stopColor="#7fb99a" />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#e8dcc8" strokeWidth="10" />
      <circle cx="55" cy="55" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.2s ease' }}
      />
      <text x="55" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1a3a2a" fontFamily="Playfair Display, serif">{score}</text>
      <text x="55" y="65" textAnchor="middle" fontSize="10" fill="#5a7060">/ 100</text>
    </svg>
  )
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const programs  = useSelector(s => s.programs.list)
  const { data: wellnessData, isLoading: wLoading } = useWellnessScore(user?.id)
  const { data: appointments, isLoading: aLoading }  = useAppointments(user?.id)

  const enrolled   = programs.filter(p => user?.enrolled?.includes(p.id) || p.progress > 0)
  const inProgress = enrolled.filter(p => p.progress > 0 && p.progress < 100)

  return (
    <div className="vh-page">
      <div className="container">

        {/* ── Welcome banner ─────────────────────── */}
        <div className="student-welcome-banner fade-up mb-4">
          <div>
            <h2 className="mb-1">Good {getGreeting()}, {user?.name?.split(' ')[0]} 👋</h2>
            <p style={{ color: 'rgba(245,240,232,0.75)', margin: 0 }}>
              Here's a snapshot of your wellness journey today.
            </p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/programs" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--vh-cream)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600 }}>
              <i className="bi bi-trophy me-1" />Browse Programs
            </Link>
            <Link to="/support" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--vh-cream)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600 }}>
              <i className="bi bi-heart-pulse me-1" />Get Support
            </Link>
          </div>
        </div>

        {/* ── Quick categories ─────────────────── */}
        <div className="row g-3 mb-4 fade-up anim-d1">
          {[
            { icon: '🧠', label: 'Mental Health', cls: 'mental',    to: '/support' },
            { icon: '🏃', label: 'Fitness',       cls: 'fitness',   to: '/programs' },
            { icon: '🥗', label: 'Nutrition',     cls: 'nutrition', to: '/resources' },
            { icon: '🆘', label: 'Crisis Help',   cls: 'wellness',  to: '/support' },
          ].map(c => (
            <div className="col-6 col-md-3" key={c.label}>
              <Link to={c.to} style={{ textDecoration: 'none' }}>
                <div className={`quick-cat-card ${c.cls} text-center`}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--vh-forest)' }}>{c.label}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ── Main grid: Programs + Sidebar ────── */}
        <div className="row g-4">
          {/* Left - programs & recent resources */}
          <div className="col-lg-8">

            {/* In-progress programs */}
            <div className="vh-card p-4 mb-4 fade-up anim-d2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Active Programs</h4>
                <Link to="/programs" style={{ color: 'var(--vh-sage)', fontSize: 14, fontWeight: 600 }}>
                  View all <i className="bi bi-arrow-right" />
                </Link>
              </div>
              {enrolled.length === 0 ? (
                <div className="empty-state">
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌱</div>
                  <p>You haven't enrolled in any programs yet.</p>
                  <Link to="/programs" className="btn btn-vh-outline btn-sm">Browse Programs</Link>
                </div>
              ) : (
                enrolled.slice(0, 3).map(prog => (
                  <div key={prog.id} className="enrolled-prog-row d-flex align-items-center gap-3 mb-3">
                    <div className="prog-mini-thumb" style={{ background: prog.color }}>{prog.emoji}</div>
                    <div className="flex-grow-1">
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--vh-forest)', marginBottom: 4 }}>{prog.title}</div>
                      <ProgressBar value={prog.progress} color={prog.colorSolid} height={6} showLabel={false} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: prog.colorSolid, minWidth: 36 }}>
                      {prog.progress}%
                    </span>
                    <button className="btn btn-sm" style={{ background: 'var(--vh-sage)', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, padding: '6px 14px' }}>
                      Continue
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Recommended resources */}
            <div className="vh-card p-4 fade-up anim-d3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Recommended Resources</h4>
                <Link to="/resources" style={{ color: 'var(--vh-sage)', fontSize: 14, fontWeight: 600 }}>
                  See all <i className="bi bi-arrow-right" />
                </Link>
              </div>
              <div className="row g-3">
                {[
                  { emoji: '🧠', title: 'Managing Academic Stress', time: '9 min', cat: 'Mental Health', catCls: 'badge-mental' },
                  { emoji: '💪', title: '15-Min Dorm Room Workouts', time: '4 min', cat: 'Fitness', catCls: 'badge-fitness' },
                  { emoji: '🌙', title: 'Sleep Hygiene for Exams', time: '6 min', cat: 'Wellness', catCls: 'badge-wellness' },
                ].map((r, i) => (
                  <div className="col-md-4" key={i}>
                    <div className="mini-resource-card h-100">
                      <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{r.emoji}</div>
                      <span className={`resource-category-badge ${r.catCls} mb-2 d-inline-block`}>{r.cat}</span>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--vh-forest)', lineHeight: 1.4 }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--vh-text-muted)', marginTop: 8 }}>
                        <i className="bi bi-clock me-1" />{r.time} read
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Wellness score + Appointments */}
          <div className="col-lg-4">

            {/* Wellness score */}
            <div className="vh-card p-4 mb-4 fade-up anim-d2">
              <h4 className="mb-3">Wellness Score</h4>
              {wLoading ? (
                <div className="text-center py-3"><div className="spinner-border spinner-border-sm text-secondary" /></div>
              ) : (
                <>
                  <div className="wellness-ring-wrap mb-3">
                    <WellnessRing score={wellnessData?.overall || 70} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--vh-forest)' }}>Good Standing</div>
                      <div style={{ fontSize: 12, color: 'var(--vh-text-muted)', marginTop: 4 }}>Keep it up! 🎉</div>
                    </div>
                  </div>
                  <div className="wellness-dims">
                    {(wellnessData?.dimensions || []).map(d => (
                      <div className="dim-row" key={d.label}>
                        <span className="dim-label">{d.label}</span>
                        <div className="dim-track">
                          <div className="dim-fill" style={{ width: `${d.value}%`, background: d.color }} />
                        </div>
                        <span className="dim-val">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Upcoming appointments */}
            <div className="vh-card p-4 fade-up anim-d3">
              <h4 className="mb-3">Upcoming Appointments</h4>
              {aLoading ? (
                <div className="text-center py-2"><div className="spinner-border spinner-border-sm text-secondary" /></div>
              ) : (
                <>
                  {appointments?.map(a => (
                    <div key={a.id} className="appt-item">
                      <div className="appt-dot" style={{ background: a.color }} />
                      <div className="flex-grow-1">
                        <div className="appt-name">{a.provider}</div>
                        <div className="appt-time">{a.date} · {a.time}</div>
                      </div>
                      <span className="appt-type-lbl">{a.type}</span>
                    </div>
                  ))}
                  <Link to="/support" className="btn btn-vh-outline btn-sm w-100 mt-2" style={{ fontSize: 13 }}>
                    <i className="bi bi-calendar-plus me-1" />Book Appointment
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
