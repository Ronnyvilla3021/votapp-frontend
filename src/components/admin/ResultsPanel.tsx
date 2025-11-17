// src/components/admin/ResultsPanel.tsx
import type { Voting } from '../../types';
import { Download, TrendingUp } from 'lucide-react';

interface ResultsPanelProps {
  voting: Voting;
}

export const ResultsPanel = ({ voting }: ResultsPanelProps) => {
  const totalVotes = voting.options.reduce((sum, opt) => sum + opt.votes, 0);
  const winner = voting.options.reduce((max, opt) => opt.votes > max.votes ? opt : max);

  const handleExportJSON = () => {
    const data = {
      voting: voting.title,
      code: voting.code,
      totalVotes,
      results: voting.options.map(opt => ({
        option: opt.text,
        votes: opt.votes,
        percentage: totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(2) + '%' : '0%'
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `votacion_${voting.code}_${Date.now()}.json`;
    a.click();
  };

  const handleExportCSV = () => {
    const headers = ['Opción', 'Votos', 'Porcentaje'];
    const rows = voting.options.map(opt => [
      opt.text,
      opt.votes.toString(),
      totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(2) + '%' : '0%'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `votacion_${voting.code}_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Análisis de Resultados</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total de Votos</p>
          <p className="text-3xl font-bold text-blue-600">{totalVotes}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Opciones</p>
          <p className="text-3xl font-bold text-purple-600">{voting.options.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Estado</p>
          <p className="text-lg font-bold text-green-600">
            {voting.isActive ? 'Activa' : 'Cerrada'}
          </p>
        </div>
      </div>

      {totalVotes > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4 flex items-start space-x-3">
          <TrendingUp className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Opción Ganadora</h4>
            <p className="text-lg font-semibold text-gray-700">{winner.text}</p>
            <p className="text-sm text-gray-600">
              {winner.votes} votos ({((winner.votes / totalVotes) * 100).toFixed(1)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};