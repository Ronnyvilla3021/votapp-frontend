// src/pages/Vote.tsx
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { VotingRoom } from '../components/voting/VotingRoom';
import { AlertCircle } from 'lucide-react';
import styles from './Vote.module.css';

export const Vote = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={styles.alertCard}>
            <AlertCircle className={styles.alertIcon} />
            <h2 className={styles.alertTitle}>Acceso Restringido</h2>
            <p className={styles.alertText}>
              Debes iniciar sesión para participar en votaciones
            </p>
            <button
              onClick={() => navigate('/')}
              className={styles.alertButton}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Participar en Votación</h1>
        <p className={styles.headerSubtitle}>
          Ingresa el código que te proporcionaron para acceder a la votación
        </p>
      </div>
      
      <VotingRoom />
    </div>
  );
};