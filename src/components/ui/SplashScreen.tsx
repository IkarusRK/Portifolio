import React, { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

// ── Timeline (ms) ────────────────────────────────────────────────────────────
const T_SUN_FADE    =   400;   // sol começa a aparecer
const T_MOON_START  =  1200;   // lua começa a cruzar
const T_TOTALITY    =  3600;   // eclipse total

const T_TEXT_IN     =  4200;   // texto sobe
const T_EXIT        =  6200;   // fade out
const T_UNMOUNT     =  7200;   // desmonta

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  const [textVisible, setTextVisible] = useState(false);
  const [exiting,     setExiting]     = useState(false);

  /* ── Canvas animation ──────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const clamp  = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
    const prog   = (t: number, from: number, to: number) => clamp((t - from) / (to - from));
    const eio    = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    // ── Stars ────────────────────────────────────────────────────────────────
    type Star = { x: number; y: number; r: number; base: number; phase: number; speed: number };
    const stars: Star[] = Array.from({ length: 320 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.1 + 0.15,
      base:  Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.004 + 0.001,
    }));

    // ── Wispy corona streamers (fixed geometry, drawn per frame) ─────────────
    type Streamer = { angle: number; length: number; width: number; curve: number };
    const streamers: Streamer[] = Array.from({ length: 24 }, (_, i) => ({
      angle:  (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
      length: 0.9 + Math.random() * 1.4,
      width:  0.04 + Math.random() * 0.06,
      curve:  (Math.random() - 0.5) * 0.4,
    }));

    startRef.current = performance.now();

    const draw = (now: number) => {
      const t = now - startRef.current;

      // ── Layout ──────────────────────────────────────────────────────────
      const R  = Math.min(W, H) * 0.085;   // eclipse radius — small, distant
      const cx = W / 2;
      const cy = H * 0.42;                 // slightly above centre, like looking up

      ctx.clearRect(0, 0, W, H);

      // ── Sky: deep void, darkens further as moon covers sun ──────────────
      const coverP   = prog(t, T_MOON_START, T_TOTALITY);
      const coverage = eio(coverP);        // 0 = full sun, 1 = totality

      // base sky gradient — deep indigo/violet void
      const skyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * 0.65);
      skyGrad.addColorStop(0,   `rgba(20,10,38,1)`);
      skyGrad.addColorStop(0.4, `rgba(12,7,23,1)`);
      skyGrad.addColorStop(1,   `rgba(5,3,12,1)`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Horizon 360° glow (eclipse effect — sky darkens, horizon glows) ─
      if (coverage > 0.05) {
        const horizAlpha = coverage * 0.28;
        // warm pinkish-orange band at the horizon
        const hGrad = ctx.createLinearGradient(0, H * 0.55, 0, H);
        hGrad.addColorStop(0,   `rgba(180,60,20,0)`);
        hGrad.addColorStop(0.4, `rgba(160,50,15,${horizAlpha * 0.6})`);
        hGrad.addColorStop(0.75,`rgba(100,25,8,${horizAlpha * 0.9})`);
        hGrad.addColorStop(1,   `rgba(30,5,2,${horizAlpha})`);
        ctx.fillStyle = hGrad;
        ctx.fillRect(0, H * 0.55, W, H * 0.45);

        // subtle side glows (360° effect)
        const sideGlow = (x: number) => {
          const sg = ctx.createRadialGradient(x, H * 0.72, 0, x, H * 0.72, H * 0.45);
          sg.addColorStop(0,   `rgba(200,80,20,${horizAlpha * 0.18})`);
          sg.addColorStop(0.5, `rgba(140,40,10,${horizAlpha * 0.08})`);
          sg.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(x, H * 0.72, H * 0.45, 0, Math.PI * 2);
          ctx.fill();
        };
        sideGlow(0);
        sideGlow(W);
      }

      // ── Stars: slowly revealed as sky darkens ────────────────────────────
      const sunP    = prog(t, T_SUN_FADE, T_SUN_FADE + 800);
      const starVis = clamp(coverage * 1.4 + prog(t, 0, 600) * 0.15);
      stars.forEach(s => {
        s.phase += s.speed;
        const twinkle = 0.5 + 0.5 * Math.sin(s.phase);
        const alpha   = starVis * s.base * (0.6 + 0.4 * twinkle);
        if (alpha < 0.01) return;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,205,255,${alpha})`;
        ctx.fill();
      });

      // ── Sun ──────────────────────────────────────────────────────────────
      const sunAlpha = eio(sunP);
      if (sunAlpha > 0) {
        // very soft outer atmosphere (large, very faint)
        const atmo = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 5.5);
        atmo.addColorStop(0,   `rgba(255,200,100,${0.04 * sunAlpha})`);
        atmo.addColorStop(0.3, `rgba(255,160,50,${0.025 * sunAlpha})`);
        atmo.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = atmo;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 5.5, 0, Math.PI * 2);
        ctx.fill();

        // photosphere glow
        const pg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2);
        pg.addColorStop(0,   `rgba(255,240,180,${0.22 * sunAlpha})`);
        pg.addColorStop(0.5, `rgba(255,180,60,${0.10 * sunAlpha})`);
        pg.addColorStop(1,   'rgba(255,120,0,0)');
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // sun disc
        const sd = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R);
        sd.addColorStop(0,   `rgba(255,252,230,${sunAlpha})`);
        sd.addColorStop(0.55,`rgba(255,218,100,${sunAlpha})`);
        sd.addColorStop(1,   `rgba(255,160,30,${sunAlpha})`);
        ctx.fillStyle = sd;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Corona — visible during totality ─────────────────────────────────
      const coronaP = prog(t, T_TOTALITY - 500, T_TOTALITY + 400);
      const corona  = eio(coronaP);

      if (corona > 0.01) {
        const tm = t / 1000;

        // Outer diffuse corona halo
        const outerCorona = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 5.5);
        outerCorona.addColorStop(0,    `rgba(255,248,235,${0.55 * corona})`);
        outerCorona.addColorStop(0.12, `rgba(240,230,210,${0.32 * corona})`);
        outerCorona.addColorStop(0.3,  `rgba(210,200,190,${0.14 * corona})`);
        outerCorona.addColorStop(0.6,  `rgba(180,170,200,${0.05 * corona})`);
        outerCorona.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = outerCorona;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Wispy streamers
        ctx.save();
        ctx.translate(cx, cy);
        streamers.forEach(s => {
          const breathe = 1 + Math.sin(tm * 0.38 + s.angle * 2.1) * 0.04;
          const len     = R * s.length * breathe;
          const wBase   = R * s.width;

          // streamer path: tapers from base to tip with gentle curve
          const midX = Math.cos(s.angle + s.curve * 0.5) * len * 0.5;
          const midY = Math.sin(s.angle + s.curve * 0.5) * len * 0.5;
          const tipX = Math.cos(s.angle + s.curve) * len;
          const tipY = Math.sin(s.angle + s.curve) * len;

          const streamerGrad = ctx.createLinearGradient(0, 0, tipX, tipY);
          streamerGrad.addColorStop(0,    `rgba(255,250,240,${0.50 * corona})`);
          streamerGrad.addColorStop(0.15, `rgba(240,235,220,${0.35 * corona})`);
          streamerGrad.addColorStop(0.5,  `rgba(220,215,230,${0.15 * corona})`);
          streamerGrad.addColorStop(1,    'rgba(200,195,220,0)');

          ctx.save();
          ctx.fillStyle = streamerGrad;
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

        // Inner bright ring (chromosphere)
        const ring = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.25);
        ring.addColorStop(0,    `rgba(255,250,245,${0.80 * corona})`);
        ring.addColorStop(0.35, `rgba(255,240,220,${0.45 * corona})`);
        ring.addColorStop(0.7,  `rgba(230,220,210,${0.12 * corona})`);
        ring.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = ring;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Moon ─────────────────────────────────────────────────────────────
      const moonP  = prog(t, T_MOON_START, T_TOTALITY);
      const moonEa = eio(moonP);
      // travels from just off-right-edge of sun to exact centre
      const moonX  = cx + R * lerp(2.5, 0, moonEa);
      const moonY  = cy;

      if (t > T_MOON_START - 50) {
        // very faint forward glow (dust scattering)
        if (moonP > 0.05 && corona < 0.1) {
          const fwd = ctx.createRadialGradient(moonX - R * 0.3, moonY, 0, moonX, moonY, R * 1.8);
          fwd.addColorStop(0,   'rgba(255,220,150,0.04)');
          fwd.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = fwd;
          ctx.beginPath();
          ctx.arc(moonX, moonY, R * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Moon disc — dark, with subtle earthshine blue tint
        const moonDisc = ctx.createRadialGradient(
          moonX - R * 0.2, moonY - R * 0.2, 0,
          moonX, moonY, R
        );
        moonDisc.addColorStop(0,   'rgba(18,12,30,1)');
        moonDisc.addColorStop(0.7, 'rgba(10,6,20,1)');
        moonDisc.addColorStop(1,   'rgba(6,3,14,1)');
        ctx.fillStyle = moonDisc;
        ctx.beginPath();
        ctx.arc(moonX, moonY, R, 0, Math.PI * 2);
        ctx.fill();

        // Earthshine: very faint blue glow on dark side
        if (corona > 0.3) {
          const earthshine = ctx.createRadialGradient(
            moonX + R * 0.4, moonY + R * 0.3, 0,
            moonX, moonY, R * 1.1
          );
          earthshine.addColorStop(0.6, 'rgba(0,0,0,0)');
          earthshine.addColorStop(0.85, `rgba(100,150,220,${0.06 * corona})`);
          earthshine.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = earthshine;
          ctx.beginPath();
          ctx.arc(moonX, moonY, R * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Diamond ring flash ────────────────────────────────────────────────
      const drP = prog(t, T_TOTALITY - 80, T_TOTALITY + 180);
      if (drP > 0 && drP < 1) {
        const flash = Math.sin(drP * Math.PI);
        const drG   = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 2.8);
        drG.addColorStop(0,   `rgba(255,255,245,${0.9 * flash})`);
        drG.addColorStop(0.2, `rgba(255,240,200,${0.4 * flash})`);
        drG.addColorStop(0.7, `rgba(200,180,240,${0.1 * flash})`);
        drG.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = drG;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Text & exit timeline ──────────────────────────────────────────────── */
  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), T_TEXT_IN);
    const t2 = setTimeout(() => setExiting(true),     T_EXIT);
    const t3 = setTimeout(onComplete,                  T_UNMOUNT);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 1s cubic-bezier(0.4,0,0.2,1)' : undefined,
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

      {/* Wordmark — aparece na totalidade, na parte inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.4s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            letterSpacing: '0.18em',
            lineHeight: 1,
            margin: 0,
            color: 'rgba(232,220,255,0.88)',
            textTransform: 'uppercase',
          }}
        >
          ECLIPSA
        </h1>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: 'rgba(180,165,210,0.5)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          3D · Cosmic Modeler · Worldbuilder
        </p>
      </div>
    </div>
  );
};

// ── Tiny lerp used in draw ────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}
