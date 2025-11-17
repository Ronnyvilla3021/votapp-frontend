// src/components/voting/VoteForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { Voting } from '../../types';
import { useVoting } from '../../context/VotingContext';
import { VoteCard } from './VoteCard';

interface VoteFormProps {
  voting: Voting;
}

export const VoteForm = ({ voting }: VoteFormProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { castVote, hasUserVoted } = useVoting();
  const navigate = useNavigate();

  const alreadyVoted = hasUserVoted(voting.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) return;

    setLoading(true);

    try {
      const success = await castVote(voting.id, selectedOption);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate(`/results/${voting.code}`);
        }, 2000);
      } else {
        alert('No se pudo registrar el voto. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al votar:', error);
      alert('Error al emitir el voto');
    } finally {
      setLoading(false);
    }
  };

  if (alreadyVoted) {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Ya has votado</h3>
        <p className="text-gray-600 mb-6">
          Solo puedes votar una vez en esta votación
        </p>
        <button
          onClick={() => navigate(`/results/${voting.code}`)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Ver Resultados
        </button>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Voto registrado!</h3>
        <p className="text-gray-600">
          Redirigiendo a los resultados...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{voting.title}</h2>
        {voting.description && (
          <p className="text-gray-600 mb-4">{voting.description}</p>
        )}
        <div className="flex items-center space-x-4 text-sm text-gray-500 border-t pt-4">
          <span>Código: <span className="font-mono font-bold text-blue-600">{voting.code}</span></span>
          <span>•</span>
          <span>{voting.options.length} opciones</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Selecciona tu opción:</h3>
        {voting.options.map(option => (
          <VoteCard
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            onSelect={() => setSelectedOption(option.id)}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={!selectedOption || loading}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
          selectedOption && !loading
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {loading ? 'Registrando voto...' : 'Confirmar Voto'}
      </button>
    </form>
  );
};