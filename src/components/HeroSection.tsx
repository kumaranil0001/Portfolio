'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export function HeroSection({ onOpenLiveCms }: { onOpenLiveCms?: () => void }) {
  const { data } = usePortfolio();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const avatarWrapRef = useRef<HTMLDivElement>(null);

  // Magnetic 3D Mouse Movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      setMousePos({ x: deltaX * 24, y: deltaY * 24 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const githubSocial = data.socials.find(s => s.platform === 'github' && s.enabled);

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-8 pb-12 overflow-hidden max-w-[1800px] mx-auto"
    >
      {/* Ambient Radial Light Wells */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6b0fa6]/20 blur-[160px] pointer-events-none rounded-full -z-10" />
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-[#BE4C00]/15 blur-[180px] pointer-events-none rounded-full -z-10" />

      {/* Top Meta Bar */}
      <div className="w-full flex items-center justify-between z-20 pt-4">
        {/* Academic Availability Pill */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs uppercase tracking-wider border border-[#e2b6ff]/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#e2b6ff] animate-ping" />
            <span>{data.profile.credential || "B.Tech CSE (AI & ML) // Available for Sprints"}</span>
          </span>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenLiveCms && (
            <button
              onClick={onOpenLiveCms}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#24252a] hover:bg-[#2f3037] text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/[0.08]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#e2b6ff]">edit_note</span>
              <span>Quick Edit</span>
            </button>
          )}

          {githubSocial && (
            <a
              href={githubSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#141517] hover:bg-[#24252a] text-[#c4c7ca] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors border border-white/[0.08]"
            >
              <span className="material-symbols-outlined text-[15px]">code</span>
              <span className="hidden sm:inline">GitHub / Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Hero Center Stage */}
      <div className="relative w-full my-auto flex flex-col lg:flex-row items-center justify-between min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] py-12">
        {/* Left Manifesto */}
        <div className="flex flex-col items-start text-left max-w-4xl z-10">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1d21]/90 border border-white/[0.1] mb-6 backdrop-blur-md">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] font-semibold">
              BRAND: {data.profile.moniker || 'ANIL404'}
            </span>
            <span className="text-[#8d9194] text-xs">•</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#c4c7ca]">
              {data.profile.name || 'ANIL KUMAR ROUT'}
            </span>
          </div>

          <h1 className="select-none font-display font-black uppercase text-[10vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5rem] leading-[0.92] tracking-tighter bg-gradient-to-b from-[#646973] via-[#cbd7e2] to-[#BBCCD7] bg-clip-text text-transparent max-w-4xl">
            {data.profile.tagline || 'Building intelligent things with code.'}
          </h1>
        </div>

        {/* Right 3D Magnetic Interactive Avatar */}
        <div 
          ref={avatarWrapRef}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
          className="relative lg:absolute lg:top-1/2 lg:right-4 xl:right-12 lg:-translate-y-1/2 z-20 pointer-events-auto transition-transform duration-200 ease-out mt-10 lg:mt-0 flex items-center justify-center"
        >
          <div className="relative group cursor-grab active:cursor-grabbing">
            {/* Glowing Emissive Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#6b0fa6]/50 via-[#ffd4f1]/20 to-[#00F0FF]/30 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Avatar or Sleek Fallback if photo is removed */}
            {data.profile.avatarUrl ? (
              <div className="relative z-10 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-full overflow-hidden border-2 border-[#e2b6ff]/30 shadow-[0_24px_48px_rgba(0,0,0,0.95)]">
                <Image
                  src={data.profile.avatarUrl}
                  alt={data.profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover filter contrast-105 select-none transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              /* Intentional Generative Obsidian Cyber Node */
              <div className="relative z-10 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-full border-2 border-[#e2b6ff]/40 bg-gradient-to-br from-[#1a1b22] via-[#0e0e12] to-[#20152b] shadow-[0_24px_48px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#6b0fa6]/30 border border-[#e2b6ff]/50 flex items-center justify-center mb-4 text-[#e2b6ff] shadow-[0_0_24px_rgba(226,182,255,0.3)]">
                  <span className="material-symbols-outlined text-4xl">neurology</span>
                </div>
                <span className="font-display font-black text-2xl tracking-wider text-white uppercase">
                  {data.profile.moniker || 'ANIL404'}
                </span>
                <span className="font-mono text-[11px] text-[#e2b6ff] uppercase tracking-widest mt-1">
                  AI RESEARCH MATRIX
                </span>
                <span className="font-mono text-[10px] text-[#8d9194] mt-2">
                  AUTONOMOUS COMPUTE NODE
                </span>
              </div>
            )}

            {/* Hover Badge Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-[#0c0c0c]/90 border border-[#e2b6ff]/40 backdrop-blur-md flex items-center gap-2 shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <span className="w-2 h-2 rounded-full bg-[#e2b6ff] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                {data.profile.moniker} // AI Researcher & Systems Architect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Information & CTAs */}
      <div className="relative w-full z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-4 pt-6 border-t border-white/[0.06]">
        <div className="max-w-[540px]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] block mb-2 font-semibold">
            {data.profile.name} — {data.academic.degree.split(' ')[0]} {data.academic.specialization}
          </span>
          <p className="font-body text-sm sm:text-base uppercase font-light tracking-wide text-[#cbd7e2] leading-relaxed">
            {data.profile.subHeadline || 'ENGINEERING HIGH-THROUGHPUT DISTRIBUTED SYSTEMS, FOUNDATION MODELS & COMPUTATIONAL NEUROSCIENCE'}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Link
            href="/#projects"
            className="hidden lg:flex items-center gap-2 px-7 py-4 rounded-full font-mono text-xs uppercase tracking-wider text-white bg-[#1c1d21] hover:bg-[#282a30] transition-all border border-white/[0.1] shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>VIEW PROJECTS</span>
          </Link>

          <Link
            href="/#contact"
            className="relative group inline-flex items-center justify-center px-8 py-4 rounded-full font-mono text-xs uppercase tracking-wider text-white font-bold overflow-hidden shadow-[0px_4px_28px_rgba(182,0,168,0.4)] transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#7621B0] hover:to-[#BE4C00]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>INITIATE TRANSMISSION</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">bolt</span>
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </section>
  );
}
