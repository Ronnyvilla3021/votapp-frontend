// src/components/auth/AuthForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UserCircle, Shield } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';
import type { User } from '../../types';
import { validateUserName } from '../../utils/validation';

export const AuthForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'voter' | 'admin'>('voter');
  const [error, setError] = useState('');
  const { setCurrentUser } = useVoting();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateUserName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      name: name.trim(),
      role,
      votedIn: []
    };

    setCurrentUser(newUser);
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/vote');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Bienvenido a VotApp</h2>
          <p className="text-gray-600 mt-2">Ingresa tus datos para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Tu Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Usuario
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('voter')}
                className={`p-4 rounded-lg border-2 transition ${
                  role === 'voter'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <UserCircle className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium text-gray-800">Votante</p>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-4 rounded-lg border-2 transition ${
                  role === 'admin'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Shield className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-medium text-gray-800">Admin</p>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};