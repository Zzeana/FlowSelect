import { useParams, Link, useNavigate } from 'react-router-dom'
import { getToolById, tools } from '../data/tools'
import { getStageById } from '../data/stages'
import { useSaved } from '../hooks/useSaved'
import './ToolDetailPage.css'

const effortColors = { Low: 'success', Medium: 'warning', High: 'danger' }
const curveColors  = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' }

export default function ToolDetailPage() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const tool = getToolById(toolId)
  const { isSaved, toggle } = useSaved(toolId)

  if (!tool) {
    return (
      <div className="page container" style={{ paddingTop: 64 }}>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Tool not found</h3>
          <Link to="/" className="btn btn-primary mt-4">Back to home</Link>
        </div>
      </div>
    )
  }

  // Related tools = same category or overlapping workflow stages
  const related = tools
    .filter(t => t.id !== tool.id && (
      t.category === tool.category ||
      t.workflowStages.some(s => tool.workflowStages.includes(s))
    ))
    .slice(0, 3)

  return (
    <div className="page">
      <div className="tool-detail-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            {tool.workflowStages[0] && (
              <>
                <Link to={`/stage/${tool.workflowStages[0]}`}>
                  {tool.workflowStages[0].charAt(0).toUpperCase() + tool.workflowStages[0].slice(1)}
                </Link>
                <span>›</span>
              </>
            )}
            <span>{tool.name}</span>
          </nav>

          <div className="tool-detail-hero">
            <div>
              <div className="tool-detail-meta">
                <span className="badge">{tool.category}</span>
                {tool.workflowStages.map(s => {
                  const stage = getStageById(s)
                  return stage ? (
                    <Link
                      key={s}
                      to={`/stage/${s}`}
                      className="badge"
                      style={{ background: stage.lightColor, color: stage.color }}
                    >
                      {stage.icon} {stage.name}
                    </Link>
                  ) : null
                })}
              </div>

              <h1 className="tool-detail-name">{tool.name}</h1>
              <p className="tool-detail-summary">{tool.summary}</p>

              <div className="tool-detail-stats">
                <div className="stat">
                  <span className="stat-label">Pricing</span>
                  <span className="stat-value">{tool.pricing.range}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Tier</span>
                  <span className="stat-value">{tool.pricing.tier}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Learning curve</span>
                  <span className={`badge badge-${curveColors[tool.learningCurve]}`}>{tool.learningCurve}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Effort level</span>
                  <span className={`badge badge-${effortColors[tool.effortLevel]}`}>{tool.effortLevel}</span>
                </div>
              </div>
            </div>

            <div className="tool-detail-actions">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Visit {tool.name} ↗
              </a>
              <button
                className={`btn btn-secondary ${isSaved ? 'saved' : ''}`}
                onClick={() => toggle(tool)}
              >
                {isSaved ? '★ Saved' : '☆ Save'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(`/compare?tools=${tool.id}`)}
              >
                + Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container tool-detail-body">
        <div className="tool-detail-grid">
          <div className="tool-detail-main">
            {/* Strengths */}
            <section className="detail-section">
              <h2 className="detail-section-title">✓ Strengths</h2>
              <ul className="detail-list strengths-list">
                {tool.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>

            {/* Weaknesses */}
            <section className="detail-section">
              <h2 className="detail-section-title">✗ Weaknesses</h2>
              <ul className="detail-list weaknesses-list">
                {tool.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </section>

            {/* Best use cases */}
            <section className="detail-section">
              <h2 className="detail-section-title">🎯 Best use cases</h2>
              <ul className="detail-list use-list">
                {tool.bestUseCases.map((u, i) => <li key={i}>{u}</li>)}
              </ul>
            </section>

            {/* Worst use cases */}
            <section className="detail-section warning-section">
              <h2 className="detail-section-title">⚠️ When NOT to use {tool.name}</h2>
              <ul className="detail-list notwhen-list">
                {tool.worstUseCases.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </section>
          </div>

          <aside className="tool-detail-sidebar">
            {/* Tags */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Tags</h3>
              <div className="tags">
                {tool.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>

            {/* Freshness */}
            <div className="sidebar-card freshness-card">
              <h3 className="sidebar-title">Data freshness</h3>
              <p className="freshness-date">Last verified: {tool.lastUpdated}</p>
              <p className="text-sm text-muted">
                We review all tool data every 60 days. AI tools change rapidly — always check the official site for latest pricing and features.
              </p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                style={{ marginTop: 8, paddingLeft: 0 }}
              >
                Visit official site ↗
              </a>
            </div>

            {/* Compare CTA */}
            <div className="sidebar-card compare-cta-card">
              <h3 className="sidebar-title">Not sure?</h3>
              <p className="text-sm text-muted mb-4">Compare {tool.name} side-by-side with similar tools to see clear differences.</p>
              <button
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => navigate(`/compare?tools=${tool.id}`)}
              >
                Compare with others →
              </button>
            </div>
          </aside>
        </div>

        {/* Related tools */}
        {related.length > 0 && (
          <section className="related-tools">
            <div className="divider" />
            <p className="section-label">Related tools</p>
            <div className="related-grid">
              {related.map(t => (
                <Link key={t.id} to={`/tool/${t.id}`} className="related-card card card-link">
                  <div className="related-meta">
                    <span className="badge">{t.category}</span>
                    <span className="badge">{t.pricing.tier}</span>
                  </div>
                  <h3>{t.name}</h3>
                  <p className="text-sm text-muted">{t.summary.substring(0, 100)}…</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
