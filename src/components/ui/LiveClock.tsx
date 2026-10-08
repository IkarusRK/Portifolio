import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface LiveClockProps {
  showSeconds?: boolean;
  showIcon?: boolean;
  showTimezone?: boolean;
  className?: string;
  compactOnMobile?: boolean;
}

export const LiveClock = ({
  showSeconds = true,
  showIcon = true,
  showTimezone = true,
  className = '',
  compactOnMobile = true,
}: LiveClockProps) => {
  const [time, setTime] = useState<Date | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-mono border border-[var(--glass-border)] bg-[var(--glass-bg)] opacity-60 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>--:--:--</span>
      </div>
    );
  }

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((s) => !s)}
    >
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-mono font-medium border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] shadow-sm backdrop-blur-md select-none transition-all hover:border-[var(--accent-from)]/60 cursor-pointer ${className}`}
      >
        {showIcon && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        )}

        <span className="tabular-nums tracking-wide flex items-center">
          <span>{hours}</span>
          <span className="animate-pulse text-[var(--accent-from)] mx-[1px] font-bold">:</span>
          <span>{minutes}</span>
          {showSeconds && (
            <>
              <span
                className={`animate-pulse text-[var(--accent-from)] mx-[1px] font-bold ${
                  compactOnMobile ? 'hidden sm:inline' : 'inline'
                }`}
              >
                :
              </span>
              <span
                className={`text-[var(--text-secondary)] ${
                  compactOnMobile ? 'hidden sm:inline' : 'inline'
                }`}
              >
                {seconds}
              </span>
            </>
          )}
        </span>

        {showTimezone && (
          <span className="text-[10px] text-[var(--text-secondary)] font-sans hidden md:inline px-1.5 py-0.5 rounded-md bg-white/5 border border-[var(--glass-border)]">
            BRT
          </span>
        )}
      </div>

      {/* Tooltip com data e status */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 px-3 py-2 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-primary)] backdrop-blur-xl text-xs font-mono text-[var(--text-primary)] whitespace-nowrap shadow-2xl"
            style={{
              boxShadow: '0 0 20px var(--glow)',
            }}
          >
            <p className="text-[11px] font-semibold text-[var(--accent-from)] capitalize">
              {formattedDate} • {t.clock.statusOnline}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
              {t.clock.brtTime}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveClock;
