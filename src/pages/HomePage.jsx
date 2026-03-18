import { Link, useNavigate } from 'react-router-dom'
import { stages } from '../data/stages'
import { tools } from '../data/tools'
import { workflows } from '../data/workflows'
import TaskInput from '../components/TaskInput'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-eyebrow">
            <span className="badge badge-accent">Workflow-first tool advisor</span>
          </div>
          <h1 className="hero-headline">
            Find the right AI tool for<br />your design task
          </h1>
          <p className="hero-subhead">
            Stop researching. FlowSelect shows designers 3–5 best-fit AI tools
            for their specific task — not a directory of 200 options.
          </p>

          <div className="hero-input">
            <TaskInput autoFocus />
          </div>

          <div className="hero-stats">
            <span>{tools.length}+ curated tools</span>
            <span className="dot">·</span>
            <span>5 workflow stages</span>
            <span className="dot">·</span>
            <span>{workflows.length} workflow templates</span>
          </div>
        </div>
      </section>

      {/* Workflow Stages */}
      <section className="stages-section">
        <div className="container">
          <p className="section-label">Or browse by workflow stage</p>
          <div className="stages-grid">
            {stages.map(stage => {
              const stageToolCount = tools.filter(t => t.workflowStages.includes(stage.id)).length
              return (
                <Link
                  key={stage.id}
                  to={`/stage/${stage.id}`}
                  className="stage-card"
                  style={{ '--stage-color': stage.color, '--stage-light': stage.lightColor }}
                >
                  <div className="stage-icon">{stage.icon}</div>
                  <div className="stage-content">
                    <h2 className="stage-name">{stage.name}</h2>
                    <p className="stage-desc">{stage.description}</p>
                    <span className="stage-count">{stageToolCount} tools →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="container">
          <p className="section-label">How FlowSelect works</p>
          <div className="how-grid">
            {[
              { n: '1', title: 'Describe your task', body: 'Type what you\'re trying to do — "synthesize 30 interviews" or "create a mood board."' },
              { n: '2', title: 'Get ranked tools', body: 'Receive 3–5 curated recommendations with clear explanations of why each tool fits.' },
              { n: '3', title: 'Compare trade-offs', body: 'Side-by-side comparison with strengths, weaknesses, and "when NOT to use" guidance.' },
              { n: '4', title: 'Decide with confidence', body: 'Save your picks and share comparisons with your team for quick alignment.' },
            ].map(step => (
              <div key={step.n} className="how-card card">
                <div className="how-number">{step.n}</div>
                <h3>{step.title}</h3>
                <p className="text-muted text-sm">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workflows */}
      <section className="workflows-preview">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">Multi-tool workflow templates</p>
              <h2 className="section-title">Common design workflows, solved</h2>
            </div>
            <Link to="/workflows" className="btn btn-secondary">View all →</Link>
          </div>
          <div className="workflow-cards">
            {workflows.slice(0, 3).map(wf => (
              <Link key={wf.id} to={`/workflow/${wf.id}`} className="workflow-preview-card card card-link">
                <div className="workflow-meta">
                  <span className="badge">{wf.steps.length} steps</span>
                  <span className="badge">{wf.duration}</span>
                  <span className={`badge badge-${wf.difficulty === 'Beginner' ? 'success' : 'warning'}`}>
                    {wf.difficulty}
                  </span>
                </div>
                <h3 className="workflow-name">{wf.name}</h3>
                <p className="text-muted text-sm">{wf.description}</p>
                <div className="workflow-steps-preview">
                  {wf.steps.map((s, i) => (
                    <span key={i} className="step-dot" title={`Step ${s.step}: ${s.task}`}>
                      {s.step}
                    </span>
                  ))}
                  <span className="step-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="value-section">
        <div className="container">
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Decision in under 1 minute</h3>
              <p className="text-muted text-sm">Stop spending 3-5 hours researching. FlowSelect gives you ranked, contextualized recommendations immediately.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Task-first, not tool-first</h3>
              <p className="text-muted text-sm">We start with what you're doing, not what tools exist. Because the right tool depends on your specific task context.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚫</div>
              <h3>"When NOT to use" guidance</h3>
              <p className="text-muted text-sm">Every tool recommendation includes clear anti-use cases. Knowing when NOT to use a tool is as valuable as knowing when to use it.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔗</div>
              <h3>No affiliate bias</h3>
              <p className="text-muted text-sm">No sponsored placements. Tools are ranked by task fit and designer feedback — not by who pays us.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
