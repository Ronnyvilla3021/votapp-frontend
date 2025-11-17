// src/context/VotingContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Voting, User, VotingContextType } from '../types';
import { votingAPI, voteAPI } from '../services/api';

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [votings, setVotings] = useState<Voting[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('votapp_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Cargar votaciones cuando el usuario es admin
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadVotings();
    }
  }, [currentUser]);

  const loadVotings = async () => {
    try {
      const response = await votingAPI.getAll();
      if (response.success) {
        setVotings(response.data);
      }
    } catch (error) {
      console.error('Error cargando votaciones:', error);
      // Si falla, seguir con array vacío
      setVotings([]);
    }
  };

  const generateCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addVoting = async (votingData: Omit<Voting, 'id' | 'createdAt'>) => {
    try {
      // Llamar al backend
      const response = await votingAPI.create({
        title: votingData.title,
        description: votingData.description,
        options: votingData.options.map(opt => opt.text),
      });

      if (response.success) {
        const newVoting = response.data;
        setVotings(prev => [...prev, newVoting]);
      }
    } catch (error) {
      console.error('Error creando votación:', error);
      // Fallback: crear localmente si falla
      const newVoting: Voting = {
        ...votingData,
        id: uuidv4(),
        code: generateCode(),
        createdAt: new Date().toISOString(),
        isActive: true,
        options: votingData.options.map(opt => ({
          ...opt,
          votes: 0
        }))
      };
      setVotings(prev => [...prev, newVoting]);
    }
  };

const updateVoting = async (id: string, updates: Partial<Voting>) => {
  try {
    // Llamar al backend
    const response = await votingAPI.update(id, updates);
    
    if (response.success) {
      // Actualizar estado local
      setVotings(prev =>
        prev.map(v => (v.id === id ? { ...v, ...response.data } : v))
      );
    }
  } catch (error) {
    console.error('Error actualizando votación:', error);
    // Fallback: actualizar solo localmente si falla
    setVotings(prev =>
      prev.map(v => (v.id === id ? { ...v, ...updates } : v))
    );
  }
};

const deleteVoting = async (id: string) => {
  try {
    // Llamar al backend
    const response = await votingAPI.delete(id);
    
    if (response.success) {
      // Actualizar estado local
      setVotings(prev => prev.filter(v => v.id !== id));
    }
  } catch (error) {
    console.error('Error eliminando votación:', error);
    alert('Error al eliminar la votación');
  }
};

  const getVotingByCode = async (code: string): Promise<Voting | undefined> => {
    try {
      // Intentar obtener del backend
      const response = await votingAPI.getByCode(code);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error('Error buscando votación:', error);
    }
    
    // Fallback: buscar localmente
    return votings.find(v => v.code.toUpperCase() === code.toUpperCase());
  };

  const hasUserVoted = (votingId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.votedIn.includes(votingId);
  };

  const castVote = async (votingId: string, optionId: string): Promise<boolean> => {
    if (!currentUser || hasUserVoted(votingId)) {
      return false;
    }

    try {
      // Intentar votar en el backend (el backend valida si existe y está activa)
      const response = await voteAPI.castVote(votingId, optionId);
      
      if (response.success) {
        // Actualizar usuario local
        const updatedUser = {
          ...currentUser,
          votedIn: [...currentUser.votedIn, votingId]
        };
        
        setCurrentUser(updatedUser);
        localStorage.setItem('votapp_user', JSON.stringify(updatedUser));
        
        // Si tenemos votaciones locales (admin), actualizarlas también
        if (votings.length > 0) {
          setVotings(prev =>
            prev.map(v => {
              if (v.id === votingId) {
                return {
                  ...v,
                  options: v.options.map(opt =>
                    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                  )
                };
              }
              return v;
            })
          );
        }
        
        return true;
      }
    } catch (error: any) {
      console.error('Error emitiendo voto:', error);
      alert(error.response?.data?.message || 'Error al emitir voto');
    }

    return false;
  };
 
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('votapp_user');
    localStorage.removeItem('votapp_token');
    setVotings([]);
  };

  const handleSetCurrentUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('votapp_user', JSON.stringify(user));
  };

  const value: VotingContextType = {
    votings,
    currentUser,
    addVoting,
    updateVoting,
    deleteVoting,
    getVotingByCode,
    castVote,
    hasUserVoted,
    setCurrentUser: handleSetCurrentUser,
    logout
  };

  return (
    <VotingContext.Provider value={value}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};