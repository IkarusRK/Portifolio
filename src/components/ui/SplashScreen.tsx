import React, { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  onEclipseArrive?: () => void;
}

// ── Timing constants (ms) ───────────────────────────────────────────────────
const T_SUN_APPEAR  = 300;   // Sol começa a se formar no céu
const T_MOON_START  = 1000;  // Lua começa a travessia contínua
const T_TOTALITY    = 3200;  // 100% eclipsado — totalidade exata
const T_TEXT_IN     = 3600;  // Texto ECLiPSA surge com barra de luz
const T_PREPARE_FLY = 5100;  // Anéis e texto recolhem suavemente
const T_FLY_START   = 5400;  // Eclipse voa em direção ao botão
const T_ARRIVE      = 6300;  // Chegada exata no botão da Hero
const T_UNMOUNT     = 6700;  // Desmontagem completa

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, onEclipseArrive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  // Posição animada do eclipse estilizado (centro da tela -> posição do botão da hero)
  const [eclipsePos, setEclipsePos] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 640,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.40 : 360,
  }));

  // Fases da apresentação cósmica
  const [totalityReached, setTotalityReached] = useState(false); // Aura acende
  const [textVisible,     setTextVisible]     = useState(false); // Tipografia surge
  const [recedingBeforeFly, setReceding]      = useState(false); // Recolhe anéis para voar
  const [flying,          setFlying]          = useState(false); // Em voo para o botão
  const [arrived,         setArrived]         = useState(false); // Chegou no destino
  const [fadeOutCanvas,   setFadeOutCanvas]   = useState(false); // Vácuo desaparece

  /* ── Animação fluida e contínua no Canvas ──────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Campo de estrelas cósmicas
    type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number };
    const STAR_COUNT = 240;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random() * 2560,
      y:     Math.random() * 1440,
      r:     Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    // Raio do corpo celeste (diâmetro 140px, exatamente idêntico ao .eclipse-core)
    const R = 70;
    const cx = W / 2;
    const cy = H * 0.40;

    // A lua começa logo à direita do sol (tangenciando sua borda externa) e termina no centro exato
    const moonStartX = cx + R * 2.1;
    const moonEndX   = cx;

    const startTime = performance.now();
    let hasTriggeredTotality = false;

    const loop = (now: number) => {
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, W, H);

      // 1. Céu espacial profundo (vácuo com nebulosa sutil)
      const skyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
      skyGrad.addColorStop(0,   '#160c2b');
      skyGrad.addColorStop(0.4, '#0e071c');
      skyGrad.addColorStop(1,   '#07040e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Brilho do horizonte 360° cósmico (aumenta conforme o sol é eclipsado)
      const moonTransitProgress = clamp((elapsed - T_MOON_START) / (T_TOTALITY - T_MOON_START));
      if (moonTransitProgress > 0.05) {
        const horizonAlpha = moonTransitProgress * 0.24;
        const horizonGrad = ctx.createLinearGradient(0, H * 0.58, 0, H);
        horizonGrad.addColorStop(0,   'rgba(183,109,255,0)');
        horizonGrad.addColorStop(0.5, `rgba(180,60,20,${horizonAlpha * 0.5})`);
        horizonGrad.addColorStop(0.85,`rgba(120,30,8,${horizonAlpha * 0.85})`);
        horizonGrad.addColorStop(1,   `rgba(25,5,2,${horizonAlpha})`);
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, H * 0.58, W, H * 0.42);
      }

      // 3. Estrelas cintilando
      const starVisibility = clamp((elapsed - 200) / 1000);
      stars.forEach((s) => {
        s.phase += s.speed;
        const twinkle = 0.5 + 0.5 * Math.sin(s.phase);
        const a = starVisibility * s.alpha * (0.6 + 0.4 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225,210,255,${a})`;
        ctx.fill();
      });

      // 4. Sol (Dourado radiante com halo atmosférico suave)
      const sunAlpha = clamp((elapsed - T_SUN_APPEAR) / 700);
      if (sunAlpha > 0) {
        // Halo distante
        const haloGrad = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 3.5);
        haloGrad.addColorStop(0,   `rgba(255,200,100,${0.25 * sunAlpha})`);
        haloGrad.addColorStop(0.35,`rgba(255,150,40,${0.08 * sunAlpha})`);
        haloGrad.addColorStop(1,   'rgba(255,100,0,0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Photosphere brilhante
        const photoGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
        photoGrad.addColorStop(0,   `rgba(255,245,190,${0.35 * sunAlpha})`);
        photoGrad.addColorStop(0.6, `rgba(255,180,60,${0.12 * sunAlpha})`);
        photoGrad.addColorStop(1,   'rgba(255,120,0,0)');
        ctx.fillStyle = photoGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Disco solar puro
        const discGrad = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R);
        discGrad.addColorStop(0,   `rgba(255,255,240,${sunAlpha})`);
        discGrad.addColorStop(0.5, `rgba(255,215,110,${sunAlpha})`);
        discGrad.addColorStop(1,   `rgba(255,155,30,${sunAlpha})`);
        ctx.fillStyle = discGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. A Lua viajando e bloqueando o sol de forma contínua
      if (elapsed >= T_MOON_START) {
        // Movimento linear uniforme: velocidade constante sem paradas ou freadas bruscas!
        const moonProgress = clamp((elapsed - T_MOON_START) / (T_TOTALITY - T_MOON_START));
        const currentMoonX = moonStartX + (moonEndX - moonStartX) * moonProgress;
        const currentMoonY = cy;

        // Disco da Lua (opaco escuro, cortando o sol fisicamente e criando o crescente perfeito)
        const moonGrad = ctx.createRadialGradient(
          currentMoonX - R * 0.25, currentMoonY - R * 0.25, 0,
          currentMoonX, currentMoonY, R
        );
        moonGrad.addColorStop(0,   '#180e2b');
        moonGrad.addColorStop(0.7, '#0c0717');
        moonGrad.addColorStop(1,   '#05030a');
        ctx.fillStyle = moonGrad;
        ctx.beginPath();
        ctx.arc(currentMoonX, currentMoonY, R, 0, Math.PI * 2);
        ctx.fill();

        // Brilho azulado suave na borda escura da lua (earthshine cósmico)
        const limbGrad = ctx.createRadialGradient(
          currentMoonX + R * 0.8, currentMoonY - R * 0.8, 0,
          currentMoonX, currentMoonY, R * 1.04
        );
        limbGrad.addColorStop(0.8, 'rgba(183,109,255,0)');
        limbGrad.addColorStop(0.96, 'rgba(183,109,255,0.15)');
        limbGrad.addColorStop(1,   'rgba(183,109,255,0)');
        ctx.fillStyle = limbGrad;
        ctx.beginPath();
        ctx.arc(currentMoonX, currentMoonY, R * 1.04, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Flash do Anel de Diamante exatamente na Totalidade (3200ms)
      if (elapsed >= T_TOTALITY - 60 && elapsed <= T_TOTALITY + 400) {
        const diamondProgress = clamp((elapsed - (T_TOTALITY - 60)) / 460);
        const flashIntensity  = Math.sin(diamondProgress * Math.PI);
        const diamondGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 2.8);
        diamondGrad.addColorStop(0,   `rgba(255,255,250,${0.9 * flashIntensity})`);
        diamondGrad.addColorStop(0.2, `rgba(255,230,170,${0.5 * flashIntensity})`);
        diamondGrad.addColorStop(0.6, `rgba(183,109,255,${0.2 * flashIntensity})`);
        diamondGrad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = diamondGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gatilho único para sincronizar o acender da aura estilizada na totalidade
      if (elapsed >= T_TOTALITY && !hasTriggeredTotality) {
        hasTriggeredTotality = true;
        setTotalityReached(true);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Cronograma de Estados & Transições ────────────────────────────────── */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, action: () => void) => {
      timers.push(setTimeout(action, ms));
    };

    // 1. Tipografia e barra de carregamento surgem
    schedule(T_TEXT_IN, () => setTextVisible(true));

    // 2. Prepara voo: anéis e texto recolhem suavemente
    schedule(T_PREPARE_FLY, () => setReceding(true));

    // 3. O eclipse voa em direção ao botão da Hero
    schedule(T_FLY_START, () => {
      setFadeOutCanvas(true);
      const targetElement = document.getElementById('hero-eclipse');
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setEclipsePos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
      setFlying(true);
    });

    // 4. Chegada no botão e integração com a Hero
    schedule(T_ARRIVE, () => {
      if (onEclipseArrive) onEclipseArrive();
      setArrived(true);
    });

    // 5. Conclusão e desmontagem da SplashScreen
    schedule(T_UNMOUNT, onComplete);

    return () => timers.forEach(clearTimeout);
  }, [onComplete, onEclipseArrive]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: arrived ? 'none' : 'all',
      }}
    >
      {/* ── Canvas do Eclipse Cósmico Realista ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          opacity: fadeOutCanvas ? 0 : 1,
          transition: fadeOutCanvas ? 'opacity 0.8s ease' : undefined,
        }}
      />

      {/* ── Eclipse Estilizado com Aura Cósmica (Commit dff7afe) ── */}
      {/* Posicionado exatamente no centro do eclipse do canvas e voa até o botão */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          transform: `translate(${eclipsePos.x}px, ${eclipsePos.y}px) translate(-50%, -50%)`,
          transition: flying ? 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)' : undefined,
          opacity: totalityReached ? (arrived ? 0 : 1) : 0,
          pointerEvents: 'none',
          ...(arrived ? { transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease 0.4s' } : {}),
        }}
      >
        <div
          className="eclipse-wrapper"
          style={{
            transform: totalityReached ? 'scale(1)' : 'scale(0.95)',
            transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {/* Anéis orbitais giratórios (aparecem na totalidade e recolhem antes do voo) */}
          <div
            className="eclipse-ring eclipse-ring-outer"
            style={{
              opacity: totalityReached && !recedingBeforeFly ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
          <div
            className="eclipse-ring eclipse-ring-mid"
            style={{
              opacity: totalityReached && !recedingBeforeFly ? 1 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          />
          <div
            className="eclipse-ring eclipse-ring-inner"
            style={{
              opacity: totalityReached && !recedingBeforeFly ? 1 : 0,
              transition: 'opacity 0.6s ease 0.3s',
            }}
          />

          {/* O Aura Conic radiante — acende no momento exato do eclipse total */}
          <div
            style={{
              position: 'absolute',
              inset: -14,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #ddb7ff, #ffc640, #7bd0ff, #ddb7ff)',
              filter: 'blur(14px)',
              opacity: totalityReached && !recedingBeforeFly ? 0.75 : 0,
              animation: totalityReached ? 'rotateClockwise 8s linear infinite' : undefined,
              transition: 'opacity 0.8s ease',
            }}
          />

          {/* Núcleo de obsidiana com a Lua e a inscrição ECLIPSA */}
          <div
            className="eclipse-core"
            style={{
              boxShadow: totalityReached
                ? '0 0 60px rgba(183, 109, 255, 0.65), 0 0 100px rgba(183, 109, 255, 0.35), inset 0 0 32px rgba(255, 198, 64, 0.5)'
                : undefined,
              transition: 'box-shadow 0.6s ease',
            }}
          >
            <div className="eclipse-corona" />
            <div className="eclipse-sun-crescent" />
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#0c0717',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(183, 109, 255, 0.35)',
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ddb7ff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 8px #ddb7ff)',
                  opacity: totalityReached ? 1 : 0,
                  transition: 'opacity 0.5s ease 0.2s',
                }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.62rem',
                  color: '#ffc640',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  marginTop: 4,
                  opacity: totalityReached ? 1 : 0,
                  transition: 'opacity 0.5s ease 0.3s',
                }}
              >
                ECLIPSA
              </span>
            </div>
          </div>

          {/* Sparks astrais flutuantes ✦ ✧ */}
          {[
            { pos: { top: '10%', left: '80%' }, animDelay: '0s' },
            { pos: { bottom: '15%', left: '15%' }, animDelay: '1.2s' },
            { pos: { top: '65%', right: '10%' }, animDelay: '2.4s' },
          ].map(({ pos, animDelay }, i) => (
            <div
              key={i}
              className="eclipse-spark"
              style={{
                ...pos,
                animationDelay: animDelay,
                opacity: totalityReached && !recedingBeforeFly ? 1 : 0,
                transition: `opacity 0.5s ease ${0.2 + i * 0.15}s`,
              }}
            >
              {i % 2 === 0 ? '✦' : '✧'}
            </div>
          ))}
        </div>
      </div>

      {/* ── Tipografia e Barra de Carregamento ── */}
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
          opacity: textVisible && !recedingBeforeFly ? 1 : 0,
          transform: textVisible && !recedingBeforeFly ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
            background: 'linear-gradient(90deg, #ddb7ff 0%, #7bd0ff 50%, #ffc640 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ECLiPSA
        </h1>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(207,194,214,0.75)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          3D Cosmic Modeler &amp; Worldbuilder
        </p>

        {/* Linha de progresso cósmica */}
        <div
          style={{
            width: 180,
            height: 2,
            background: 'rgba(183,109,255,0.15)',
            borderRadius: 9999,
            overflow: 'hidden',
            marginTop: '0.75rem',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ddb7ff, #7bd0ff, #ffc640)',
              borderRadius: 9999,
              width: textVisible ? '100%' : '0%',
              transition: textVisible ? 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};
