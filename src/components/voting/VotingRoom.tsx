// src/components/voting/VotingRoom.tsx
import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';
import { VoteForm } from './VoteForm';
import type { Voting } from '../../types';

export const VotingRoom = () => {
  const [code, setCode] = useState('');
  const [searchedVoting, setSearchedVoting] = useState<Voting | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { getVotingByCode } = useVoting();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!code.trim()) {
      setError('Por favor ingresa un código');
      setLoading(false);
      return;
    }

    try {
      const voting = await getVotingByCode(code);

      if (!voting) {
        setError('No se encontró ninguna votación con ese código');
        setSearchedVoting(null);
        setLoading(false);
        return;
      }

      if (!voting.isActive) {
        setError('Esta votación ya finalizó');
        setSearchedVoting(null);
        setLoading(false);
        return;
      }

      setSearchedVoting(voting);
    } catch (err) {
      setError('Error al buscar la votación. Intenta de nuevo.');
      setSearchedVoting(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!searchedVoting ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Ingresar a Votación</h2>
            <p className="text-gray-600">Ingresa el código de 6 caracteres de la votación</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Votación
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                disabled={loading}
                className="w-full px-6 py-4 text-center text-2xl font-mono font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar Votación'}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => {
              setSearchedVoting(null);
              setCode('');
              setError('');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
          >
            <span>← Buscar otra votación</span>
          </button>
          <VoteForm voting={searchedVoting} />
        </div>
      )}
    </div>
  );
};