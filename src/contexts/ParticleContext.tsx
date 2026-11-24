import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import type { ParticleShape } from '../data/floatingCards';

export type ActiveSectionId =
  | 'home'
  | 'stats'
  | 'showcase3d'
  | 'sites'
  | 'applications'
  | 'skills'
  | 'experience'
  | 'contact';

export const SECTION_NAMES: Record<ActiveSectionId, string> = {
  home: 'Constelação Principal',
  stats: 'Métricas & Dados',
  showcase3d: 'Poliedro 3D & Universo',
  sites: 'Arquitetura Web',
  applications: 'Deploy & Motores de Código',
  skills: 'Grafo de Competências',
  experience: 'Linha do Tempo & Evolução',
  contact: 'Transmissão & Conexão',
};

interface ParticleContextValue {
  activeSection: ActiveSectionId;
  setActiveSection: (sec: ActiveSectionId) => void;
  heroShape: ParticleShape;
  setHeroShape: (shape: ParticleShape) => void;
  isAttracting: boolean;
  setIsAttracting: (attracting: boolean) => void;
  triggerBriefAttraction: (durationMs?: number) => void;
  pinHeroShape: boolean;
  setPinHeroShape: (pin: boolean | ((prev: boolean) => boolean)) => void;
  mouseNdcRef: MutableRefObject<{ x: number; y: number }>;
  scrollVelocityRef: MutableRefObject<number>;
}

const ParticleContext = createContext<ParticleContextValue | null>(null);

const SECTION_IDS: ActiveSectionId[] = [
  'home',
  'stats',
  'showcase3d',
  'sites',
  'applications',
  'skills',
  'experience',
  'contact',
];

export const ParticleProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<ActiveSectionId>('home');
  const [heroShape, setHeroShape] = useState<ParticleShape>('react');
  const [isAttracting, setIsAttracting] = useState(false);
  const [pinHeroShape, setPinHeroShape] = useState(false);

  const mouseNdcRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const activeSectionRef = useRef<ActiveSectionId>('home');
  const briefTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerBriefAttraction = useCallback((durationMs = 1600) => {
    setIsAttracting(true);
    if (briefTimerRef.current) clearTimeout(briefTimerRef.current);
    briefTimerRef.current = setTimeout(() => {
      setIsAttracting(false);
    }, durationMs);
  }, []);

  const handleSetIsAttracting = useCallback((attracting: boolean) => {
    if (!attracting && briefTimerRef.current) {
      clearTimeout(briefTimerRef.current);
      briefTimerRef.current = null;
    }
    setIsAttracting(attracting);
  }, []);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update ref directly — zero React re-renders on pointer move
    const handlePointerMove = (e: PointerEvent) => {
      mouseNdcRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNdcRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const updateActiveSection = (next: ActiveSectionId) => {
      if (activeSectionRef.current !== next) {
        activeSectionRef.current = next;
        setActiveSection(next);
      }
    };

    // Scroll & section detection tracker
    let rafId = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocityRef.current = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        const viewportCenter = window.innerHeight * 0.45;

        if (y < 120) {
          updateActiveSection('home');
          return;
        }

        if (window.innerHeight + y >= document.body.offsetHeight - 120) {
          updateActiveSection('contact');
          return;
        }

        let closestSection: ActiveSectionId = 'home';
        let minDistance = Infinity;

        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elementCenter - viewportCenter);

          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            closestSection = id;
            break;
          }

          if (dist < minDistance) {
            minDistance = dist;
            closestSection = id;
          }
        }

        updateActiveSection(closestSection);
      });
    };

    const handlePointerUp = () => {
      if (!briefTimerRef.current) {
        setIsAttracting(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerup', handlePointerUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      heroShape,
      setHeroShape,
      isAttracting,
      setIsAttracting: handleSetIsAttracting,
      triggerBriefAttraction,
      pinHeroShape,
      setPinHeroShape,
      mouseNdcRef,
      scrollVelocityRef,
    }),
    [activeSection, heroShape, isAttracting, pinHeroShape, handleSetIsAttracting, triggerBriefAttraction]
  );

  return (
    <ParticleContext.Provider value={contextValue}>
      {children}
    </ParticleContext.Provider>
  );
};

export const useParticleSystem = () => {
  const context = useContext(ParticleContext);
  if (!context) {
    throw new Error('useParticleSystem must be used within a ParticleProvider');
  }
  return context;
};
