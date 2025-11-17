// src/components/admin/Dashboard.tsx
import { useState } from 'react';
import { Trash2, Eye, Lock, Unlock, Copy, CheckCircle } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';
import { VotingChart } from '../charts/VotingChart';
import { ResultsPanel } from './ResultsPanel';

export const Dashboard = () => {
  const { votings, updateVoting, deleteVoting } = useVoting();
  const [selectedVoting, setSelectedVoting] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updateVoting(id, { isActive: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta votación?')) {
      deleteVoting(id);
      if (selectedVoting === id) {
        setSelectedVoting(null);
      }
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const selectedVotingData = votings.find(v => v.id === selectedVoting);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de votaciones */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Votaciones</h2>
          
          {votings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay votaciones creadas
            </p>
          ) : (
            <div className="space-y-3">
              {votings.map(voting => {
                const totalVotes = voting.options.reduce((sum, opt) => sum + opt.votes, 0);
                return (
                  <div
                    key={voting.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedVoting === voting.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedVoting(voting.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 flex-1">{voting.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          voting.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {voting.isActive ? 'Activa' : 'Cerrada'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="font-mono font-bold text-blue-600">{voting.code}</span>
                      <span>{totalVotes} votos</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode(voting.code);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                      >
                        {copiedCode === voting.code ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActive(voting.id, voting.isActive);
                        }}
                        className="p-2 hover:bg-gray-100 rounded transition"
                      >
                        {voting.isActive ? (
                          <Unlock className="w-4 h-4 text-green-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(voting.id);
                        }}
                        className="p-2 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detalles de la votación seleccionada */}
      <div className="lg:col-span-2">
        {selectedVotingData ? (
          <div className="space-y-6">
            <ResultsPanel voting={selectedVotingData} />
            <VotingChart voting={selectedVotingData} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Selecciona una votación
            </h3>
            <p className="text-gray-600">
              Elige una votación de la lista para ver sus detalles y resultados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};