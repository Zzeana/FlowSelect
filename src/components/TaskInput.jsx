import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { examplePrompts } from '../data/taskMappings'
import './TaskInput.css'

export default function TaskInput({ initialValue = '', autoFocus = false }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!value.trim()) return
    navigate(`/recommend?q=${encodeURIComponent(value.trim())}`)
  }

  const useExample = (prompt) => {
    setValue(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="task-input-wrapper">
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
            autoFocus={autoFocus}
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
          <button
            key={prompt}
            className="example-chip"
            onClick={() => useExample(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
