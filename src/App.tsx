import { useState, useEffect } from 'react';
import { StarfieldCanvas } from './components/three/StarfieldCanvas';
import { ModelViewer3D } from './components/three/ModelViewer3D';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { MetricsTicker } from './components/sections/MetricsTicker';
import { WorksGallery } from './components/sections/WorksGallery';
import { EnvironmentsShowcase } from './components/sections/EnvironmentsShowcase';
import { CharactersShowcase } from './components/sections/CharactersShowcase';
import { PipelineSection } from './components/sections/PipelineSection';
import { CommissionsSection } from './components/sections/CommissionsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectModal } from './components/ui/ProjectModal';
import { SplashScreen } from './components/ui/SplashScreen';
import type { Project } from './data/portfolioData';
import { cosmicAudio } from './utils/audioSynth';

export function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<string>('eclipse');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [commissionPrefill, setCommissionPrefill] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    cosmicAudio.setMuted(nextMuted);
  };

  const handleSelectForCommission = (title: string) => {
    setCommissionPrefill(title);
    const commissionsEl = document.getElementById('comissoes');
    if (commissionsEl) {
      commissionsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Intro Splash Screen – Eclipse forming animation */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Interactive Celestial Starfield Canvas in Background */}
      <StarfieldCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="ambient-nebula-1" aria-hidden="true" />
      <div className="ambient-nebula-2" aria-hidden="true" />
      <div className="ambient-nebula-3" aria-hidden="true" />

      {/* Fixed Cosmic Header */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {/* 1. Hero Section with Interactive Eclipse */}
        <Hero />

        {/* 2. Metrics Ticker (60+ mods, 250k+ players) */}
        <MetricsTicker />

        {/* 3. 3D Model Inspector (Interactive Three.js Viewport) */}
        <section className="container-custom" style={{ paddingBottom: '4rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <span className="badge-pill badge-primary" style={{ marginBottom: '0.5rem' }}>
              WebGL 3D Engine • Three.js
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Inspetor de Malha &amp; Shaders em Tempo Real
            </h2>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', maxWidth: '580px', margin: '0.4rem auto 0 auto' }}>
              Rotacione em 360°, dê zoom e alterne entre modos PBR, Wireframe, Argila ZBrush e canais de emissão pura.
            </p>
          </div>

          <ModelViewer3D />
        </section>

        {/* 4. Filterable 3D Works Gallery */}
        <WorksGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Environments & Biomes Showcase (Twin Moon Citadel) */}
        <EnvironmentsShowcase />

        {/* 6. Characters & Armor Forge (Barbarian Queen) */}
        <CharactersShowcase />

        {/* 7. Production Pipeline Timeline */}
        <PipelineSection />

        {/* 8. Commissions & Custom Orders Terminal */}
        <CommissionsSection prefilledProject={commissionPrefill} />

        {/* 9. About the Artist */}
        <AboutSection />
      </main>

      {/* Cosmic Footer */}
      <Footer />

      {/* Full Detailed Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForCommission={handleSelectForCommission}
      />
    </div>
  );
}

export default App;
