import { Link, useNavigate } from 'react-router-dom'
import { useSavedList } from '../hooks/useSaved'
import ToolCard from '../components/ToolCard'
import { useState } from 'react'
import './SavedPage.css'

export default function SavedPage() {
  const { saved, remove } = useSavedList()
  const navigate = useNavigate()
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
      <div className="saved-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Saved Tools</span>
          </nav>
          <div className="saved-header-row">
            <div>
              <h1 className="saved-title">Saved Tools</h1>
              <p className="text-muted">{saved.length} tool{saved.length !== 1 ? 's' : ''} saved</p>
            </div>
            {compareList.length > 1 && (
              <Link
                to={`/compare?tools=${compareList.map(t => t.id).join(',')}`}
                className="btn btn-primary"
              >
                Compare {compareList.length} selected →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container saved-body">
        {saved.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">☆</div>
            <h3>No saved tools yet</h3>
            <p>Star tools on any page to save them here for quick access.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <Link to="/" className="btn btn-primary">Find a tool</Link>
              <Link to="/stages" className="btn btn-secondary">Browse stages</Link>
            </div>
          </div>
        ) : (
          <>
            {compareList.length > 0 && (
              <div className="saved-compare-bar">
                <span>{compareList.map(t => t.name).join(', ')}</span>
                {compareList.length >= 2 && (
                  <Link
                    to={`/compare?tools=${compareList.map(t => t.id).join(',')}`}
                    className="btn btn-primary btn-sm"
                  >
                    Compare →
                  </Link>
                )}
              </div>
            )}

            <div className="saved-grid">
              {saved.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  showAddToCompare
                  onAddToCompare={toggleCompare}
                  inCompare={!!compareList.find(t => t.id === tool.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
