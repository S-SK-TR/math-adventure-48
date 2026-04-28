import { motion } from 'framer-motion';
import useStore from '../store';

const Leaderboard = () => {
  const { leaderboard } = useStore();

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-800 mb-8 text-center"
      >
        Lider Tablosu
      </motion.h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Sıra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">İsim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Seviye</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Puan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboard.map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={index < 3 ? 'bg-blue-50' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {player.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {player.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {player.score}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;