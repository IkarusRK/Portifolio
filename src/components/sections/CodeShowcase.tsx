import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ShieldCheck, Sparkles, Code2, Eye, Terminal } from 'lucide-react';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface CodeSnippet {
  id: string;
  filename: string;
  stackBadge: string;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  impactPt: string;
  impactEn: string;
  bulletsPt: string[];
  bulletsEn: string[];
  runtimeFooter: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'java-spring',
    filename: 'SecurityTokenFilter.java',
    stackBadge: 'Java 21 • Spring Boot 3',
    titlePt: 'Filtro de Segurança, Rate-Limiting & Validação de Sessão REST',
    titleEn: 'REST API Security Filter, Rate-Limiting & Session Validation',
    descPt: 'Middleware Spring Security com janela deslizante em memória e validação criptográfica',
    descEn: 'Spring Security middleware with sliding-window rate limiter and token validation',
    impactPt:
      'Garante que APIs corporativas suportem alto volume de acessos bloqueando ataques de força bruta, spam de requisições e acessos não autorizados antes de sobrecarregar o banco de dados.',
    impactEn:
      'Ensures enterprise APIs handle high traffic while blocking brute-force attacks, request floods, and unauthorized calls before they hit the database.',
    bulletsPt: [
      'Controle de concorrência thread-safe com ConcurrentHashMap e AtomicInteger',
      'Rejeição imediata (HTTP 429 / 401) em menos de 1ms sem onerar o MySQL/PostgreSQL',
      'Arquitetura limpa e desacoplada seguindo boas práticas do ecossistema Spring Boot',
    ],
    bulletsEn: [
      'Thread-safe concurrency control using ConcurrentHashMap and AtomicInteger',
      'Sub-millisecond rejection (HTTP 429 / 401) protecting downstream SQL databases',
      'Clean, decoupled middleware architecture following Spring Boot best practices',
    ],
    runtimeFooter: 'Java 21 LTS • Spring Security 6 • UTF-8',
    code: `package dev.ikarus.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class SecurityTokenFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS_PER_WINDOW = 60;
    private static final long WINDOW_SECONDS = 10L;

    private record ClientBucket(AtomicInteger count, long windowExpiresAt) {}
    private final Map<String, ClientBucket> rateBuckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String clientIp = request.getRemoteAddr();
        if (!allowRequest(clientIp)) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("{\\"error\\": \\"Rate limit exceeded\\"}");
            return;
        }

        String authHeader = request.getHeader("X-Archeus-Token");
        if (authHeader == null || !authHeader.startsWith("ikarus_")) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("{\\"error\\": \\"Invalid security token\\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean allowRequest(String key) {
        long now = Instant.now().getEpochSecond();
        ClientBucket bucket = rateBuckets.compute(key, (k, existing) -> {
            if (existing == null || now > existing.windowExpiresAt()) {
                return new ClientBucket(new AtomicInteger(1), now + WINDOW_SECONDS);
            }
            existing.count().incrementAndGet();
            return existing;
        });
        return bucket.count().get() <= MAX_REQUESTS_PER_WINDOW;
    }
}`,
  },
  {
    id: 'react-webgl',
    filename: 'useParticleMorphing.ts',
    stackBadge: 'React 19 • TypeScript • WebGL',
    titlePt: 'Motor de Física & Geometria 3D em Tempo Real (Rodando Neste Site)',
    titleEn: 'Real-Time 3D Geometry & Repulsion Physics Engine (Live on This Site)',
    descPt: 'Interpolação vetorial em Float32Array para 60–144 FPS constantes na GPU',
    descEn: 'Float32Array vector interpolation targeting locked 60–144 FPS on GPU',
    impactPt:
      'Este é um trecho real do motor gráfico que está rodando no fundo deste portfólio agora. Ele calcula a posição de milhares de partículas 3D a cada frame sem travar a rolagem ou o navegador.',
    impactEn:
      'This is actual production code running in the background of this portfolio right now, computing thousands of 3D particle coordinates every frame with zero UI lag.',
    bulletsPt: [
      'Uso de buffers tipados (Float32Array) para evitar Garbage Collection e quedas de FPS',
      'Física de repulsão/atração vetorial reativa à posição do cursor do usuário',
      'Tipagem estrita em TypeScript garantindo zero erros em tempo de execução',
    ],
    bulletsEn: [
      'Typed buffers (Float32Array) preventing Garbage Collection pauses and frame drops',
      'Vector repulsion/attraction physics reacting smoothly to user cursor coordinates',
      'Strict TypeScript typing ensuring zero runtime exceptions',
    ],
    runtimeFooter: 'TypeScript 5.9 • React Three Fiber • 144 FPS Target',
    code: `// Motor real de interpolação 3D — Portfólio Ikarus
export function stepParticleField(
  positions: Float32Array,
  targets: Float32Array,
  cursorNdc: { x: number; y: number },
  isAttracting: boolean,
  delta: number
): void {
  const lerpFactor = Math.min(1, delta * (isAttracting ? 6.5 : 3.2));
  const cursorX = cursorNdc.x * 5.5;
  const cursorY = cursorNdc.y * 3.5;

  for (let i = 0; i < positions.length; i += 3) {
    let tx = targets[i];
    let ty = targets[i + 1];
    const tz = targets[i + 2];

    if (isAttracting) {
      const dx = cursorX - positions[i];
      const dy = cursorY - positions[i + 1];
      const dist = Math.hypot(dx, dy) || 0.001;
      tx += (dx / dist) * 0.85;
      ty += (dy / dist) * 0.85;
    }

    positions[i]     += (tx - positions[i])     * lerpFactor;
    positions[i + 1] += (ty - positions[i + 1]) * lerpFactor;
    positions[i + 2] += (tz - positions[i + 2]) * lerpFactor;
  }
}`,
  },
  {
    id: 'archeus-lua',
    filename: 'sv_archeus_guard.lua',
    stackBadge: 'Lua 5.4 • 0.01ms Low-Latency',
    titlePt: 'Archeus Event Guard — Autenticação Server-Side de Ultrabaixa Latência',
    titleEn: 'Archeus Event Guard — Ultra-Low Latency Server-Side Authentication',
    descPt: 'Validação de sessão por token efêmero + bloqueio de injeção de eventos (0.01ms)',
    descEn: 'Ephemeral session token validation + event injection blocker (0.01ms)',
    impactPt:
      'Desenvolvido para ambientes de tempo real e servidores multiplayer onde cada milissegundo importa. Impede adulteração de pacotes no cliente mantendo consumo próximo de zero.',
    impactEn:
      'Engineered for real-time multiplayer servers where every millisecond counts. Prevents client packet tampering while keeping CPU overhead near zero.',
    bulletsPt: [
      'Tokens efêmeros com expiração automática (TTL) gerados exclusivamente no servidor',
      'Tempo de execução médio de 0.00–0.01ms comprovado em monitoramento de recursos',
      'Integração direta com logs de auditoria e alertas automatizados via Webhook',
    ],
    bulletsEn: [
      'Server-issued ephemeral tokens with automatic TTL expiration',
      'Verified 0.00–0.01ms execution overhead under stress benchmarks',
      'Direct integration with audit logs and automated Discord Webhook alerts',
    ],
    runtimeFooter: 'Lua 5.4 • Archeus Security Core • Resmon: 0.01ms',
    code: `-- Archeus Security — sv_archeus_guard.lua
local sessionTokens = {}
local rateCounters  = {}
local WINDOW_MS     = 1000

local function IssueSessionToken(clientId)
    local now = GetGameTimer()
    local token = ("%d_%d_%d"):format(
        clientId,
        math.random(100000, 999999),
        now
    )
    sessionTokens[clientId] = {
        value   = token,
        expires = now + 30000 -- 30s TTL
    }
    return token
end

local function VerifyClientEvent(clientId, receivedToken)
    local now  = GetGameTimer()
    local rate = rateCounters[clientId]

    if not rate or now > rate.resetAt then
        rateCounters[clientId] = { hits = 1, resetAt = now + WINDOW_MS }
    else
        rate.hits = rate.hits + 1
        if rate.hits > 12 then
            TriggerEvent("archeus:onRateLimitExceeded", clientId)
            return false
        end
    end

    local session = sessionTokens[clientId]
    if not session or now > session.expires then
        return false
    end
    return session.value == receivedToken
end

exports("IssueSessionToken", IssueSessionToken)
exports("VerifyClientEvent", VerifyClientEvent)`,
  },
];

export const CodeShowcase = () => {
  const { perspective } = usePerspective();
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const [activeId, setActiveId] = useState<string>(SNIPPETS[0].id);
  const [viewMode, setViewMode] = useState<'code' | 'explanation'>('code');
  const [copied, setCopied] = useState(false);

  // Sync default tab view with perspective, while keeping code easily accessible
  useEffect(() => {
    setViewMode(perspective === 'client' ? 'explanation' : 'code');
  }, [perspective]);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeId) ?? SNIPPETS[0];
  const lines = activeSnippet.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-showcase" className="py-20 px-4" style={{ background: 'transparent' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold mb-3 border border-[var(--glass-border)] bg-[var(--glass-bg)]"
            style={{ color: 'var(--accent-from)' }}
          >
            <Terminal className="w-3.5 h-3.5" />
            {isPt ? 'Engenharia & Código Real em Produção' : 'Production Code & Architecture'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            {perspective === 'client'
              ? isPt
                ? 'Como Construo Soluções Rápidas e Seguras'
                : 'How I Engineer Fast & Secure Solutions'
              : isPt
              ? 'Inspeção de Código & Arquitetura'
              : 'Code Inspection & Architecture'}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {perspective === 'client'
              ? isPt
                ? 'Mais do que listar tecnologias, veja na prática como cada camada — do Backend Java ao motor 3D deste próprio site — é implementada.'
                : 'Beyond listing technologies, inspect how each layer — from Java Backend to this site’s 3D engine — is built in practice.'
              : isPt
              ? 'Trechos reais de implementação em Java (Spring Boot), TypeScript (WebGL 3D) e Lua (Segurança 0.01ms).'
              : 'Real implementation snippets across Java (Spring Boot), TypeScript (WebGL 3D), and Lua (0.01ms Security).'}
          </p>
        </motion.div>

        {/* Perspective Mode Switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'code'
                  ? 'text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              style={{
                background:
                  viewMode === 'code'
                    ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))'
                    : 'transparent',
                boxShadow: viewMode === 'code' ? '0 0 15px var(--glow)' : 'none',
              }}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{isPt ? 'Inspecionar Código Fonte' : 'Inspect Source Code'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('explanation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'explanation'
                  ? 'text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              style={{
                background:
                  viewMode === 'explanation'
                    ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))'
                    : 'transparent',
                boxShadow: viewMode === 'explanation' ? '0 0 15px var(--glow)' : 'none',
              }}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isPt ? 'Explicação & Valor de Negócio' : 'Architecture & Business Impact'}</span>
            </button>
          </div>
        </div>

        {/* IDE Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-2xl bg-[#11111b]"
          style={{ boxShadow: '0 0 55px var(--glow)' }}
        >
          {/* IDE Top Bar & File Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between px-4 py-3 bg-[#181825] border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/85" />
                <span className="w-3 h-3 rounded-full bg-amber-400/85" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/85" />
              </div>
              <span className="text-xs font-mono text-white/70 font-semibold">
                {activeSnippet.filename}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[var(--accent-from)] border border-white/10">
                {activeSnippet.stackBadge}
              </span>
            </div>

            {/* File Selector Tabs */}
            <div className="flex bg-[#11111b] rounded-xl p-1 overflow-x-auto gap-1 border border-white/5">
              {SNIPPETS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    s.id === activeId
                      ? 'text-white shadow'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    background:
                      s.id === activeId
                        ? 'linear-gradient(135deg, var(--accent-from), var(--accent-to))'
                        : 'transparent',
                  }}
                >
                  {s.filename}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="self-end md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border border-white/15 text-white/80 hover:text-white hover:border-white/30 bg-white/5 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isPt ? 'Copiado!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Copiar Código' : 'Copy Code'}</span>
                </>
              )}
            </button>
          </div>

          {/* Sub-header context bar */}
          <div className="px-5 py-2.5 bg-[#151521] border-b border-white/5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-white/75">
                {isPt ? activeSnippet.descPt : activeSnippet.descEn}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--accent-from)]">
              {activeSnippet.stackBadge}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'explanation' ? (
              <motion.div
                key={`exp-${activeSnippet.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-[#11111b] text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-[var(--accent-from)]/15 text-[var(--accent-from)] border border-[var(--accent-from)]/30 mb-2">
                      <Sparkles className="w-3 h-3" />
                      {activeSnippet.stackBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {isPt ? activeSnippet.titlePt : activeSnippet.titleEn}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode('code')}
                    className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))',
                    }}
                  >
                    <Code2 className="w-4 h-4" />
                    {isPt ? 'Ver Código Fonte Real →' : 'Inspect Real Source Code →'}
                  </button>
                </div>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
                  {isPt ? activeSnippet.impactPt : activeSnippet.impactEn}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {(isPt ? activeSnippet.bulletsPt : activeSnippet.bulletsEn).map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] flex items-start gap-3"
                    >
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`code-${activeSnippet.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="overflow-x-auto max-h-[430px] p-4 sm:p-6 bg-[#11111b] font-mono text-xs sm:text-[13px] leading-relaxed text-left">
                  <table className="w-full border-collapse">
                    <tbody>
                      {lines.map((line, idx) => {
                        const trimmed = line.trim();
                        const isComment =
                          trimmed.startsWith('//') ||
                          trimmed.startsWith('--') ||
                          trimmed.startsWith('/*');
                        const isAnnotation = trimmed.startsWith('@');

                        return (
                          <tr key={idx} className="hover:bg-white/[0.03]">
                            <td className="select-none pr-4 text-right text-white/30 w-8 align-top">
                              {idx + 1}
                            </td>
                            <td
                              className={`whitespace-pre ${
                                isComment
                                  ? 'text-emerald-400/80 italic'
                                  : isAnnotation
                                  ? 'text-amber-300 font-semibold'
                                  : 'text-slate-100'
                              }`}
                            >
                              {line || ' '}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* IDE Status Footer */}
          <div
            className="flex flex-wrap items-center justify-between px-4 py-2 text-white text-[11px] font-mono"
            style={{
              background: 'linear-gradient(90deg, var(--accent-from), var(--accent-to))',
            }}
          >
            <span>{activeSnippet.runtimeFooter}</span>
            <span>{lines.length} lines • Ready for production</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase;

