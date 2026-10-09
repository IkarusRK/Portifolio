import { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaCube } from 'react-icons/fa';
import { SiLua } from 'react-icons/si';
import { LuAtom, LuCoffee, LuCode, LuMousePointerClick } from 'react-icons/lu';
import { HelpCircle, Pin } from 'lucide-react';
import type { ParticleShape } from '../../data/floatingCards';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useParticleSystem } from '../../contexts/ParticleContext';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import { GradientText } from '../ui/GradientText';
import { FLOATING_CARDS } from '../../data/floatingCards';
import { CVDropdown } from '../ui/CVDropdown';
import { LiveClock } from '../ui/LiveClock';
import { PortfolioGuideModal } from '../ui/PortfolioGuideModal';

const FLEE_RADIUS = 100;
const FLEE_STRENGTH = 36;

export const Hero = () => {
  const { perspective } = usePerspective();
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const {
    heroShape,
    setHeroShape,
    isAttracting,
    setIsAttracting,
    triggerBriefAttraction,
    pinHeroShape,
    setPinHeroShape,
  } = useParticleSystem();

  const mousePos = useCursorPosition(0.08);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [cardCenters, setCardCenters] = useState<{ x: number; y: number }[]>([]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroActive(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const updateCenters = () => {
      if (!containerRef.current) return;
      const children = containerRef.current.children;
      const centers: { x: number; y: number }[] = [];
      for (let i = 0; i < 3; i++) {
        const el = children[i] as HTMLElement | undefined;
        if (el) {
          const r = el.getBoundingClientRect();
          centers.push({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }
      }
      setCardCenters(centers);
    };
    updateCenters();
    window.addEventListener('resize', updateCenters);
    return () => window.removeEventListener('resize', updateCenters);
  }, []);

  const cardOffsets = useMemo(() => {
    if (cardCenters.length !== 3) return [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    return cardCenters.map((c) => {
      const dx = mousePos.x - c.x;
      const dy = mousePos.y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < FLEE_RADIUS) {
        const f = (1 - d / FLEE_RADIUS) * FLEE_STRENGTH;
        return { x: (dx / d) * f, y: (dy / d) * f };
      }
      return { x: 0, y: 0 };
    });
  }, [cardCenters, mousePos.x, mousePos.y]);

  const shapeList = [
    { id: 'react', label: t.hero.shapes.react, icon: LuAtom },
    { id: 'lua', label: t.hero.shapes.lua, icon: SiLua },
    { id: 'cube', label: t.hero.shapes.cube, icon: FaCube },
    { id: 'code', label: t.hero.shapes.code, icon: LuCode },
    { id: 'java', label: t.hero.shapes.java, icon: LuCoffee },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-16"
      style={{
        background: 'transparent',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 0%, var(--bg-secondary) 0%, transparent 50%)',
      }}
      onPointerDown={() => setIsAttracting(true)}
      onPointerUp={() => setIsAttracting(false)}
      onPointerLeave={() => setIsAttracting(false)}
    >
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Availability Badge & Live Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 backdrop-blur-md shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
            {t.hero.statusBadge}
          </div>
          <LiveClock />
        </motion.div>

        {/* Main Name / Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[var(--text-primary)] mb-3 tracking-tight"
        >
          <GradientText as="span" className="text-4xl sm:text-6xl md:text-7xl font-extrabold">
            {t.hero.name}
          </GradientText>
        </motion.h1>

        {/* Dynamic Role Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] mb-4 max-w-2xl"
        >
          {perspective === 'client' ? t.hero.roleClient : t.hero.roleDev}
        </motion.p>

        {/* Dynamic Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {perspective === 'client' ? t.hero.descClient : t.hero.descDev}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onPointerDown={(e) => e.stopPropagation()}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#sites"
            className="px-6 py-3 rounded-xl font-bold text-white border-0 hover:scale-105 transition-all shadow-lg active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 30px var(--glow)',
            }}
          >
            {perspective === 'client' ? t.hero.btnProjectsClient : t.hero.btnProjectsDev}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-bold border-2 border-[var(--accent-from)] text-[var(--accent-from)] hover:bg-[var(--glass-bg)] hover:scale-105 transition-all active:scale-95"
          >
            {perspective === 'client' ? t.hero.btnContactClient : t.hero.btnContactDev}
          </a>
          <CVDropdown variant="outline" />
        </motion.div>

        {/* Interactive Particle Shape Controller */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onPointerDown={(e) => e.stopPropagation()}
          className="mt-8 inline-flex flex-col items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-lg max-w-full"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 w-full border-b border-[var(--glass-border)]/50 pb-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1.5 select-none">
              <LuMousePointerClick className="w-3.5 h-3.5 text-[var(--accent-from)] animate-bounce" />
              {perspective === 'client' ? 'Geometria 3D das competências:' : 'Moldar formato das partículas 3D:'}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGuideOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold text-[var(--accent-from)] hover:text-white hover:bg-[var(--accent-from)] border border-[var(--glass-border)] bg-[var(--glass-bg)] cursor-pointer transition-all select-none shadow-sm"
              title="Abrir guia interativo do portfólio"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Como interagir?
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2">
            {shapeList.map((s) => {
              const Icon = s.icon;
              const isSelected = heroShape === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHeroShape(s.id as ParticleShape);
                    triggerBriefAttraction(1600);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--glass-border)] hover:bg-[var(--glass-bg)]'
                  }`}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))'
                      : 'transparent',
                    borderColor: isSelected ? 'transparent' : 'var(--glass-border)',
                    boxShadow: isSelected ? '0 0 15px var(--glow)' : 'none',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}

            {/* Pin / Lock Shape Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPinHeroShape((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                pinHeroShape
                  ? 'text-white border-transparent shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)]/80'
              }`}
              style={{
                background: pinHeroShape
                  ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))'
                  : 'transparent',
                boxShadow: pinHeroShape ? '0 0 15px var(--glow)' : 'none',
              }}
              title={
                pinHeroShape
                  ? isPt
                    ? 'Formato fixado! Clique para liberar em poeira estelar livre.'
                    : 'Shape pinned! Click to release into free cosmic particles.'
                  : isPt
                  ? 'Fixar formato na tela sem precisar segurar o clique.'
                  : 'Pin shape on screen without having to hold click.'
              }
            >
              <Pin className={`w-3.5 h-3.5 ${pinHeroShape ? 'rotate-45' : ''} transition-transform`} />
              <span>
                {pinHeroShape
                  ? isPt
                    ? 'Fixado'
                    : 'Pinned'
                  : isPt
                  ? 'Fixar'
                  : 'Pin'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Ambient Interaction Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border border-[var(--glass-border)] bg-[var(--glass-bg)]/80 text-[var(--text-secondary)] select-none backdrop-blur-sm shadow-sm"
        >
          {isAttracting ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">
                {isPt
                  ? `Atraindo partículas para o cursor no formato ${heroShape.toUpperCase()}!`
                  : `Attracting particles to cursor in ${heroShape.toUpperCase()} format!`}
              </span>
            </>
          ) : pinHeroShape ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-from)]" />
              <span className="text-[var(--text-primary)] font-semibold">
                {isPt
                  ? `Formato ${heroShape.toUpperCase()} fixado. Clique em "Fixado" para soltar as estrelas.`
                  : `Format ${heroShape.toUpperCase()} pinned. Click "Pinned" to release particles.`}
              </span>
            </>
          ) : (
            <>
              <span className="text-[var(--accent-from)]">🖐️</span>
              <span>
                {isPt
                  ? `Dica: Clique e segure no fundo para atrair no formato ${heroShape.toUpperCase()}.`
                  : `Tip: Click and hold on the background to collapse into ${heroShape.toUpperCase()} shape.`}
              </span>
            </>
          )}
        </motion.div>

        {/* Floating Cards with Cursor Flee Physics */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onPointerDown={(e) => e.stopPropagation()}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {FLOATING_CARDS.map((card, i) => {
            const off = cardOffsets[i] ?? { x: 0, y: 0 };
            const CardIcon =
              card.shape === 'lua'
                ? SiLua
                : card.shape === 'cube'
                ? FaCube
                : card.shape === 'java'
                ? LuCoffee
                : card.shape === 'code'
                ? LuCode
                : FaReact;

            const cardTitle =
              perspective === 'client' && card.clientTitle ? card.clientTitle : card.title;
            const cardDescription =
              perspective === 'client' && card.clientDescription
                ? card.clientDescription
                : card.description;

            return (
              <motion.div
                key={card.id}
                animate={{ x: off.x, y: off.y }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                onClick={() => {
                  setClickedCard(card.id);
                  setHeroShape(card.shape);
                  triggerBriefAttraction(1600);
                  setTimeout(() => setClickedCard(null), 600);
                }}
                className={`w-64 p-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-xl text-left cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
                  clickedCard === card.id ? 'ring-2 ring-[var(--accent-from)]' : ''
                }`}
                style={{
                  boxShadow: '0 0 25px var(--glow)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="p-2 rounded-xl text-white shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                  >
                    <CardIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{cardTitle}</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {cardDescription}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <PortfolioGuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </section>
  );
};

export default Hero;
