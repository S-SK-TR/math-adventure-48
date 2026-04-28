import { create } from 'zustand';

interface Player {
  id: string;
  name: string;
  score: number;
  level: number;
  nextLevelScore: number;
}

interface Question {
  id: string;
  text: string;
  answer: number;
}

interface AppState {
  player: Player;
  leaderboard: Player[];
  generateQuestion: () => Question;
  updateScore: (points: number) => void;
  updatePlayerName: (name: string) => void;
}

const useStore = create<AppState>((set, get) => ({
  player: {
    id: 'player1',
    name: 'Öğrenci',
    score: 0,
    level: 1,
    nextLevelScore: 100
  },

  leaderboard: [
    { id: 'player1', name: 'Ahmet', score: 150, level: 2 },
    { id: 'player2', name: 'Ayşe', score: 120, level: 2 },
    { id: 'player3', name: 'Mehmet', score: 90, level: 1 },
    { id: 'player4', name: 'Fatma', score: 80, level: 1 },
    { id: 'player5', name: 'Ali', score: 70, level: 1 }
  ].sort((a, b) => b.score - a.score),

  generateQuestion: () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let text, answer;
    switch (operation) {
      case '+':
        text = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        text = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        break;
      case '*':
        text = `${num1} × ${num2}`;
        answer = num1 * num2;
        break;
      default:
        text = `${num1} + ${num2}`;
        answer = num1 + num2;
    }

    return {
      id: Date.now().toString(),
      text,
      answer
    };
  },

  updateScore: (points) => {
    set((state) => {
      const newScore = state.player.score + points;
      let newLevel = state.player.level;
      let newNextLevelScore = state.player.nextLevelScore;

      // Level atlama kontrolü
      while (newScore >= newNextLevelScore) {
        newLevel++;
        newNextLevelScore += 100 * newLevel;
      }

      const updatedPlayer = {
        ...state.player,
        score: newScore,
        level: newLevel,
        nextLevelScore: newNextLevelScore
      };

      // Lider tablosunu güncelle
      const updatedLeaderboard = [...state.leaderboard];
      const playerIndex = updatedLeaderboard.findIndex(p => p.id === state.player.id);

      if (playerIndex !== -1) {
        updatedLeaderboard[playerIndex] = updatedPlayer;
      } else {
        updatedLeaderboard.push(updatedPlayer);
      }

      // Lider tablosunu puana göre sırala
      updatedLeaderboard.sort((a, b) => b.score - a.score);

      return {
        player: updatedPlayer,
        leaderboard: updatedLeaderboard
      };
    });
  },

  updatePlayerName: (name) => {
    set((state) => {
      const updatedPlayer = { ...state.player, name };

      // Lider tablosundaki ismi güncelle
      const updatedLeaderboard = state.leaderboard.map(p =>
        p.id === state.player.id ? updatedPlayer : p
      );

      return {
        player: updatedPlayer,
        leaderboard: updatedLeaderboard
      };
    });
  }
}));

export default useStore;