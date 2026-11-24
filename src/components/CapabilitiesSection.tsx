'use client';

import React from 'react';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export function CapabilitiesSection() {
  const { data } = usePortfolio();

  return (
    <section 
      id="skills" 
      className="relative w-full my-16 sm:my-24 md:my-32 px-4 sm:px-8 lg:px-14 z-20"
    >
      {/* Framed Obsidian Editorial Card matching Academic Foundation & Education style */}
      <div className="w-full max-w-[1480px] mx-auto bg-[#141517] text-[#e5e2e1] rounded-3xl sm:rounded-[36px] lg:rounded-[44px] py-14 sm:py-18 md:py-20 px-6 sm:px-10 md:px-14 lg:px-16 border border-white/[0.08] shadow-2xl flex flex-col relative overflow-hidden">
        {/* Subtle Ambient Glow Well */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6b0fa6]/10 blur-[140px] pointer-events-none rounded-full -z-0" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 z-10">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#e2b6ff] font-bold mb-3 block">
              01 // CAPABILITIES MATRIX & ENGINEERING DOMAINS
            </span>
            <h2 className="font-display font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tighter text-white">
              TECHNICAL CAPABILITIES & SKILLS
            </h2>
          </div>
          <p className="font-body text-base sm:text-lg text-[#8d9194] max-w-sm">
            Rigorous systems engineering spanning mathematical foundations, deep learning pipelines, and cloud microservices.
          </p>
        </div>

        {/* 5 Domain Modules Hairline Grid */}
        <div className="flex flex-col w-full divide-y divide-white/[0.08] border-y border-white/[0.08] mb-10 sm:mb-14 z-10">
          {data.capabilities.map((cap) => (
            <div 
              key={cap.id}
              className="group py-8 sm:py-10 md:py-12 transition-colors hover:bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-3 sm:px-4 rounded-2xl"
            >
              <div className="flex items-baseline gap-5 sm:gap-8 md:gap-12">
                <span className="font-display text-2xl md:text-3xl font-bold text-[#e2b6ff]">
                  {cap.number}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:translate-x-2 transition-transform">
                    {cap.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#8d9194] mt-2 max-w-xl leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
                {cap.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-3.5 py-1.5 rounded-full bg-[#1c1d21] border border-white/[0.08] text-xs font-mono font-semibold uppercase tracking-wider text-[#cbd7e2] group-hover:border-[#e2b6ff]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                <span className="w-10 h-10 rounded-full bg-[#1c1d21] border border-white/[0.08] text-[#e2b6ff] flex items-center justify-center group-hover:bg-[#6b0fa6] group-hover:text-white group-hover:border-[#e2b6ff]/40 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">{cap.icon}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Breathing Room Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-white/[0.08] font-mono text-xs text-[#8d9194] z-10">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e2b6ff] animate-pulse" />
            <span className="uppercase tracking-wider font-semibold text-[#c4c7ca]">
              Continuous Verification & Production Benchmarks
            </span>
          </span>
          <span className="text-[#e2b6ff] font-bold uppercase tracking-wider text-[11px]">
            {data.profile.brandTitle || data.profile.moniker || 'ANIL404'} // CAPABILITY DOSSIER
          </span>
        </div>
      </div>
    </section>
  );
}
