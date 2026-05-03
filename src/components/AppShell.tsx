import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, Home, Menu, X, Moon, Sun, Award } from 'lucide-react'
import { useStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

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
      className={cn(
        "relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
        active ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-primary/10 rounded-xl"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", active && "text-primary")}>
        {icon}
      </div>
      <span className="relative z-10 font-medium text-base">{label}</span>
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { score } = useStore()
  const location = useLocation()

  // Initialize theme
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      {/* Mobile Navbar (Glassmorphism) */}
      <header className="md:hidden sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Math Adventure
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-10">
        {/* Desktop Sidebar (Glassmorphism) */}
        <aside className="hidden md:flex flex-col w-72 sticky top-0 h-screen bg-card/50 backdrop-blur-2xl border-r border-border shadow-glass-sm">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow group-hover:shadow-primary/50 transition-all duration-500">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Math
                <br />
                Adventure
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
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
            <NavItem
              to="/leaderboard"
              icon={<Award className="w-5 h-5" />}
              label="Lider Tablosu"
              active={location.pathname === '/leaderboard'}
            />
            <NavItem
              to="/profile"
              icon={<Sun className="w-5 h-5" />}
              label="Profil"
              active={location.pathname === '/profile'}
            />
          </nav>

          <div className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">Skor</span>
              </div>
              <span className="font-display font-bold text-2xl text-primary">{score}</span>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground">
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="font-medium">Tema Değiştir</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="md:hidden fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r border-border shadow-2xl z-50 flex flex-col"
              >
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <span className="text-xl font-display font-bold">Menü</span>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-xl hover:bg-muted text-muted-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
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
                  <NavItem
                    to="/leaderboard"
                    icon={<Award className="w-5 h-5" />}
                    label="Lider Tablosu"
                    active={location.pathname === '/leaderboard'}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <NavItem
                    to="/profile"
                    icon={<Sun className="w-5 h-5" />}
                    label="Profil"
                    active={location.pathname === '/profile'}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}