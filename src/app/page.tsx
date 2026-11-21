'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MarqueeTechStack } from '@/components/MarqueeTechStack';
import { AboutEducationSection } from '@/components/AboutEducationSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { LiveCmsDrawer } from '@/components/LiveCmsDrawer';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [isLiveCmsOpen, setIsLiveCmsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-[#e5e2e1] selection:bg-[#6b0fa6] selection:text-white">
      {/* Sticky Obsidian Navbar */}
      <Navbar onOpenLiveCms={() => setIsLiveCmsOpen(true)} />

      {/* Main Content Sections */}
      <main className="w-full pt-20">
        <HeroSection onOpenLiveCms={() => setIsLiveCmsOpen(true)} />
        <MarqueeTechStack />
        <AboutEducationSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Live CMS Drawer */}
      <LiveCmsDrawer
        isOpen={isLiveCmsOpen}
        onClose={() => setIsLiveCmsOpen(false)}
      />
    </div>
  );
}
