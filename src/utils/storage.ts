// src/utils/storage.ts

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

export const clearVotAppStorage = (): void => {
  try {
    const keys = ['votapp_votings', 'votapp_user', 'votapp_votes'];
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing VotApp storage:', error);
  }
};

export const STORAGE_KEYS = {
  VOTINGS: 'votapp_votings',
  USER: 'votapp_user',
  VOTES: 'votapp_votes',
} as const;