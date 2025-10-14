// src/components/common/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { Vote, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useVoting } from '../../context/VotingContext.tsx';

export const Navbar = () => {
  const { currentUser, logout } = useVoting();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Vote className="w-8 h-8" />
            <span className="text-2xl font-bold">VotApp</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:bg-white/20 px-4 py-2 rounded-lg transition flex items-center space-x-2"
            >
              <Vote className="w-5 h-5" />
              <span>Votar</span>
            </Link>

            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="hover:bg-white/20 px-4 py-2 rounded-lg transition flex items-center space-x-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            )}

            {currentUser && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-500 bg-red-600 px-4 py-2 rounded-lg transition flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Salir</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};