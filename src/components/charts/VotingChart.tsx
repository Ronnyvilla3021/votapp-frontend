// src/components/charts/VotingChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { Voting } from '../../types';

interface VotingChartProps {
  voting: Voting;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

export const VotingChart = ({ voting }: VotingChartProps) => {
  const data = voting.options.map(option => ({
    name: option.text.length > 20 ? option.text.substring(0, 20) + '...' : option.text,
    votos: option.votes,
    fullName: option.text
  }));

  const totalVotes = voting.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{voting.title}</h3>
        {voting.description && (
          <p className="text-gray-600">{voting.description}</p>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-gray-500">
            Código: <span className="font-mono font-bold text-blue-600">{voting.code}</span>
          </div>
          <div className="text-sm text-gray-500">
            Total de votos: <span className="font-bold text-gray-800">{totalVotes}</span>
          </div>
        </div>
      </div>

      {totalVotes > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-800">{payload[0].payload.fullName}</p>
                        <p className="text-blue-600 font-bold">{payload[0].value} votos</p>
                        <p className="text-sm text-gray-600">
                          {((Number(payload[0].value) / totalVotes) * 100).toFixed(1)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="votos" radius={[8, 8, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {voting.options.map((option, index) => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              return (
                <div key={option.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700 font-medium">{option.text}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 font-semibold">{option.votes} votos</span>
                    <span className="text-blue-600 font-bold min-w-[50px] text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aún no hay votos registrados</p>
          <p className="text-gray-400 text-sm mt-2">Los resultados aparecerán aquí cuando se emitan votos</p>
        </div>
      )}
    </div>
  );
};