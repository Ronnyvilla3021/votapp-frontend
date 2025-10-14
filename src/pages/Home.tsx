// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { AuthForm } from '../components/auth/AuthForm';
import { Vote, Shield, BarChart3 } from 'lucide-react';

export const Home = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenido a <span className="text-blue-600">VotApp</span>
          </h1>
          <p className="text-xl text-gray-600">
            Sistema de votaciones progresivo para entornos educativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Fácil de Usar</h3>
            <p className="text-gray-600 text-sm">
              Interfaz intuitiva para crear y participar en votaciones
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Seguro</h3>
            <p className="text-gray-600 text-sm">
              Validación de voto único por usuario y votación
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Resultados en Tiempo Real</h3>
            <p className="text-gray-600 text-sm">
              Visualiza los resultados al instante con gráficos interactivos
            </p>
          </div>
        </div>

        <AuthForm />
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        ¡Hola, {currentUser.name}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/vote')}
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
        >
          <Vote className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Votar</h2>
          <p className="text-gray-600">Participa en una votación activa</p>
        </button>

        {currentUser.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
          >
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Administrar</h2>
            <p className="text-gray-600">Crea y gestiona votaciones</p>
          </button>
        )}
      </div>
    </div>
  );
};