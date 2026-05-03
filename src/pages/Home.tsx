import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calculator, Rocket, ArrowRight, BookOpen, Trophy, Clock } from 'lucide-react'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

function Card({ children, className, glass = false }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`rounded-2xl p-6 shadow-lg ${glass ? 'glass' : 'bg-[color:var(--bg-surface)] border border-[color:var(--border)]'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="md:col-span-2" glass>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[color:var(--text-primary)]">
              Math Adventure
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mb-10"
          >
            <Calculator className="w-14 h-14 text-[color:var(--brand-500)]" />
            <Rocket className="w-14 h-14 text-[color:var(--brand-500)]" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg md:text-xl mb-8 text-[color:var(--text-muted)]">
              Matematik becerinizi test edin ve seviyeler atlayın! Her doğru cevap için puan kazanarak ilerleyin.
            </p>
            <Link
              to="/game"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[color:var(--brand-500)] text-white rounded-xl hover:bg-[color:var(--brand-600)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Oyuna Başla
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </Card>

        <div className="space-y-6">
          <Card glass>
            <h2 className="text-2xl font-semibold mb-5 text-[color:var(--text-primary)]">Hızlı Başlangıç</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[color:var(--brand-500)]"></div>
                <span className="text-[color:var(--text-muted)]">4 işlemleri öğrenin</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[color:var(--brand-500)]"></div>
                <span className="text-[color:var(--text-muted)]">Puan sistemiyle yarışın</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[color:var(--brand-500)]"></div>
                <span className="text-[color:var(--text-muted)]">Seviyeler atlayın</span>
              </li>
            </ul>
          </Card>

          <Card glass>
            <h2 className="text-2xl font-semibold mb-5 text-[color:var(--text-primary)]">İstatistikler</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[color:var(--brand-500)]" />
                <span className="text-[color:var(--text-muted)]">4 temel işlem</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[color:var(--brand-500)]" />
                <span className="text-[color:var(--text-muted)]">Puan sistemi</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[color:var(--brand-500)]" />
                <span className="text-[color:var(--text-muted)]">Zaman kontrolü</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bento-grid mb-12">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="aspect-square flex flex-col justify-center items-center" glass>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-xl bg-[color:var(--brand-500)]/10 flex items-center justify-center mb-6"
            >
              <Calculator className="w-10 h-10 text-[color:var(--brand-500)]" />
            </motion.div>
            <h3 className="text-xl font-medium text-[color:var(--text-primary)] mb-3">Konu {item}</h3>
            <p className="text-[color:var(--text-muted)] text-center px-4">Matematik konusu hakkında kısa açıklama</p>
          </Card>
        ))}
      </div>

      <Card glass>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-semibold mb-3 text-[color:var(--text-primary)]">Hazır mısın?</h2>
            <p className="text-[color:var(--text-muted)]">Matematik becerinizi test etmek için hemen başlayın!</p>
          </div>
          <Link
            to="/game"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[color:var(--brand-500)] text-white rounded-xl hover:bg-[color:var(--brand-600)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Oyuna Başla
            <Rocket className="w-5 h-5" />
          </Link>
        </div>
      </Card>
    </div>
  )
}