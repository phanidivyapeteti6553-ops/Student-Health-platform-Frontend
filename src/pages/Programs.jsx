import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/programsSlice.js'
import { useAuth } from '../context/AuthContext.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import './Programs.css'

const CATEGORIES = ['All', 'Mental Health', 'Fitness', 'Nutrition', 'Wellness']

export default function Programs() {
  const dispatch  = useDispatch()
  const { user, updateEnrolled } = useAuth()
  const { list: programs, filter } = useSelector(s => s.programs)

  const [modal, setModal]     = useState(null) // program to confirm enroll
  const [toast, setToast]     = useState('')

  const filtered = programs.filter(p => {
    if (p.status === 'inactive') return false
    return filter === 'All' || p.category === filter
  })

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleEnroll = (id) => {
    const prog = programs.find(p => p.id === id)
    setModal(prog)
  }

  const confirmEnroll = () => {
    if (!modal) return
    updateEnrolled(modal.id, 'add')
    showToast(`✅ Enrolled in "${modal.title}"!`)
    setModal(null)
  }

  const handleUnenroll = (id) => {
    const prog = programs.find(p => p.id === id)
    updateEnrolled(id, 'remove')
    showToast(`Unenrolled from "${prog?.title}"`)
  }

  const myCount    = programs.filter(p => user?.enrolled?.includes(p.id) || p.progress > 0).length
  const activeCount = programs.filter(p => p.status === 'active').length

  return (
    <div className="vh-page">
      <div className="container">

        {/* Header */}
        <div className="row align-items-end mb-4 fade-up">
          <div className="col">
            <h2 className="vh-section-title">Wellness Programs</h2>
            <p className="vh-section-subtitle">Evidence-based programs designed for student health and performance</p>
          </div>
          <div className="col-auto d-flex gap-2">
            <div className="programs-stat-pill">
              <i className="bi bi-collection me-1" />{activeCount} programs
            </div>
            <div className="programs-stat-pill enrolled">
              <i className="bi bi-check-circle me-1" />{myCount} enrolled
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="d-flex gap-2 flex-wrap mb-4 fade-up anim-d1">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`category-pill ${filter === c ? 'active' : ''}`}
              onClick={() => dispatch(setFilter(c))}
            >
              {c}
            </button>
          ))}
        </div>

        {/* My enrolled section */}
        {myCount > 0 && (
          <div className="mb-5 fade-up anim-d1">
            <h5 style={{ color: 'var(--vh-forest)', marginBottom: 16 }}>
              <i className="bi bi-bookmark-star me-2" />My Programs
            </h5>
            {programs
              .filter(p => user?.enrolled?.includes(p.id) || p.progress > 0)
              .map(p => (
                <ProgramCard
                  key={p.id}
                  program={p}
                  isEnrolled
                  onUnenroll={handleUnenroll}
                />
              ))}
            <hr className="vh-divider my-4" />
          </div>
        )}

        {/* All programs */}
        <h5 style={{ color: 'var(--vh-forest)', marginBottom: 16 }} className="fade-up anim-d2">
          {filter === 'All' ? 'All Programs' : `${filter} Programs`}
        </h5>

        {filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏃</div>
            <p style={{ color: 'var(--vh-text-muted)' }}>No programs in this category yet.</p>
          </div>
        ) : (
          <div className="fade-up anim-d2">
            {filtered.map(prog => (
              <ProgramCard
                key={prog.id}
                program={prog}
                isEnrolled={user?.enrolled?.includes(prog.id) || prog.progress > 0}
                onEnroll={handleEnroll}
                onUnenroll={handleUnenroll}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Enroll confirmation modal ── */}
      {modal && (
        <div className="modal-backdrop-custom" onClick={() => setModal(null)}>
          <div className="enroll-modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>{modal.emoji}</div>
            <h4 style={{ color: 'var(--vh-forest)' }}>Enroll in Program?</h4>
            <p style={{ color: 'var(--vh-text-muted)', margin: '12px 0 20px' }}>{modal.description}</p>
            <div className="d-flex gap-3 mb-4 justify-content-center flex-wrap">
              <span className="program-tag"><i className="bi bi-clock me-1" />{modal.duration}</span>
              <span className="program-tag"><i className="bi bi-lightning me-1" />{modal.level}</span>
              <span className="program-tag"><i className="bi bi-collection me-1" />{modal.sessions} sessions</span>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-vh-outline" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-vh-primary" onClick={confirmEnroll}>
                <i className="bi bi-check-circle me-1" />Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="vh-toast fade-in">{toast}</div>
      )}
    </div>
  )
}
