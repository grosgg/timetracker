import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

const container = document.getElementById('root')
if (container == null) {
  console.error("Cannot find root")
} else {
  const root = createRoot(container)

  document.addEventListener('DOMContentLoaded', () => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    )
  })
}