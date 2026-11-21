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
      {/* Framed Editorial Card with Left & Right Margins and Rounded Corners */}
      <div className="w-full max-w-[1480px] mx-auto bg-white text-[#0C0C0C] rounded-[32px] sm:rounded-[48px] lg:rounded-[56px] py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-20 shadow-[0_25px_70px_rgba(0,0,0,0.65)] flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#6b0fa6] font-bold mb-3 block">
              01 // CAPABILITIES MATRIX & ENGINEERING DOMAINS
            </span>
            <h2 className="font-display font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tighter text-[#0C0C0C]">
              TECHNICAL CAPABILITIES & SKILLS
            </h2>
          </div>
          <p className="font-body text-base sm:text-lg text-[#43474a] max-w-sm">
            Rigorous systems engineering spanning mathematical foundations, deep learning pipelines, and cloud microservices.
          </p>
        </div>

        {/* 5 Domain Modules Hairline Grid */}
        <div className="flex flex-col w-full divide-y divide-[#0C0C0C]/10 border-y border-[#0C0C0C]/10 mb-10 sm:mb-14">
          {data.capabilities.map((cap) => (
            <div 
              key={cap.id}
              className="group py-8 sm:py-10 md:py-12 transition-colors hover:bg-[#0C0C0C]/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-3 sm:px-4 rounded-xl"
            >
              <div className="flex items-baseline gap-5 sm:gap-8 md:gap-12">
                <span className="font-display text-2xl md:text-3xl font-bold text-[#6b0fa6]">
                  {cap.number}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#0C0C0C] tracking-tight group-hover:translate-x-2 transition-transform">
                    {cap.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#43474a] mt-2 max-w-xl leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
                {cap.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-3.5 py-1.5 rounded-full bg-[#0C0C0C]/5 text-xs font-mono font-semibold uppercase tracking-wider text-[#0C0C0C]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="w-10 h-10 rounded-full bg-[#0C0C0C] text-white flex items-center justify-center group-hover:bg-[#6b0fa6] transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">{cap.icon}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Generous breathing room footer at end of card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-[#0C0C0C]/10 font-mono text-xs text-[#8d9194]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6b0fa6] animate-pulse" />
            <span className="uppercase tracking-wider font-semibold text-[#0C0C0C]">
              Continuous Verification & Production Benchmarks
            </span>
          </span>
          <span className="text-[#6b0fa6] font-bold uppercase tracking-wider text-[11px]">
            ANIL404 // CAPABILITY DOSSIER
          </span>
        </div>
      </div>
    </section>
  );
}
