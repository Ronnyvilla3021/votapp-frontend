// src/pages/Admin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { Dashboard } from '../components/admin/Dashboard';
import { CreateVoting } from '../components/admin/CreateVoting';
import { Plus, LayoutDashboard, AlertCircle } from 'lucide-react';
import styles from './Admin.module.css';

export const Admin = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create'>('dashboard');

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={`${styles.alertCard} ${styles.alertCardYellow}`}>
            <AlertCircle className={`${styles.alertIcon} ${styles.alertIconYellow}`} />
            <h2 className={styles.alertTitle}>Acceso Restringido</h2>
            <p className={styles.alertText}>
              Debes iniciar sesión como administrador
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

  if (currentUser.role !== 'admin') {
    return (
      <div className={styles.container}>
        <div className={styles.alertContainer}>
          <div className={`${styles.alertCard} ${styles.alertCardRed}`}>
            <AlertCircle className={`${styles.alertIcon} ${styles.alertIconRed}`} />
            <h2 className={styles.alertTitle}>Sin Permisos</h2>
            <p className={styles.alertText}>
              No tienes permisos de administrador
            </p>
            <button
              onClick={() => navigate('/')}
              className={styles.alertButton}
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Panel de Administración</h1>
        <p className={styles.headerSubtitle}>
          Crea y gestiona tus votaciones
        </p>
      </div>

      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`${styles.tab} ${
            activeTab === 'dashboard' ? styles.tabActive : styles.tabInactive
          }`}
        >
          <LayoutDashboard className={styles.tabIcon} />
          <span>Mis Votaciones</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`${styles.tab} ${
            activeTab === 'create' ? styles.tabActive : styles.tabInactive
          }`}
        >
          <Plus className={styles.tabIcon} />
          <span>Nueva Votación</span>
        </button>
      </div>

      {activeTab === 'dashboard' ? <Dashboard /> : <CreateVoting />}
    </div>
  );
};