import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Die statische Vorschau läuft eingebettet ohne eigene URL, daher MemoryRouter
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter

// Unterverzeichnis (z. B. GitHub Pages /landwerker.ch/) als Basis für alle Routen
const basename = import.meta.env.BASE_URL.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') : undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </StrictMode>,
)
