import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorFollower from './components/layout/CursorFollower';
import ScrollToTop from './components/ui/ScrollToTop';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Sites from './components/sections/Sites';
import Contact from './components/sections/Contact';

const App = () => (
  <ThemeProvider>
    <Navbar />
    <main>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Sites />
      <Contact />
    </main>
    <Footer />
    <CursorFollower />
    <ScrollToTop />
  </ThemeProvider>
);

export default App;
