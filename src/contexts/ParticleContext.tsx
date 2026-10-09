import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
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
  mouseNdc: { x: number; y: number };
  scrollVelocity: number;
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
  const [mouseNdc, setMouseNdc] = useState({ x: 0, y: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const briefTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerBriefAttraction = (durationMs = 1600) => {
    setIsAttracting(true);
    if (briefTimerRef.current) clearTimeout(briefTimerRef.current);
    briefTimerRef.current = setTimeout(() => {
      setIsAttracting(false);
    }, durationMs);
  };

  const handleSetIsAttracting = (attracting: boolean) => {
    if (!attracting && briefTimerRef.current) {
      clearTimeout(briefTimerRef.current);
      briefTimerRef.current = null;
    }
    setIsAttracting(attracting);
  };

  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mouse movement tracker
    const handlePointerMove = (e: PointerEvent) => {
      setMouseNdc({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    // Scroll & section detection tracker
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;
        lastScrollYRef.current = currentScrollY;

        // Smooth velocity accumulator
        scrollVelocityRef.current = delta;
        setScrollVelocity(delta);

        // Section detector based on viewport center
        const viewportCenter = window.innerHeight * 0.45;
        let closestSection: ActiveSectionId = 'home';
        let minDistance = Infinity;

        // Special case: very top
        if (currentScrollY < 120) {
          setActiveSection('home');
          return;
        }

        // Special case: near bottom
        if (window.innerHeight + currentScrollY >= document.body.offsetHeight - 120) {
          setActiveSection('contact');
          return;
        }

        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elementCenter - viewportCenter);

          // If the element encompasses the viewport center
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            closestSection = id;
            break;
          }

          if (dist < minDistance) {
            minDistance = dist;
            closestSection = id;
          }
        }

        setActiveSection(closestSection);
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
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ParticleContext.Provider
      value={{
        activeSection,
        setActiveSection,
        heroShape,
        setHeroShape,
        isAttracting,
        setIsAttracting: handleSetIsAttracting,
        triggerBriefAttraction,
        pinHeroShape,
        setPinHeroShape,
        mouseNdc,
        scrollVelocity,
      }}
    >
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
