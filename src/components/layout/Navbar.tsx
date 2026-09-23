import React, { useState } from 'react';
import { cosmicAudio } from '../../utils/audioSynth';
import {
  Volume2,
  VolumeX,
  Palette,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  isMuted,
  onToggleMute,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Obras & Modelos', href: '#galeria-3d' },
    { label: 'Inspetor 3D', href: '#viewport-3d-section' },
    { label: 'Mapas & Cenários', href: '#mapas-cenarios' },
    { label: 'Personagens', href: '#personagens' },
    { label: 'Processo 3D', href: '#processo-3d' },
    { label: 'Comissões', href: '#comissoes' },
    { label: 'Sobre', href: '#sobre-a-artista' },
  ];

  const themes = [
    { id: 'eclipse', name: 'Eclipse Místico', color: '#ddb7ff' },
    { id: 'aurora', name: 'Aurora Astral', color: '#38ef7d' },
    { id: 'rose', name: 'Nebulosa Rosé', color: '#f472b6' },
    { id: 'solar', name: 'Coroa Solar', color: '#f59e0b' },
  ];

  const handleNavClick = () => {
    cosmicAudio.playClick();
    setMobileMenuOpen(false);
  };

  const handleThemeSelect = (themeId: string) => {
    cosmicAudio.playModeSwitch();
    onThemeChange(themeId);
    setThemeDropdownOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        backgroundColor: 'rgba(12, 7, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 50,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        className="container-custom"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={() => cosmicAudio.playClick()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <img
            src="/assets/eclipsa-logo.png"
            alt="Eclipsa 3D Logo"
            style={{
              height: '36px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '6px',
              filter: 'drop-shadow(0 0 10px rgba(183, 109, 255, 0.4))',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              className="font-display"
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1,
                color: 'var(--color-on-surface)',
              }}
            >
              ECLiPSA
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                opacity: 0.85,
                marginTop: '3px',
              }}
            >
              3D Game Artist • UE5
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
          }}
          className="desktop-nav"
        >
          <style>{`
            @media (min-width: 1100px) {
              .desktop-nav {
                display: flex !important;
                align-items: center;
                gap: 1.5rem;
              }
            }
          `}</style>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-surface-variant)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Controls (Theme, Audio, Status, CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Availability Pill */}
          <div
            className="badge-pill badge-secondary"
            style={{ display: 'none' }}
            id="status-badge"
          >
            <style>{`
              @media (min-width: 768px) {
                #status-badge { display: inline-flex !important; }
              }
            `}</style>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                boxShadow: '0 0 8px var(--color-secondary)',
              }}
            />
            <span>2 Vagas Abertas</span>
          </div>

          {/* Theme Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                cosmicAudio.playClick();
                setThemeDropdownOpen((prev) => !prev);
              }}
              className="btn-ghost"
              style={{ padding: '0.45rem 0.75rem', gap: '0.4rem' }}
              title="Trocar Tema Cósmico"
            >
              <Palette size={15} style={{ color: 'var(--color-primary)' }} />
              <ChevronDown size={12} />
            </button>

            {themeDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '180px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  zIndex: 60,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                }}
              >
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeSelect(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.45rem 0.6rem',
                      background: currentTheme === t.id ? 'var(--color-surface-container-highest)' : 'transparent',
                      border: 'none',
                      borderRadius: '0.35rem',
                      color: 'var(--color-on-surface)',
                      fontSize: '0.8rem',
                      fontFamily: 'JetBrains Mono',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: t.color,
                        boxShadow: `0 0 6px ${t.color}`,
                      }}
                    />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              cosmicAudio.playClick();
              onToggleMute();
            }}
            className="btn-ghost"
            style={{ padding: '0.45rem 0.65rem' }}
            title={isMuted ? 'Ativar Áudio Cósmico' : 'Desativar Áudio'}
          >
            {isMuted ? (
              <VolumeX size={16} style={{ color: 'var(--color-outline)' }} />
            ) : (
              <Volume2 size={16} style={{ color: 'var(--color-secondary)' }} />
            )}
          </button>

          {/* Fast Commission CTA */}
          <a
            href="#comissoes"
            onClick={() => cosmicAudio.playClick()}
            className="btn-primary"
            style={{
              padding: '0.55rem 1.1rem',
              fontSize: '0.85rem',
              display: 'none',
            }}
            id="nav-cta"
          >
            <style>{`
              @media (min-width: 600px) {
                #nav-cta { display: inline-flex !important; }
              }
            `}</style>
            <Sparkles size={14} />
            <span>Encomendar</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn-ghost"
            style={{ padding: '0.45rem', display: 'flex' }}
            id="mobile-btn"
          >
            <style>{`
              @media (min-width: 1100px) {
                #mobile-btn { display: none !important; }
              }
            `}</style>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            padding: '1.5rem',
            borderTop: 'none',
            borderRadius: '0 0 1rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 49,
            backgroundColor: 'rgba(17, 10, 33, 0.95)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontSize: '1rem',
                color: 'var(--color-on-surface)',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(183, 109, 255, 0.1)',
                fontFamily: 'Space Grotesk',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#comissoes"
            onClick={handleNavClick}
            className="btn-primary"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            <Sparkles size={16} />
            <span>Solicitar Orçamento / Encomenda</span>
          </a>
        </div>
      )}
    </header>
  );
};
