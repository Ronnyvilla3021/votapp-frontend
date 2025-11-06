// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import { useVoting } from '../context/VotingContext';
import { AuthForm } from '../components/auth/AuthForm';
import { Vote, Shield, BarChart3, Lock, Users, Zap, CheckCircle, Award } from 'lucide-react';
import styles from './Home.module.css';

export const Home = () => {
  const { currentUser } = useVoting();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={`${styles.blob} ${styles.blobBlue}`}></div>
            <div className={`${styles.blob} ${styles.blobPurple}`}></div>
            <div className={`${styles.blob} ${styles.blobIndigo}`}></div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Award className={styles.badgeIcon} />
              <span>Sistema Oficial de Votaciones</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>Tu voz</span>
              <span className={styles.heroTitleGradient}>importa</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Participa en las decisiones que transforman tu institución educativa
            </p>

            <div className={styles.statsContainer}>
              <div className={styles.statChip}>
                <Lock className={`${styles.statIcon} ${styles.statIconBlue}`} />
                <span className={styles.statText}>100% Seguro</span>
              </div>
              <div className={styles.statChip}>
                <Zap className={`${styles.statIcon} ${styles.statIconPurple}`} />
                <span className={styles.statText}>Resultados Instantáneos</span>
              </div>
              <div className={styles.statChip}>
                <Users className={`${styles.statIcon} ${styles.statIconIndigo}`} />
                <span className={styles.statText}>100% Transparente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección "Cómo funciona" */}
        <div className={styles.stepsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Votar es <span className={styles.sectionTitleHighlight}>súper fácil</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Solo 3 pasos para hacer escuchar tu voz
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={`${styles.stepCard} ${styles.stepCardBlue}`}>
              <div className={`${styles.stepNumber} ${styles.stepNumberBlue}`}>1</div>
              <div className={styles.stepIcon}>
                <Users className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Identifícate</h3>
              <p className={`${styles.stepDescription} ${styles.stepDescriptionBlue}`}>
                Ingresa tu nombre y selecciona si eres votante o administrador
              </p>
            </div>

            <div className={`${styles.stepCard} ${styles.stepCardPurple}`}>
              <div className={`${styles.stepNumber} ${styles.stepNumberPurple}`}>2</div>
              <div className={styles.stepIcon}>
                <Vote className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>Ingresa el código</h3>
              <p className={`${styles.stepDescription} ${styles.stepDescriptionPurple}`}>
                Usa el código de 6 caracteres que te proporcionaron
              </p>
            </div>

            <div className={`${styles.stepCard} ${styles.stepCardIndigo}`}>
              <div className={`${styles.stepNumber} ${styles.stepNumberIndigo}`}>3</div>
              <div className={styles.stepIcon}>
                <CheckCircle className={styles.stepIconSvg} />
              </div>
              <h3 className={styles.stepTitle}>¡Vota!</h3>
              <p className={`${styles.stepDescription} ${styles.stepDescriptionIndigo}`}>
                Selecciona tu opción favorita y confirma
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Ingreso - NUEVA SECCIÓN */}
        <div className={styles.authSection}>
          <div className={styles.authContainer}>
            <div className={styles.authHeader}>
              <h2 className={styles.authTitle}>
                ¡Comienza a <span className={styles.authTitleHighlight}>votar</span> ahora!
              </h2>
              <p className={styles.authSubtitle}>
                Ingresa tus datos para participar en las votaciones
              </p>
            </div>
            <div className={styles.authFormWrapper}>
              <AuthForm />
            </div>
          </div>
        </div>

        {/* Sección "Por qué VotApp" */}
        <div className={styles.whySection}>
          <div className={styles.whyCard}>
            <div className={styles.whyBlobTop}></div>
            <div className={styles.whyBlobBottom}></div>
            
            <div className={styles.whyContent}>
              <div className={styles.whyHeader}>
                <h2 className={styles.whyTitle}>
                  ¿Por qué usar <span className={styles.whyTitleHighlight}>VotApp</span>?
                </h2>
                <p className={styles.whySubtitle}>
                  La plataforma más confiable para votaciones estudiantiles
                </p>
              </div>

              <div className={styles.benefitsGrid}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    <div className={`${styles.benefitIcon} ${styles.benefitIconBlue}`}>
                      <Shield className={styles.benefitIconSvg} />
                    </div>
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitTitle}>Voto único garantizado</h4>
                    <p className={styles.benefitDescription}>Sistema que evita votos duplicados y mantiene la integridad electoral</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    <div className={`${styles.benefitIcon} ${styles.benefitIconPurple}`}>
                      <BarChart3 className={styles.benefitIconSvg} />
                    </div>
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitTitle}>Resultados en tiempo real</h4>
                    <p className={styles.benefitDescription}>Visualiza gráficos y estadísticas actualizadas al instante</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    <div className={`${styles.benefitIcon} ${styles.benefitIconIndigo}`}>
                      <Vote className={styles.benefitIconSvg} />
                    </div>
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitTitle}>Fácil de administrar</h4>
                    <p className={styles.benefitDescription}>Panel intuitivo para crear y gestionar múltiples votaciones</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    <div className={`${styles.benefitIcon} ${styles.benefitIconGreen}`}>
                      <Award className={styles.benefitIconSvg} />
                    </div>
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitTitle}>Diseñado para estudiantes</h4>
                    <p className={styles.benefitDescription}>Interfaz moderna que se adapta a dispositivos móviles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista para usuarios autenticados
  return (
    <div className={styles.container}>
      {/* Hero personalizado */}
      <div className={styles.authenticatedSection}>
        <div className={styles.heroBackground}>
          <div className={`${styles.blob} ${styles.blobBlue}`} style={{ left: '25%' }}></div>
          <div className={`${styles.blob} ${styles.blobPurple}`} style={{ right: '25%' }}></div>
        </div>

        <div className={styles.authenticatedBadge}>
          <div className={styles.authenticatedBadgeInner}>
            👋 Sesión activa
          </div>
        </div>

        <h1 className={styles.authenticatedTitle}>
          ¡Hola, <span className={styles.authenticatedName}>{currentUser.name}</span>!
        </h1>
        
        <p className={styles.authenticatedSubtitle}>
          {currentUser.role === 'admin' 
            ? '🎯 Panel de administración listo' 
            : '🗳️ ¿Listo para votar?'}
        </p>
        <p className={styles.authenticatedDescription}>
          {currentUser.role === 'admin'
            ? 'Gestiona votaciones y monitorea resultados en tiempo real'
            : 'Tu participación hace la diferencia en nuestra comunidad'}
        </p>
      </div>
      
      {/* Action Cards */}
      <div className={styles.actionsSection}>
        <div className={styles.actionsGrid}>
          <button
            onClick={() => navigate('/vote')}
            className={`${styles.actionCard} ${styles.actionCardBlue}`}
          >
            <div className={`${styles.actionCardBg} ${styles.actionCardBgBlue}`}></div>
            
            <div className={styles.actionCardContent}>
              <div className={`${styles.actionCardIcon} ${styles.actionCardIconBlue}`}>
                <Vote className={styles.actionCardIconSvg} />
              </div>
              
              <h2 className={styles.actionCardTitle}>Votar Ahora</h2>
              
              <p className={styles.actionCardDescription}>
                Ingresa el código de votación y participa en las decisiones importantes
              </p>

              <div className={`${styles.actionCardFooter} ${styles.actionCardFooterBlue}`}>
                <span>Comenzar</span>
                <div className={styles.actionCardArrow}>→</div>
              </div>
            </div>

            <div className={`${styles.actionCardDecoration} ${styles.actionCardDecorationBlue}`}></div>
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className={`${styles.actionCard} ${styles.actionCardPurple}`}
            >
              <div className={`${styles.actionCardBg} ${styles.actionCardBgPurple}`}></div>
              
              <div className={styles.actionCardContent}>
                <div className={`${styles.actionCardIcon} ${styles.actionCardIconPurple}`}>
                  <Shield className={styles.actionCardIconSvg} />
                </div>
                
                <h2 className={styles.actionCardTitle}>Panel Admin</h2>
                
                <p className={styles.actionCardDescription}>
                  Crea nuevas votaciones y visualiza resultados detallados
                </p>

                <div className={`${styles.actionCardFooter} ${styles.actionCardFooterPurple}`}>
                  <span>Administrar</span>
                  <div className={styles.actionCardArrow}>→</div>
                </div>
              </div>

              <div className={`${styles.actionCardDecoration} ${styles.actionCardDecorationPurple}`}></div>
            </button>
          )}
        </div>
      </div>

      {/* Tips rápidos */}
      <div className={styles.tipsSection}>
        <div className={styles.tipsContainer}>
          <div className={styles.tipsCard}>
            <h3 className={styles.tipsTitle}>
              <Zap className={styles.tipsTitleIcon} />
              Tips rápidos
            </h3>
            <div className={styles.tipsGrid}>
              <div className={styles.tipItem}>
                <CheckCircle className={styles.tipIcon} />
                <p className={styles.tipText}>Solo puedes votar una vez por votación</p>
              </div>
              <div className={styles.tipItem}>
                <CheckCircle className={styles.tipIcon} />
                <p className={styles.tipText}>Los resultados se actualizan en tiempo real</p>
              </div>
              <div className={styles.tipItem}>
                <CheckCircle className={styles.tipIcon} />
                <p className={styles.tipText}>Guarda el código para consultar resultados</p>
              </div>
              <div className={styles.tipItem}>
                <CheckCircle className={styles.tipIcon} />
                <p className={styles.tipText}>Tu voto es anónimo y seguro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};