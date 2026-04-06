import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface LightboxContextValue {
  openLightbox: (src: string) => void;
  closeLightbox: () => void;
  imageSrc: string | null;
  isOpen: boolean;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => {
    if (!src || src === 'undefined') return;
    setImageSrc(src);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setImageSrc(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <LightboxContext.Provider
      value={{ openLightbox, closeLightbox, imageSrc, isOpen: imageSrc !== null }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
