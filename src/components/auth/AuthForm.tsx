import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Shield } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';
import { authAPI } from '../../services/api';

export const AuthForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'voter' | 'admin'>('voter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useVoting();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validar con el backend
      const response = await authAPI.login(name.trim(), password);
      
      if (response.success) {
        const { token, user } = response.data;

        // Verificar que el rol seleccionado coincida con el del backend
        if (user.role !== role) {
          setError(`Este usuario es ${user.role === 'admin' ? 'Administrador' : 'Votante'}, no ${role === 'admin' ? 'Administrador' : 'Votante'}`);
          setLoading(false);
          return;
        }

        // Guardar token y usuario
        localStorage.setItem('votapp_token', token);
        localStorage.setItem('votapp_user', JSON.stringify(user));
        
        setCurrentUser(user);

        // Navegar según el rol
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/vote');
        }
      }
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.response?.data?.message || 'Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800">Bienvenido a VotApp</h2>
          <p className="text-gray-600 mt-3 text-lg">Ingresa tus credenciales para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Campo de usuario */}
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-3">
              Usuario
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: admin, voter1, voter2"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
              required
              disabled={loading}
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-3">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
              required
              disabled={loading}
            />
          </div>

          {/* Selección de rol */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-4">
              Tipo de Usuario
            </label>
            <div className="grid grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setRole('voter')}
                disabled={loading}
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
                disabled={loading}
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

          {/* Mostrar error */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Continuar'}
          </button>
        </form>

        
    
      </div>
    </div>
  );
};