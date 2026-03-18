import { Link } from 'react-router-dom'
import { stages } from '../data/stages'
import { tools } from '../data/tools'
import './StagesListPage.css'

export default function StagesListPage() {
  return (
    <div className="page">
      <div className="stages-list-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Workflow Stages</span>
          </nav>
          <h1 className="stages-list-title">Browse by workflow stage</h1>
          <p className="text-muted">
            Find the right AI tool for where you are in your design process.
          </p>
        </div>
      </div>

      <div className="container stages-list-body">
        <div className="stages-list-grid">
          {stages.map(stage => {
            const stageTools = tools.filter(t => t.workflowStages.includes(stage.id))
            const subcats = stage.subcategories

            return (
              <Link
                key={stage.id}
                to={`/stage/${stage.id}`}
                className="stage-list-card card card-link"
                style={{ '--stage-color': stage.color, '--stage-light': stage.lightColor }}
              >
                <div className="stage-list-icon">{stage.icon}</div>
                <div className="stage-list-content">
                  <h2 className="stage-list-name">{stage.name}</h2>
                  <p className="stage-list-desc">{stage.description}</p>
                  <div className="stage-list-subcats">
                    {subcats.map(sub => (
                      <span key={sub} className="stage-subcat">{sub}</span>
                    ))}
                  </div>
                  <span className="stage-list-count">{stageTools.length} tools →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
