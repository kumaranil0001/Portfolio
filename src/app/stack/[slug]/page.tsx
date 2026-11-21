'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export default function TechStackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data } = usePortfolio();

  const slug = params?.slug as string;
  const stackItem = data.techStack.find(item => item.slug === slug);

  if (!stackItem) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-6xl text-[#e2b6ff] mb-4">search_off</span>
        <h1 className="font-display font-bold text-3xl mb-2">Technology Node Not Found</h1>
        <p className="font-body text-[#8d9194] max-w-md mb-6">
          The requested framework or tooling index (&quot;{slug}&quot;) could not be located in the current production matrix.
        </p>
        <Link
          href="/#skills"
          className="px-6 py-3 rounded-full bg-[#1c1d21] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#282a30] transition-colors border border-white/[0.1]"
        >
          Return to Technical Matrix
        </Link>
      </div>
    );
  }

  // Find all projects built with this technology
  const associatedProjects = data.projects.filter(project => {
    // Check either explicit ID or matching tag
    const matchesId = stackItem.associatedProjectIds?.includes(project.id);
    const matchesTag = project.techStackTags.some(tag => 
      tag.toLowerCase().includes(stackItem.name.toLowerCase()) || 
      stackItem.name.toLowerCase().includes(tag.toLowerCase())
    );
    return matchesId || matchesTag;
  });

  // Find related tools in same category
  const relatedTools = data.techStack.filter(item => 
    item.category === stackItem.category && item.id !== stackItem.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e5e2e1] selection:bg-[#6b0fa6] selection:text-white">
      {/* Sticky Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#0c0c0c]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-md">
        <div className="h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-[#141517] hover:bg-[#1f2026] text-white flex items-center justify-center transition-colors border border-white/[0.08]"
              title="Go Back"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              <Link href="/" className="hover:text-white transition-colors">Portfolio</Link>
              <span>/</span>
              <span className="text-[#c4c7ca]">Technical Core</span>
              <span>/</span>
              <span className="text-[#e2b6ff] font-bold">{stackItem.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/admin#tab-stack`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1d21] hover:bg-[#282a30] text-[#e2b6ff] font-mono text-xs uppercase tracking-wider border border-white/[0.08] transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">edit</span>
              <span>Edit in CMS</span>
            </Link>
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-white text-[#0c0c0c] flex items-center justify-center hover:scale-105 transition-transform"
              title="Home"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="w-full pt-32 pb-24 px-4 sm:px-8 lg:px-16 max-w-[1600px] mx-auto flex flex-col gap-16">
        {/* Framework Hero Banner */}
        <section className="relative w-full rounded-[36px] bg-gradient-to-br from-[#141517] via-[#101114] to-[#1c1524] p-8 sm:p-14 border border-white/[0.08] overflow-hidden shadow-2xl">
          {/* Ambient Colored Light Well */}
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[140px] opacity-40 pointer-events-none"
            style={{ backgroundColor: stackItem.badgeColor }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span 
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: stackItem.badgeColor }}
                />
                <span className="px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono uppercase tracking-wider text-[#e2b6ff]">
                  {stackItem.categoryLabel}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] text-xs font-mono uppercase tracking-wider font-semibold">
                  {stackItem.status.toUpperCase()} DEPLOYMENT
                </span>
                {stackItem.experienceYears && (
                  <span className="font-mono text-xs text-[#8d9194]">
                    [ {stackItem.experienceYears} Research & Production ]
                  </span>
                )}
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                {stackItem.name}
              </h1>

              <p className="font-body text-lg sm:text-2xl text-[#cbd7e2] font-light leading-relaxed">
                {stackItem.summary}
              </p>
            </div>

            {/* Large Visual Node Emblem */}
            <div className="p-8 rounded-3xl bg-[#1c1d21]/80 border border-white/[0.1] backdrop-blur-xl flex flex-col items-center justify-center text-center shrink-0 min-w-[200px]">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg"
                style={{ backgroundColor: stackItem.badgeColor }}
              >
                <span className="material-symbols-outlined text-4xl">{stackItem.iconName || 'memory'}</span>
              </div>
              <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                NODE INDEX
              </span>
              <span className="font-display font-bold text-xl text-white mt-1">
                {stackItem.slug.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

        {/* Deep Architectural Dossier & Capabilities */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Architecture Overview */}
          <div className="lg:col-span-7 flex flex-col gap-6 p-8 sm:p-10 rounded-[32px] bg-[#141517] border border-white/[0.08]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] block mb-2 font-semibold">
                01 // ARCHITECTURAL RATIONALE
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Why I Choose & Deploy {stackItem.name}
              </h2>
            </div>

            <p className="font-body text-base sm:text-lg text-[#c4c7ca] leading-relaxed">
              {stackItem.description}
            </p>

            <div className="p-5 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex flex-col gap-2">
              <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                ENGINEERING TRADEOFFS & VALUE:
              </span>
              <p className="font-body text-sm text-[#e5e2e1] leading-relaxed">
                {stackItem.whyUsed}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex flex-col gap-2">
              <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                SUBSYSTEM TOPOLOGY ROLE:
              </span>
              <p className="font-body text-sm text-[#e2b6ff] leading-relaxed font-mono">
                {stackItem.architectureRole}
              </p>
            </div>
          </div>

          {/* Key Features & Execution Primitives */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-8 sm:p-10 rounded-[32px] bg-[#141517] border border-white/[0.08]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] block mb-2 font-semibold">
                02 // EXECUTION PRIMITIVES
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Key Features & APIs Deployed
              </h2>
            </div>

            <p className="font-body text-sm text-[#8d9194]">
              High-throughput patterns and specialized routines leveraged across real-world workloads:
            </p>

            <div className="flex flex-col gap-3">
              {stackItem.keyFeatures?.map((feat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.06] hover:border-[#e2b6ff]/30 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] flex items-center justify-center shrink-0 text-xs">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[#e5e2e1]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK & PROJECTS POWERED BY THIS STACK */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] block mb-1 font-semibold">
                03 // PRODUCTION SHOWCASE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                Projects Built with {stackItem.name}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#8d9194]">
              [ {associatedProjects.length} Shipped Workloads ]
            </span>
          </div>

          {associatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {associatedProjects.map((project) => (
                <article 
                  key={project.id}
                  className="rounded-[32px] bg-[#141517] p-8 border border-white/[0.08] flex flex-col justify-between gap-6 hover:border-[#e2b6ff]/40 transition-all shadow-xl group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Project Preview Image if available, or high-tech canvas */}
                    {project.images && project.images.length > 0 ? (
                      <div className="w-full h-60 rounded-2xl overflow-hidden relative bg-[#1c1d21] border border-white/[0.06]">
                        <Image
                          src={project.images[0].url}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0c0c0c]/80 text-[10px] font-mono text-[#e2b6ff] backdrop-blur-md">
                          {project.category}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-[#1c1d21] to-[#121316] border border-white/[0.06] flex items-center justify-center p-6 text-center">
                        <span className="font-mono text-xs text-[#8d9194]">
                          [ TELEMETRY ACTIVE • HEADLESS ENGINE ]
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#e2b6ff] transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-[#3ECF8E] font-semibold">
                        LIVE
                      </span>
                    </div>

                    <p className="font-body text-sm text-[#c4c7ca] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStackTags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1 rounded-full text-xs font-mono ${
                            tag.toLowerCase().includes(stackItem.name.toLowerCase())
                              ? 'bg-[#6b0fa6]/40 text-[#e2b6ff] border border-[#e2b6ff]/40 font-bold'
                              : 'bg-[#1c1d21] text-[#8d9194] border border-white/[0.05]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">code</span>
                        <span>Source Code</span>
                      </a>
                    ) : <span />}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 transition-all shadow-md"
                      >
                        <span>View Project</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="w-full p-12 rounded-[32px] bg-[#141517] border border-white/[0.08] text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[#8d9194] mb-3">hub</span>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Active Benchmark & Research Rig
              </h3>
              <p className="font-body text-sm text-[#8d9194] max-w-md mb-6">
                {stackItem.name} is actively deployed across internal inference pipelines, synthetic test routines, and upcoming open-source case studies.
              </p>
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-full bg-[#1c1d21] hover:bg-[#282a30] text-[#e2b6ff] font-mono text-xs uppercase tracking-wider border border-white/[0.08]"
              >
                Link a Project in Admin CMS
              </Link>
            </div>
          )}
        </section>

        {/* Related Technologies in the Matrix */}
        {relatedTools.length > 0 && (
          <section className="flex flex-col gap-6 pt-8 border-t border-white/[0.08]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8d9194]">
              COMPLEMENTARY {stackItem.categoryLabel.toUpperCase()} FRAMEWORKS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/stack/${tool.slug}`}
                  className="p-5 rounded-2xl bg-[#141517] hover:bg-[#1c1d21] border border-white/[0.06] hover:border-[#e2b6ff]/40 transition-all flex items-center gap-3 group"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: tool.badgeColor }}
                  />
                  <div className="flex flex-col truncate">
                    <span className="font-display font-bold text-white group-hover:text-[#e2b6ff] transition-colors truncate">
                      {tool.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#8d9194] uppercase truncate">
                      {tool.categoryLabel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
