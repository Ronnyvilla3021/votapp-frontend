// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { AuthForm } from '../components/auth/AuthForm';
import { Vote, Shield, BarChart3, Lock, Users, Zap } from 'lucide-react';

export const Home = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-2xl">
              <Vote className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Bienvenido a{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VotApp
            </span>
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sistema de votaciones progresivo diseñado para instituciones educativas
          </p>
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Seguro</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Transparente</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Instantáneo</span>
            </span>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Fácil de Usar</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Interfaz intuitiva diseñada para facilitar la participación de toda la comunidad educativa
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Seguro y Confiable</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Sistema con validación de voto único que garantiza la integridad del proceso electoral
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Resultados en Tiempo Real</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Visualización instantánea de resultados con gráficos interactivos y estadísticas detalladas
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          ¡Hola, <span className="text-blue-600">{currentUser.name}</span>!
        </h1>
        <p className="text-xl text-gray-600">
          {currentUser.role === 'admin' 
            ? 'Panel de administración listo para gestionar votaciones' 
            : '¿Qué te gustaría hacer hoy?'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/vote')}
          className="group bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 hover:-translate-y-2"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
            <Vote className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Votar</h2>
          <p className="text-gray-600 text-lg">
            Participa en una votación activa ingresando el código proporcionado
          </p>
        </button>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            className="group bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Administrar</h2>
            <p className="text-gray-600 text-lg">
              Crea, gestiona y monitorea votaciones institucionales
            </p>
          </button>
        )}
      </div>
    </div>
  );
};