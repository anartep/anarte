import { LanguageProvider } from './context/LanguageContext';
import { CosmicBackground } from './components/CosmicBackground/CosmicBackground';
import { Nav } from './components/Nav/Nav';
import { HeroSection } from './components/HeroSection/HeroSection';
import { SelectedWorks } from './components/SelectedWorks/SelectedWorks';
import { Services } from './components/Services/Services';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Process } from './components/Process/Process';
import { TermsFAQ } from './components/TermsFAQ/TermsFAQ';
import { Contact } from './components/Contact/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';
import './components/shared/shared.css';

function Page() {
  useScrollReveal();

  return (
    <>
      <CosmicBackground />
      <Nav />
      <main>
        <HeroSection />
        <SelectedWorks />
        <Services />
        <About />
        <Experience />
        <Process />
        <TermsFAQ />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
