import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { examplePrompts, exampleBriefs } from '../data/taskMappings'
import './TaskInput.css'

export default function TaskInput({ initialValue = '', autoFocus = false, defaultMode = 'task' }) {
  const [mode, setMode] = useState(defaultMode)
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!value.trim()) return
    const params = new URLSearchParams({ q: value.trim() })
    if (mode === 'project') params.set('mode', 'project')
    navigate(`/recommend?${params.toString()}`)
  }

  const switchMode = (next) => {
    setMode(next)
    setValue('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const useExample = (prompt) => {
    setValue(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="task-input-wrapper">
      {/* Mode toggle */}
      <div className="mode-toggle" role="group" aria-label="Input mode">
        <button
          type="button"
          className={`mode-btn ${mode === 'task' ? 'active' : ''}`}
          onClick={() => switchMode('task')}
        >
          <span className="mode-icon">⚡</span>
          Task
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === 'project' ? 'active' : ''}`}
          onClick={() => switchMode('project')}
        >
          <span className="mode-icon">📋</span>
          Project
        </button>
      </div>

      {mode === 'task' ? (
        <>
          <form className="task-input-form" onSubmit={handleSubmit}>
            <div className="task-input-field">
              <span className="task-input-icon">🔍</span>
              <input
                ref={inputRef}
                className="task-input"
                type="text"
                placeholder="What design task are you working on?"
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus={autoFocus && mode === 'task'}
              />
              <button
                type="submit"
                className="btn btn-primary task-input-submit"
                disabled={!value.trim()}
              >
                Find tools →
              </button>
            </div>
          </form>
          <div className="example-prompts">
            <span className="example-label">Try:</span>
            {examplePrompts.slice(0, 4).map(prompt => (
              <button key={prompt} className="example-chip" onClick={() => useExample(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <form className="project-input-form" onSubmit={handleSubmit}>
          <div className="project-input-field">
            <label className="project-input-label" htmlFor="project-brief">
              Describe your project or paste your PRD
            </label>
            <textarea
              id="project-brief"
              ref={inputRef}
              className="project-textarea"
              placeholder={`e.g. "We're redesigning our mobile app. We need to interview 20 users, synthesize findings into personas, wireframe new flows, and run usability tests before handoff."`}
              value={value}
              onChange={e => setValue(e.target.value)}
              rows={6}
              autoFocus={autoFocus && mode === 'project'}
            />
            <div className="project-input-footer">
              <span className="project-input-hint">
                FlowSelect will detect which workflow stages your project spans and recommend tools for each.
              </span>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!value.trim()}
              >
                Analyze project →
              </button>
            </div>
          </div>
          <div className="example-prompts" style={{ marginTop: 12 }}>
            <span className="example-label">Try an example:</span>
            {exampleBriefs.slice(0, 2).map((brief, i) => (
              <button key={i} className="example-chip" onClick={() => useExample(brief)}>
                {brief.substring(0, 48)}…
              </button>
            ))}
          </div>
        </form>
      )}
    </div>
  )
}
