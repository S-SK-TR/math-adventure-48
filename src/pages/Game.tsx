import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { generateQuestion } from '../utils/math'
import { Timer, Award, CheckCircle, XCircle, Lightbulb, BarChart2, Clock, Target, Rocket, RefreshCw, ArrowRight } from 'lucide-react'
import { cn } from '../utils/cn'

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
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300",
        glass ? "bg-card/50 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-glass" : "bg-card border border-border shadow-sm",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
      <div className="relative z-10">{children}</div>
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
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Auto focus input
  useEffect(() => {
    if (!gameOver && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentQuestion, gameOver])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuestion || !userAnswer.trim()) return

    const isCorrect = parseInt(userAnswer) === currentQuestion.answer
    setQuestionCount(prev => prev + 1)

    if (isCorrect) {
      const points = 10 + Math.floor(timeLeft / 3)
      setScore(prev => prev + points)
      setCorrectCount(prev => prev + 1)
      addScore(points)
      setFeedback({ correct: true, message: `Harika! +${points} puan` })
    } else {
      setFeedback({ correct: false, message: `Yanlış! Doğru cevap: ${currentQuestion.answer}` })
    }

    setTimeout(() => {
      setCurrentQuestion(generateQuestion())
      setUserAnswer('')
      setFeedback(null)
      setTimeLeft(prev => Math.min(prev + 5, 30)) // Add bonus time
    }, 1200)
  }

  if (gameOver) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Card className="text-center relative overflow-hidden" glass>
          <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-10"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mb-8 shadow-glow transform rotate-3">
              <Award className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-5xl font-display font-bold mb-8 text-foreground">Oyun Bitti!</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-background/50 border border-border backdrop-blur-sm">
                <p className="text-muted-foreground font-medium mb-2">Toplam Puan</p>
                <p className="text-4xl font-display font-bold text-primary">{score}</p>
              </div>
              <div className="p-6 rounded-2xl bg-background/50 border border-border backdrop-blur-sm">
                <p className="text-muted-foreground font-medium mb-2">Doğru Cevap</p>
                <p className="text-4xl font-display font-bold text-green-500">{correctCount}</p>
              </div>
              <div className="p-6 rounded-2xl bg-background/50 border border-border backdrop-blur-sm">
                <p className="text-muted-foreground font-medium mb-2">Soru Sayısı</p>
                <p className="text-4xl font-display font-bold text-accent">{questionCount}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center gap-3 font-medium text-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Tekrar Oyna
              </button>
              <Link
                to="/"
                className="px-8 py-4 bg-muted text-foreground rounded-2xl hover:bg-muted/80 transition-all duration-300 flex items-center justify-center gap-3 font-medium text-lg border border-border"
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
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card glass className="relative overflow-hidden min-h-[450px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background/50 border border-border">
                <Timer className={cn("w-5 h-5", timeLeft < 10 ? "text-red-500 animate-pulse" : "text-muted-foreground")} />
                <span className={cn("text-xl font-display font-bold", timeLeft < 10 ? "text-red-500" : "text-foreground")}>
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-xl font-display font-bold text-primary">{score} Puan</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentQuestion && (
                <motion.div
                  key={currentQuestion.question}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-4 tracking-tight">
                      {currentQuestion.question}
                    </h2>
                    <p className="text-muted-foreground text-lg">İşlemin sonucu kaçtır?</p>
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={cn(
                          "absolute top-32 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-20 backdrop-blur-md",
                          feedback.correct 
                            ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30" 
                            : "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30"
                        )}
                      >
                        {feedback.correct ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-bold">{feedback.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-auto">
                    <div className="relative group">
                      <input
                        ref={inputRef}
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={!!feedback}
                        className="w-full px-6 py-5 rounded-2xl bg-background/50 border-2 border-border text-foreground text-3xl font-display font-bold text-center focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="?"
                        autoComplete="off"
                      />
                      <button
                        type="submit"
                        disabled={!!feedback || !userAnswer.trim()}
                        className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        <div className="space-y-6">
          <Card glass className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/20">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">İpucu</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Her doğru cevapta ekstra zaman kazanırsın! Hızlı cevap vermek sana daha yüksek bonus puan getirir.
            </p>
          </Card>

          <Card glass>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <BarChart2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">İstatistikler</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-muted-foreground">Doğru</span>
                </div>
                <span className="font-bold text-foreground text-lg">{correctCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-muted-foreground">Yanlış</span>
                </div>
                <span className="font-bold text-foreground text-lg">{questionCount - correctCount}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="font-medium text-muted-foreground">Başarı</span>
                </div>
                <span className="font-bold text-foreground text-lg">
                  {questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}