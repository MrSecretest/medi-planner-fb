import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import Reminder from './pages/reminder.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/medi-planner-fb/" element={<App />} />
        <Route path="/medi-planner-fb/reminder" element={<Reminder />} />
      </Routes>
    </Router>
  </StrictMode>,
)
