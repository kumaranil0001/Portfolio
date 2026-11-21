'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MarqueeTechStack } from '@/components/MarqueeTechStack';
import { AboutEducationSection } from '@/components/AboutEducationSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-[#e5e2e1] selection:bg-[#6b0fa6] selection:text-white">
      {/* Sticky Obsidian Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="w-full pt-20">
        <HeroSection />
        <MarqueeTechStack />
        <AboutEducationSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
