/**
 * 
 * /src/main.jsx
 * creates a 'root' div to inject App components into html
 * 
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
