import React, { useEffect, useState, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'forming' | 'reveal' | 'exit'>('forming');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  /* ── Star-field canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const STAR_COUNT = 220;
    type Star = { x: number; y: number; r: number; alpha: number; speed: number; twinkle: number };
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      stars.forEach((s) => {
        s.twinkle += s.speed;
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(221,183,255,${a * 0.85})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* ── Animation timeline ── */
  useEffect(() => {
    // phase: forming → 1.4s
    const t1 = setTimeout(() => setPhase('reveal'), 1400);
    // phase: reveal  → 2.4s
    const t2 = setTimeout(() => setPhase('exit'), 3800);
    // unmount        → 0.8s after exit starts
    const t3 = setTimeout(onComplete, 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isForming = phase === 'forming';
  const isReveal  = phase === 'reveal' || phase === 'exit';
  const isExit    = phase === 'exit';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c0717',
        opacity: isExit ? 0 : 1,
        transition: isExit ? 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)' : undefined,
        pointerEvents: isExit ? 'none' : 'all',
      }}
    >
      {/* Starfield */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Nebula ambient glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(183,109,255,0.14) 0%, transparent 70%)',
        opacity: isReveal ? 1 : 0,
        transition: 'opacity 1.2s ease',
      }} />

      {/* ── Eclipse scene ── */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        {/* Eclipse graphic */}
        <div
          style={{
            position: 'relative',
            width: 220,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Outer orbit ring */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px dashed rgba(183,109,255,0.5)',
            animation: 'splashRotateCW 16s linear infinite',
            opacity: isForming ? 0 : 1,
            transition: 'opacity 0.8s ease 0.3s',
          }} />

          {/* Mid orbit ring */}
          <div style={{
            position: 'absolute',
            inset: '18%',
            borderRadius: '50%',
            border: '1px solid rgba(255,198,64,0.45)',
            animation: 'splashRotateCCW 11s linear infinite',
            opacity: isForming ? 0 : 1,
            transition: 'opacity 0.8s ease 0.5s',
          }} />

          {/* Inner orbit ring */}
          <div style={{
            position: 'absolute',
            inset: '33%',
            borderRadius: '50%',
            border: '1px dashed rgba(123,208,255,0.45)',
            animation: 'splashRotateCW 7s linear infinite',
            opacity: isForming ? 0 : 1,
            transition: 'opacity 0.8s ease 0.7s',
          }} />

          {/* Corona glow ring */}
          <div style={{
            position: 'absolute',
            inset: -14,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #ddb7ff, #ffc640, #7bd0ff, #ddb7ff)',
            filter: 'blur(14px)',
            opacity: isReveal ? 0.7 : 0,
            animation: isReveal ? 'splashRotateCW 8s linear infinite' : undefined,
            transition: 'opacity 1.2s ease 0.2s',
          }} />

          {/* Eclipse core */}
          <div style={{
            position: 'relative',
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: '#000',
            boxShadow: isReveal
              ? '0 0 60px rgba(183,109,255,0.6), 0 0 100px rgba(183,109,255,0.3), inset 0 0 30px rgba(255,198,64,0.5)'
              : '0 0 20px rgba(183,109,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isForming ? 'scale(0.3)' : 'scale(1)',
            transition: 'transform 1s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 1s ease 0.5s',
            border: '2px solid rgba(183,109,255,0.4)',
          }}>
            {/* Obsidian center */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 38%, #1a0f2e 0%, #0c0717 60%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
              {/* Moon icon via SVG */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ddb7ff" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 10px #ddb7ff)', opacity: isReveal ? 1 : 0, transition: 'opacity 0.6s ease 0.6s' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.58rem',
                color: '#ffc640',
                letterSpacing: '0.15em',
                fontWeight: 700,
                opacity: isReveal ? 1 : 0,
                transition: 'opacity 0.6s ease 0.8s',
              }}>
                ECLIPSA
              </span>
            </div>
          </div>

          {/* Orbiting sparks */}
          {[
            { top: '8%',  left: '78%', delay: '0s'   },
            { top: '72%', left: '12%', delay: '1.4s' },
            { top: '60%', right: '8%', delay: '2.6s' },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute',
              ...pos,
              color: '#ffc640',
              fontSize: '0.9rem',
              animation: 'splashFloatSpark 3s ease-in-out infinite alternate',
              animationDelay: pos.delay,
              opacity: isReveal ? 1 : 0,
              transition: `opacity 0.5s ease ${0.4 + i * 0.15}s`,
            }}>
              {i % 2 === 0 ? '✦' : '✧'}
            </div>
          ))}
        </div>

        {/* Text block */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: isReveal ? 1 : 0,
          transform: isReveal ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s ease 0.6s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s',
        }}>
          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            background: 'linear-gradient(90deg, #ddb7ff 0%, #7bd0ff 50%, #ffc640 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            ECLiPSA
          </h1>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(207,194,214,0.75)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            3D Cosmic Modeler &amp; Worldbuilder
          </p>

          {/* Progress bar */}
          <div style={{
            width: 180,
            height: 2,
            background: 'rgba(183,109,255,0.15)',
            borderRadius: 9999,
            overflow: 'hidden',
            marginTop: '0.75rem',
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ddb7ff, #7bd0ff, #ffc640)',
              borderRadius: 9999,
              width: isReveal ? '100%' : '0%',
              transition: isReveal ? 'width 2.2s cubic-bezier(0.16,1,0.3,1)' : undefined,
            }} />
          </div>
        </div>
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes splashRotateCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes splashRotateCCW {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes splashFloatSpark {
          0%   { transform: translateY(0) scale(0.85); opacity: 0.5; }
          100% { transform: translateY(-10px) scale(1.2); opacity: 1; text-shadow: 0 0 8px #ffc640; }
        }
      `}</style>
    </div>
  );
};
