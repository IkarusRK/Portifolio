import { useState, lazy, Suspense } from 'react';
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
import { GlobalParticleField } from './components/three/GlobalParticleField';
import Hero from './components/sections/Hero';
import Sites from './components/sections/Sites';
import Projects from './components/sections/Projects';

const CodeShowcase = lazy(() => import('./components/sections/CodeShowcase'));
const Stats = lazy(() => import('./components/sections/Stats'));
const Showcase3D = lazy(() => import('./components/sections/Showcase3D'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));
const FiveMConsole = lazy(() =>
  import('./components/ui/FiveMConsole').then((m) => ({ default: m.FiveMConsole }))
);

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
              <Sites />
              <Projects />
              <Suspense fallback={null}>
                <CodeShowcase />
                <Stats />
                <Showcase3D />
                <Skills />
                <Experience />
                <Contact />
              </Suspense>
            </main>
            <Footer />
            <Suspense fallback={null}>
              <FiveMConsole />
            </Suspense>
            <CursorFollower />
            <ScrollToTop />
          </ParticleProvider>
        </PerspectiveProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
