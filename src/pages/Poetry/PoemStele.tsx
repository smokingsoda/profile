import { useRef, useEffect } from 'react';
import { useLightbox } from '../../contexts/LightboxContext';
import { useLanguage } from '../../contexts/LanguageContext';
import PoemChar from './PoemChar';
import styles from './Poetry.module.css';

export interface PoemData {
  id: string;
  titleZh: string;
  titleEn: string;
  place: string; // zh key for place
  time: string;  // zh key for time
  image: string;
  imageAlt: string;
  text: string;
}

interface PoemSteleProps {
  poem: PoemData;
}

export default function PoemStele({ poem }: PoemSteleProps) {
  const { openLightbox } = useLightbox();
  const { lang, translatePlace, translateTime } = useLanguage();
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const poemTextRef = useRef<HTMLDivElement>(null);

  // Image 3D tilt effect (desktop only)
  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop || window.innerWidth <= 768) return;

    const onMove = (e: MouseEvent) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -10;
      const rotateY = ((x - cx) / cx) * 10;
      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    };

    const onLeave = () => {
      img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Desktop: container-level mousemove + cached rects for hit-testing
  // Avoids per-char mouseenter which is unreliable in Safari under writing-mode: vertical-rl
  useEffect(() => {
    const poemText = poemTextRef.current;
    if (!poemText) return;

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop || window.innerWidth <= 768) return;

    let lastChar: HTMLElement | null = null;
    let cachedRects: Array<{ el: HTMLElement; rect: DOMRect }> | null = null;

    const onMouseEnter = () => {
      // Cache all char rects BEFORE any transforms are applied
      const chars = Array.from(poemText.querySelectorAll<HTMLElement>('[data-char]'));
      cachedRects = chars.map(el => ({ el, rect: el.getBoundingClientRect() }));
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!cachedRects) return;

      // Find which cached rect contains the cursor
      let found: { el: HTMLElement; rect: DOMRect } | null = null;
      for (const entry of cachedRects) {
        const { rect } = entry;
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom
        ) {
          found = entry;
          break;
        }
      }

      // Reset previous char if we moved to a different one
      if (lastChar && lastChar !== found?.el) {
        lastChar.style.transition = 'transform 0.15s ease-out, text-shadow 0.15s ease-out';
        lastChar.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        lastChar.style.textShadow = '';
      }

      if (!found) {
        lastChar = null;
        return;
      }

      lastChar = found.el;
      // Remove transition so JS updates apply instantly while tracking mouse
      found.el.style.transition = 'none';

      // Use the cached (untransformed) rect for stable coordinate math
      const { rect } = found;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;
      const offsetX = (x - cx) / cx;
      const offsetY = (y - cy) / cy;
      const shadowX = -offsetX * 2;
      const shadowY = -offsetY * 2;

      found.el.style.textShadow = [
        `${shadowX * 0.5}px ${shadowY * 0.5}px 1px rgba(0,0,0,0.35)`,
        `${shadowX}px ${shadowY}px 2px rgba(0,0,0,0.22)`,
        `${shadowX * 1.5}px ${shadowY * 1.5}px 4px rgba(0,0,0,0.15)`,
      ].join(', ');
      found.el.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.4) translateZ(40px)`;
    };

    const onMouseLeave = () => {
      if (lastChar) {
        lastChar.style.transition = 'transform 0.15s ease-out, text-shadow 0.15s ease-out';
        lastChar.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        lastChar.style.textShadow = '';
        lastChar = null;
      }
      cachedRects = null;
    };

    poemText.addEventListener('mouseenter', onMouseEnter);
    poemText.addEventListener('mousemove', onMouseMove);
    poemText.addEventListener('mouseleave', onMouseLeave);
    return () => {
      poemText.removeEventListener('mouseenter', onMouseEnter);
      poemText.removeEventListener('mousemove', onMouseMove);
      poemText.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  useEffect(() => {
    const poemText = poemTextRef.current;
    if (!poemText) return;

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isDesktop) return;

    const chars = () => poemText.querySelectorAll<HTMLElement>('[data-char]');

    let gyroEnabled = false;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!gyroEnabled) return;
      const gamma = event.gamma || 0;
      const beta = event.beta || 0;
      const rotateY = Math.max(-15, Math.min(15, gamma / 3));
      const rotateX = Math.max(-15, Math.min(15, -beta / 6));
      const shadowX = gamma / 15;
      const shadowY = beta / 30;
      const shadows = [
        `${shadowX * 0.5}px ${shadowY * 0.5}px 1px rgba(0,0,0,0.3)`,
        `${shadowX}px ${shadowY}px 2px rgba(0,0,0,0.2)`,
        `${shadowX * 1.5}px ${shadowY * 1.5}px 4px rgba(0,0,0,0.1)`,
      ];
      chars().forEach((char) => {
        char.style.textShadow = shadows.join(', ');
        char.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2) translateZ(20px)`;
      });
    };

    const handleTouch = (event: TouchEvent) => {
      if (gyroEnabled) return;
      const touch = event.touches[0];
      if (!touch) return;
      const rect = poemText.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      chars().forEach((char) => {
        const charRect = char.getBoundingClientRect();
        const charX = charRect.left + charRect.width / 2 - rect.left;
        const charY = charRect.top + charRect.height / 2 - rect.top;
        const distance = Math.sqrt((x - charX) ** 2 + (y - charY) ** 2);
        const maxDist = Math.max(rect.width, rect.height) / 2;
        const influence = Math.max(0, 1 - distance / maxDist);
        if (influence > 0) {
          const offsetX = (x - charX) / charRect.width;
          const offsetY = (y - charY) / charRect.height;
          const rotateY = -offsetX * 10 * influence;
          const rotateX = offsetY * 10 * influence;
          const shadowX = -offsetX * 1.5 * influence;
          const shadowY = -offsetY * 1.5 * influence;
          char.style.textShadow = [
            `${shadowX * 0.5}px ${shadowY * 0.5}px 1px rgba(0,0,0,${0.3 * influence})`,
            `${shadowX}px ${shadowY}px 2px rgba(0,0,0,${0.2 * influence})`,
            `${shadowX * 1.5}px ${shadowY * 1.5}px 4px rgba(0,0,0,${0.1 * influence})`,
          ].join(', ');
          char.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${1 + influence * 0.2}) translateZ(${20 * influence}px)`;
        } else {
          char.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
          char.style.textShadow = '';
        }
      });
    };

    const handleTouchEnd = () => {
      if (gyroEnabled) return;
      chars().forEach((char) => {
        char.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        char.style.textShadow = '';
      });
    };

    const initMobile = async (event: TouchEvent) => {
      event.preventDefault();
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            gyroEnabled = true;
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch {
          // fall through to touch mode
        }
      } else {
        gyroEnabled = true;
        window.addEventListener('deviceorientation', handleOrientation, true);
      }

      if (!gyroEnabled) {
        poemText.addEventListener('touchmove', handleTouch, { passive: true });
        poemText.addEventListener('touchend', handleTouchEnd);
      }
    };

    poemText.addEventListener('touchstart', initMobile, { once: true });
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const title = lang === 'zh' ? poem.titleZh : poem.titleEn;

  return (
    <article className={styles['poem-stele']} id={poem.id}>
      <div className={styles['poem-meta']} data-lang={lang}>
        <span className={styles['poem-title']} data-lang={lang}>{title}</span>
        <span className={styles['poem-place']} data-lang={lang}>{translatePlace(poem.place)}</span>
        <span className={styles['poem-time']} data-lang={lang}>{translateTime(poem.time)}</span>
      </div>

      <div className={styles['poem-with-image']}>
        <div className={styles['poem-image']} ref={containerRef}>
          <img
            ref={imgRef}
            src={poem.image}
            alt={poem.imageAlt}
            className={styles['poem-img']}
            onClick={() => openLightbox(poem.image)}
          />
        </div>

        <div className={styles['stele-container']}>
          <div className={styles['poem-text']} ref={poemTextRef}>
            {poem.text.split('').map((char, i) => (
              <PoemChar key={i} char={char} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
