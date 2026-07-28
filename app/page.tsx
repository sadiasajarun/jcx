import { FiltersProvider } from '@/components/filters-context';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { Beliefs } from '@/components/sections/Beliefs';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { Landowners } from '@/components/sections/Landowners';
import { MapSection } from '@/components/sections/MapSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Awards } from '@/components/sections/Awards';
import { Footer } from '@/components/sections/Footer';
import { FloatingActions } from '@/components/sections/FloatingActions';

export default function HomePage() {
  return (
    // FiltersProvider lets the hero search bar live-filter the projects grid.
    <FiltersProvider>
      <Header />

      <main id="main">
        {/* 1 — Hero (+ 2 — search bar, overlaid at the lower third) */}
        <Hero media="video" />

        {/* 3 — About: the giant JCX wordmark */}
        <AboutSection />

        {/* 3b — The Basis of Our Beliefs: photo-led band, numbered cards */}
        <Beliefs />

        {/* 4 — Portfolio: sticky command bar + horizontal poster strip */}
        <ProjectsSection />

        {/* 5 — Our Perfections */}
        <FeaturedProjectsSection />

        {/* 6 — Landowners */}
        <Landowners />

        {/* 7 — Map */}
        <MapSection />

        {/* 8 — Testimonials */}
        <TestimonialsSection />

        {/* 9 — Awards & Recognition */}
        <Awards />
      </main>

      {/* 10 — Footer */}
      <Footer />

      {/* 11 — WhatsApp + scroll-to-top */}
      <FloatingActions />
    </FiltersProvider>
  );
}
