import React, { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

// ── Timeline (ms) ─────────────────────────────────────────────────────────────
const T_SUN_FADE   =  400;   // sol aparece
const T_MOON_START = 1000;   // lua começa a cruzar
const T_TOTALITY   = 3200;   // eclipse total → dispara transformação
const T_BLOOM      = 3150;   // eclipse estilizado começa a surgir
const T_RINGS      = 3500;   // anéis e sparks aparecem
const T_TEXT       = 3900;   // texto sobe
const T_EXIT       = 5800;   // fade out
const T_UNMOUNT    = 6800;   // desmonta

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const prog  = (t: number, from: number, to: number) => clamp((t - from) / (to - from));
const eio   = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp(t); }

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  const [bloom,       setBloom]       = useState(false);   // eclipse estilizado surge
  const [isSupernova, setIsSupernova] = useState(false);   // flash de energia
  const [ringsIn,     setRingsIn]     = useState(false);   // anéis e sparks
  const [textVisible, setTextVisible] = useState(false);
  const [exiting,     setExiting]     = useState(false);

  /* ── Canvas: eclipse realista visto da Terra ─────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    type Star = { x: number; y: number; r: number; base: number; phase: number; speed: number };
    const stars: Star[] = Array.from({ length: 280 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.15,
      base: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.004 + 0.001,
    }));

    type Streamer = { angle: number; length: number; width: number; curve: number };
    const streamers: Streamer[] = Array.from({ length: 22 }, (_, i) => ({
      angle:  (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
      length: 0.8 + Math.random() * 1.2,
      width:  0.04 + Math.random() * 0.05,
      curve:  (Math.random() - 0.5) * 0.35,
    }));

    startRef.current = performance.now();

    const draw = (now: number) => {
      const t = now - startRef.current;

      const R  = Math.min(W, H) * 0.085;   // eclipse pequeno e distante
      const cx = W / 2;
      const cy = H * 0.42;

      ctx.clearRect(0, 0, W, H);

      // Céu
      const coverP   = prog(t, T_MOON_START, T_TOTALITY);
      const coverage = eio(coverP);

      const skyG = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * 0.65);
      skyG.addColorStop(0,   'rgba(20,10,38,1)');
      skyG.addColorStop(0.4, 'rgba(12,7,23,1)');
      skyG.addColorStop(1,   'rgba(5,3,12,1)');
      ctx.fillStyle = skyG;
      ctx.fillRect(0, 0, W, H);

      // Brilho 360° no horizonte (efeito real de eclipse total)
      if (coverage > 0.05) {
        const ha = coverage * 0.26;
        const hG = ctx.createLinearGradient(0, H * 0.55, 0, H);
        hG.addColorStop(0,    'rgba(180,60,20,0)');
        hG.addColorStop(0.4,  `rgba(155,48,14,${ha * 0.6})`);
        hG.addColorStop(0.75, `rgba(95,22,6,${ha * 0.9})`);
        hG.addColorStop(1,    `rgba(28,4,2,${ha})`);
        ctx.fillStyle = hG;
        ctx.fillRect(0, H * 0.55, W, H * 0.45);
        [0, W].forEach(sx => {
          const sg = ctx.createRadialGradient(sx, H * 0.72, 0, sx, H * 0.72, H * 0.44);
          sg.addColorStop(0,   `rgba(195,75,18,${ha * 0.16})`);
          sg.addColorStop(0.5, `rgba(130,36,8,${ha * 0.07})`);
          sg.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(sx, H * 0.72, H * 0.44, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Estrelas reveladas pelo escurecimento
      const starVis = clamp(coverage * 1.3 + prog(t, 0, 600) * 0.08);
      stars.forEach(s => {
        s.phase += s.speed;
        const a = starVis * s.base * (0.55 + 0.45 * Math.abs(Math.sin(s.phase)));
        if (a < 0.01) return;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,205,255,${a})`;
        ctx.fill();
      });

      // Sol
      const sunP = eio(prog(t, T_SUN_FADE, T_SUN_FADE + 700));
      if (sunP > 0) {
        const atmo = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 5);
        atmo.addColorStop(0,   `rgba(255,200,100,${0.04 * sunP})`);
        atmo.addColorStop(0.3, `rgba(255,160,50,${0.018 * sunP})`);
        atmo.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = atmo;
        ctx.beginPath(); ctx.arc(cx, cy, R * 5, 0, Math.PI * 2); ctx.fill();

        const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2);
        pg.addColorStop(0,   `rgba(255,240,180,${0.19 * sunP})`);
        pg.addColorStop(0.5, `rgba(255,180,60,${0.08 * sunP})`);
        pg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(cx, cy, R * 2, 0, Math.PI * 2); ctx.fill();

        const sd = ctx.createRadialGradient(cx - R*0.15, cy - R*0.15, 0, cx, cy, R);
        sd.addColorStop(0,    `rgba(255,252,230,${sunP})`);
        sd.addColorStop(0.55, `rgba(255,218,100,${sunP})`);
        sd.addColorStop(1,    `rgba(255,160,30,${sunP})`);
        ctx.fillStyle = sd;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      }

      // Corona realista (streamers prateados)
      const coronaP = prog(t, T_TOTALITY - 450, T_TOTALITY + 250);
      const coronaA = eio(clamp(coronaP));
      if (coronaA > 0.01) {
        const tm = t / 1000;

        const oc = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 5);
        oc.addColorStop(0,    `rgba(255,248,235,${0.48 * coronaA})`);
        oc.addColorStop(0.12, `rgba(240,230,210,${0.26 * coronaA})`);
        oc.addColorStop(0.35, `rgba(210,200,190,${0.10 * coronaA})`);
        oc.addColorStop(0.65, `rgba(180,170,200,${0.04 * coronaA})`);
        oc.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = oc;
        ctx.beginPath(); ctx.arc(cx, cy, R * 5, 0, Math.PI * 2); ctx.fill();

        ctx.save();
        ctx.translate(cx, cy);
        streamers.forEach(s => {
          const breathe = 1 + Math.sin(tm * 0.38 + s.angle * 2.1) * 0.04;
          const len   = R * s.length * breathe;
          const wBase = R * s.width;
          const tipX  = Math.cos(s.angle + s.curve) * len;
          const tipY  = Math.sin(s.angle + s.curve) * len;
          const midX  = Math.cos(s.angle + s.curve * 0.5) * len * 0.5;
          const midY  = Math.sin(s.angle + s.curve * 0.5) * len * 0.5;

          const sg = ctx.createLinearGradient(0, 0, tipX, tipY);
          sg.addColorStop(0,    `rgba(255,250,240,${0.45 * coronaA})`);
          sg.addColorStop(0.15, `rgba(240,235,220,${0.30 * coronaA})`);
          sg.addColorStop(0.5,  `rgba(220,215,230,${0.12 * coronaA})`);
          sg.addColorStop(1,    'rgba(0,0,0,0)');
          ctx.save();
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.moveTo(Math.cos(s.angle - 0.05) * R, Math.sin(s.angle - 0.05) * R);
          ctx.quadraticCurveTo(
            midX + Math.cos(s.angle + Math.PI / 2) * wBase * 0.4,
            midY + Math.sin(s.angle + Math.PI / 2) * wBase * 0.4,
            tipX, tipY
          );
          ctx.quadraticCurveTo(
            midX + Math.cos(s.angle - Math.PI / 2) * wBase * 0.4,
            midY + Math.sin(s.angle - Math.PI / 2) * wBase * 0.4,
            Math.cos(s.angle + 0.05) * R, Math.sin(s.angle + 0.05) * R
          );
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
        ctx.restore();

        // Anel interno brilhante (cromosfera)
        const ring = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.2);
        ring.addColorStop(0,    `rgba(255,250,245,${0.72 * coronaA})`);
        ring.addColorStop(0.35, `rgba(255,240,220,${0.38 * coronaA})`);
        ring.addColorStop(0.7,  `rgba(230,220,210,${0.09 * coronaA})`);
        ring.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = ring;
        ctx.beginPath(); ctx.arc(cx, cy, R * 1.2, 0, Math.PI * 2); ctx.fill();
      }

      // Lua
      const moonProg = eio(prog(t, T_MOON_START, T_TOTALITY));
      const moonX = cx + R * lerp(2.5, 0, moonProg);
      if (t > T_MOON_START - 50) {
        const md = ctx.createRadialGradient(moonX - R*0.2, cy - R*0.2, 0, moonX, cy, R);
        md.addColorStop(0,   'rgba(18,12,30,1)');
        md.addColorStop(0.7, 'rgba(10,6,20,1)');
        md.addColorStop(1,   'rgba(6,3,14,1)');
        ctx.fillStyle = md;
        ctx.beginPath(); ctx.arc(moonX, cy, R, 0, Math.PI * 2); ctx.fill();

        if (coronaA > 0.3) {
          const es = ctx.createRadialGradient(moonX + R*0.4, cy + R*0.3, 0, moonX, cy, R*1.1);
          es.addColorStop(0.6,  'rgba(0,0,0,0)');
          es.addColorStop(0.85, `rgba(100,150,220,${0.05 * coronaA})`);
          es.addColorStop(1,    'rgba(0,0,0,0)');
          ctx.fillStyle = es;
          ctx.beginPath(); ctx.arc(moonX, cy, R * 1.1, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Flash do anel de diamante
      const drP = prog(t, T_TOTALITY - 80, T_TOTALITY + 160);
      if (drP > 0 && drP < 1) {
        const flash = Math.sin(drP * Math.PI);
        const drG = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 2.5);
        drG.addColorStop(0,   `rgba(255,255,245,${0.82 * flash})`);
        drG.addColorStop(0.2, `rgba(255,240,200,${0.38 * flash})`);
        drG.addColorStop(0.7, `rgba(200,180,240,${0.07 * flash})`);
        drG.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = drG;
        ctx.beginPath(); ctx.arc(cx, cy, R * 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Fade out do canvas quando o eclipse estilizado surge
      if (t > T_BLOOM) {
        const fadeP = clamp((t - T_BLOOM) / 900);
        ctx.fillStyle = `rgba(12,7,23,${eio(fadeP) * 0.82})`;
        ctx.fillRect(0, 0, W, H);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Timeline de estado ──────────────────────────────────────────────── */
  useEffect(() => {
    // Bloom: eclipse estilizado surge na totalidade
    const t1 = setTimeout(() => setBloom(true), T_BLOOM);
    // Flash de supernova ao encaixar
    const t2 = setTimeout(() => {
      setIsSupernova(true);
      setTimeout(() => setIsSupernova(false), 850);
    }, T_BLOOM + 80);
    // Anéis e sparks
    const t3 = setTimeout(() => setRingsIn(true), T_RINGS);
    // Texto
    const t4 = setTimeout(() => setTextVisible(true), T_TEXT);
    // Saída
    const t5 = setTimeout(() => setExiting(true), T_EXIT);
    const t6 = setTimeout(onComplete, T_UNMOUNT);
    return () => { [t1,t2,t3,t4,t5,t6].forEach(clearTimeout); };
  }, [onComplete]);

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 1s cubic-bezier(0.4,0,0.2,1)' : undefined,
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      {/* Canvas: eclipse realista */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

      {/* Eclipse estilizado — surge no mesmo ponto do eclipse do canvas (50%, 42%) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
          opacity: bloom ? 1 : 0,
          transition: 'opacity 0.65s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          className="eclipse-wrapper"
          style={{
            transform: bloom
              ? isSupernova ? 'scale(1.1)' : 'scale(1)'
              : 'scale(0.25)',
            transition: 'transform 0.85s cubic-bezier(0.175,0.885,0.32,1.275)',
          }}
        >
          {/* Anéis orbitais */}
          <div className="eclipse-ring eclipse-ring-outer" style={{ opacity: ringsIn ? 1 : 0, transition: 'opacity 0.7s ease 0.1s' }} />
          <div className="eclipse-ring eclipse-ring-mid"   style={{ opacity: ringsIn ? 1 : 0, transition: 'opacity 0.7s ease 0.25s' }} />
          <div className="eclipse-ring eclipse-ring-inner" style={{ opacity: ringsIn ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }} />

          {/* Aura conic — o acender do aura */}
          <div style={{
            position: 'absolute', inset: -14, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #ddb7ff, #ffc640, #7bd0ff, #ddb7ff)',
            filter: 'blur(14px)',
            opacity: ringsIn ? 0.72 : 0,
            animation: ringsIn ? 'rotateClockwise 8s linear infinite' : undefined,
            transition: 'opacity 1.1s ease 0.15s',
          }} />

          {/* Núcleo */}
          <div
            className="eclipse-core"
            style={{
              boxShadow: isSupernova
                ? '0 0 100px #ddb7ff, 0 0 180px #ffc640, inset 0 0 45px #ffc640'
                : bloom
                ? '0 0 60px rgba(183,109,255,0.6), 0 0 100px rgba(183,109,255,0.3), inset 0 0 30px rgba(255,198,64,0.45)'
                : undefined,
              transition: 'box-shadow 0.7s ease',
            }}
          >
            <div className="eclipse-corona" />
            <div className="eclipse-sun-crescent" />
            <div style={{
              position: 'relative', zIndex: 10,
              width: '100%', height: '100%', borderRadius: '50%',
              backgroundColor: '#0c0717',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(183,109,255,0.3)',
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                stroke="#ddb7ff" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 8px #ddb7ff)', opacity: ringsIn ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem', color: '#ffc640',
                letterSpacing: '0.12em', fontWeight: 700,
                marginTop: 4,
                opacity: ringsIn ? 1 : 0,
                transition: 'opacity 0.6s ease 0.7s',
              }}>
                ECLIPSA
              </span>
            </div>
          </div>

          {/* Sparks */}
          {([
            { pos: { top: '10%',    left: '80%'  }, animDelay: '0s'   },
            { pos: { bottom: '15%', left: '15%'  }, animDelay: '1.2s' },
            { pos: { top: '65%',    right: '10%' }, animDelay: '2.4s' },
          ]).map(({ pos, animDelay }, i) => (
            <div
              key={i}
              className="eclipse-spark"
              style={{
                ...pos,
                animationDelay: animDelay,
                opacity: ringsIn ? 1 : 0,
                transition: `opacity 0.5s ease ${0.3 + i * 0.15}s`,
              }}
            >
              {i % 2 === 0 ? '✦' : '✧'}
            </div>
          ))}
        </div>
      </div>

      {/* Texto */}
      <div style={{
        position: 'absolute', bottom: '10%', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, margin: 0,
          background: 'linear-gradient(90deg, #ddb7ff 0%, #7bd0ff 50%, #ffc640 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          ECLiPSA
        </h1>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
          color: 'rgba(207,194,214,0.75)', letterSpacing: '0.18em',
          textTransform: 'uppercase', margin: 0,
        }}>
          3D Cosmic Modeler &amp; Worldbuilder
        </p>
        <div style={{ width: 180, height: 2, background: 'rgba(183,109,255,0.15)', borderRadius: 9999, overflow: 'hidden', marginTop: '0.75rem' }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ddb7ff, #7bd0ff, #ffc640)',
            borderRadius: 9999,
            width: textVisible ? '100%' : '0%',
            transition: textVisible ? 'width 2.2s cubic-bezier(0.16,1,0.3,1)' : undefined,
          }} />
        </div>
      </div>
    </div>
  );
};
