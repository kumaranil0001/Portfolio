'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';

interface LiveCmsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveCmsDrawer({ isOpen, onClose }: LiveCmsDrawerProps) {
  const { data, updateProfile, resetToDefaults } = usePortfolio();

  const [tagline, setTagline] = useState(data.profile.tagline);
  const [subHeadline, setSubHeadline] = useState(data.profile.subHeadline);
  const [aboutBio, setAboutBio] = useState(data.profile.aboutBio);

  useEffect(() => {
    setTagline(data.profile.tagline);
    setSubHeadline(data.profile.subHeadline);
    setAboutBio(data.profile.aboutBio);
  }, [data.profile]);

  if (!isOpen) return null;

  const handleApply = () => {
    updateProfile({
      tagline,
      subHeadline,
      aboutBio
    });
    onClose();
  };

  const handleReset = () => {
    resetToDefaults();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="h-full w-full sm:w-[460px] bg-[#141517]/95 backdrop-blur-2xl shadow-2xl flex flex-col p-6 sm:p-8 overflow-y-auto border-l border-white/[0.1] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2b6ff] animate-ping" />
            <h4 className="font-display text-xl font-bold text-white">
              {data.profile.moniker} Quick Studio CMS
            </h4>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c1d21] flex items-center justify-center hover:bg-[#24252a] text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <div className="p-4 rounded-2xl bg-[#6b0fa6]/20 border border-[#e2b6ff]/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-mono text-[#e2b6ff] font-bold block">
                FULL CONTROL CENTER
              </span>
              <span className="text-xs font-mono text-white">
                Access complete dashboard & Supabase storage
              </span>
            </div>
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs font-bold uppercase hover:brightness-110"
            >
              /admin
            </Link>
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194] block mb-2">
              Hero Headline (Display Font)
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#1c1d21] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] font-body border border-white/[0.06]"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194] block mb-2">
              Hero Architectural Sub-Headline
            </label>
            <textarea
              rows={2}
              value={subHeadline}
              onChange={(e) => setSubHeadline(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#1c1d21] text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194] block mb-2">
              About Bio Narrative
            </label>
            <textarea
              rows={5}
              value={aboutBio}
              onChange={(e) => setAboutBio(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#1c1d21] text-white text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
            />
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <button
              onClick={handleApply}
              className="w-full py-3.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Apply Changes Instantly
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-full bg-[#1c1d21] text-[#8d9194] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Reset to Factory Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
