import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { label: 'Workflow Stages', href: '/stages' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'Compare Tools', href: '/compare' },
    { label: 'Saved', href: '/saved' },
  ]

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">FlowSelect</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {nav.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link ${location.pathname.startsWith(item.href) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/')}
          >
            Find a Tool
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          {nav.map(item => (
            <Link key={item.href} to={item.href} className="mobile-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
