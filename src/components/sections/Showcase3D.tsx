import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaServer, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';
import { Interactive3DShowcase } from '../three/Interactive3DShowcase';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

const RESMON_RESOURCES = [
  {
    name: 'eclipsa_engine_3d',
    type: 'Unreal Engine / WebGL 3D',
    clientType: 'Mundo Cósmico 3D & Shaders',
    ms: '0.01 ms',
    mem: '3.1 MB',
    status: 'Otimizado',
  },
  {
    name: 'sylver_core',
    type: 'Framework / Core Engine',
    clientType: 'Núcleo Central & Sincronização',
    ms: '0.01 ms',
    mem: '2.1 MB',
    status: 'Otimizado',
  },
  {
    name: 'sylver_inventory_nui',
    type: 'React NUI + Drag & Drop',
    clientType: 'Telas & Inventário dos Jogadores',
    ms: '0.01 ms',
    mem: '3.4 MB',
    status: 'Otimizado',
  },
  {
    name: 'archeus_security_guard',
    type: 'Event Token / Anti-Cheat',
    clientType: 'Escudo Protetor & Anti-Invasão',
    ms: '0.00 ms',
    mem: '1.2 MB',
    status: 'Protegido',
  },
];

export const Showcase3D = () => {
  const { perspective } = usePerspective();
  const { t } = useLanguage();
  const [benchmarking, setBenchmarking] = useState(false);
  const [benchmarkScore, setBenchmarkScore] = useState<number | null>(null);
  const [fps, setFps] = useState(144);
  const [tickRate, setTickRate] = useState(128);

  const runBenchmark = () => {
    setBenchmarking(true);
    setBenchmarkScore(null);
    let counter = 0;
    const interval = setInterval(() => {
      setFps(Math.floor(140 + Math.random() * 8));
      setTickRate(Math.floor(125 + Math.random() * 6));
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setBenchmarking(false);
        setFps(144);
        setTickRate(128);
        setBenchmarkScore(99.8);
      }
    }, 90);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!benchmarking) {
        setFps((f) => Math.min(144, Math.max(140, f + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [benchmarking]);

  return (
    <section id="showcase3d" className="py-20 px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--accent-from)]">
            <FaBolt className="w-3 h-3" />
            {perspective === 'client' ? t.showcase3d.badgeClient : t.showcase3d.badgeDev}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {t.showcase3d.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client' ? t.showcase3d.descClient : t.showcase3d.descDev}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive 3D Model Canvas (left/top) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Interactive3DShowcase />
          </motion.div>

          {/* Performance & Benchmark Dashboard (right/bottom) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* FPS and Tickrate live cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex flex-col"
                style={{ boxShadow: '0 0 20px var(--glow)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    {t.showcase3d.fpsLabel}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-[var(--text-primary)]">
                  {fps}
                  <span className="text-sm font-normal text-[var(--text-secondary)] ml-1">fps</span>
                </div>
              </div>

              <div
                className="p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex flex-col"
                style={{ boxShadow: '0 0 20px var(--glow)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    {t.showcase3d.tickLabel}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="text-3xl font-mono font-extrabold text-[var(--text-primary)]">
                  {tickRate}
                  <span className="text-sm font-normal text-[var(--text-secondary)] ml-1">hz</span>
                </div>
              </div>
            </div>

            {/* Benchmark action card */}
            <div
              className="p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaServer className="text-[var(--accent-from)]" />
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    {perspective === 'client' ? 'Teste de Estresse' : 'Resmon Benchmark'}
                  </span>
                </div>
                {benchmarkScore && (
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t.showcase3d.scoreLabel}: {benchmarkScore}%
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={runBenchmark}
                disabled={benchmarking}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                  boxShadow: '0 0 20px var(--glow)',
                }}
              >
                <FaSyncAlt className={`w-3.5 h-3.5 ${benchmarking ? 'animate-spin' : ''}`} />
                {benchmarking ? t.showcase3d.benchmarkingText : t.showcase3d.btnBenchmark}
              </button>
            </div>

            {/* Resmon Resource Table */}
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md overflow-hidden text-xs">
              <div className="px-4 py-3 border-b border-[var(--glass-border)] bg-black/20 flex items-center justify-between">
                <span className="font-mono font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-400" />
                  {perspective === 'client' ? 'Monitor de Recursos Ativos' : 'CFX Diagnostic Metrics'}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-secondary)]">0.01ms avg</span>
              </div>
              <div className="divide-y divide-[var(--glass-border)]">
                {RESMON_RESOURCES.map((res) => (
                  <div key={res.name} className="px-4 py-2.5 flex items-center justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono font-bold text-[var(--text-primary)] truncate">
                        {res.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)] truncate">
                        {perspective === 'client' ? res.clientType : res.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-emerald-400 font-bold">{res.ms}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Showcase3D;
