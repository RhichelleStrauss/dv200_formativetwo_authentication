import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage.jsx'

import App from './App.jsx'
import AuthenticationPage from './pages/AuthenticationPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<BrowserRouter>
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/AuthenticationPage" element={<AuthenticationPage />} />
  <Route path="/welcome" element={<WelcomePage />} />
</Routes>
</BrowserRouter>

  </React.StrictMode>,
)
