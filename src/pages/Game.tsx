import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store'
import { generateQuestion } from '../utils/math'
import { Timer, Award, CheckCircle, XCircle, Lightbulb, BarChart2, Clock, Target } from 'lucide-react'

interface Question {
  question: string
  answer: number
}

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

function Card({ children, className, glass = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-6 shadow-lg ${glass ? 'glass' : 'bg-[color:var(--bg-surface)] border border-[color:var(--border)]'} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Game() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null)
  const [questionCount, setQuestionCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)

  const { addScore } = useStore()

  useEffect(() => {
    setCurrentQuestion(generateQuestion())
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuestion) return

    const isCorrect = parseInt(userAnswer) === currentQuestion.answer
    setQuestionCount(prev => prev + 1)

    if (isCorrect) {
      const points = 10 + Math.floor(timeLeft / 3)
      setScore(prev => prev + points)
      setCorrectCount(prev => prev + 1)
      addScore(points)
      setFeedback({ correct: true, message: `Doğru! +${points} puan` })
    } else {
      setFeedback({ correct: false, message: `Yanlış! Doğru cevap: ${currentQuestion.answer}` })
    }

    setTimeout(() => {
      setCurrentQuestion(generateQuestion())
      setUserAnswer('')
      setFeedback(null)
      setTimeLeft(prev => Math.min(prev + 5, 30))
    }, 1500)
  }

  if (gameOver) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center" glass>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <Award className="w-20 h-20 mx-auto text-[color:var(--brand-500)] mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-[color:var(--text-primary)]">Oyun Bitti!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-4 rounded-xl bg-[color:var(--bg-elevated)]">
                <p className="text-lg text-[color:var(--text-muted)] mb-2">Toplam Puan</p>
                <p className="text-3xl font-bold text-[color:var(--brand-500)]">{score}</p>
              </div>
              <div className="p-4 rounded-xl bg-[color:var(--bg-elevated)]">
                <p className="text-lg text-[color:var(--text-muted)] mb-2">Doğru Cevap</p>
                <p className="text-3xl font-bold text-[color:var(--brand-500)]">{correctCount}</p>
              </div>
              <div className="p-4 rounded-xl bg-[color:var(--bg-elevated)]">
                <p className="text-lg text-[color:var(--text-muted)] mb-2">Soru Sayısı</p>
                <p className="text-3xl font-bold text-[color:var(--brand-500)]">{questionCount}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-[color:var(--brand-500)] text-white rounded-xl hover:bg-[color:var(--brand-600)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                <Rocket className="w-5 h-5" />
                Tekrar Oyna
              </button>
              <Link
                to="/"
                className="px-8 py-4 bg-[color:var(--bg-elevated)] text-[color:var(--text-primary)] rounded-xl hover:bg-[color:var(--bg-surface)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                Ana Sayfa
              </Link>
            </div>
          </motion.div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-2" glass>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Timer className="w-6 h-6 text-[color:var(--text-muted)]" />
              <span className="text-xl font-medium text-[color:var(--text-primary)]">Süre: {timeLeft}s</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[color:var(--brand-500)]" />
              <span className="text-xl font-medium text-[color:var(--brand-500)]">Puan: {score}</span>
            </div>
          </div>

          {currentQuestion && (
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
                  {currentQuestion.question}
                </h2>
                <p className="text-lg text-[color:var(--text-muted)]">Lütfen aşağıdaki kutucuğa cevabınızı yazın</p>
              </motion.div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-xl ${feedback.correct ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'} border flex items-center gap-4`}
                >
                  {feedback.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <span className={`text-lg font-medium ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback.message}
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full p-5 border rounded-xl bg-[color:var(--bg-elevated)] border-[color:var(--border)] text-[color:var(--text-primary)] text-xl focus:ring-2 focus:ring-[color:var(--brand-500)] focus:border-transparent transition-all shadow-sm"
                  placeholder="Cevabınızı girin"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-8 py-5 bg-[color:var(--brand-500)] text-white rounded-xl hover:bg-[color:var(--brand-600)] transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-medium flex items-center justify-center gap-3 transform hover:-translate-y-1"
                >
                  <CheckCircle className="w-5 h-5" />
                  Cevabı Gönder
                </button>
              </form>
            </div>
          )}
        </Card>

        <div className="space-y-8">
          <Card glass>
            <div className="flex items-center gap-3 mb-5">
              <Lightbulb className="w-6 h-6 text-[color:var(--brand-500)]" />
              <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">İpucu</h3>
            </div>
            <p className="text-lg text-[color:var(--text-muted)]">Soruyu çözmek için farklı stratejiler deneyin. Örneğin toplama sorularında sayıları gruplayabilirsiniz.</p>
          </Card>

          <Card glass>
            <div className="flex items-center gap-3 mb-5">
              <BarChart2 className="w-6 h-6 text-[color:var(--brand-500)]" />
              <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">İstatistikler</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-lg text-[color:var(--text-muted)]">Doğru Cevap</span>
                </div>
                <span className="text-lg font-medium text-[color:var(--text-primary)]">{correctCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-lg text-[color:var(--text-muted)]">Yanlış Cevap</span>
                </div>
                <span className="text-lg font-medium text-[color:var(--text-primary)]">{questionCount - correctCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[color:var(--brand-500)]" />
                  <span className="text-lg text-[color:var(--text-muted)]">Ortalama Süre</span>
                </div>
                <span className="text-lg font-medium text-[color:var(--text-primary)]">{questionCount > 0 ? Math.floor(30 - (timeLeft / questionCount)) : 30}sn</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[color:var(--brand-500)]" />
                  <span className="text-lg text-[color:var(--text-muted)]">Başarı Oranı</span>
                </div>
                <span className="text-lg font-medium text-[color:var(--text-primary)]">{questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}