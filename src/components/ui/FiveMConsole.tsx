import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { usePerspective } from '../../contexts/PerspectiveContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { THEME_IDS } from '../../data/themes';
import type { ThemeId, Language, Perspective } from '../../types';

interface ConsoleLog {
  id: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'command';
  text: string;
  timestamp: string;
}

export const FiveMConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      id: '1',
      type: 'info',
      text: 'Terminal Interativo do Desenvolvedor [v2.0.0 - Daniel Reis]',
      timestamp: '00:00:01',
    },
    {
      id: '2',
      type: 'success',
      text: 'Conectado ao ambiente de desenvolvimento de Daniel Reis.',
      timestamp: '00:00:02',
    },
    {
      id: '3',
      type: 'warn',
      text: "Pressione 'F8' ou digite 'exit' para fechar. Digite 'help' para ver comandos.",
      timestamp: '00:00:03',
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const { theme, setTheme, mode, toggleMode } = useTheme();
  const { perspective, setPerspective } = usePerspective();
  const { language, setLanguage, t } = useLanguage();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for F8 key
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (e.key === 'F8' || (e.key === "'" && !isInput && !isOpen)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, logs]);

  const addLog = (type: ConsoleLog['type'], text: string) => {
    const now = new Date();
    const ts = now.toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { id: Math.random().toString(), type, text, timestamp: ts }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLog('command', `> ${trimmed}`);
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    switch (command) {
      case 'help':
        addLog('info', '--- Comandos Disponíveis ---');
        addLog('info', '  help                  - Exibe esta lista');
        addLog('info', '  theme <nome>          - Altera tema (purple, cyberpunk, ocean, sunset, rosegold)');
        addLog('info', '  lang <código>         - Altera idioma (pt, en, es, ja, zh, ko, ru)');
        addLog('info', '  mode <client|dev>     - Altera perspectiva');
        addLog('info', '  dark / light          - Alterna modo claro/escuro');
        addLog('info', '  clear / cls           - Limpa logs do console');
        addLog('info', '  resmon                - Executa diagnóstico rápido');
        addLog('info', '  exit                  - Fecha o console');
        break;

      case 'theme':
        if (!arg) {
          addLog('warn', `Tema atual: '${theme}'. Disponíveis: ${THEME_IDS.join(', ')}`);
        } else if (THEME_IDS.includes(arg as ThemeId)) {
          setTheme(arg as ThemeId);
          addLog('success', `Tema alterado para: '${arg}'`);
        } else {
          addLog('error', `Tema desconhecido '${arg}'. Escolha: ${THEME_IDS.join(', ')}`);
        }
        break;

      case 'lang':
        if (!arg) {
          addLog('warn', `Idioma atual: '${language}'. Disponíveis: pt, en, es, ja, zh, ko, ru`);
        } else if (['pt', 'en', 'es', 'ja', 'zh', 'ko', 'ru'].includes(arg)) {
          setLanguage(arg as Language);
          addLog('success', `Idioma alterado para: '${arg.toUpperCase()}'`);
        } else {
          addLog('error', `Código inválido. Escolha: pt, en, es, ja, zh, ko, ru`);
        }
        break;

      case 'mode':
      case 'perspective':
        if (arg === 'client' || arg === 'dev') {
          setPerspective(arg as Perspective);
          addLog('success', `Perspectiva alterada para '${arg}'`);
        } else {
          addLog('warn', `Perspectiva atual: '${perspective}'. Digite 'mode client' ou 'mode dev'`);
        }
        break;

      case 'dark':
        if (mode !== 'dark') toggleMode();
        addLog('success', 'Modo escuro ativado.');
        break;

      case 'light':
        if (mode !== 'light') toggleMode();
        addLog('success', 'Modo claro ativado.');
        break;

      case 'resmon':
        addLog('info', '[RESMON DIAGNOSTIC]');
        addLog('success', '  eclipsa_engine_3d: 0.01ms | 3.1MB');
        addLog('success', '  ikarus_core:       0.01ms | 2.1MB');
        addLog('success', '  archeus_guard:     0.00ms | 1.2MB');
        addLog('info', 'Status: 100% Otimizado (0.01ms total)');
        break;

      case 'clear':
      case 'cls':
        setLogs([]);
        break;

      case 'exit':
        setIsOpen(false);
        break;

      default:
        addLog('error', `Comando desconhecido: '${command}'. Digite 'help' para a lista de comandos.`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Floating Shortcut Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 z-40 p-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--accent-from)]/80 text-[var(--text-primary)] shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 select-none group"
        title="Abrir Terminal F8"
        aria-label="Abrir Terminal"
      >
        <Terminal className="w-4 h-4 text-[var(--accent-from)] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-mono font-bold hidden sm:inline">
          {t.console.buttonLabel}
        </span>
      </button>

      {/* Console Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[580px] max-h-[80vh] h-[480px] z-[90] rounded-3xl border border-[var(--glass-border)] bg-black/90 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden font-mono"
            style={{
              boxShadow: '0 0 40px var(--glow)',
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wider">
                  {t.console.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Logs Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs select-text">
              {logs.map((log) => {
                const colors = {
                  info: 'text-neutral-300',
                  success: 'text-emerald-400 font-semibold',
                  warn: 'text-amber-400',
                  error: 'text-rose-400 font-semibold',
                  command: 'text-cyan-400 font-bold',
                };
                return (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-neutral-500 text-[10px] select-none pt-0.5">
                      [{log.timestamp}]
                    </span>
                    <span className={colors[log.type]}>{log.text}</span>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2">
              <span className="text-[var(--accent-from)] font-bold">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.console.inputPlaceholder}
                className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-neutral-600 font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  handleCommand(input);
                  setInput('');
                }}
                className="p-1.5 rounded-lg bg-[var(--accent-from)] text-white hover:opacity-90 transition-opacity cursor-pointer"
                title="Executar"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FiveMConsole;
