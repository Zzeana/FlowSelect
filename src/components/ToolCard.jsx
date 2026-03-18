import { Link } from 'react-router-dom'
import { useSaved } from '../hooks/useSaved'
import './ToolCard.css'

const effortColors = { Low: 'success', Medium: 'warning', High: 'danger' }
const curveColors  = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' }

export default function ToolCard({ tool, rank, showAddToCompare, onAddToCompare, inCompare, matchExplanation }) {
  const { isSaved, toggle } = useSaved(tool.id)

  return (
    <div className={`tool-card card card-link ${inCompare ? 'in-compare' : ''}`}>
      <div className="tool-card-header">
        <div className="tool-card-meta">
          {rank && <span className="rank-badge">#{rank}</span>}
          <span className="badge">{tool.category}</span>
        </div>
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => toggle(tool)}
          title={isSaved ? 'Remove from saved' : 'Save tool'}
          aria-label={isSaved ? 'Remove from saved' : 'Save tool'}
        >
          {isSaved ? '★' : '☆'}
        </button>
      </div>

      <Link to={`/tool/${tool.id}`} className="tool-card-body">
        <h3 className="tool-name">{tool.name}</h3>

        {matchExplanation && (
          <p className="match-explanation">{matchExplanation}</p>
        )}

        <p className="tool-summary">{tool.summary}</p>

        <div className="tool-card-stats">
          <span className={`badge badge-${effortColors[tool.effortLevel]}`}>
            {tool.effortLevel} effort
          </span>
          <span className={`badge badge-${curveColors[tool.learningCurve]}`}>
            {tool.learningCurve}
          </span>
          <span className="badge">{tool.pricing.tier}</span>
        </div>

        <p className="tool-pricing">{tool.pricing.range}</p>
      </Link>

      <div className="tool-card-footer">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          onClick={e => e.stopPropagation()}
        >
          Visit ↗
        </a>

        {showAddToCompare && (
          <button
            className={`btn btn-sm ${inCompare ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onAddToCompare(tool)}
          >
            {inCompare ? '✓ In comparison' : '+ Compare'}
          </button>
        )}
      </div>

      <p className="tool-updated">Updated {tool.lastUpdated}</p>
    </div>
  )
}
