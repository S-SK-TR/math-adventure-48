import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Matematik Macerası</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Eğlenceli bir şekilde matematik öğrenin! Matematik konularını interaktif oyunlarla keşfedin ve seviye atlayın.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Oyuna Başla</h2>
          <p className="text-gray-600 mb-6">Matematik sorularını çözerek puan kazanın ve seviye atlayın.</p>
          <Link to="/game" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Oyna</Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Lider Tablosu</h2>
          <p className="text-gray-600 mb-6">En iyi oyuncuları ve en yüksek puanları görüntüleyin.</p>
          <Link to="/leaderboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Görüntüle</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;