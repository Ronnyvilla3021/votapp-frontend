// src/pages/Vote.tsx
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { VotingRoom } from '../components/voting/VotingRoom';
import { AlertCircle } from 'lucide-react';

export const Vote = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acceso Restringido
          </h2>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para participar en votaciones
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Participar en Votación
        </h1>
        <p className="text-gray-600">
          Ingresa el código que te proporcionaron para acceder a la votación
        </p>
      </div>
      
      <VotingRoom />
    </div>
  );
};