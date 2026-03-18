import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getStageById, stages } from '../data/stages'
import { getToolsByStage } from '../data/tools'
import ToolCard from '../components/ToolCard'
import TaskInput from '../components/TaskInput'
import './WorkflowStagePage.css'

export default function WorkflowStagePage() {
  const { stageId } = useParams()
  const stage = getStageById(stageId)
  const allTools = getToolsByStage(stageId)
  const [activeSubcat, setActiveSubcat] = useState('All')
  const [compareList, setCompareList] = useState([])

  if (!stage) {
    return (
      <div className="page container" style={{ paddingTop: 64 }}>
        <div className="empty-state">
          <div className="empty-state-icon">🤔</div>
          <h3>Stage not found</h3>
          <Link to="/stages" className="btn btn-primary mt-4">View all stages</Link>
        </div>
      </div>
    )
  }

  const subcats = ['All', ...stage.subcategories]
  const filtered = activeSubcat === 'All'
    ? allTools
    : allTools.filter(t => t.subcategories.includes(activeSubcat))

  const toggleCompare = (tool) => {
    setCompareList(prev => {
      if (prev.find(t => t.id === tool.id)) return prev.filter(t => t.id !== tool.id)
      if (prev.length >= 4) return prev
      return [...prev, tool]
    })
  }

  return (
    <div className="page">
      {/* Stage hero */}
      <div
        className="stage-hero"
        style={{ '--stage-color': stage.color, '--stage-light': stage.lightColor }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/stages">Workflow Stages</Link>
            <span>›</span>
            <span>{stage.name}</span>
          </nav>

          <div className="stage-hero-content">
            <div className="stage-hero-icon">{stage.icon}</div>
            <div>
              <h1 className="stage-hero-title">{stage.name}</h1>
              <p className="stage-hero-desc">{stage.description}</p>
              <span className="badge" style={{ background: stage.lightColor, color: stage.color }}>
                {allTools.length} tools
              </span>
            </div>
          </div>

          {/* Quick task input */}
          <div className="stage-task-input">
            <TaskInput />
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40 }}>
        {/* Stage nav pills */}
        <div className="stage-nav">
          {stages.map(s => (
            <Link
              key={s.id}
              to={`/stage/${s.id}`}
              className={`stage-pill ${s.id === stageId ? 'active' : ''}`}
              style={{ '--pill-color': s.color, '--pill-light': s.lightColor }}
            >
              {s.icon} {s.name}
            </Link>
          ))}
        </div>

        {/* Subcategory filters */}
        <div className="subcat-filters">
          {subcats.map(sub => (
            <button
              key={sub}
              className={`subcat-btn ${activeSubcat === sub ? 'active' : ''}`}
              onClick={() => setActiveSubcat(sub)}
            >
              {sub}
              <span className="subcat-count">
                {sub === 'All'
                  ? allTools.length
                  : allTools.filter(t => t.subcategories.includes(sub)).length}
              </span>
            </button>
          ))}
        </div>

        {/* Compare bar */}
        {compareList.length > 0 && (
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

        {/* Tools grid */}
        {filtered.length > 0 ? (
          <div className="tools-grid">
            {filtered.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                showAddToCompare
                onAddToCompare={toggleCompare}
                inCompare={!!compareList.find(t => t.id === tool.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No tools in this category yet</h3>
            <p>Try a different subcategory or describe your task above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
