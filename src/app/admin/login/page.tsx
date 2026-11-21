'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [identity, setIdentity] = useState('anilcollage001@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: identity.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Identity confirmed. Welcome back, Anil.');
        setTimeout(() => {
          router.push('/admin');
        }, 500);
      } else {
        setError(data.error || 'Access denied. Invalid credentials.');
      }
    } catch {
      setError('Connection failure: Unable to reach security gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6b0fa6]/20 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[400px] bg-[#BE4C00]/15 blur-[180px] pointer-events-none rounded-full" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#141517] border border-white/[0.08] shadow-2xl flex flex-col gap-6 text-left">
        {/* Emblem & Private Security Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e2b6ff] shadow-[0_0_12px_#e2b6ff] animate-pulse" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white tracking-wide">ANIL404 CMS</span>
              <span className="font-mono text-[10px] text-[#8d9194] uppercase tracking-wider">
                PORTFOLIO CONTROL CENTER
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-[9px] font-bold uppercase tracking-wider border border-red-500/20">
            OWNER ONLY
          </span>
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl text-white">
            Private Admin Console
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#8d9194] mt-1 leading-relaxed">
            Restricted terminal for Anil Kumar Rout (Anil404). Only the authorized portfolio owner can modify content, stack, and projects.
          </p>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">lock</span>
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Owner Identity (Email / Moniker)
            </label>
            <input
              type="text"
              required
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              placeholder="anilcollage001@gmail.com or anil404"
              className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06] transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
              Security Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your security passkey"
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#1c1d21] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8d9194] hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(226,182,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">lock_open</span>
            <span>{loading ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE AS OWNER'}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#8d9194]">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Back to Public Site</span>
          </Link>
          <span className="text-[#3ECF8E] flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
            TLS 1.3 // AES-256
          </span>
        </div>
      </div>
    </div>
  );
}
