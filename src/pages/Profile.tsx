import { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../store';

const Profile = () => {
  const { player, updatePlayerName } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(player.name);

  const handleSave = () => {
    updatePlayerName(newName);
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-800 mb-8 text-center"
      >
        Profil
      </motion.h1>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mr-6">
            👤
          </div>
          <div>
            {editMode ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <h2 className="text-2xl font-semibold text-blue-700">{player.name}</h2>
            )}
            <p className="text-gray-600">Seviye {player.level} Oyuncu</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700 font-medium mb-1">Toplam Puan</p>
            <p className="text-2xl font-bold text-blue-800">{player.score}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700 font-medium mb-1">Bir Sonraki Seviye</p>
            <p className="text-2xl font-bold text-blue-800">{player.nextLevelScore - player.score} puan</p>
          </div>
        </div>

        <div className="flex justify-end">
          {editMode ? (
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                İptal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Kaydet
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              İsim Değiştir
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;