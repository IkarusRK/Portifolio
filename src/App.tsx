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
import { DeveloperBadge } from './components/ui/DeveloperBadge';
import { DeveloperModal } from './components/ui/DeveloperModal';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import type { Project } from './data/portfolioData';
import { cosmicAudio } from './utils/audioSynth';

function MainPortfolioContent() {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [heroEclipseVisible, setHeroEclipseVisible] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('eclipse');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [commissionPrefill, setCommissionPrefill] = useState<string>('');
  const [isDevModalOpen, setIsDevModalOpen] = useState<boolean>(false);

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
      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
          onEclipseArrive={() => setHeroEclipseVisible(true)}
        />
      )}

      {/* Interactive Celestial Starfield Canvas in Background */}
      <StarfieldCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="ambient-nebula-1" aria-hidden="true" />
      <div className="ambient-nebula-2" aria-hidden="true" />
      <div className="ambient-nebula-3" aria-hidden="true" />

      {/* Fixed Cosmic Header with Theme & Language Selectors */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {/* 1. Hero Section with Interactive Eclipse */}
        <Hero eclipseVisible={heroEclipseVisible} />

        {/* 2. Metrics Ticker */}
        <MetricsTicker />

        {/* 3. 3D Model Inspector (Interactive Three.js Viewport) */}
        <section className="container-custom" style={{ paddingBottom: '4rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <span className="badge-pill badge-primary" style={{ marginBottom: '0.5rem' }}>
              {t.inspector.badge}
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              {t.inspector.title}
            </h2>
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', maxWidth: '580px', margin: '0.4rem auto 0 auto' }}>
              {t.inspector.subtitle}
            </p>
          </div>

          <ModelViewer3D />
        </section>

        {/* 4. Filterable 3D Works Gallery */}
        <WorksGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Environments & Biomes Showcase */}
        <EnvironmentsShowcase />

        {/* 6. Characters & Armor Forge */}
        <CharactersShowcase />

        {/* 7. Production Pipeline Timeline */}
        <PipelineSection />

        {/* 8. Commissions & Custom Orders Terminal */}
        <CommissionsSection prefilledProject={commissionPrefill} />

        {/* 9. About the Artist */}
        <AboutSection />
      </main>

      {/* Cosmic Footer */}
      <Footer onOpenDevModal={() => setIsDevModalOpen(true)} />

      {/* Corner Floating Badge: "Desenvolvido por IkarusRK" */}
      <DeveloperBadge onOpenModal={() => setIsDevModalOpen(true)} />

      {/* Developer Modal: [ Portfólio | GitHub ] */}
      <DeveloperModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />

      {/* Full Detailed Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForCommission={handleSelectForCommission}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainPortfolioContent />
    </LanguageProvider>
  );
}

export default App;
