import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import WorkflowStagePage from './pages/WorkflowStagePage'
import StagesListPage from './pages/StagesListPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ComparisonPage from './pages/ComparisonPage'
import ToolDetailPage from './pages/ToolDetailPage'
import { WorkflowsListPage, WorkflowDetailPage } from './pages/WorkflowsPage'
import SavedPage from './pages/SavedPage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stages" element={<StagesListPage />} />
          <Route path="/stage/:stageId" element={<WorkflowStagePage />} />
          <Route path="/recommend" element={<RecommendationsPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
          <Route path="/tool/:toolId" element={<ToolDetailPage />} />
          <Route path="/workflows" element={<WorkflowsListPage />} />
          <Route path="/workflow/:workflowId" element={<WorkflowDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
