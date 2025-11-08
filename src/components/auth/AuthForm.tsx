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
    <div className="max-w-3xl mx-auto mt-20"> {/* 🔹 antes era max-w-md mt-12 */}
      <div className="bg-white rounded-2xl shadow-xl p-12"> {/* 🔹 antes era p-8 */}
        <div className="text-center mb-10"> {/* 🔹 más espacio inferior */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"> {/* 🔹 más grande */}
            <UserCircle className="w-12 h-12 text-white" /> {/* 🔹 icono más grande */}
          </div>
          <h2 className="text-4xl font-bold text-gray-800">Bienvenido a VotApp</h2> {/* 🔹 antes 3xl */}
          <p className="text-gray-600 mt-3 text-lg">Ingresa tus datos para comenzar</p> {/* 🔹 texto más grande */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8"> {/* 🔹 más separación */}
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-3">
              Tu Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-4">
              Tipo de Usuario
            </label>
            <div className="grid grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setRole('voter')}
                className={`p-6 rounded-xl border-2 transition text-lg ${
                  role === 'voter'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <UserCircle className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <p className="font-medium text-gray-800">Votante</p>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-6 rounded-xl border-2 transition text-lg ${
                  role === 'admin'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Shield className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <p className="font-medium text-gray-800">Admin</p>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};
