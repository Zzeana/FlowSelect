import { Link, useParams } from 'react-router-dom'
import { workflows, getWorkflowById } from '../data/workflows'
import { getToolById } from '../data/tools'
import './WorkflowsPage.css'

export function WorkflowsListPage() {
  return (
    <div className="page">
      <div className="workflows-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Workflow Templates</span>
          </nav>
          <h1 className="workflows-title">Multi-tool workflow templates</h1>
          <p className="text-muted">
            Pre-built tool chains for common design workflows — from research to prototype delivery.
            Each template shows the optimal tools and how to hand off between them.
          </p>
        </div>
      </div>

      <div className="container workflows-body">
        <div className="workflows-grid">
          {workflows.map(wf => (
            <Link key={wf.id} to={`/workflow/${wf.id}`} className="workflow-card card card-link">
              <div className="workflow-card-meta">
                <span className="badge">{wf.steps.length} steps</span>
                <span className="badge">{wf.duration}</span>
                <span className={`badge badge-${wf.difficulty === 'Beginner' ? 'success' : 'warning'}`}>
                  {wf.difficulty}
                </span>
              </div>
              <h2 className="workflow-card-name">{wf.name}</h2>
              <p className="text-muted text-sm">{wf.description}</p>
              <div className="workflow-tags">
                {wf.tags.map(tag => (
                  <span key={tag} className="workflow-tag">{tag}</span>
                ))}
              </div>
              <div className="workflow-tools">
                {wf.steps.map(step => {
                  const tool = getToolById(step.toolId)
                  return (
                    <span key={step.step} className="workflow-tool-chip" title={tool?.name}>
                      {step.step}. {tool?.name || step.toolId}
                    </span>
                  )
                })}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WorkflowDetailPage() {
  const { workflowId } = useParams()
  const workflow = getWorkflowById(workflowId)

  if (!workflow) {
    return (
      <div className="page container" style={{ paddingTop: 64 }}>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Workflow not found</h3>
          <Link to="/workflows" className="btn btn-primary mt-4">See all workflows</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="workflow-detail-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/workflows">Workflows</Link>
            <span>›</span>
            <span>{workflow.name}</span>
          </nav>

          <div className="workflow-detail-meta">
            <span className="badge">{workflow.steps.length} steps</span>
            <span className="badge">{workflow.duration}</span>
            <span className={`badge badge-${workflow.difficulty === 'Beginner' ? 'success' : 'warning'}`}>
              {workflow.difficulty}
            </span>
            {workflow.tags.map(tag => (
              <span key={tag} className="badge badge-accent">{tag}</span>
            ))}
          </div>

          <h1 className="workflow-detail-title">{workflow.name}</h1>
          <p className="workflow-detail-desc text-muted">{workflow.description}</p>
        </div>
      </div>

      <div className="container workflow-detail-body">
        {/* Step-by-step timeline */}
        <div className="workflow-timeline">
          {workflow.steps.map((step, idx) => {
            const tool = getToolById(step.toolId)
            const isLast = idx === workflow.steps.length - 1

            return (
              <div key={step.step} className="timeline-step">
                <div className="timeline-left">
                  <div className="timeline-number">{step.step}</div>
                  {!isLast && <div className="timeline-line" />}
                </div>

                <div className="timeline-content card">
                  <div className="timeline-step-meta">
                    <span className="timeline-step-label">Step {step.step}</span>
                    {tool && (
                      <Link to={`/tool/${tool.id}`} className="badge badge-accent timeline-tool-badge">
                        {tool.name}
                      </Link>
                    )}
                  </div>

                  <h3 className="timeline-task">{step.task}</h3>
                  <p className="timeline-desc text-muted text-sm">{step.description}</p>

                  {step.handoff && (
                    <div className="timeline-handoff">
                      <span className="handoff-label">→ Handoff:</span>
                      <span className="handoff-text">{step.handoff}</span>
                    </div>
                  )}

                  {tool && (
                    <div className="timeline-tool-info">
                      <p className="text-sm text-muted">{tool.summary.substring(0, 120)}…</p>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                          Visit {tool.name} ↗
                        </a>
                        <Link to={`/tool/${tool.id}`} className="btn btn-ghost btn-sm">
                          Full details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Other workflows */}
        <div className="other-workflows">
          <div className="divider" />
          <p className="section-label">Other workflow templates</p>
          <div className="other-grid">
            {workflows
              .filter(w => w.id !== workflowId)
              .map(wf => (
                <Link key={wf.id} to={`/workflow/${wf.id}`} className="card card-link other-workflow-card">
                  <div className="flex gap-2 mb-2">
                    <span className="badge">{wf.steps.length} steps</span>
                    <span className="badge">{wf.duration}</span>
                  </div>
                  <h3 style={{ fontWeight: 700 }}>{wf.name}</h3>
                  <p className="text-sm text-muted">{wf.description.substring(0, 80)}…</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
