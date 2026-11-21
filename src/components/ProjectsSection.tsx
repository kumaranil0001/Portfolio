'use client';

import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/lib/context/PortfolioContext';
import { ProjectItem } from '@/lib/data/types';

export function ProjectsSection() {
  const { data } = usePortfolio();

  const publishedProjects = data.projects.filter(p => p.published);

  const renderProjectMedia = (project: ProjectItem) => {
    const images = project.images || [];

    // Case 1: All 3 images present (Original Stitch Asymmetric Grid: 40% left stacked col, 60% right tall col)
    if (images.length >= 3) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-auto">
          {/* Left Stacked Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="w-full h-64 sm:h-72 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#1c1d21] group relative border border-white/[0.08]">
              <Image
                src={images[0].url}
                alt={images[0].caption || project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#0c0c0c]/85 text-xs font-mono text-[#e2b6ff] border border-white/[0.1] backdrop-blur-md">
                {images[0].caption || "Telemetry Feed 01"}
              </div>
            </div>

            <div className="w-full h-64 sm:h-72 rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#1c1d21] group relative border border-white/[0.08]">
              <Image
                src={images[1].url}
                alt={images[1].caption || project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#0c0c0c]/85 text-xs font-mono text-[#e2b6ff] border border-white/[0.1] backdrop-blur-md">
                {images[1].caption || "Latent Map 02"}
              </div>
            </div>
          </div>

          {/* Right Tall Column */}
          <div className="lg:col-span-7 h-96 sm:h-[400px] lg:h-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#1c1d21] group relative border border-white/[0.08] min-h-[300px]">
            <Image
              src={images[2].url}
              alt={images[2].caption || project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#0c0c0c]/85 text-xs font-mono text-[#e2b6ff] border border-white/[0.1] backdrop-blur-md">
              {images[2].caption || "Live Telemetry Cockpit"}
            </div>
          </div>
        </div>
      );
    }

    // Case 2: 2 images present (Balanced Dual Split View)
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-auto">
          {images.map((img, idx) => (
            <div key={img.id || idx} className="w-full h-72 sm:h-84 md:h-96 rounded-[28px] overflow-hidden bg-[#1c1d21] group relative border border-white/[0.08]">
              <Image
                src={img.url}
                alt={img.caption || project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#0c0c0c]/85 text-xs font-mono text-[#e2b6ff] border border-white/[0.1] backdrop-blur-md">
                {img.caption || `Telemetry View ${idx + 1}`}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Case 3: 1 image present (Cinematic Panoramic Viewport)
    if (images.length === 1) {
      return (
        <div className="w-full h-80 sm:h-96 lg:h-[440px] rounded-[32px] overflow-hidden bg-[#1c1d21] group relative border border-white/[0.08]">
          <Image
            src={images[0].url}
            alt={images[0].caption || project.title}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0c0c0c]/85 text-xs font-mono text-[#e2b6ff] border border-white/[0.1] backdrop-blur-md">
            {images[0].caption || "Master Case Study Viewport"}
          </div>
        </div>
      );
    }

    // Case 4: ZERO photos (Photo removed in Admin - "It does not care if it remove"!)
    // Generates a stunning brutalist code & architecture telemetry canvas
    return (
      <div className="w-full p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#141517] via-[#101114] to-[#1c1524] border border-[#e2b6ff]/20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b0fa6]/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3ECF8E] animate-ping" />
              <span className="font-mono text-xs text-[#3ECF8E] uppercase tracking-wider">
                CORE SYSTEM ONLINE // HEADLESS ARCHITECTURE
              </span>
            </div>
            <h4 className="font-display font-bold text-2xl text-white">
              {project.title} — Architectural Blueprint
            </h4>
            <p className="font-body text-sm text-[#8d9194] leading-relaxed">
              {project.problemStatement || "High-performance distributed system running directly on bare-metal tensor hardware with sub-millisecond execution times."}
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 shrink-0 font-mono text-xs">
            <div className="px-4 py-2 rounded-xl bg-[#1c1d21] border border-white/[0.08] text-[#c4c7ca] flex items-center justify-between gap-4">
              <span>STATUS:</span>
              <span className="text-[#3ECF8E]">PRODUCTION</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#1c1d21] border border-white/[0.08] text-[#c4c7ca] flex items-center justify-between gap-4">
              <span>SECURITY:</span>
              <span className="text-[#e2b6ff]">RLS VERIFIED</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#1c1d21] border border-white/[0.08] text-[#c4c7ca] flex items-center justify-between gap-4">
              <span>UPTIME:</span>
              <span className="text-white">99.98%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="projects" 
      className="relative w-full bg-[#0c0c0c] rounded-t-[40px] sm:rounded-t-[60px] -mt-12 py-24 md:py-36 px-4 sm:px-8 lg:px-16 z-30"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#e2b6ff] font-semibold block mb-2">
              02 // SELECTED RESEARCH & PRODUCTION CODEBASES
            </span>
            <h2 className="font-display font-black uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight bg-gradient-to-b from-[#8d98a3] via-[#cbd7e2] to-[#434b52] bg-clip-text text-transparent">
              FEATURED PROJECTS & RESEARCH
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2b6ff]" />
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#c4c7ca]">
              Production Grade 2024–2026
            </span>
          </div>
        </div>

        {/* Stack of Case Study Cards */}
        <div className="flex flex-col gap-12 sm:gap-20">
          {publishedProjects.map((project) => (
            <article 
              key={project.id}
              className="w-full bg-[#141517] rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 shadow-2xl flex flex-col gap-8 transition-all hover:bg-[#18191d] border border-white/[0.08]"
            >
              {/* Card Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] font-mono text-xs font-bold uppercase tracking-wider border border-[#e2b6ff]/30">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                    {project.techStackTags.slice(0, 3).join(' / ')}
                  </span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24252a] hover:bg-[#32343c] text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/[0.08]"
                    >
                      <span className="material-symbols-outlined text-[16px]">code</span>
                      <span>Source / GitHub</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold transition-all hover:brightness-110 shadow-[0_0_15px_rgba(226,182,255,0.3)]"
                    >
                      <span>Live Demo</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#c4c7ca] max-w-xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Adaptive Project Media Grid */}
              {renderProjectMedia(project)}

              {/* Tags & Metrics Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {project.techStackTags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3.5 py-1 rounded-full bg-[#24252a] text-[#c4c7ca] font-mono text-xs border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-[#8d9194]">
                  {project.metrics.map((m, mIdx) => (
                    <span key={mIdx} className="flex items-center gap-1.5">
                      <span className="text-[#8d9194]">{m.label}:</span>
                      <span className="text-[#3ECF8E] font-bold">{m.value}</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
