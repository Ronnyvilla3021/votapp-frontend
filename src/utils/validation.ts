// src/utils/validation.ts

export const validateVotingTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'El título es obligatorio';
  }
  if (title.length < 3) {
    return 'El título debe tener al menos 3 caracteres';
  }
  if (title.length > 100) {
    return 'El título no puede exceder 100 caracteres';
  }
  return null;
};

export const validateVotingOptions = (options: string[]): string | null => {
  if (options.length < 2) {
    return 'Debes tener al menos 2 opciones';
  }
  if (options.length > 10) {
    return 'No puedes tener más de 10 opciones';
  }
  
  const emptyOptions = options.filter(opt => !opt.trim());
  if (emptyOptions.length > 0) {
    return 'Todas las opciones deben tener texto';
  }

  const uniqueOptions = new Set(options.map(opt => opt.trim().toLowerCase()));
  if (uniqueOptions.size !== options.length) {
    return 'No puede haber opciones duplicadas';
  }

  return null;
};

export const validateCode = (code: string): boolean => {
  return /^[A-Z0-9]{6}$/.test(code);
};

export const validateUserName = (name: string): string | null => {
  if (!name.trim()) {
    return 'El nombre es obligatorio';
  }
  if (name.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  if (name.length > 50) {
    return 'El nombre no puede exceder 50 caracteres';
  }
  return null;
};