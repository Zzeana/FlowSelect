import { useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { tools } from '../data/tools'
import { recommendTools } from '../data/taskMappings'
import ToolCard from '../components/ToolCard'
import TaskInput from '../components/TaskInput'
import './RecommendationsPage.css'

export default function RecommendationsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [compareList, setCompareList] = useState([])

  const results = recommendTools(query, tools)

  const toggleCompare = (tool) => {
    setCompareList(prev => {
      if (prev.find(t => t.id === tool.id)) return prev.filter(t => t.id !== tool.id)
      if (prev.length >= 4) return prev
      return [...prev, tool]
    })
  }

  return (
    <div className="page">
      <div className="reco-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Recommendations</span>
          </nav>

          <h1 className="reco-title">
            {results.length > 0
              ? `${results.length} tools for your task`
              : 'No exact matches found'}
          </h1>
          <p className="reco-query">"{query}"</p>

          <div className="reco-task-input">
            <TaskInput initialValue={query} />
          </div>
        </div>
      </div>

      <div className="container reco-body">
        {results.length > 0 ? (
          <>
            {/* Compare bar */}
            {compareList.length > 1 && (
              <div className="compare-bar">
                <div className="compare-bar-tools">
                  {compareList.map(t => (
                    <span key={t.id} className="compare-bar-tool">
                      {t.name}
                      <button onClick={() => toggleCompare(t)} aria-label={`Remove ${t.name}`}>×</button>
                    </span>
                  ))}
                </div>
                <Link
                  to={`/compare?tools=${compareList.map(t => t.id).join(',')}`}
                  className="btn btn-primary btn-sm"
                >
                  Compare {compareList.length} tools →
                </Link>
              </div>
            )}

            <div className="reco-top">
              <div className="reco-best">
                <span className="badge badge-success">✓ Best for most people</span>
                <h2 className="reco-best-name">{results[0]?.name}</h2>
                <p className="reco-best-reason">{results[0]?.matchExplanation}</p>

                <div className="reco-best-details">
                  <div className="reco-detail">
                    <span className="reco-detail-label">Pricing</span>
                    <span className="reco-detail-value">{results[0]?.pricing.range}</span>
                  </div>
                  <div className="reco-detail">
                    <span className="reco-detail-label">Learning curve</span>
                    <span className="reco-detail-value">{results[0]?.learningCurve}</span>
                  </div>
                  <div className="reco-detail">
                    <span className="reco-detail-label">Effort level</span>
                    <span className="reco-detail-value">{results[0]?.effortLevel}</span>
                  </div>
                </div>

                <div className="reco-best-strengths">
                  <p className="section-label">Why it fits</p>
                  <ul>
                    {results[0]?.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="reco-best-actions">
                  <Link to={`/tool/${results[0]?.id}`} className="btn btn-primary">
                    See full details →
                  </Link>
                  <a href={results[0]?.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Visit {results[0]?.name} ↗
                  </a>
                  <button
                    className={`btn btn-ghost ${compareList.find(t => t.id === results[0]?.id) ? 'btn-primary' : ''}`}
                    onClick={() => toggleCompare(results[0])}
                  >
                    + Compare
                  </button>
                </div>
              </div>

              {results[0] && (
                <div className="reco-when-not">
                  <p className="section-label">⚠️ When NOT to use {results[0].name}</p>
                  <ul>
                    {results[0].worstUseCases.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {results.length > 1 && (
              <>
                <div className="divider" />
                <p className="section-label">Other strong options</p>
                <div className="reco-others">
                  {results.slice(1).map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      rank={i + 2}
                      matchExplanation={tool.matchExplanation}
                      showAddToCompare
                      onAddToCompare={toggleCompare}
                      inCompare={!!compareList.find(t => t.id === tool.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Compare CTA */}
            <div className="reco-compare-cta card">
              <h3>Still not sure which tool to choose?</h3>
              <p className="text-muted text-sm">Select 2–4 tools and compare them side by side — strengths, weaknesses, pricing, and when NOT to use each.</p>
              <Link
                to={`/compare?tools=${results.slice(0, 2).map(t => t.id).join(',')}`}
                className="btn btn-secondary"
              >
                Compare top 2 tools →
              </Link>
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="empty-state">
              <div className="empty-state-icon">🤔</div>
              <h3>No exact matches found</h3>
              <p>Try rephrasing your task or browse tools by workflow stage.</p>
            </div>

            <div className="no-results-suggestions">
              <p className="section-label">Try these example tasks</p>
              <div className="suggestions-grid">
                {[
                  'Analyze 30 user interview transcripts',
                  'Create a mood board for a redesign',
                  'Build a website prototype quickly',
                  'Run a usability test on a Figma prototype',
                  'Write UX copy for onboarding screens',
                  'Map the user journey for checkout',
                ].map(s => (
                  <Link key={s} to={`/recommend?q=${encodeURIComponent(s)}`} className="suggestion-chip">
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div className="browse-stages">
              <p className="section-label">Or browse by workflow stage</p>
              <div className="stage-links">
                {['research', 'synthesis', 'ideation', 'prototyping', 'testing'].map(s => (
                  <Link key={s} to={`/stage/${s}`} className="btn btn-secondary">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
