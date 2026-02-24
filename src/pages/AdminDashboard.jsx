import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleResourceStatus, deleteResource, addResource } from '../store/resourcesSlice.js'
import { toggleProgramStatus } from '../store/programsSlice.js'
import { useTopResources } from '../hooks/useData.js'
import ResourceCard from '../components/ResourceCard.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import './AdminDashboard.css'

const METRICS = [
  { icon: 'bi-people-fill',          label: 'Active Students',    val: '2,847', change: '+12%', dir: 'up',   bg: 'rgba(127,185,154,0.12)' },
  { icon: 'bi-journal-bookmark-fill', label: 'Resources Published', val: '134',   change: '+8',  dir: 'up',   bg: 'rgba(106,172,204,0.12)' },
  { icon: 'bi-trophy-fill',           label: 'Program Enrollments', val: '1,204', change: '+24%', dir: 'up',  bg: 'rgba(155,137,180,0.12)' },
  { icon: 'bi-calendar-check-fill',   label: 'Appointments Today',  val: '38',    change: '-3',  dir: 'down', bg: 'rgba(196,130,74,0.12)'  },
]

const TABS = ['overview', 'resources', 'programs', 'analytics']

export default function AdminDashboard() {
  const dispatch    = useDispatch()
  const resources   = useSelector(s => s.resources.list)
  const programs    = useSelector(s => s.programs.list)
  const [activeTab, setActiveTab] = useState('overview')
  const [search, setSearch]       = useState('')
  const { data: topResources, isLoading } = useTopResources()

  const filteredResources = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="vh-page">
      <div className="container">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3 fade-up">
          <div>
            <h2 className="vh-section-title">Admin Dashboard</h2>
            <p className="vh-section-subtitle">Manage your platform, resources, and student wellness</p>
          </div>
          <div className="admin-date-badge">
            <i className="bi bi-calendar3 me-2" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Tabs */}
        <div className="vh-tabs mb-4 fade-up anim-d1">
          {TABS.map(t => (
            <button key={t} className={`vh-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <>
            {/* Metric cards */}
            <div className="row g-3 mb-4 fade-up">
              {METRICS.map(m => (
                <div className="col-md-6 col-lg-3" key={m.label}>
                  <div className="stat-card">
                    <div className="stat-icon-box" style={{ background: m.bg }}>
                      <i className={`bi ${m.icon}`} />
                    </div>
                    <div className="stat-val">{m.val}</div>
                    <div className="stat-lbl">{m.label}</div>
                    <div className={`stat-change ${m.dir}`}>
                      <i className={`bi bi-arrow-${m.dir === 'up' ? 'up' : 'down'}-short`} />
                      {m.change} this week
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Announcement + recent resources */}
            <div className="row g-4 fade-up anim-d2">
              <div className="col-lg-7">
                <div className="vh-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Recent Resources</h4>
                    <button className="btn btn-sm btn-vh-primary" onClick={() => setActiveTab('resources')}>
                      Manage All
                    </button>
                  </div>
                  <table className="vh-table">
                    <thead>
                      <tr><th>Title</th><th>Category</th><th>Views</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {resources.slice(0, 5).map(r => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 500 }}>{r.title}</td>
                          <td><span className={`badge-${r.category.toLowerCase().replace(' ', '')} resource-category-badge`}>{r.category}</span></td>
                          <td>{r.views?.toLocaleString()}</td>
                          <td><span className={`status-${r.status}`}>{r.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="vh-card p-4">
                  <h4 className="mb-3">Platform Health</h4>
                  {[
                    { label: 'Student Satisfaction', val: 91, color: '#4a7c59' },
                    { label: 'Resource Engagement',  val: 74, color: '#6aaccc' },
                    { label: 'Program Completion',   val: 62, color: '#9b89b4' },
                    { label: 'Appointment Uptake',   val: 55, color: '#c4824a' },
                  ].map(m => (
                    <div key={m.label} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ fontSize: 13, color: 'var(--vh-text-muted)' }}>{m.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--vh-forest)' }}>{m.val}%</span>
                      </div>
                      <div className="dim-track">
                        <div className="dim-fill" style={{ width: `${m.val}%`, background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── RESOURCES ─── */}
        {activeTab === 'resources' && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h4 className="mb-0">Manage Resources</h4>
              <button className="btn btn-vh-primary btn-sm">
                <i className="bi bi-plus-circle me-1" />Add Resource
              </button>
            </div>

            <div className="vh-search mb-4" style={{ maxWidth: 500 }}>
              <i className="bi bi-search" style={{ color: 'var(--vh-text-muted)' }} />
              <input placeholder="Search by title or category..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            {/* Table view */}
            <div className="vh-card p-0 mb-4 overflow-hidden">
              <table className="vh-table">
                <thead>
                  <tr><th>Resource</th><th>Category</th><th>Author</th><th>Views</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredResources.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--vh-forest)' }}>{r.emoji} {r.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--vh-text-muted)' }}>{r.time} read · by {r.author}</div>
                      </td>
                      <td><span className={`resource-category-badge badge-${r.category.toLowerCase().replace(' ','')}`}>{r.category}</span></td>
                      <td style={{ fontSize: 13 }}>{r.author}</td>
                      <td style={{ fontSize: 13 }}>{r.views?.toLocaleString()}</td>
                      <td><span className={`status-${r.status}`}>{r.status}</span></td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="admin-tbl-btn edit" title="Edit"><i className="bi bi-pencil" /></button>
                          <button className="admin-tbl-btn toggle" onClick={() => dispatch(toggleResourceStatus(r.id))} title="Toggle status">
                            <i className={`bi ${r.status === 'active' ? 'bi-pause-circle' : 'bi-play-circle'}`} />
                          </button>
                          <button className="admin-tbl-btn delete" onClick={() => dispatch(deleteResource(r.id))} title="Delete">
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PROGRAMS ─── */}
        {activeTab === 'programs' && (
          <div className="fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h4 className="mb-0">Manage Programs</h4>
              <button className="btn btn-vh-primary btn-sm">
                <i className="bi bi-plus-circle me-1" />New Program
              </button>
            </div>
            {programs.map(p => (
              <ProgramCard
                key={p.id}
                program={p}
                showAdminActions
                onAdminToggle={id => dispatch(toggleProgramStatus(id))}
              />
            ))}
          </div>
        )}

        {/* ── ANALYTICS ─── */}
        {activeTab === 'analytics' && (
          <div className="fade-in">
            <h4 className="mb-4">Platform Analytics</h4>
            <div className="row g-3 mb-4">
              {[
                { label: 'Avg. Wellness Score',   val: '68.4', sub: 'Platform average' },
                { label: 'Weekly Active Users',   val: '1,832', sub: '↑ 14% vs last week' },
                { label: 'Appointments (Month)',  val: '286',   sub: 'Completed sessions' },
                { label: 'Satisfaction Rate',     val: '91%',   sub: 'Post-session survey' },
              ].map(m => (
                <div className="col-md-6 col-lg-3" key={m.label}>
                  <div className="stat-card">
                    <div className="stat-val">{m.val}</div>
                    <div className="stat-lbl">{m.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--vh-text-muted)', marginTop: 6 }}>{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top resources table */}
            <div className="vh-card p-4 mb-4">
              <h5 className="mb-3">Top Resources This Month</h5>
              {isLoading ? (
                <div className="text-center py-3"><div className="spinner-border spinner-border-sm text-secondary" /></div>
              ) : (
                <table className="vh-table">
                  <thead><tr><th>Resource</th><th>Views</th><th>Category</th><th>Avg. Time</th></tr></thead>
                  <tbody>
                    {topResources?.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>{r.title}</td>
                        <td>{r.views.toLocaleString()}</td>
                        <td><span className={`resource-category-badge badge-${r.category.toLowerCase().replace(' ','')}`}>{r.category}</span></td>
                        <td style={{ fontSize: 13 }}>{r.avgTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Weekly usage visual */}
            <div className="vh-card p-4">
              <h5 className="mb-3">Weekly Active Users</h5>
              <div className="analytics-bar-chart">
                {[
                  { week: 'Jan W1', users: 1420 },
                  { week: 'Jan W2', users: 1580 },
                  { week: 'Jan W3', users: 1690 },
                  { week: 'Jan W4', users: 1750 },
                  { week: 'Feb W1', users: 1832 },
                ].map(d => {
                  const pct = (d.users / 2000) * 100
                  return (
                    <div key={d.week} className="chart-bar-col">
                      <div className="chart-bar-val">{d.users.toLocaleString()}</div>
                      <div className="chart-bar-wrap">
                        <div className="chart-bar-fill" style={{ height: `${pct}%` }} />
                      </div>
                      <div className="chart-bar-label">{d.week}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
