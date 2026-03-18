import { useState, useEffect } from 'react'

const STORAGE_KEY = 'flowselect_saved_tools'

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

// Shared state across components (simple pub/sub)
let listeners = []
let savedTools = loadSaved()

function notify() {
  listeners.forEach(fn => fn([...savedTools]))
}

export function useSaved(toolId) {
  const [saved, setSaved] = useState(savedTools)

  useEffect(() => {
    const fn = (newSaved) => setSaved(newSaved)
    listeners.push(fn)
    return () => { listeners = listeners.filter(l => l !== fn) }
  }, [])

  const isSaved = toolId ? saved.some(t => t.id === toolId) : false

  const toggle = (tool) => {
    if (saved.some(t => t.id === tool.id)) {
      savedTools = savedTools.filter(t => t.id !== tool.id)
    } else {
      savedTools = [...savedTools, tool]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTools))
    notify()
  }

  return { saved, isSaved, toggle }
}

export function useSavedList() {
  const [saved, setSaved] = useState(savedTools)

  useEffect(() => {
    // Refresh from localStorage on mount
    savedTools = loadSaved()
    setSaved([...savedTools])

    const fn = (newSaved) => setSaved(newSaved)
    listeners.push(fn)
    return () => { listeners = listeners.filter(l => l !== fn) }
  }, [])

  const remove = (toolId) => {
    savedTools = savedTools.filter(t => t.id !== toolId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTools))
    notify()
  }

  return { saved, remove }
}
