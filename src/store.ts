import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Player {
  id: string;
  name: string;
  level: number;
  score: number;
  nextLevelScore: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  score: number;
}

interface GameState {
  score: number;
  player: Player;
  leaderboard: LeaderboardEntry[];
  addScore: (points: number) => void;
  resetScore: () => void;
  updatePlayerName: (name: string) => void;
}

const checkLevelUp = (currentScore: number, currentLevel: number): { newLevel: number, nextScore: number } => {
  let newLevel = currentLevel;
  let nextScore = currentLevel * 100;
  
  if (currentScore >= nextScore) {
    newLevel += 1;
    nextScore = newLevel * 100;
  }
  return { newLevel, nextScore };
};

export const useStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      player: {
        id: 'user-1',
        name: 'Oyuncu',
        level: 1,
        score: 0,
        nextLevelScore: 100
      },
      leaderboard: [
        { id: '1', name: 'Ahmet Y.', level: 5, score: 2450 },
        { id: '2', name: 'Zeynep K.', level: 4, score: 1890 },
        { id: '3', name: 'Caner D.', level: 3, score: 1200 },
        { id: '4', name: 'Elif M.', level: 2, score: 850 },
        { id: '5', name: 'Burak T.', level: 1, score: 420 },
      ],
      addScore: (points) => set((state) => {
        const newScore = state.score + points;
        const { newLevel, nextScore } = checkLevelUp(newScore, state.player.level);
        
        return { 
          score: newScore,
          player: {
            ...state.player,
            score: newScore,
            level: newLevel,
            nextLevelScore: nextScore
          }
        };
      }),
      resetScore: () => set((state) => ({ 
        score: 0,
        player: {
          ...state.player,
          score: 0,
          level: 1,
          nextLevelScore: 100
        }
      })),
      updatePlayerName: (name) => set((state) => ({
        player: { ...state.player, name }
      }))
    }),
    {
      name: 'math-adventure-storage', // localStorage key
    }
  )
)