'use client';

import React from 'react';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export function AboutEducationSection() {
  const { data } = usePortfolio();

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full py-28 md:py-36 px-4 sm:px-8 lg:px-16 bg-[#0c0c0c] flex flex-col items-center justify-center overflow-hidden max-w-[1800px] mx-auto"
    >
      {/* 4 Corner Floating Decorative Badges from Stitch */}
      <div className="absolute top-12 left-6 md:left-16 p-4 rounded-2xl bg-[#141517]/80 border border-[#e2b6ff]/20 pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] animate-float-slow opacity-90 select-none z-10 hidden sm:flex items-center gap-3">
        <span className="material-symbols-outlined text-[#e2b6ff] text-2xl">neurology</span>
        <span className="font-mono text-xs text-white font-semibold">NEURAL_DYNAMICS</span>
      </div>

      <div className="absolute top-16 right-6 md:right-16 p-4 rounded-2xl bg-[#141517]/80 border border-[#3ECF8E]/20 pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] animate-float-mid opacity-90 select-none z-10 hidden sm:flex items-center gap-3">
        <span className="material-symbols-outlined text-[#3ECF8E] text-2xl">database</span>
        <span className="font-mono text-xs text-white font-semibold">PGVECTOR_HNSW</span>
      </div>

      <div className="absolute bottom-16 left-6 md:left-20 p-4 rounded-2xl bg-[#141517]/80 border border-[#76B900]/20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] animate-float-rev opacity-90 select-none z-10 hidden sm:flex items-center gap-3">
        <span className="material-symbols-outlined text-[#76B900] text-2xl">speed</span>
        <span className="font-mono text-xs text-white font-semibold">CUDA_PARALLEL</span>
      </div>

      <div className="absolute bottom-16 right-6 md:right-20 p-4 rounded-2xl bg-[#141517]/80 border border-[#e2b6ff]/20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] animate-float-slow opacity-90 select-none z-10 hidden sm:flex items-center gap-3">
        <span className="material-symbols-outlined text-[#e2b6ff] text-2xl">hub</span>
        <span className="font-mono text-xs text-white font-semibold">DISTRIBUTED_MESH</span>
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-4xl flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs uppercase tracking-widest mb-6 border border-[#e2b6ff]/30">
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          <span>Systems Architect & AI Researcher</span>
        </span>

        <h2 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight bg-gradient-to-b from-[#8d98a3] via-[#cbd7e2] to-[#434b52] bg-clip-text text-transparent mb-8">
          ABOUT ME
        </h2>

        <p className="font-body text-lg sm:text-2xl sm:leading-relaxed text-[#cbd7e2] font-light max-w-3xl mb-12 text-left sm:text-center">
          {data.profile.aboutBio}
        </p>

        {/* 4 Metrics Counters Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full p-6 sm:p-8 rounded-3xl bg-[#141517]/90 border border-white/[0.08] backdrop-blur-md shadow-2xl">
          {data.profile.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-2">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8d9194] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dedicated Education & Academic Milestones Block */}
        <div 
          id="education" 
          className="mt-12 w-full bg-[#141517] rounded-3xl p-8 sm:p-10 border border-white/[0.08] text-left shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] block mb-1">
                ACADEMIC FOUNDATION // MILESTONES
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                {data.academic.degree}
              </h3>
              <p className="font-body text-base text-[#e2b6ff] font-medium mt-1">
                Specialization: {data.academic.specialization}
              </p>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#24252a] border border-[#e2b6ff]/30 text-[#e2b6ff] font-mono text-xs self-start sm:self-center font-semibold uppercase">
              {data.academic.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8d9194] block mb-3 font-semibold">
                CORE ACADEMIC FOCUS
              </span>
              <ul className="flex flex-col gap-2.5 font-body text-sm sm:text-base text-[#e5e2e1]">
                {data.academic.coreFocus.map((focus, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[16px] text-[#e2b6ff]">check_circle</span>
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8d9194] block mb-3 font-semibold">
                RESEARCH INITIATIVES & INTERESTS
              </span>
              <ul className="flex flex-col gap-2.5 font-body text-sm sm:text-base text-[#e5e2e1]">
                {data.academic.researchInitiatives.map((research, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[16px] text-[#e2b6ff]">terminal</span>
                    <span>{research}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
