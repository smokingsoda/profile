import { useEffect } from 'react';
import { useLightbox } from '../../contexts/LightboxContext';
import styles from './Lightbox.module.css';

export default function Lightbox() {
  const { isOpen, imageSrc, closeLightbox } = useLightbox();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeLightbox();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeLightbox]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className={styles.lightbox}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox();
      }}
    >
      <button className={styles['lightbox-close']} onClick={closeLightbox}>
        &times;
      </button>
      <img className={styles['lightbox-content']} src={imageSrc} alt="" />
    </div>
  );
}
