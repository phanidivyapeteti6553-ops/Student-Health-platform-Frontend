import './ResourceCard.css'

const categoryColorMap = {
  'Mental Health': 'rc-mental',
  'Nutrition':     'rc-nutrition',
  'Fitness':       'rc-fitness',
  'Wellness':      'rc-wellness',
}

const categoryBadgeMap = {
  'Mental Health': 'badge-mental',
  'Nutrition':     'badge-nutrition',
  'Fitness':       'badge-fitness',
  'Wellness':      'badge-wellness',
}

export default function ResourceCard({ resource, showActions = false, onToggleStatus, onDelete }) {
  const bgClass    = categoryColorMap[resource.category] || 'rc-default'
  const badgeClass = categoryBadgeMap[resource.category] || ''

  return (
    <div className="vh-card resource-card h-100 d-flex flex-column">
      {/* Thumbnail */}
      <div className={`resource-thumb ${bgClass}`}>
        <span className="resource-emoji">{resource.emoji}</span>
        {/* Status badge for admin */}
        {showActions && (
          <span className={`resource-status-badge status-${resource.status}`}>
            {resource.status}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        <div className="mb-2">
          <span className={`resource-category-badge ${badgeClass}`}>
            {resource.category}
          </span>
        </div>
        <h5 className="resource-title">{resource.title}</h5>
        <p className="resource-desc flex-grow-1">{resource.description}</p>

        {/* Meta */}
        <div className="resource-meta d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <span className="meta-item">
              <i className="bi bi-clock" /> {resource.time} read
            </span>
            <span className="meta-item">
              <i className="bi bi-eye" /> {resource.views?.toLocaleString() || 0}
            </span>
          </div>
          {!showActions && (
            <button className="resource-read-btn">
              Read <i className="bi bi-arrow-right" />
            </button>
          )}
        </div>

        {/* Admin actions */}
        {showActions && (
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-sm admin-action-btn edit"
              title="Edit resource"
            >
              <i className="bi bi-pencil" /> Edit
            </button>
            <button
              className="btn btn-sm admin-action-btn toggle"
              onClick={() => onToggleStatus?.(resource.id)}
              title="Toggle status"
            >
              <i className={`bi ${resource.status === 'active' ? 'bi-pause-circle' : 'bi-play-circle'}`} />
              {resource.status === 'active' ? ' Pause' : ' Publish'}
            </button>
            <button
              className="btn btn-sm admin-action-btn delete"
              onClick={() => onDelete?.(resource.id)}
              title="Delete resource"
            >
              <i className="bi bi-trash" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="resource-footer">
        <span><i className="bi bi-person-circle" /> {resource.author}</span>
        <span><i className="bi bi-calendar3" /> {resource.date}</span>
      </div>
    </div>
  )
}
