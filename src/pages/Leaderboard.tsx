import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Trophy, Medal, Crown } from 'lucide-react';
import { cn } from '../utils/cn';

const Leaderboard = () => {
  const { leaderboard } = useStore();

  const sortedLeaderboard = [...(leaderboard || [])].sort((a, b) => b.score - a.score);
  
  // Eğer store'da data yoksa dummy veri gösterelim (premium hissi için)
  const displayData = sortedLeaderboard.length > 0 ? sortedLeaderboard : [
    { id: '1', name: 'Ahmet Y.', level: 5, score: 2450 },
    { id: '2', name: 'Zeynep K.', level: 4, score: 1890 },
    { id: '3', name: 'Caner D.', level: 3, score: 1200 },
    { id: '4', name: 'Elif M.', level: 2, score: 850 },
    { id: '5', name: 'Burak T.', level: 1, score: 420 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 shadow-glow border border-primary/20">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Lider Tablosu
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          En iyiler arasında yerini al. Puanları topla, seviyeleri atla ve zirveye yerleş!
        </p>
      </motion.div>

      <div className="bg-card/40 backdrop-blur-xl rounded-3xl shadow-glass border border-white/10 dark:border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-background/50">
                <th className="px-8 py-5 font-semibold text-muted-foreground">Sıra</th>
                <th className="px-8 py-5 font-semibold text-muted-foreground">Oyuncu</th>
                <th className="px-8 py-5 font-semibold text-muted-foreground text-center">Seviye</th>
                <th className="px-8 py-5 font-semibold text-muted-foreground text-right">Puan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {displayData.map((player, index) => (
                <motion.tr
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "group transition-colors duration-200 hover:bg-muted/50",
                    index === 0 && "bg-primary/5",
                    index === 1 && "bg-accent/5"
                  )}
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 ? <Crown className="w-6 h-6 text-yellow-500 mr-2" /> :
                       index === 1 ? <Medal className="w-6 h-6 text-gray-400 mr-2" /> :
                       index === 2 ? <Medal className="w-6 h-6 text-amber-600 mr-2" /> :
                       <span className="w-6 font-bold text-muted-foreground mr-2 text-center">{index + 1}</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={cn(
                      "font-medium text-lg",
                      index === 0 ? "text-primary font-bold" : "text-foreground"
                    )}>
                      {player.name}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-background/80 border border-border text-sm font-medium">
                      Lvl {player.level}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <span className={cn(
                      "font-display font-bold text-xl",
                      index === 0 ? "text-primary" : "text-foreground"
                    )}>
                      {player.score.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;