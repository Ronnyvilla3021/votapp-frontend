// src/types/index.ts

export interface VotingOption {
  id: string;
  text: string;
  votes: number;
}

export interface Voting {
  id: string;
  title: string;
  description?: string;
  code: string;
  options: VotingOption[];
  createdAt: string;
  closedAt?: string;
  isActive: boolean;
  createdBy?: string;
}

export interface Vote {
  votingId: string;
  optionId: string;
  userId: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'admin' | 'voter';
  votedIn: string[];
}

export interface VotingContextType {
  votings: Voting[];
  currentUser: User | null;
  addVoting: (voting: Omit<Voting, 'id' | 'createdAt'>) => void | Promise<void>;
  updateVoting: (id: string, updates: Partial<Voting>) => void | Promise<void>;
  deleteVoting: (id: string) => void;
  getVotingByCode: (code: string) => Voting | undefined | Promise<Voting |undefined>;
  castVote: (votingId: string, optionId: string) => boolean | Promise<boolean>;
  hasUserVoted: (votingId: string) => boolean;
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

export interface CreateVotingFormData {
  title: string;
  description?: string;
  options: string[];
}

export interface VotingStats {
  totalVotes: number;
  participationRate: number;
  winner?: VotingOption;
  optionsData: Array<{
    name: string;
    votes: number;
    percentage: number;
  }>;
}