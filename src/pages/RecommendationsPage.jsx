import { useSearchParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { tools } from '../data/tools'
import { stages } from '../data/stages'
import { recommendTools, analyzeProjectBrief } from '../data/taskMappings'
import ToolCard from '../components/ToolCard'
import TaskInput from '../components/TaskInput'
import './RecommendationsPage.css'

export default function RecommendationsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const isProjectMode = searchParams.get('mode') === 'project'
  const [compareList, setCompareList] = useState([])

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
            <span>{isProjectMode ? 'Project Analysis' : 'Recommendations'}</span>
          </nav>

          {isProjectMode ? (
            <ProjectHeader query={query} />
          ) : (
            <TaskHeader query={query} results={recommendTools(query, tools)} />
          )}

          <div className="reco-task-input">
            <TaskInput initialValue={query} defaultMode={isProjectMode ? 'project' : 'task'} />
          </div>
        </div>
      </div>

      <div className="container reco-body">
        {isProjectMode ? (
          <ProjectResults query={query} compareList={compareList} toggleCompare={toggleCompare} />
        ) : (
          <TaskResults query={query} compareList={compareList} toggleCompare={toggleCompare} />
        )}
      </div>
    </div>
  )
}

/* ── Header variants ──────────────────────────────────────── */

function TaskHeader({ query, results }) {
  return (
    <>
      <h1 className="reco-title">
        {results.length > 0 ? `${results.length} tools for your task` : 'No exact matches found'}
      </h1>
      <p className="reco-query">"{query}"</p>
    </>
  )
}

function ProjectHeader({ query }) {
  const { detectedCount } = analyzeProjectBrief(query, tools)
  return (
    <>
      <div className="project-mode-badge">
        <span className="badge badge-project">📋 Project analysis</span>
        {detectedCount > 0 && (
          <span className="text-sm text-muted">{detectedCount} workflow stage{detectedCount !== 1 ? 's' : ''} detected</span>
        )}
      </div>
      <h1 className="reco-title">Tool recommendations across your project</h1>
      <p className="reco-query project-brief-preview">
        {query.length > 120 ? query.substring(0, 120) + '…' : query}
      </p>
    </>
  )
}

/* ── Task results (unchanged logic) ──────────────────────── */

function TaskResults({ query, compareList, toggleCompare }) {
  const results = recommendTools(query, tools)

  if (results.length === 0) return <NoResults />

  return (
    <>
      <CompareBanner compareList={compareList} toggleCompare={toggleCompare} minToShow={2} />

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
            <ul>{results[0]?.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>

          <div className="reco-best-actions">
            <Link to={`/tool/${results[0]?.id}`} className="btn btn-primary">See full details →</Link>
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

        <div className="reco-when-not">
          <p className="section-label">⚠️ When NOT to use {results[0]?.name}</p>
          <ul>{results[0]?.worstUseCases.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
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

      <div className="reco-compare-cta card">
        <h3>Still not sure which tool to choose?</h3>
        <p className="text-muted text-sm">Select 2–4 tools and compare them side by side — strengths, weaknesses, pricing, and when NOT to use each.</p>
        <Link to={`/compare?tools=${results.slice(0, 2).map(t => t.id).join(',')}`} className="btn btn-secondary">
          Compare top 2 tools →
        </Link>
      </div>
    </>
  )
}

/* ── Project results ──────────────────────────────────────── */

function ProjectResults({ query, compareList, toggleCompare }) {
  const { stageResults, detectedCount } = analyzeProjectBrief(query, tools)

  if (detectedCount === 0 || stageResults.length === 0) return <NoResults isProject />

  // Collect all unique tools across stages for the compare CTA
  const allRecommendedIds = [...new Set(stageResults.flatMap(s => s.tools.map(t => t.id)))]

  return (
    <>
      <CompareBanner compareList={compareList} toggleCompare={toggleCompare} minToShow={2} />

      {/* Recommended Tool Stack */}
      <ToolStackSummary stageResults={stageResults} />

      {/* Pipeline overview */}
      <div className="project-pipeline">
        {stageResults.map(({ stageId }, idx) => {
          const stage = stages.find(s => s.id === stageId)
          if (!stage) return null
          return (
            <div key={stageId} className="pipeline-stage" style={{ '--stage-color': stage.color, '--stage-light': stage.lightColor }}>
              <div className="pipeline-step-num">{idx + 1}</div>
              <a href={`#stage-${stageId}`} className="pipeline-stage-label">
                <span className="pipeline-icon">{stage.icon}</span>
                {stage.name}
              </a>
              {idx < stageResults.length - 1 && <span className="pipeline-arrow">→</span>}
            </div>
          )
        })}
      </div>

      {/* Step-by-step workflow */}
      <div className="project-workflow">
        {stageResults.map(({ stageId, tools: stageTools }, idx) => {
          const stage = stages.find(s => s.id === stageId)
          if (!stage) return null
          return (
            <section
              key={stageId}
              id={`stage-${stageId}`}
              className="workflow-step"
              style={{ '--stage-color': stage.color, '--stage-light': stage.lightColor }}
            >
              <div className="workflow-step-left">
                <div className="workflow-step-num">{idx + 1}</div>
                {idx < stageResults.length - 1 && <div className="workflow-step-line" />}
              </div>

              <div className="workflow-step-body">
                <div className="workflow-step-header">
                  <span className="workflow-step-icon">{stage.icon}</span>
                  <div>
                    <h2 className="workflow-step-title">
                      Step {idx + 1}: {stage.name}
                    </h2>
                    <p className="workflow-step-desc text-sm text-muted">{stage.description}</p>
                  </div>
                  <Link to={`/stage/${stageId}`} className="btn btn-ghost btn-sm">
                    See all {stage.name} tools →
                  </Link>
                </div>

                <div className="project-tools-grid">
                  {stageTools.map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      rank={i + 1}
                      matchExplanation={tool.matchExplanation}
                      showAddToCompare
                      onAddToCompare={toggleCompare}
                      inCompare={!!compareList.find(t => t.id === tool.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <div className="reco-compare-cta card">
        <h3>Compare tools across stages</h3>
        <p className="text-muted text-sm">Select tools from the cards above, then compare them side by side.</p>
        {allRecommendedIds.length >= 2 && (
          <Link to={`/compare?tools=${allRecommendedIds.slice(0, 3).join(',')}`} className="btn btn-secondary">
            Compare top recommendations →
          </Link>
        )}
      </div>
    </>
  )
}

/* ── Tool Stack Summary ───────────────────────────────────── */

function buildStackSummary(stackTools) {
  const allBeginner  = stackTools.every(t => t.learningCurve === 'Beginner')
  const allLowEffort = stackTools.every(t => t.effortLevel === 'Low')
  const mostlyFree   = stackTools.filter(t => t.pricing.tier === 'Freemium' || t.pricing.tier === 'Free').length >= stackTools.length / 2
  const hasCode      = stackTools.some(t => t.tags.includes('code') || t.tags.includes('react'))

  if (allBeginner && allLowEffort && mostlyFree) return 'Optimized for speed and beginner-friendly workflows — most tools are free to start.'
  if (allBeginner && mostlyFree) return 'Budget-friendly and beginner-accessible stack — a strong starting point.'
  if (hasCode) return 'A technically-oriented stack for designers with developer skills.'
  if (allLowEffort) return 'Low-effort tools throughout — designed for fast iteration and quick results.'
  return 'A well-rounded tool stack covering your key project phases.'
}

function ToolStackSummary({ stageResults }) {
  // Pick the #1 tool from each stage (up to 5 total), deduplicated
  const seen = new Set()
  const stackTools = stageResults
    .flatMap(({ tools }) => tools.slice(0, 1))
    .filter(t => {
      if (seen.has(t.id)) return false
      seen.add(t.id)
      return true
    })
    .slice(0, 5)

  if (stackTools.length === 0) return null

  const summary = buildStackSummary(stackTools)

  return (
    <div className="tool-stack-card">
      <div className="tool-stack-header">
        <div>
          <h2 className="tool-stack-title">Recommended Tool Stack</h2>
          <p className="tool-stack-summary">{summary}</p>
        </div>
        <span className="badge badge-accent">{stackTools.length} tools</span>
      </div>

      <div className="tool-stack-list">
        {stackTools.map((tool, i) => {
          const stage = stages.find(s => s.id === tool.workflowStages[0])
          return (
            <Link key={tool.id} to={`/tool/${tool.id}`} className="stack-tool-row">
              <div className="stack-tool-rank">{i + 1}</div>
              <div className="stack-tool-info">
                <span className="stack-tool-name">{tool.name}</span>
                {stage && (
                  <span className="stack-tool-stage" style={{ color: stage.color }}>
                    {stage.icon} {stage.name}
                  </span>
                )}
              </div>
              <span className="stack-tool-reason">{tool.matchExplanation}</span>
              <div className="stack-tool-meta">
                <span className="badge">{tool.pricing.tier}</span>
                <span className="badge">{tool.learningCurve}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="tool-stack-actions">
        <Link
          to={`/compare?tools=${stackTools.map(t => t.id).join(',')}`}
          className="btn btn-secondary btn-sm"
        >
          Compare stack tools →
        </Link>
      </div>
    </div>
  )
}

/* ── Shared sub-components ────────────────────────────────── */

function CompareBanner({ compareList, toggleCompare, minToShow = 2 }) {
  if (compareList.length < minToShow) return null
  return (
    <div className="compare-bar">
      <div className="compare-bar-tools">
        {compareList.map(t => (
          <span key={t.id} className="compare-bar-tool">
            {t.name}
            <button onClick={() => toggleCompare(t)} aria-label={`Remove ${t.name}`}>×</button>
          </span>
        ))}
      </div>
      <Link to={`/compare?tools=${compareList.map(t => t.id).join(',')}`} className="btn btn-primary btn-sm">
        Compare {compareList.length} tools →
      </Link>
    </div>
  )
}

function NoResults({ isProject = false }) {
  return (
    <div className="no-results">
      <div className="empty-state">
        <div className="empty-state-icon">🤔</div>
        <h3>No matches found</h3>
        <p>
          {isProject
            ? 'Try adding more context about your project phases — e.g. "user interviews", "wireframes", "usability testing".'
            : 'Try rephrasing your task or browse tools by workflow stage.'}
        </p>
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
            <Link key={s} to={`/recommend?q=${encodeURIComponent(s)}`} className="suggestion-chip">{s}</Link>
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
  )
}
