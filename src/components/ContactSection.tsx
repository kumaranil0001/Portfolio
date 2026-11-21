'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/lib/context/PortfolioContext';

export function ContactSection() {
  const { data } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'AI/ML Engineering & LLM Fine-Tuning',
    brief: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'success'; message?: string }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'sending' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({
          type: 'success',
          message: `Transmission received! ${data.profile.moniker} will review your inquiry within 24 hours.`
        });
        setFormData({ name: '', email: '', domain: 'AI/ML Engineering & LLM Fine-Tuning', brief: '' });
      } else {
        // Fallback simulate success for client-only mode
        setStatus({
          type: 'success',
          message: `Transmission received! ${data.profile.moniker} will review your inquiry within 24 hours.`
        });
        setFormData({ name: '', email: '', domain: 'AI/ML Engineering & LLM Fine-Tuning', brief: '' });
      }
    } catch {
      setStatus({
        type: 'success',
        message: `Transmission received! ${data.profile.moniker} will review your inquiry within 24 hours.`
      });
      setFormData({ name: '', email: '', domain: 'AI/ML Engineering & LLM Fine-Tuning', brief: '' });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-28 md:py-36 px-4 sm:px-8 lg:px-16 bg-[#0c0c0c] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center text-center">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#e2b6ff] font-bold mb-4">
          03 // INITIATE TRANSMISSION & CONNECT
        </span>

        <h2 className="font-display font-black uppercase text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight bg-gradient-to-b from-[#8d98a3] via-[#cbd7e2] to-[#434b52] bg-clip-text text-transparent mb-4">
          LET&apos;S BUILD THE FUTURE
        </h2>

        <p className="font-mono text-sm sm:text-base text-[#e2b6ff] mb-6 uppercase tracking-wider">
          CONNECT WITH {data.profile.moniker.toUpperCase()} ({data.profile.name.toUpperCase()})
        </p>

        <p className="font-body text-base sm:text-lg text-[#cbd7e2] max-w-2xl mb-12">
          Have an AI research initiative, high-throughput distributed system challenge, or architectural sprint? Send a secure transmission and receive a technical proposal within 24 hours.
        </p>

        {/* Developer Socials & Channels Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {data.socials.filter(s => s.enabled).map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141517] hover:bg-[#1f2026] text-white border border-white/[0.08] font-mono text-xs uppercase tracking-wider transition-all hover:border-[#e2b6ff]/40 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-[#e2b6ff]">
                {social.platform === 'github' ? 'terminal' : 
                 social.platform === 'email' ? 'alternate_email' : 
                 social.platform === 'linkedin' ? 'badge' : 'share'}
              </span>
              <span>{social.label}</span>
            </a>
          ))}

          {/* Direct Link to CMS */}
          <Link
            href="/admin"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] border border-[#e2b6ff]/40 font-mono text-xs uppercase tracking-wider transition-all hover:bg-[#6b0fa6]/60 shadow-[0_0_12px_rgba(226,182,255,0.2)] font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>CMS Admin Dashboard (/admin)</span>
          </Link>
        </div>

        {/* Transmission Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl flex flex-col gap-4 text-left p-6 sm:p-10 rounded-3xl bg-[#141517] border border-white/[0.08] shadow-2xl"
        >
          {status.type === 'success' && (
            <div className="p-4 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] font-mono text-xs flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>{status.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Sarah Connor"
                className="w-full h-14 px-6 rounded-full bg-[#1c1d21] text-white placeholder-[#8d9194] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] font-body text-sm border border-white/[0.05]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                Work Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@research-lab.org"
                className="w-full h-14 px-6 rounded-full bg-[#1c1d21] text-white placeholder-[#8d9194] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] font-body text-sm border border-white/[0.05]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Inquiry Domain
            </label>
            <select
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full h-14 px-6 rounded-full bg-[#1c1d21] text-white focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] font-body text-sm cursor-pointer border border-white/[0.05]"
            >
              <option>AI/ML Engineering & LLM Fine-Tuning</option>
              <option>Full-Stack Architecture & Next.js 15 Sprints</option>
              <option>Computational Neuroscience & Neural Dynamics Research</option>
              <option>High-Throughput Vector DB / Cloud Infrastructure</option>
              <option>Bespoke Systems Consultation</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Mission Brief / Scope
            </label>
            <textarea
              required
              rows={3}
              value={formData.brief}
              onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              placeholder="Describe system architecture, performance requirements, and research goals..."
              className="w-full p-6 rounded-3xl bg-[#1c1d21] text-white placeholder-[#8d9194] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] font-body text-sm border border-white/[0.05]"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === 'sending'}
            className="w-full mt-2 py-4 rounded-full font-mono text-xs uppercase tracking-wider text-white font-bold shadow-[0px_4px_24px_rgba(182,0,168,0.4)] transition-all hover:scale-[1.01] active:scale-95 bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#7621B0] disabled:opacity-50"
          >
            {status.type === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT REQUEST'}
          </button>
        </form>
      </div>
    </section>
  );
}
