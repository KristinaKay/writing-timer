import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeCompactToggle } from './lib/compactToggle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize compact keyboard shortcut (Ctrl+Shift+C)
if (typeof window !== 'undefined') {
  initializeCompactToggle();
}
