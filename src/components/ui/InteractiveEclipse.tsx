import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../../utils/audioSynth';
import { Moon } from 'lucide-react';

interface InteractiveEclipseProps {
  onTap?: () => void;
}

export const InteractiveEclipse: React.FC<InteractiveEclipseProps> = ({ onTap }) => {
  const [isSupernova, setIsSupernova] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    cosmicAudio.playEclipsePulse();
    setIsSupernova(true);
    setTimeout(() => setIsSupernova(false), 900);

    // Trigger subtle starry sparkles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#ddb7ff', '#ffc640', '#7bd0ff', '#ffffff'],
      shapes: ['star', 'circle'],
      scalar: 0.8,
      ticks: 120,
      disableForReducedMotion: true,
    });

    if (onTap) onTap();
  };

  return (
    <div
      className="eclipse-wrapper"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Toque no Eclipse Cósmico para canalizar energia astral"
      style={{
        transform: isSupernova ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {/* Outer Dashed Orbit Ring */}
      <div className="eclipse-ring eclipse-ring-outer" />

      {/* Mid Gold Relic Orbit Ring */}
      <div className="eclipse-ring eclipse-ring-mid" />

      {/* Inner Cyan Starlight Orbit Ring */}
      <div className="eclipse-ring eclipse-ring-inner" />

      {/* Orbiting Sparks */}
      <div
        className="eclipse-spark"
        style={{ top: '10%', left: '80%' }}
      >
        ✦
      </div>
      <div
        className="eclipse-spark"
        style={{ bottom: '15%', left: '15%', animationDelay: '1.2s' }}
      >
        ✧
      </div>
      <div
        className="eclipse-spark"
        style={{ top: '65%', right: '10%', animationDelay: '2.4s' }}
      >
        ✦
      </div>

      {/* Central Eclipse Body */}
      <div
        className="eclipse-core"
        style={{
          boxShadow: isSupernova
            ? '0 0 100px #ddb7ff, 0 0 160px #ffc640, inset 0 0 40px #ffc640'
            : undefined,
        }}
      >
        {/* Swirling Corona */}
        <div className="eclipse-corona" />

        {/* Crescent Flare */}
        <div className="eclipse-sun-crescent" />

        {/* Central Obsidian Core */}
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
            border: '2px solid rgba(183, 109, 255, 0.3)',
          }}
        >
          <Moon size={34} style={{ color: 'var(--color-primary)', filter: 'drop-shadow(0 0 8px #ddb7ff)' }} />
          <span
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              color: 'var(--color-secondary)',
              letterSpacing: '0.12em',
              marginTop: '4px',
              fontWeight: 600,
            }}
          >
            ECLIPSA
          </span>
        </div>
      </div>
    </div>
  );
};
