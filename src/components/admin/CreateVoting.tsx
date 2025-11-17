// src/components/admin/CreateVoting.tsx
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { useVoting } from '../../context/VotingContext';
import { validateVotingTitle, validateVotingOptions } from '../../utils/validation';

export const CreateVoting = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { addVoting } = useVoting();

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const titleError = validateVotingTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }

    const filteredOptions = options.filter(opt => opt.trim());
    const optionsError = validateVotingOptions(filteredOptions);
    if (optionsError) {
      setError(optionsError);
      return;
    }

    // Generar código único para la votación (ejemplo: 6 caracteres)
    const code = uuidv4().slice(0, 6).toUpperCase();

    addVoting({
      title: title.trim(),
      description: description.trim() || undefined,
      code, // ← Se agrega el campo requerido
      options: filteredOptions.map(opt => ({
        id: uuidv4(),
        text: opt.trim(),
        votes: 0
      })),
      isActive: true
    });

    setSuccess(true);
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      setSuccess(false);
    }, 3000);
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Votación creada!</h3>
        <p className="text-gray-600">La votación se ha creado exitosamente</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Votación</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Título de la Votación *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Elección de delegado de curso"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe brevemente el propósito de esta votación"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opciones de Votación *
          </label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opción ${index + 1}`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {options.length < 10 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar Opción</span>
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
        >
          Crear Votación
        </button>
      </form>
    </div>
  );
};
