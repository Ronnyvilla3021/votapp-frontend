// src/pages/Results.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { VotingChart } from '../components/charts/VotingChart';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const Results = () => {
  const { code } = useParams<{ code: string }>();
  const { getVotingByCode } = useVoting();
  const navigate = useNavigate();

  if (!code) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Código no válido
          </h2>
          <p className="text-gray-600 mb-6">
            No se proporcionó un código de votación
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

  const voting = getVotingByCode(code);

  if (!voting) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Votación no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            No existe una votación con el código <strong>{code}</strong>
          </p>
          <button
            onClick={() => navigate('/vote')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar otra votación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Resultados de la Votación
        </h1>
        <p className="text-gray-600">
          Visualiza los resultados en tiempo real
        </p>
      </div>

      <VotingChart voting={voting} />
    </div>
  );
};