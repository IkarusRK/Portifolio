import React, { useState } from 'react';
import { cosmicAudio } from '../../utils/audioSynth';
import { useLanguage, type LanguageInfo } from '../../i18n/LanguageContext';
import type { Language } from '../../i18n/translations';
import {
  Volume2,
  VolumeX,
  Palette,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Globe,
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
  const { language, setLanguage, t, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const navLinks = [
    { label: t.nav.works, href: '#galeria-3d' },
    { label: t.nav.inspector, href: '#viewport-3d-section' },
    { label: t.nav.environments, href: '#mapas-cenarios' },
    { label: t.nav.characters, href: '#personagens' },
    { label: t.nav.pipeline, href: '#processo-3d' },
    { label: t.nav.commissions, href: '#comissoes' },
    { label: t.nav.about, href: '#sobre-a-artista' },
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

  const handleLanguageSelect = (langCode: Language) => {
    cosmicAudio.playModeSwitch();
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        backgroundColor: 'rgba(12, 7, 23, 0.88)',
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
            src="./assets/eclipsa-logo.png"
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                opacity: 0.85,
                marginTop: '3px',
              }}
            >
              {t.nav.subrole}
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
            @media (min-width: 1080px) {
              .desktop-nav {
                display: flex !important;
                align-items: center;
                gap: 1.1rem;
                flex-wrap: nowrap;
              }
            }
          `}</style>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontSize: '0.86rem',
                color: 'var(--color-on-surface-variant)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-on-surface-variant)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Controls (Language, Theme, Audio, CTA) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                cosmicAudio.playClick();
                setLangDropdownOpen((prev) => !prev);
                setThemeDropdownOpen(false);
              }}
              className="btn-ghost"
              style={{
                padding: '0.45rem 0.65rem',
                gap: '0.35rem',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.8rem',
              }}
              title={t.nav.languageTooltip}
            >
              <Globe size={15} style={{ color: 'var(--color-secondary)' }} />
              <span style={{ fontSize: '0.85rem' }}>{currentLang.flag}</span>
              <span style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>{currentLang.short}</span>
              <ChevronDown size={11} style={{ opacity: 0.7 }} />
            </button>

            {langDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '180px',
                  padding: '0.45rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  zIndex: 60,
                  boxShadow: '0 12px 35px rgba(0,0,0,0.85)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(183, 109, 255, 0.3)',
                  backgroundColor: 'rgba(18, 10, 34, 0.96)',
                }}
              >
                {languages.map((l: LanguageInfo) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageSelect(l.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.5rem 0.65rem',
                      background: language === l.code ? 'rgba(183, 109, 255, 0.18)' : 'transparent',
                      border: language === l.code ? '1px solid rgba(183, 109, 255, 0.35)' : '1px solid transparent',
                      borderRadius: '0.45rem',
                      color: 'var(--color-on-surface)',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.15s ease',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{l.flag}</span>
                    <span style={{ fontWeight: language === l.code ? 700 : 500, flex: 1 }}>{l.name}</span>
                    {language === l.code && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                cosmicAudio.playClick();
                setThemeDropdownOpen((prev) => !prev);
                setLangDropdownOpen(false);
              }}
              className="btn-ghost"
              style={{ padding: '0.45rem 0.65rem', gap: '0.35rem' }}
              title={t.nav.themeTooltip}
            >
              <Palette size={15} style={{ color: 'var(--color-primary)' }} />
              <ChevronDown size={11} style={{ opacity: 0.7 }} />
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
                  backgroundColor: 'rgba(18, 10, 34, 0.96)',
                }}
              >
                {themes.map((tItem) => (
                  <button
                    key={tItem.id}
                    onClick={() => handleThemeSelect(tItem.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.45rem 0.6rem',
                      background: currentTheme === tItem.id ? 'var(--color-surface-container-highest)' : 'transparent',
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
                        backgroundColor: tItem.color,
                        boxShadow: `0 0 6px ${tItem.color}`,
                      }}
                    />
                    <span>{tItem.name}</span>
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
            title={isMuted ? t.nav.audioMuted : t.nav.audioActive}
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
              padding: '0.55rem 1.05rem',
              fontSize: '0.83rem',
              display: 'none',
              textDecoration: 'none',
            }}
            id="nav-cta"
          >
            <style>{`
              @media (min-width: 600px) {
                #nav-cta { display: inline-flex !important; }
              }
            `}</style>
            <Sparkles size={14} />
            <span>{t.nav.commissionCta}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="btn-ghost"
            style={{ padding: '0.45rem', display: 'flex' }}
            id="mobile-btn"
          >
            <style>{`
              @media (min-width: 1080px) {
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
            gap: '0.85rem',
            zIndex: 49,
            backgroundColor: 'rgba(17, 10, 33, 0.98)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Mobile Language Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(183, 109, 255, 0.15)' }}>
            {languages.map((l: LanguageInfo) => (
              <button
                key={l.code}
                onClick={() => handleLanguageSelect(l.code)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.25rem',
                  borderRadius: '0.5rem',
                  backgroundColor: language === l.code ? 'rgba(183, 109, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: language === l.code ? '1px solid rgba(183, 109, 255, 0.4)' : '1px solid var(--glass-border)',
                  color: 'var(--color-on-surface)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  fontWeight: language === l.code ? 700 : 500,
                }}
              >
                <span>{l.flag}</span>
                <span>{l.short}</span>
              </button>
            ))}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{
                fontSize: '1rem',
                color: 'var(--color-on-surface)',
                textDecoration: 'none',
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(183, 109, 255, 0.08)',
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
            style={{ marginTop: '0.5rem', width: '100%', textDecoration: 'none' }}
          >
            <Sparkles size={16} />
            <span>{t.nav.commissionCta}</span>
          </a>
        </div>
      )}
    </header>
  );
};
