import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Home.module.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <img
            src="images/profile.jpg"
            alt={t('name')}
            className={styles['hero-photo-simple']}
          />
          <h1 className={styles['hero-title']}>{t('name')}</h1>
          <p className={styles['hero-description']}>{t('intro')}</p>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className="container">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </>
  );
}
