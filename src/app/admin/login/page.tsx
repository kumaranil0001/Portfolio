'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

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
        setSuccessMsg(data.message || 'Identity verified. Access granted.');
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
            RESTRICTED
          </span>
        </div>

        <div>
          <h2 className="font-display font-bold text-2xl text-white">
            Private Admin Console
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#8d9194] mt-1 leading-relaxed">
            Restricted administrative gateway. Authorized personnel only. All access attempts are verified and recorded.
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
              Administrator ID / Email
            </label>
            <input
              type="text"
              required
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              placeholder="Enter your email or moniker"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06] transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                Security Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-mono text-[#e2b6ff] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
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

      {/* Forgot Password Recovery Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg p-7 rounded-3xl bg-[#141517] border border-white/[0.1] shadow-2xl flex flex-col gap-5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#e2b6ff] text-2xl">vpn_key</span>
                <h3 className="font-display font-bold text-xl text-white">
                  Admin Passkey Recovery
                </h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full bg-[#1c1d21] hover:bg-[#282a30] flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#8d9194] leading-relaxed">
              Because this is a private single-operator terminal, credentials cannot be reset publicly. If you forgot your password, choose one of these recovery methods:
            </p>

            <div className="flex flex-col gap-3 font-mono text-xs">
              {/* Option 1 */}
              <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex flex-col gap-1.5">
                <span className="text-[#3ECF8E] font-bold">METHOD 1: In Production (Vercel)</span>
                <p className="text-[#8d9194]">
                  Go to your <span className="text-white">Vercel Dashboard → Project Settings → Environment Variables</span>, edit <span className="text-[#e2b6ff]">ADMIN_SECRET_KEY</span> to your new password, and redeploy.
                </p>
              </div>

              {/* Option 2 */}
              <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex flex-col gap-1.5">
                <span className="text-[#e2b6ff] font-bold">METHOD 2: Terminal Reset (Local)</span>
                <p className="text-[#8d9194]">Run this command in your project terminal to set a new password:</p>
                <code className="p-2.5 rounded-xl bg-[#0c0c0c] text-[#e2b6ff] select-all">
                  bun run reset-password &lt;new_password&gt;
                </code>
              </div>

              {/* Option 3 */}
              <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex flex-col gap-1.5">
                <span className="text-orange-400 font-bold">METHOD 3: Environment File (.env.local)</span>
                <p className="text-[#8d9194]">Open your local <span className="text-white">.env.local</span> file and change:</p>
                <code className="p-2.5 rounded-xl bg-[#0c0c0c] text-white select-all">
                  ADMIN_SECRET_KEY=your_new_password
                </code>
              </div>
            </div>

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full py-3 rounded-full bg-[#1c1d21] hover:bg-[#282a30] text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/[0.08]"
            >
              Close Recovery Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
