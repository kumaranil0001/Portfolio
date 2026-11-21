'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';

interface NavbarProps {
  onOpenLiveCms?: () => void;
}

export function Navbar({ onOpenLiveCms }: NavbarProps) {
  const { data } = usePortfolio();
  const [socialsOpen, setSocialsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0c0c0c]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_16px_rgba(0,0,0,0.5)]">
      <div className="h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Brand */}
        <Link href="/#hero" className="flex items-center gap-3 group">
          <span className="w-3 h-3 rounded-full bg-[#e2b6ff] shadow-[0_0_12px_#e2b6ff] group-hover:scale-125 transition-transform" />
          <span className="font-display text-xl sm:text-2xl tracking-tight text-white font-bold uppercase">
            {data.profile.moniker || 'ANIL404'}{' '}
            <span className="text-[#8d9194] font-light text-base sm:text-lg">/ AI & SOFTWARE</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#141517] border border-white/[0.05]">
          <Link
            href="/#about"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-all"
          >
            About
          </Link>
          <Link
            href="/#education"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-all"
          >
            Education
          </Link>
          <Link
            href="/#skills"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-all"
          >
            Skills
          </Link>
          <Link
            href="/#projects"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-all"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-all"
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Socials Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSocialsOpen(!socialsOpen)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#141517] hover:bg-[#24252a] text-[#c4c7ca] hover:text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/[0.08]"
              title="Social Media Channels"
            >
              <span className="material-symbols-outlined text-[16px] text-[#e2b6ff]">share</span>
              <span className="hidden sm:inline">Socials</span>
            </button>

            {socialsOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl bg-[#141517]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl z-50 flex flex-col gap-1"
                onMouseLeave={() => setSocialsOpen(false)}
              >
                {data.socials.filter(s => s.enabled).map(social => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-mono uppercase text-[#c4c7ca] hover:text-white hover:bg-[#24252a] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e2b6ff]" />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Admin CMS Button */}
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#6b0fa6]/30 border border-[#e2b6ff]/40 text-[#e2b6ff] hover:bg-[#6b0fa6]/60 hover:text-white transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_12px_rgba(226,182,255,0.15)]"
          >
            <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
            <span className="hidden sm:inline">ADMIN CMS</span>
          </Link>

          {/* Quick Drawer trigger */}
          {onOpenLiveCms && (
            <button
              onClick={onOpenLiveCms}
              className="w-9 h-9 rounded-full bg-white text-[#0c0c0c] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
              title="Open Quick Edit Drawer"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
