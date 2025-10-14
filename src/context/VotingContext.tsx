// src/context/VotingContext.tsx
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Voting, User, VotingContextType } from '../types';
import { STORAGE_KEYS } from '../utils/storage';

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [votings, setVotings] = useLocalStorage<Voting[]>(STORAGE_KEYS.VOTINGS, []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER, null);

  const generateCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addVoting = (votingData: Omit<Voting, 'id' | 'code' | 'createdAt'>) => {
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
  };

  const updateVoting = (id: string, updates: Partial<Voting>) => {
    setVotings(prev =>
      prev.map(v => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const deleteVoting = (id: string) => {
    setVotings(prev => prev.filter(v => v.id !== id));
  };

  const getVotingByCode = (code: string): Voting | undefined => {
    return votings.find(v => v.code.toUpperCase() === code.toUpperCase());
  };

  const hasUserVoted = (votingId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.votedIn.includes(votingId);
  };

  const castVote = (votingId: string, optionId: string): boolean => {
    if (!currentUser || hasUserVoted(votingId)) {
      return false;
    }

    const voting = votings.find(v => v.id === votingId);
    if (!voting || !voting.isActive) {
      return false;
    }

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

    setCurrentUser({
      ...currentUser,
      votedIn: [...currentUser.votedIn, votingId]
    });

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
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
    setCurrentUser,
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