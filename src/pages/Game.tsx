import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store';

const Game = () => {
  const { player, updateScore, generateQuestion } = useStore();
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const checkAnswer = () => {
    const isCorrect = parseInt(answer) === question.answer;
    setFeedback(isCorrect ? '🎉 Doğru! +10 puan' : `❌ Yanlış! Doğru cevap: ${question.answer}`);
    setShowFeedback(true);

    if (isCorrect) {
      updateScore(10);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setAnswer('');
      setQuestion(generateQuestion());
    }, 2000);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && answer) {
        checkAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [answer]);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Matematik Sorusu</h1>
        <p className="text-xl text-gray-600">Aşağıdaki soruyu çözün ve puan kazanın!</p>
      </motion.div>

      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <div className="text-center mb-6">
          <motion.div
            key={question.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-blue-600 mb-4"
          >
            {question.text}
          </motion.div>
          <p className="text-gray-600">Lütfen cevabı girin:</p>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-32 text-center text-2xl border-2 border-blue-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Cevap"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkAnswer}
          disabled={!answer}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition ${!answer ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          Cevabı Gönder
        </motion.button>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 rounded-lg text-center font-medium ${feedback.includes('Doğru') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {feedback}
        </motion.div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Oyuncu Bilgileri</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">İsim: {player.name}</p>
            <p className="text-gray-600">Seviye: {player.level}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">Puan: {player.score}</p>
            <p className="text-sm text-gray-500">Bir sonraki seviye: {player.nextLevelScore - player.score} puan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;