import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // <-- titiknya 1 aja
import './index.css'         // <-- titiknya 1 aja

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
