import { LanguageProvider, OverlayProvider, ThemeProvider, useLang, useOverlay } from './context';
import { ui } from './data/content';
import { useReveal } from './hooks';
import { Masthead, StickyNav } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Publishers } from './components/Publishers';
import { Works } from './components/Works';
import { Bookstore } from './components/Bookstore';
import { Contact, Footer } from './components/Contact';
import { ProjectsPanel } from './components/ProjectsPanel';
import { FaqChat } from './components/FaqChat';

function Page() {
  const { t, lang } = useLang();
  const { toast } = useOverlay();
  useReveal([lang]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{t(ui.skip)}</a>
      <Masthead />
      <StickyNav />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <About />
        <Publishers />
        <Works />
        <Bookstore />
        <Contact />
      </main>
      <Footer />
      <ProjectsPanel />
      <FaqChat />
      <div className="grain" aria-hidden="true" />
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <OverlayProvider>
          <Page />
        </OverlayProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
