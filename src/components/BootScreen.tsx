import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  'Portfolio OS v2.0.0 [Daniel Reis]',
  '[OK] Initializing kernel & WebGL drivers...',
  '[OK] Loading multi-language modules (PT/EN/ES/JA/ZH/KO/RU)...',
  '[OK] Mounting perspective engine (Client/Dev)...',
  '[OK] Loading 3D shaders & physics pipeline...',
  '[OK] Applying dynamic theme...',
  'Session ready.',
];

const NAME = 'Daniel Reis';
const LOG_COLOR = '#e6e6e6';
const CURSOR_COLOR = '#f5f5f5';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [showLog, setShowLog] = useState(true);
  const [showPaw, setShowPaw] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [exiting, setExiting] = useState(false);

  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(onComplete, 300);
  };

  // Phase 1: advance lines
  useEffect(() => {
    if (lineIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 280);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShowLog(false);
      setShowPaw(true);
    }, 250);
    return () => clearTimeout(t);
  }, [lineIndex]);

  // Phase 2: typing name
  useEffect(() => {
    if (!showPaw) return;
    const startDelay = setTimeout(() => {
      typingIntervalRef.current = setInterval(() => {
        setTypedName((prev) => {
          const next = NAME.slice(0, prev.length + 1);
          if (next === NAME && typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          return next;
        });
      }, 70);
    }, 400);

    return () => {
      clearTimeout(startDelay);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [showPaw]);

  // Phase 3: finish boot
  useEffect(() => {
    if (typedName !== NAME) return;
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 700);
    }, 1200);
    return () => clearTimeout(t);
  }, [typedName, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] font-mono overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 50% 40%, #121212 0%, #080808 45%, #000000 100%)',
      }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-8 text-xs font-mono px-3 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all cursor-pointer z-50 backdrop-blur-md"
      >
        Pular / Skip [ESC] →
      </button>

      {/* Boot Logs */}
      <motion.div
        className="absolute top-8 left-8 sm:top-10 sm:left-12"
        animate={{ opacity: showLog ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {BOOT_LINES.slice(0, lineIndex).map((line, i) => {
          const isLast = i === lineIndex - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isLast ? 0.95 : 0.45, x: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: 13,
                color: LOG_COLOR,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                lineHeight: '1.7',
              }}
            >
              {line}
              {isLast && lineIndex < BOOT_LINES.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 14,
                    background: CURSOR_COLOR,
                    marginLeft: 2,
                    verticalAlign: 'middle',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Centered Gif + Typed Name */}
      {showPaw && (
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <motion.img
            src="/gifzim.gif"
            alt="Boot animation"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: 170,
              height: 170,
              objectFit: 'cover',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 0 35px rgba(255,255,255,0.2)',
            }}
          />

          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              color: CURSOR_COLOR,
              letterSpacing: '0.2em',
              minHeight: 28,
              fontWeight: 700,
            }}
          >
            {typedName}
            {typedName !== NAME && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 16,
                  background: CURSOR_COLOR,
                  marginLeft: 3,
                  verticalAlign: 'middle',
                }}
              />
            )}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default BootScreen;
