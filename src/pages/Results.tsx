// src/pages/Results.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { VotingChart } from '../components/charts/VotingChart';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import styles from './Results.module.css';

export const Results = () => {
  const { code } = useParams<{ code: string }>();
  const { getVotingByCode } = useVoting();
  const navigate = useNavigate();

  if (!code) {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={`${styles.alertCard} ${styles.alertCardRed}`}>
            <AlertCircle className={`${styles.alertIcon} ${styles.alertIconRed}`} />
            <h2 className={styles.alertTitle}>Código no válido</h2>
            <p className={styles.alertText}>
              No se proporcionó un código de votación
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

  const voting = getVotingByCode(code);

  if (!voting) {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={`${styles.alertCard} ${styles.alertCardYellow}`}>
            <AlertCircle className={`${styles.alertIcon} ${styles.alertIconYellow}`} />
            <h2 className={styles.alertTitle}>Votación no encontrada</h2>
            <p className={styles.alertText}>
              No existe una votación con el código{' '}
              <span className={styles.alertCode}>{code}</span>
            </p>
            <button
              onClick={() => navigate('/vote')}
              className={styles.alertButton}
            >
              Buscar otra votación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <ArrowLeft className={styles.backIcon} />
        <span>Volver</span>
      </button>

      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Resultados de la Votación</h1>
        <p className={styles.headerSubtitle}>
          Visualiza los resultados en tiempo real
        </p>
      </div>

      <div className={styles.chartContainer}>
        <VotingChart voting={voting} />
      </div>
    </div>
  );
};