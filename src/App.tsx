import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PerspectiveProvider } from './contexts/PerspectiveContext';
import { ParticleProvider } from './contexts/ParticleContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorFollower from './components/layout/CursorFollower';
import ScrollToTop from './components/ui/ScrollToTop';
import BootScreen from './components/BootScreen';
import { OnboardingPerspectiveModal } from './components/ui/OnboardingPerspectiveModal';
import { FiveMConsole } from './components/ui/FiveMConsole';
import { GlobalParticleField } from './components/three/GlobalParticleField';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Showcase3D from './components/sections/Showcase3D';
import Sites from './components/sections/Sites';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

const App = () => {
  const [bootComplete, setBootComplete] = useState(() => {
    if (typeof window === 'undefined') return true;
    // Check if user already booted during this browser session
    return Boolean(sessionStorage.getItem('portfolio-booted'));
  });

  const handleBootComplete = () => {
    setBootComplete(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-booted', 'true');
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <PerspectiveProvider>
          <ParticleProvider>
            {!bootComplete && <BootScreen onComplete={handleBootComplete} />}
            {bootComplete && <OnboardingPerspectiveModal />}
            <GlobalParticleField />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <Stats />
              <Showcase3D />
              <Sites />
              <Projects />
              <Skills />
              <Experience />
              <Contact />
            </main>
            <Footer />
            <FiveMConsole />
            <CursorFollower />
            <ScrollToTop />
          </ParticleProvider>
        </PerspectiveProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
