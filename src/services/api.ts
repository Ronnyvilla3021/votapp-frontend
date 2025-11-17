import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configurar axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('votapp_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('votapp_token');
      localStorage.removeItem('votapp_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ========== AUTH APIs ==========
export const authAPI = {
  login: async (name: string, password: string) => {
    const response = await api.post('/auth/login', { name, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// ========== VOTINGS APIs ==========
export const votingAPI = {
  getAll: async () => {
    const response = await api.get('/votings');
    return response.data;
  },

  getActive: async () => {
    const response = await api.get('/votings/active');
    return response.data;
  },

  getByCode: async (code: string) => {
    const response = await api.get(`/votings/code/${code}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/votings/${id}`);
    return response.data;
  },

  create: async (data: {
    title: string;
    description?: string;
    options: string[];
  }) => {
    const response = await api.post('/votings', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/votings/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/votings/${id}`);
    return response.data;
  },

  close: async (id: string) => {
    const response = await api.patch(`/votings/${id}/close`);
    return response.data;
  },
};

// ========== VOTES APIs ==========
export const voteAPI = {
  castVote: async (votingId: string, optionId: string) => {
    const response = await api.post('/votes', { votingId, optionId });
    return response.data;
  },

  getResultsByCode: async (code: string) => {
    const response = await api.get(`/votes/voting/code/${code}/results`);
    return response.data;
  },

  getResultsById: async (id: string) => {
    const response = await api.get(`/votes/voting/${id}/results`);
    return response.data;
  },

  hasUserVoted: async (votingId: string) => {
    const response = await api.get(`/votes/user/${votingId}/has-voted`);
    return response.data;
  },

  getUserVotes: async () => {
    const response = await api.get('/votes/user/my-votes');
    return response.data;
  },
};

export default api;