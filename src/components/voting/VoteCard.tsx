// src/components/voting/VoteCard.tsx
import type { VotingOption } from '../../types';
import { CheckCircle } from 'lucide-react';

interface VoteCardProps {
  option: VotingOption;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export const VoteCard = ({ option, isSelected, onSelect, disabled }: VoteCardProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
          : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-800">{option.text}</span>
        {isSelected && (
          <CheckCircle className="w-6 h-6 text-blue-500" />
        )}
      </div>
    </button>
  );
};