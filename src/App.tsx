import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from './pages/Home'
import { Game } from './pages/Game'
import { AppShell } from './components/AppShell'

function App() {
  return (
    <Router>
      <AppShell>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 md:px-6 md:py-12"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </motion.div>
      </AppShell>
    </Router>
  )
}

export default App