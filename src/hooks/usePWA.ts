import { useEffect } from 'react';

export const usePWA = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('PWA registrada');
          setInterval(() => registration.update(), 60 * 60 * 1000);
        })
        .catch((error) => console.error('Error PWA:', error));
    }
  }, []);
};