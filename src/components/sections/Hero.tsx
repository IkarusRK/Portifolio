import { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import type { ParticleShape } from '../../data/floatingCards';
import { useTheme } from '../../hooks/useTheme';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import { GradientText } from '../ui/GradientText';
import { ParticleField } from '../three/ParticleField';
import { FLOATING_CARDS } from '../../data/floatingCards';
import { THEME_PALETTES } from '../../data/themes';

const FLEE_RADIUS = 100;
const FLEE_STRENGTH = 36;

const Hero = () => {
  const { theme } = useTheme();
  const [accentColor, setAccentColor] = useState(THEME_PALETTES[theme].from);
  const mousePos = useCursorPosition(0.08);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionRect, setSectionRect] = useState({ left: 0, top: 0, width: 1, height: 1 });
  const [cardCenters, setCardCenters] = useState<{ x: number; y: number }[]>([]);
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  const [particleShape] = useState<ParticleShape>('react');
  const [isPointerDown, setIsPointerDown] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      if (sectionRef.current) setSectionRect(sectionRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const mouseNdc = useMemo(() => ({
    x: (mousePos.x - sectionRect.left) / sectionRect.width * 2 - 1,
    y: -(mousePos.y - sectionRect.top) / sectionRect.height * 2 + 1,
  }), [mousePos.x, mousePos.y, sectionRect.left, sectionRect.top, sectionRect.width, sectionRect.height]);

  useEffect(() => {
    setAccentColor(THEME_PALETTES[theme].from);
  }, [theme]);

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

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20"
      style={{
        background: 'var(--bg-primary)',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--bg-secondary) 0%, transparent 50%)',
      }}
      onPointerDown={() => setIsPointerDown(true)}
      onPointerUp={() => setIsPointerDown(false)}
      onPointerLeave={() => setIsPointerDown(false)}
    >
      <ParticleField
        accentColor={accentColor}
        isAttracting={isPointerDown}
        mouseNdc={mouseNdc}
        shape={particleShape}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6 border border-green-500/50 text-green-400 bg-green-500/10"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
          Disponível para projetos
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-3"
        >
          <GradientText as="span" className="text-4xl sm:text-5xl md:text-6xl">
            Daniel Reis
          </GradientText>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] mb-4"
        >
          Desenvolvedor Full Stack | Java & Web
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8"
        >
          Construindo aplicações web e experiências digitais com foco em código limpo e boas práticas.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#applications"
            className="px-6 py-3 rounded-xl font-semibold text-white border-0"
            style={{
              background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
              boxShadow: '0 0 30px var(--glow)',
            }}
          >
            Ver Projetos
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-semibold border-2 border-[var(--accent-from)] text-[var(--accent-from)] hover:bg-[var(--glass-bg)] transition-colors"
          >
            Entre em Contato
          </a>
        </motion.div>

        <p className="text-xs text-[var(--text-secondary)] mt-4">
          Clique e segure nas partículas para elas formarem o átomo do React.
        </p>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          {FLOATING_CARDS.map((card, i) => {
            const iconColor = 'var(--text-primary)';
            const off = cardOffsets[i] ?? { x: 0, y: 0 };
            return (
              <div
                key={card.id}
                className="relative"
                style={{
                  transform: `translate(${off.x}px, ${off.y}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
              >
                {/* card em si — sem overflow-hidden, tamanho fixo */}
                <motion.button
                  type="button"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="w-20 h-20 rounded-2xl border-2 cursor-pointer select-none flex flex-col items-center justify-center gap-1"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 20px var(--glow)',
                    borderColor: 'transparent',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setClickedCard(clickedCard === card.id ? null : card.id);
                  }}
                >
                  <FaReact
                    style={{ color: iconColor, width: '2rem', height: '2rem' }}
                  />
                  <span
                    className="text-[10px] font-semibold leading-tight"
                    style={{ color: iconColor }}
                  >
                    {card.title}
                  </span>
                </motion.button>

                {/* balão fora do botão, não sofre clipping */}
                <AnimatePresence>
                  {clickedCard === card.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-56 px-3 py-2 rounded-xl text-left text-xs border"
                      style={{
                        background: 'var(--glass-bg)',
                        borderColor: 'var(--glass-border)',
                        color: 'var(--text-primary)',
                        boxShadow: '0 0 24px var(--glow)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0"
                        style={{
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderBottom: '8px solid var(--glass-bg)',
                        }}
                      />
                      <p className="font-semibold text-[var(--accent-from)]">{card.title}</p>
                      <p className="mt-1 text-[var(--text-secondary)]">{card.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
