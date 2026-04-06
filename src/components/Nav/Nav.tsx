import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Nav.module.css';

export default function Nav() {
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth <= 768;
  }, []);

  // Mobile dropdown toggle
  const handleDropdownClick = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const menu = dropdownRef.current?.querySelector(`.${styles['dropdown-menu']}`) as HTMLElement | null;
      if (menu) {
        menu.classList.toggle(styles.open);
      }
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        const menu = dropdownRef.current.querySelector(`.${styles['dropdown-menu']}`) as HTMLElement | null;
        menu?.classList.remove(styles.open);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handlePoetryScroll = (e: React.MouseEvent<HTMLAnchorElement>, scrollId: string) => {
    e.preventDefault();
    navigate('/poetry');
    setTimeout(() => {
      const el = document.getElementById(scrollId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles['nav-container']}>
        <div className={styles['nav-brand']}>{t('name')}</div>
        <ul className={styles['nav-menu']}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${isActive ? styles.active : ''}`
              }
            >
              {t('nav-home')}
            </NavLink>
          </li>

          <li className={styles['nav-dropdown']} ref={dropdownRef}>
            <NavLink
              to="/poetry"
              className={({ isActive }) =>
                `${isActive ? styles.active : ''}`
              }
              onClick={handleDropdownClick}
            >
              {t('nav-poetry')}
            </NavLink>
            <ul className={styles['dropdown-menu']}>
              {[
                ['poem-1', t('nav-poem1')],
                ['poem-2', t('nav-poem2')],
                ['poem-3', t('nav-poem3')],
                ['poem-4', t('nav-poem4')],
                ['poem-5', t('nav-poem5')],
                ['poem-6', t('nav-poem6')],
                ['poem-7', t('nav-poem7')],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#/poetry`}
                    onClick={(e) => handlePoetryScroll(e, id)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <NavLink
              to="/music"
              className={({ isActive }) =>
                `${isActive ? styles.active : ''}`
              }
            >
              {t('nav-music')}
            </NavLink>
          </li>

          <li>
            <button className={styles['lang-toggle']} onClick={toggleLang}>
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
