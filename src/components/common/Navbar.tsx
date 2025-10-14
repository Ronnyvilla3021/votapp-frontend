// src/components/common/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { Vote, LayoutDashboard, LogOut, User, GraduationCap } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';

export const Navbar = () => {
  const { currentUser, logout } = useVoting();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white shadow-2xl border-b-4 border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e identidad institucional */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-all">
              <Vote className="w-8 h-8 text-blue-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">VotApp</span>
              <span className="text-xs text-blue-300 -mt-1">Sistema Institucional</span>
            </div>
          </Link>

          {/* Navegación */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
            >
              <Vote className="w-5 h-5" />
              <span className="hidden sm:inline">Votar</span>
            </Link>

            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Administración</span>
              </Link>
            )}

            {currentUser ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                {/* Usuario actual */}
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2.5 rounded-lg backdrop-blur-sm">
                  <User className="w-5 h-5 text-blue-300" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{currentUser.name}</span>
                    <span className="text-xs text-blue-300">
                      {currentUser.role === 'admin' ? 'Administrador' : 'Votante'}
                    </span>
                  </div>
                </div>

                {/* Botón logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-blue-300 text-sm">
                <GraduationCap className="w-5 h-5" />
                <span className="hidden sm:inline">IST Yavirac</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};