import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Editor from './Editor'

const App = () => (
  <Routes>
    <Route path="activities/*" element={<Editor />} />
  </Routes>
)
export default App;