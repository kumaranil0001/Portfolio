'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export function Footer() {
  const { data } = usePortfolio();

  return (
    <footer className="w-full bg-[#101114] py-16 border-t border-white/[0.08]">
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <span className="font-display text-xl font-bold text-white tracking-tight">
            {data.profile.brandTitle || data.profile.moniker} — {data.profile.name}
          </span>
          <span className="font-body text-xs sm:text-sm text-[#8d9194]">
            {data.academic.degree.split(' ')[0]} {data.academic.specialization} • Deep Learning • Distributed Systems
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#8d9194] flex-wrap justify-center">
          <Link href="/#about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/#education" className="hover:text-white transition-colors">
            Education
          </Link>
          <Link href="/#skills" className="hover:text-white transition-colors">
            Skills
          </Link>
          <Link href="/#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/admin" className="text-[#e2b6ff] hover:text-white transition-colors font-bold">
            CMS Admin (/admin)
          </Link>
        </div>

        <div className="font-mono text-xs text-[#8d9194]">
          © {new Date().getFullYear()} {data.profile.moniker} ({data.profile.name}). All rights reserved.
        </div>
      </div>
    </footer>
  );
}
