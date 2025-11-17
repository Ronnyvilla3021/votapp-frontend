// src/pages/Results.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { VotingChart } from '../components/charts/VotingChart';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import type { Voting } from '../types';
import styles from './Results.module.css';

export const Results = () => {
  const { code } = useParams<{ code: string }>();
  const { getVotingByCode } = useVoting();
  const navigate = useNavigate();
  
  const [voting, setVoting] = useState<Voting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadVoting = async () => {
      if (!code) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const foundVoting = await getVotingByCode(code);
        if (foundVoting) {
          setVoting(foundVoting);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error cargando votación:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadVoting();
  }, [code]);

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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={styles.alertCard}>
            <p className={styles.alertText}>Cargando resultados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !voting) {
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