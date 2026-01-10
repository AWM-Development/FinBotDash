import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from '../Layout.tsx'
import Dashboard from '../Pages/Dashboard.tsx'
import Signals from '../Pages/Signals.tsx'
import RebalancePacket from '../Pages/RebalancePacket.tsx'
import Portfolio from '../Pages/Portfolio.tsx'
import Performance from '../Pages/Performance.tsx'
import Risk from '../Pages/Risk.tsx'
import TaxTLH from '../Pages/TaxTLH.tsx'
import LogsAudit from '../Pages/LogsAudit.tsx'
import Settings from '../Pages/Settings.tsx'

function AppRoutes() {
  const location = useLocation()
  const currentPageName = (location.pathname.split('/').pop() || 'Dashboard') as
    | 'Dashboard'
    | 'Signals'
    | 'RebalancePacket'
    | 'Portfolio'
    | 'Performance'
    | 'Risk'
    | 'TaxTLH'
    | 'LogsAudit'
    | 'Settings'

  return (
    <Routes>
      <Route path="/" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
      <Route path="/dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
      <Route path="/signals" element={<Layout currentPageName="Signals"><Signals /></Layout>} />
      <Route path="/rebalance-packet" element={<Layout currentPageName="RebalancePacket"><RebalancePacket /></Layout>} />
      <Route path="/portfolio" element={<Layout currentPageName="Portfolio"><Portfolio /></Layout>} />
      <Route path="/performance" element={<Layout currentPageName="Performance"><Performance /></Layout>} />
      <Route path="/risk" element={<Layout currentPageName="Risk"><Risk /></Layout>} />
      <Route path="/tax-tlh" element={<Layout currentPageName="TaxTLH"><TaxTLH /></Layout>} />
      <Route path="/logs-audit" element={<Layout currentPageName="LogsAudit"><LogsAudit /></Layout>} />
      <Route path="/settings" element={<Layout currentPageName="Settings"><Settings /></Layout>} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
