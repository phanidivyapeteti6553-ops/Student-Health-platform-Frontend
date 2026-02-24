import { useSelector, useDispatch } from 'react-redux'
import { setSearch, setCategoryFilter } from '../store/resourcesSlice.js'
import ResourceCard from '../components/ResourceCard.jsx'
import './Resources.css'

const CATEGORIES = ['All', 'Mental Health', 'Fitness', 'Nutrition', 'Wellness']

export default function Resources() {
  const dispatch = useDispatch()
  const { list, searchQuery, categoryFilter } = useSelector(s => s.resources)

  const filtered = list.filter(r => {
    if (r.status === 'inactive') return false
    const matchCat    = categoryFilter === 'All' || r.category === categoryFilter
    const matchSearch = !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="vh-page">
      <div className="container">

        {/* Page header */}
        <div className="row align-items-end mb-4 fade-up">
          <div className="col">
            <h2 className="vh-section-title">Health Resources</h2>
            <p className="vh-section-subtitle">Expert articles, guides, and tools curated by our wellness team</p>
          </div>
          <div className="col-auto">
            <span style={{ fontSize: 13, color: 'var(--vh-text-muted)', fontWeight: 600 }}>
              {filtered.length} resource{filtered.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="row g-3 mb-4 fade-up anim-d1">
          <div className="col-md-8">
            <div className="vh-search">
              <i className="bi bi-search" style={{ color: 'var(--vh-text-muted)' }} />
              <input
                placeholder="Search by topic, keyword, or author..."
                value={searchQuery}
                onChange={e => dispatch(setSearch(e.target.value))}
              />
              {searchQuery && (
                <button onClick={() => dispatch(setSearch(''))} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--vh-text-muted)' }}>
                  <i className="bi bi-x-circle" />
                </button>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="vh-input"
              value={categoryFilter}
              onChange={e => dispatch(setCategoryFilter(e.target.value))}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="d-flex gap-2 flex-wrap mb-4 fade-up anim-d2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`category-pill ${categoryFilter === c ? 'active' : ''}`}
              onClick={() => dispatch(setCategoryFilter(c))}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Resource grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-5 fade-in">
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <h5 style={{ color: 'var(--vh-forest)' }}>No resources found</h5>
            <p style={{ color: 'var(--vh-text-muted)' }}>Try adjusting your search or filter.</p>
            <button className="btn btn-vh-outline btn-sm" onClick={() => { dispatch(setSearch('')); dispatch(setCategoryFilter('All')) }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="row g-4 fade-up anim-d2">
            {filtered.map((resource, i) => (
              <div
                className="col-md-6 col-lg-4 fade-up"
                key={resource.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
