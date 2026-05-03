import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { User, Edit2, Save, X, Star, Target, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

const Profile = () => {
  const { player, updatePlayerName } = useStore();
  const [editMode, setEditMode] = useState(false);
  
  // Provide defaults if store doesn't have player initialized
  const safePlayer = player || { name: 'Oyuncu', level: 1, score: 0, nextLevelScore: 100 };
  const [newName, setNewName] = useState(safePlayer.name);

  const handleSave = () => {
    if (updatePlayerName && newName.trim()) {
      updatePlayerName(newName);
    }
    setEditMode(false);
  };

  const progressPercentage = Math.min(100, (safePlayer.score / safePlayer.nextLevelScore) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Profilin</h1>
          <p className="text-muted-foreground">İstatistiklerini ve ilerlemeni buradan takip et</p>
        </div>
      </motion.div>

      <div className="bg-card/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-glass border border-white/10 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-glow border-4 border-background">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-background rounded-full flex items-center justify-center border-2 border-border shadow-sm">
              <span className="font-bold text-primary">{safePlayer.level}</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              {editMode ? (
                <div className="flex items-center gap-2 w-full max-w-md">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 px-4 py-2 text-xl font-semibold bg-background/50 border-2 border-primary rounded-xl focus:outline-none"
                    autoFocus
                  />
                  <button onClick={handleSave} className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    <Save className="w-5 h-5" />
                  </button>
                  <button onClick={() => setEditMode(false)} className="p-2.5 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-display font-bold text-foreground">{safePlayer.name}</h2>
                  <button 
                    onClick={() => { setEditMode(true); setNewName(safePlayer.name); }}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-medium text-accent">Seviye {safePlayer.level} Uzmanı</span>
            </div>

            <div className="space-y-2 max-w-md mx-auto md:mx-0">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">İlerleme</span>
                <span className="text-primary">{safePlayer.score} / {safePlayer.nextLevelScore} XP</span>
              </div>
              <div className="h-3 w-full bg-background/50 rounded-full overflow-hidden border border-border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-background/40 p-6 rounded-2xl border border-border backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Puan</p>
                <p className="text-3xl font-display font-bold text-foreground">{safePlayer.score}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-background/40 p-6 rounded-2xl border border-border backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hedef Puan</p>
                <p className="text-3xl font-display font-bold text-foreground">{safePlayer.nextLevelScore}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;