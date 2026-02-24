import './ProgressBar.css'

export default function ProgressBar({ value = 0, color = 'var(--vh-sage)', label, height = 8, showLabel = true }) {
  const pct = Math.min(100, Math.max(0, value))

  return (
    <div className="vh-progress-wrap">
      {showLabel && (
        <div className="vh-progress-header">
          <span className="vh-progress-label">{label || `${pct}% complete`}</span>
          <span className="vh-progress-pct">{pct}%</span>
        </div>
      )}
      <div className="vh-progress-track" style={{ height }}>
        <div
          className="vh-progress-fill"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? `linear-gradient(90deg, ${color}, #7fb99a)`
              : `linear-gradient(90deg, ${color}cc, ${color})`,
          }}
        />
      </div>
    </div>
  )
}
