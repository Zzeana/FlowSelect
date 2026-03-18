import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToolById, tools } from '../data/tools'
import './ComparisonPage.css'

const DIMENSIONS = [
  { key: 'strengths', label: 'Strengths', icon: '✓' },
  { key: 'weaknesses', label: 'Weaknesses', icon: '−' },
  { key: 'bestUseCases', label: 'Best use cases', icon: '🎯' },
  { key: 'worstUseCases', label: 'When NOT to use', icon: '⚠️' },
  { key: 'pricing', label: 'Pricing', icon: '💰' },
  { key: 'learningCurve', label: 'Learning curve', icon: '📈' },
]

const effortColors = { Low: 'success', Medium: 'warning', High: 'danger' }
const curveColors  = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' }

export default function ComparisonPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const toolIds = (searchParams.get('tools') || '').split(',').filter(Boolean)
  const selectedTools = toolIds.map(id => getToolById(id)).filter(Boolean)

  const [search, setSearch] = useState('')
  const [mobileAccordion, setMobileAccordion] = useState({})

  // Sync share link
  useEffect(() => {
    if (selectedTools.length > 0) {
      setSearchParams({ tools: selectedTools.map(t => t.id).join(',') }, { replace: true })
    }
  }, [selectedTools.length])

  const addTool = (tool) => {
    if (selectedTools.find(t => t.id === tool.id)) return
    if (selectedTools.length >= 4) return
    const newIds = [...toolIds, tool.id]
    setSearchParams({ tools: newIds.join(',') })
    setSearch('')
  }

  const removeTool = (toolId) => {
    const newIds = toolIds.filter(id => id !== toolId)
    setSearchParams(newIds.length ? { tools: newIds.join(',') } : {})
  }

  const filteredSearch = search.trim().length > 1
    ? tools.filter(t =>
        !selectedTools.find(s => s.id === t.id) &&
        (t.name.toLowerCase().includes(search.toLowerCase()) ||
         t.category.toLowerCase().includes(search.toLowerCase()) ||
         t.tags.some(tag => tag.includes(search.toLowerCase())))
      ).slice(0, 6)
    : []

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyShare = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      alert('Comparison link copied to clipboard!')
    })
  }

  return (
    <div className="page">
      <div className="compare-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Compare Tools</span>
          </nav>
          <div className="compare-header-row">
            <div>
              <h1 className="compare-title">Compare AI Tools</h1>
              <p className="text-muted">Select 2–4 tools for side-by-side comparison</p>
            </div>
            {selectedTools.length > 1 && (
              <button className="btn btn-secondary btn-sm" onClick={copyShare}>
                📋 Copy share link
              </button>
            )}
          </div>

          {/* Tool picker */}
          <div className="tool-picker">
            <div className="selected-tools">
              {selectedTools.map(tool => (
                <div key={tool.id} className="selected-pill">
                  <span>{tool.name}</span>
                  <button onClick={() => removeTool(tool.id)} aria-label={`Remove ${tool.name}`}>×</button>
                </div>
              ))}
              {selectedTools.length < 4 && (
                <div className="add-tool-input-wrapper">
                  <input
                    className="add-tool-input"
                    type="text"
                    placeholder="+ Add a tool…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  {filteredSearch.length > 0 && (
                    <div className="tool-dropdown">
                      {filteredSearch.map(t => (
                        <button key={t.id} className="tool-dropdown-item" onClick={() => addTool(t)}>
                          <span className="tool-dropdown-name">{t.name}</span>
                          <span className="badge">{t.category}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container compare-body">
        {selectedTools.length < 2 ? (
          <div className="compare-empty">
            {selectedTools.length === 0 ? (
              <>
                <div className="empty-state">
                  <div className="empty-state-icon">⚖️</div>
                  <h3>No tools selected yet</h3>
                  <p>Search for tools above or start from a workflow stage recommendation.</p>
                </div>
                <div className="compare-suggestions">
                  <p className="section-label">Popular comparisons</p>
                  <div className="popular-comparisons">
                    {[
                      { label: 'Research analysis tools', tools: ['dovetail', 'chatgpt', 'claude'] },
                      { label: 'UI generation tools', tools: ['galileo-ai', 'uizard', 'figma-ai'] },
                      { label: 'Usability testing tools', tools: ['maze', 'lyssna', 'lookback'] },
                      { label: 'Image generation tools', tools: ['midjourney', 'adobe-firefly', 'dall-e'] },
                    ].map(comp => (
                      <button
                        key={comp.label}
                        className="card card-link popular-comp-card"
                        onClick={() => navigate(`/compare?tools=${comp.tools.join(',')}`)}
                      >
                        <strong>{comp.label}</strong>
                        <span className="text-muted text-sm">
                          {comp.tools.map(id => getToolById(id)?.name).filter(Boolean).join(' vs ')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">➕</div>
                <h3>Add one more tool to compare</h3>
                <p>Search for another tool above to start comparing.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Desktop comparison table */}
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="dim-col">Dimension</th>
                    {selectedTools.map(tool => (
                      <th key={tool.id}>
                        <div className="table-tool-header">
                          <span className="table-tool-name">{tool.name}</span>
                          <span className="badge">{tool.category}</span>
                          <div className="table-tool-badges">
                            <span className={`badge badge-${curveColors[tool.learningCurve]}`}>{tool.learningCurve}</span>
                            <span className={`badge badge-${effortColors[tool.effortLevel]}`}>{tool.effortLevel} effort</span>
                          </div>
                          <div className="table-tool-actions">
                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Visit ↗</a>
                            <Link to={`/tool/${tool.id}`} className="btn btn-ghost btn-sm">Details</Link>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {DIMENSIONS.map(dim => (
                    <tr key={dim.key} className={`dim-row ${dim.key === 'worstUseCases' ? 'warning-row' : ''}`}>
                      <td className="dim-label">
                        <span className="dim-icon">{dim.icon}</span>
                        {dim.label}
                      </td>
                      {selectedTools.map(tool => (
                        <td key={tool.id} className={`dim-cell ${dim.key === 'worstUseCases' ? 'warning-cell' : ''}`}>
                          {renderDimension(dim.key, tool)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile accordion */}
            <div className="mobile-comparison">
              {selectedTools.map(tool => (
                <div key={tool.id} className="mobile-tool-card card">
                  <div className="mobile-tool-header">
                    <div>
                      <h3>{tool.name}</h3>
                      <div className="tags" style={{ marginTop: 6 }}>
                        <span className="badge">{tool.category}</span>
                        <span className={`badge badge-${curveColors[tool.learningCurve]}`}>{tool.learningCurve}</span>
                        <span className={`badge badge-${effortColors[tool.effortLevel]}`}>{tool.effortLevel} effort</span>
                      </div>
                    </div>
                    <button
                      className="accordion-toggle"
                      onClick={() => setMobileAccordion(p => ({ ...p, [tool.id]: !p[tool.id] }))}
                    >
                      {mobileAccordion[tool.id] ? '▲' : '▼'}
                    </button>
                  </div>

                  {mobileAccordion[tool.id] && (
                    <div className="mobile-tool-details">
                      {DIMENSIONS.map(dim => (
                        <div key={dim.key} className={`mobile-dim ${dim.key === 'worstUseCases' ? 'warning' : ''}`}>
                          <strong>{dim.icon} {dim.label}</strong>
                          <div>{renderDimension(dim.key, tool)}</div>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Visit ↗</a>
                        <Link to={`/tool/${tool.id}`} className="btn btn-ghost btn-sm">Full details</Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="compare-summary card">
              <h3>Quick pick guide</h3>
              <div className="quick-picks">
                {selectedTools.map(tool => (
                  <div key={tool.id} className="quick-pick">
                    <strong>{tool.name}</strong>
                    <span className="text-sm text-muted">
                      {tool.pricing.range} · {tool.learningCurve} · {tool.effortLevel} effort
                    </span>
                    <span className="text-sm">{tool.bestUseCases[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function renderDimension(key, tool) {
  switch (key) {
    case 'pricing':
      return (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{tool.pricing.tier}</div>
          <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{tool.pricing.range}</div>
        </div>
      )
    case 'learningCurve':
      return (
        <div>
          <span className={`badge badge-${curveColors[tool.learningCurve]}`}>{tool.learningCurve}</span>
          <span className={`badge badge-${effortColors[tool.effortLevel]}`} style={{ marginLeft: 6 }}>{tool.effortLevel} effort</span>
        </div>
      )
    default:
      if (Array.isArray(tool[key])) {
        return (
          <ul className="compare-list">
            {tool[key].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
      }
      return <span>{String(tool[key] || '—')}</span>
  }
}
