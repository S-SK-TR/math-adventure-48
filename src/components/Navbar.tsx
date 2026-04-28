import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg rounded-xl mx-4 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="mr-2"
            >
              🧮
            </motion.div>
            Math Adventure
          </Link>
          <div className="flex space-x-6">
            <Link to="/game" className="text-gray-700 hover:text-blue-600 font-medium transition">Oyna</Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium transition">Lider Tablosu</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">Profil</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;