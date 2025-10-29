// src/pages/Admin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Dashboard } from '../components/admin/Dashboard';
import { CreateVoting } from '../components/admin/CreateVoting';
import { Plus, LayoutDashboard, AlertCircle } from 'lucide-react';

export const Admin = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create'>('dashboard');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acceso Restringido
          </h2>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión como administrador
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

  if (currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sin Permisos
          </h2>
          <p className="text-gray-600 mb-6">
            No tienes permisos de administrador
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600">
          Crea y gestiona tus votaciones
        </p>
      </div>

      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-4 px-4 font-semibold transition flex items-center space-x-2 ${
            activeTab === 'dashboard'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Mis Votaciones</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`pb-4 px-4 font-semibold transition flex items-center space-x-2 ${
            activeTab === 'create'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Votación</span>
        </button>
      </div>

      {activeTab === 'dashboard' ? <Dashboard /> : <CreateVoting />}
    </div>
  );
};