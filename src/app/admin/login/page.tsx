'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('anilcollage001@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setError('Connection error occurred while contacting auth gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6b0fa6]/25 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[400px] bg-[#BE4C00]/15 blur-[180px] pointer-events-none rounded-full" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#141517] border border-white/[0.08] shadow-2xl flex flex-col gap-6 text-left">
        {/* Emblem */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#e2b6ff] shadow-[0_0_12px_#e2b6ff] animate-ping" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white">ANIL404 CMS</span>
              <span className="font-mono text-[10px] text-[#8d9194] uppercase tracking-wider">
                STUDIO CONTROL CENTER
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#e2b6ff]/30">
            SUPABASE AUTH
          </span>
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl text-white">
            Authenticate Session
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#8d9194] mt-1">
            Access live catalog, Supabase storage bucket, tech stack matrix, and project editor.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Admin Identity / Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anilcollage001@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Passkey / Master Secret
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
            />
          </div>

          {/* Quick Demo Secret Fill Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1d21] border border-white/[0.05] text-xs font-mono">
            <span className="text-[#8d9194]">Default Master Passkey:</span>
            <button
              type="button"
              onClick={() => setPassword('admin123456')}
              className="px-2.5 py-1 rounded bg-[#6b0fa6]/40 hover:bg-[#6b0fa6]/80 text-[#e2b6ff] font-bold tracking-wider transition-colors"
            >
              Fill &apos;admin123456&apos;
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(226,182,255,0.3)] disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING GATEWAY...' : 'ENTER CONTROL CENTER'}
          </button>
        </form>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#8d9194]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Back to Public Site</span>
          </Link>
          <span className="text-[#3ECF8E]">TLS 1.3 SECURE</span>
        </div>
      </div>
    </div>
  );
}
