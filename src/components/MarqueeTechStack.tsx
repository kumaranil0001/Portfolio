'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';
import { TechStackItem } from '@/lib/data/types';

export function MarqueeTechStack() {
  const { data } = usePortfolio();

  const row1Items = data.techStack.filter(item => item.marqueeRow === 1);
  const row2Items = data.techStack.filter(item => item.marqueeRow === 2);

  const renderBadge = (item: TechStackItem) => {
    return (
      <Link
        key={item.id}
        href={`/stack/${item.slug}`}
        className="group px-6 py-4 rounded-2xl bg-[#141517] hover:bg-[#1f2026] flex items-center gap-3.5 shrink-0 border border-white/[0.08] hover:border-[#e2b6ff]/60 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(226,182,255,0.2)] hover:-translate-y-1 cursor-pointer"
        title={`View architectural deep-dive & projects built with ${item.name}`}
      >
        <span 
          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
          style={{ backgroundColor: item.badgeColor }}
        />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg text-white group-hover:text-[#e2b6ff] transition-colors">
              {item.name}
            </span>
            <span className="material-symbols-outlined text-[14px] text-[#8d9194] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              arrow_outward
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#8d9194] uppercase tracking-wider">
            {item.categoryLabel}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <section className="relative w-full py-20 bg-[#0c0c0c] overflow-hidden flex flex-col gap-6 border-y border-white/[0.06]">
      {/* Header Bar */}
      <div className="px-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-[1800px] mx-auto w-full mb-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#e2b6ff] text-2xl">memory</span>
          <span className="font-mono text-sm sm:text-base uppercase tracking-widest text-[#c4c7ca] font-bold">
            TECHNICAL CORE // DEVELOPER STACK & TOOLING
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs uppercase tracking-wider border border-[#e2b6ff]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
            [ {data.techStack.length} Production Frameworks ]
          </span>
          <span className="hidden md:inline font-mono text-[11px] text-[#8d9194]">
            (CLICK ANY ITEM TO VIEW ARCHITECTURE & PROJECTS)
          </span>
        </div>
      </div>

      {/* Row 1: Left to Right Continuous Glide */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-right flex gap-4 items-center shrink-0">
          {row1Items.map(item => renderBadge(item))}
          {/* Duplicate for infinite loop */}
          {row1Items.map(item => renderBadge({ ...item, id: `${item.id}-dup1` }))}
          {row1Items.map(item => renderBadge({ ...item, id: `${item.id}-dup2` }))}
        </div>
      </div>

      {/* Row 2: Right to Left Continuous Glide */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-left flex gap-4 items-center shrink-0">
          {row2Items.map(item => renderBadge(item))}
          {/* Duplicate for infinite loop */}
          {row2Items.map(item => renderBadge({ ...item, id: `${item.id}-dup1` }))}
          {row2Items.map(item => renderBadge({ ...item, id: `${item.id}-dup2` }))}
        </div>
      </div>
    </section>
  );
}
