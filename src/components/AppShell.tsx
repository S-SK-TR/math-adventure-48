import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, Home, Menu, X, Moon, Sun, Rocket, Award, ChevronRight, ChevronLeft } from 'lucide-react'
import { useStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ to, icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 ${active
        ? 'bg-[color:var(--brand-500)]/10 text-[color:var(--brand-500)]'
        : 'text-[color:var(--text-muted)] hover:bg-[color:var(--bg-elevated)] hover:text-[color:var(--text-primary)]'}`}
    >
      {icon}
      <span className="font-medium text-lg">{label}</span>
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { score } = useStore()
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--bg-base)]">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-[color:var(--bg-surface)] border-b border-[color:var(--border)]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-[color:var(--brand-500)]" />
            <span className="text-2xl font-bold text-[color:var(--text-primary)]">Math Adventure</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl hover:bg-[color:var(--bg-elevated)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-all duration-200"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-xl hover:bg-[color:var(--bg-elevated)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-all duration-200"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-72 bg-[color:var(--bg-surface)] border-r border-[color:var(--border)]">
        <div className="p-6 border-b border-[color:var(--border)]">
          <Link to="/" className="flex items-center gap-4">
            <Calculator className="w-8 h-8 text-[color:var(--brand-500)]" />
            <span className="text-3xl font-bold text-[color:var(--text-primary)]">Math Adventure</span>
          </Link>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <NavItem
            to="/"
            icon={<Home className="w-5 h-5" />}
            label="Ana Sayfa"
            active={location.pathname === '/'}
          />
          <NavItem
            to="/game"
            icon={<Calculator className="w-5 h-5" />}
            label="Oyun"
            active={location.pathname === '/game'}
          />
        </div>

        <div className="p-6 border-t border-[color:var(--border)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[color:var(--brand-500)]" />
              <span className="text-lg font-medium text-[color:var(--text-primary)]">Puan</span>
            </div>
            <span className="font-bold text-xl text-[color:var(--brand-500)]">{score}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5 text-[color:var(--text-muted)]" /> : <Sun className="w-5 h-5 text-[color:var(--text-muted)]" />}
              <span className="text-lg font-medium text-[color:var(--text-primary)]">Tema</span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode
                ? 'bg-[color:var(--brand-500)]/10 text-[color:var(--brand-500)]'
                : 'bg-[color:var(--bg-elevated)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="md:hidden fixed inset-0 bg-[color:var(--bg-surface)] z-50 flex flex-col"
          >
            <div className="p-6 border-b border-[color:var(--border)]">
              <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
                  <Calculator className="w-8 h-8 text-[color:var(--brand-500)]" />
                  <span className="text-2xl font-bold text-[color:var(--text-primary)]">Math Adventure</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-3 rounded-xl hover:bg-[color:var(--bg-elevated)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1">
              <NavItem
                to="/"
                icon={<Home className="w-5 h-5" />}
                label="Ana Sayfa"
                active={location.pathname === '/'}
                onClick={() => setIsSidebarOpen(false)}
              />
              <NavItem
                to="/game"
                icon={<Calculator className="w-5 h-5" />}
                label="Oyun"
                active={location.pathname === '/game'}
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>

            <div className="p-6 border-t border-[color:var(--border)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[color:var(--brand-500)]" />
                  <span className="text-lg font-medium text-[color:var(--text-primary)]">Puan</span>
                </div>
                <span className="font-bold text-xl text-[color:var(--brand-500)]">{score}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="w-5 h-5 text-[color:var(--text-muted)]" /> : <Sun className="w-5 h-5 text-[color:var(--text-muted)]" />}
                  <span className="text-lg font-medium text-[color:var(--text-primary)]">Tema</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode
                    ? 'bg-[color:var(--brand-500)]/10 text-[color:var(--brand-500)]'
                    : 'bg-[color:var(--bg-elevated)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]'}`}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}