import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calculator, Rocket, ArrowRight, BookOpen, Trophy, Clock, Brain, Star, Sparkles } from 'lucide-react'
import { cn } from '../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

function Card({ children, className, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group",
        glass ? "bg-card/40 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-glass" : "bg-card border border-border shadow-sm",
        className
      )}
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
      >
        <Card className="lg:col-span-2 flex flex-col justify-center min-h-[400px] relative overflow-hidden" glass>
          {/* Decorative background blurs */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />

          <motion.div variants={itemVariants} className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span>Yeni Nesil Öğrenim</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground leading-tight">
              Matematiğin <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Maceraya Dönüşümü
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="relative z-10">
            <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-xl leading-relaxed">
              Matematik becerinizi test edin, seviyeler atlayın ve pratik yaparak zekanızı keskinleştirin. Her doğru cevap sizi bir adım öteye taşır.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/game"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:opacity-90 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              >
                Oyuna Başla
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-medium hover:bg-muted border border-border transition-all duration-300"
              >
                <Trophy className="w-5 h-5" />
                Lider Tablosu
              </Link>
            </div>
          </motion.div>
        </Card>

        <div className="space-y-6 flex flex-col">
          <motion.div variants={itemVariants} className="flex-1">
            <Card glass className="h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Hızlı Başlangıç</h2>
              <ul className="space-y-4">
                {[
                  { text: '4 işlemleri öğrenin', icon: Calculator },
                  { text: 'Puan sistemiyle yarışın', icon: Trophy },
                  { text: 'Seviyeler atlayın', icon: Star },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="p-1.5 rounded-md bg-accent/10">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1">
            <Card glass className="h-full">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 border border-accent/20">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 text-foreground">İstatistikler</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground font-medium">4 Temel İşlem</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-muted-foreground font-medium">Zaman Kontrolü</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { title: "Toplama", icon: "+", desc: "Temel birleştirme becerileri", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { title: "Çıkarma", icon: "-", desc: "Fark bulma ve eksiltme", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
          { title: "Çarpma", icon: "×", desc: "Hızlı hesaplama yeteneği", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
          { title: "Bölme", icon: "÷", desc: "Parçalara ayırma mantığı", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" }
        ].map((item, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="h-full flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-transform duration-300" glass>
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border text-3xl font-bold", item.bg, item.color, item.border)}>
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card glass className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Kendini Test Etmeye Hazır mısın?</h2>
              <p className="text-muted-foreground text-lg max-w-xl">Hemen oyuna katıl, pratik yap ve matematik becerilerinde ne kadar ilerleyebileceğini gör!</p>
            </div>
            <Link
              to="/game"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 w-full md:w-auto shrink-0 shadow-xl"
            >
              Hemen Başla
              <Rocket className="w-6 h-6" />
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}