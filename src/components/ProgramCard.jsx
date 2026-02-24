import ProgressBar from './ProgressBar.jsx'
import './ProgramCard.css'

const categoryBadge = {
  'Mental Health': 'badge-mental',
  'Fitness':       'badge-fitness',
  'Nutrition':     'badge-nutrition',
  'Wellness':      'badge-wellness',
}

export default function ProgramCard({ program, isEnrolled, onEnroll, onUnenroll, showAdminActions, onAdminToggle }) {
  const badgeClass = categoryBadge[program.category] || ''
  const hasProgress = isEnrolled && program.progress > 0

  return (
    <div className="vh-card program-card d-flex align-items-start gap-4 p-4 mb-3">
      {/* Emoji thumb */}
      <div className="program-card-thumb" style={{ background: program.color }}>
        {program.emoji}
      </div>

      {/* Info */}
      <div className="flex-grow-1 min-w-0">
        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
          <h5 className="program-card-title mb-0">{program.title}</h5>
          {program.status === 'inactive' && (
            <span className="status-inactive ms-1">inactive</span>
          )}
        </div>
        <p className="program-card-desc">{program.description}</p>

        {/* Tags */}
        <div className="d-flex flex-wrap gap-2 mb-2">
          <span className={`resource-category-badge ${badgeClass}`}>{program.category}</span>
          <span className="program-tag"><i className="bi bi-clock" /> {program.duration}</span>
          <span className="program-tag"><i className="bi bi-lightning" /> {program.level}</span>
          <span className="program-tag"><i className="bi bi-people" /> {program.enrolled?.toLocaleString()} enrolled</span>
        </div>

        {/* Progress bar */}
        {hasProgress && (
          <div className="mt-2" style={{ maxWidth: '360px' }}>
            <ProgressBar value={program.progress} color={program.colorSolid} label={`${program.progress}% complete`} />
          </div>
        )}
      </div>

      {/* Action */}
      <div className="d-flex flex-column gap-2 flex-shrink-0">
        {!showAdminActions ? (
          <>
            {isEnrolled ? (
              <button className="program-enroll-btn enrolled" onClick={() => onUnenroll?.(program.id)}>
                <i className="bi bi-check-circle-fill" /> Enrolled
              </button>
            ) : (
              <button className="program-enroll-btn not-enrolled" onClick={() => onEnroll?.(program.id)}>
                <i className="bi bi-plus-circle" /> Enroll
              </button>
            )}
            {isEnrolled && (
              <button className="program-continue-btn">
                <i className="bi bi-play-circle" /> Continue
              </button>
            )}
          </>
        ) : (
          <>
            <button className="btn btn-sm admin-action-btn edit" style={{ whiteSpace: 'nowrap' }}>
              <i className="bi bi-pencil" /> Edit
            </button>
            <button
              className="btn btn-sm admin-action-btn toggle"
              onClick={() => onAdminToggle?.(program.id)}
              style={{ whiteSpace: 'nowrap' }}
            >
              <i className={`bi ${program.status === 'active' ? 'bi-pause-circle' : 'bi-play-circle'}`} />
              {program.status === 'active' ? ' Pause' : ' Activate'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
