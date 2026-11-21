'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/lib/context/PortfolioContext';
import { ProjectItem, TechStackItem, SocialLink } from '@/lib/data/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    data, 
    updateProfile, 
    deleteAvatar,
    updateSocials,
    updateTechStack,
    addTechStack,
    deleteTechStack,
    updateProject,
    addProject,
    deleteProject,
    deleteProjectImage,
    updateCapabilities,
    updateAcademic,
    saveAllData,
    pushToSupabase,
    exportToJson,
    importFromJson
  } = usePortfolio();

  // Active Tab: 'bio' | 'socials' | 'stack' | 'projects' | 'services' | 'supabase'
  const [activeTab, setActiveTab] = useState<'bio' | 'socials' | 'stack' | 'projects' | 'services' | 'supabase'>('bio');
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Authenticated user state & session check
  const [currentUser, setCurrentUser] = useState<string>('Superuser');
  const [authChecked, setAuthChecked] = useState(false);

  React.useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session');
        const sessionData = await res.json();
        if (!res.ok || !sessionData.authenticated) {
          router.push('/admin/login');
        } else {
          setCurrentUser(sessionData.user?.email || sessionData.user?.id || 'superuser');
          setAuthChecked(true);
        }
      } catch {
        router.push('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Profile form local state (mirrored from context)
  const [profileForm, setProfileForm] = useState(data.profile);

  // Sync profileForm if data changes from outside
  React.useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  const handleProfileSave = () => {
    updateProfile(profileForm);
    showToast("Profile & Hero Identity Synchronized • Revalidated");
  };

  // Avatar Upload handler
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast("Uploading avatar to Supabase Storage...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      if (res.ok && resData.url) {
        updateProfile({ avatarUrl: resData.url });
        setProfileForm(prev => ({ ...prev, avatarUrl: resData.url }));
        showToast("Avatar updated & synced with Supabase CDN.");
      } else {
        showToast("Upload failed: " + (resData.error || 'Unknown error'));
      }
    } catch {
      showToast("Error uploading file to storage gateway.");
    }
  };

  // Project Screenshot Upload handler
  const handleProjectImageUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast("Uploading screenshot to Supabase Storage...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      if (res.ok && resData.url) {
        const targetProj = data.projects.find(p => p.id === projectId);
        if (targetProj) {
          const newImg = {
            id: `img_${Date.now()}`,
            url: resData.url,
            caption: `Screenshot // ${new Date().toLocaleTimeString()}`,
            type: 'sub_1' as const
          };
          updateProject({
            ...targetProj,
            images: [...(targetProj.images || []), newImg]
          });
          showToast("Project photo attached & published.");
        }
      }
    } catch {
      showToast("Error uploading project screenshot.");
    }
  };

  // Tech Stack addition state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'ai' | 'systems' | 'fullstack' | 'data' | 'tooling'>('ai');

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const name = newSkillName.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const colors: Record<string, string> = {
      ai: '#EE4C2C',
      systems: '#76B900',
      fullstack: '#3178C6',
      data: '#3ECF8E',
      tooling: '#E535AB'
    };

    const newItem: TechStackItem = {
      id: `tech_${Date.now()}`,
      slug,
      name,
      category: newSkillCategory,
      categoryLabel: newSkillCategory === 'ai' ? 'AI / Deep Learning' :
                     newSkillCategory === 'systems' ? 'Distributed Systems' :
                     newSkillCategory === 'fullstack' ? 'Full-Stack SSR' :
                     newSkillCategory === 'data' ? 'Relational & Vector' : 'Tooling',
      badgeColor: colors[newSkillCategory] || '#e2b6ff',
      iconName: 'memory',
      summary: `${name} integrated into active production pipelines.`,
      marqueeRow: (data.techStack.length % 2 === 0 ? 1 : 2) as (1 | 2),
      order: data.techStack.length + 1,
      description: `${name} powers scalable subsystems and asynchronous workloads across production environments.`,
      whyUsed: `High developer velocity, architectural determinism, and performance guarantees.`,
      architectureRole: `Core runtime component and microservice building block.`,
      keyFeatures: ['Asynchronous event routines', 'Type-safe interface boundaries', 'Optimized throughput'],
      associatedProjectIds: [],
      experienceYears: '2+ Years',
      status: 'active'
    };

    addTechStack(newItem);
    setNewSkillName('');
    showToast(`Engine Tag: ${name} Mounted in Running Marquee.`);
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    showToast("Logged out successfully.");
    router.push('/admin/login');
  };

  // Global Save & Supabase push
  const handleGlobalPush = async () => {
    showToast("Syncing with Supabase PostgreSQL & Storage...");
    const result = await pushToSupabase();
    if (result.success) {
      showToast(result.message || "Anil404 Studio DB Synchronized • Revalidated");
    } else {
      // Still saved in local persistence
      showToast("Saved locally. Supabase note: " + (result.error || "Credentials pending"));
    }
  };

  // JSON Backup helpers
  const handleDownloadBackup = () => {
    const jsonStr = exportToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anil404-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast("Configuration backup JSON downloaded.");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importFromJson(content)) {
        showToast("Backup configuration successfully restored!");
      } else {
        showToast("Invalid JSON backup structure.");
      }
    };
    reader.readAsText(file);
  };

  // Password change state & handler
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      showToast("Current and new password are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters.");
      return;
    }

    setPasswordChangeLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast(resData.message || "Admin password updated successfully!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast("Error: " + (resData.error || "Failed to update password"));
      }
    } catch {
      showToast("Network error contacting security gateway.");
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center font-mono text-sm text-[#e2b6ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#e2b6ff] border-t-transparent rounded-full animate-spin" />
          <span className="uppercase tracking-widest text-xs">Authenticating Session Gateway...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e5e2e1] antialiased flex flex-col lg:flex-row selection:bg-[#6b0fa6] selection:text-white">
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#1c1d21] text-white shadow-2xl border border-[#e2b6ff]/30 transition-all duration-300 transform ${
          toastMessage ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#e2b6ff] shadow-[0_0_12px_#e2b6ff] animate-ping" />
        <span className="font-mono text-xs uppercase tracking-wider text-white">
          {toastMessage || 'Anil404 Studio DB Synchronized • Revalidated'}
        </span>
        <span className="material-symbols-outlined text-[18px] text-[#3ECF8E]">check_circle</span>
      </div>

      {/* Left Obsidian Sidebar (Matching Stitch Screen 1) */}
      <aside className="w-full lg:w-72 bg-[#141517] border-r border-white/[0.08] flex flex-col justify-between py-6 px-4 shrink-0 z-40">
        <div className="flex flex-col gap-6">
          {/* Header Brand */}
          <div className="px-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#e2b6ff] shadow-[0_0_12px_#e2b6ff] animate-ping" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  {data.profile.moniker} CMS
                </span>
                <span className="font-mono text-[10px] text-[#8d9194] uppercase tracking-wider">
                  STUDIO CONTROL CENTER
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] font-mono text-[9px] font-bold uppercase tracking-wider border border-[#e2b6ff]/20">
              SUPABASE LIVE
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex flex-col gap-1.5 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('bio')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'bio' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'bio' ? 'text-[#e2b6ff]' : ''}`}>
                  dashboard
                </span>
                <span>1. Hero & Identity</span>
              </div>
              {activeTab === 'bio' && <span className="w-1.5 h-1.5 rounded-full bg-[#e2b6ff]" />}
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'socials' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'socials' ? 'text-[#e2b6ff]' : ''}`}>
                  share
                </span>
                <span>2. Socials & Links</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#1c1d21] text-[10px] font-mono text-[#e2b6ff]">
                {data.socials.filter(s => s.enabled).length} ACTIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stack')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'stack' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'stack' ? 'text-[#e2b6ff]' : ''}`}>
                  memory
                </span>
                <span>3. Tech Stack Matrix</span>
              </div>
              <span className="font-mono text-[10px] text-[#8d9194]">
                {data.techStack.length} Tools
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'projects' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'projects' ? 'text-[#e2b6ff]' : ''}`}>
                  folder_code
                </span>
                <span>4. Projects (CRUD)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] text-[10px] font-mono font-bold">
                {data.projects.length} LIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'services' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 'services' ? 'text-[#e2b6ff]' : ''}`}>
                psychology
              </span>
              <span>5. Skills & Academics</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'supabase' 
                  ? 'bg-[#24252a] text-white font-bold shadow-md border border-white/[0.08]' 
                  : 'text-[#8d9194] hover:bg-[#1c1d21] hover:text-[#c4c7ca]'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === 'supabase' ? 'text-[#e2b6ff]' : ''}`}>
                database
              </span>
              <span>6. Supabase & Vercel</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Footer */}
        <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1c1d21] hover:bg-[#24252a] text-white transition-all font-mono text-xs uppercase tracking-wider border border-white/[0.06]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e2b6ff] text-[16px]">captive_portal</span>
              <span>View Public Site</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-[#8d9194]">open_in_new</span>
          </Link>

          <div className="flex items-center justify-between px-2 font-mono text-[10px] text-[#8d9194]">
            <span className="flex items-center gap-1.5 truncate max-w-[160px]" title={currentUser}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] shrink-0" />
              <span className="truncate">USER: {currentUser}</span>
            </span>
            <button
              onClick={handleLogout}
              className="hover:text-red-400 transition-colors uppercase tracking-wider font-semibold shrink-0"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Control Panel Body */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0c0c0c]">
        {/* Top Control Bar */}
        <header className="h-16 bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#141517] border border-white/[0.08]">
              <span className="material-symbols-outlined text-[#e2b6ff] text-[16px]">terminal</span>
              <span className="font-mono text-xs uppercase tracking-wider text-white">
                Next.js 15 App Router • Bun • SSR Production
              </span>
            </div>
            <span className="hidden md:flex items-center gap-2 font-mono text-xs text-[#3ECF8E]">
              <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
              Synced with Public Portfolio
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGlobalPush}
              className="px-5 py-2 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(226,182,255,0.3)]"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
              <span>Save & Push to Supabase</span>
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
              {data.profile.avatarUrl ? (
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#e2b6ff]/40">
                  <Image
                    src={data.profile.avatarUrl}
                    alt={data.profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#6b0fa6] text-[#e2b6ff] flex items-center justify-center font-mono text-xs font-bold">
                  A
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-mono text-xs text-white font-bold leading-tight">
                  {data.profile.name}
                </span>
                <span className="font-mono text-[10px] text-[#e2b6ff] leading-none">
                  @{data.profile.moniker.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="p-6 lg:p-10 flex flex-col gap-8 max-w-[1600px] w-full">
          {/* Quick Metrics Ribbon (from Stitch) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                  Shipped Projects
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] font-mono text-[10px] font-semibold">
                  {data.projects.filter(p => p.published).length} Live
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-white">
                  0{data.projects.length}
                </span>
                <span className="font-mono text-xs text-[#8d9194]">
                  / 1 Research Draft
                </span>
              </div>
              <p className="font-body text-xs text-[#8d9194] truncate mt-1">
                {data.projects.map(p => p.title).join(', ')}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                  Tech Stack Index
                </span>
                <span className="material-symbols-outlined text-[#e2b6ff] text-[18px]">memory</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-white">
                  {data.techStack.length}
                </span>
                <span className="font-mono text-xs text-[#e2b6ff]">Frameworks</span>
              </div>
              <p className="font-body text-xs text-[#8d9194] truncate mt-1">
                {data.techStack.slice(0, 4).map(s => s.name).join(', ')}...
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                  Social Channels
                </span>
                <span className="material-symbols-outlined text-[#3ECF8E] text-[18px]">share</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-white">
                  {data.socials.filter(s => s.enabled).length}
                </span>
                <span className="font-mono text-xs text-[#3ECF8E]">+ Live Sync</span>
              </div>
              <p className="font-body text-xs text-[#8d9194] truncate mt-1">
                GitHub, Twitter/X, LinkedIn, Email
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141517] border border-[#e2b6ff]/30 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#c4c7ca] uppercase tracking-wider">
                  Supabase & Storage
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#3ECF8E]">
                  <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-ping" />
                  CONNECTED
                </span>
              </div>
              <div className="my-1">
                <span className="font-display text-lg font-bold text-white block">
                  PostgreSQL 16
                </span>
                <span className="font-mono text-[11px] text-[#e2b6ff]">
                  Latency: 12ms • pgvector
                </span>
              </div>
              <button
                onClick={handleGlobalPush}
                className="w-full mt-1 py-1.5 rounded-full bg-white text-[#0c0c0c] font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-[#cbd7e2] transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[14px]">sync</span>
                <span>Push Seed Data</span>
              </button>
            </div>
          </div>

          {/* TAB 1: BIO & HERO LIVE EDITOR */}
          {activeTab === 'bio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Edit Form */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="p-8 rounded-3xl bg-[#141517] border border-white/[0.08] flex flex-col gap-6 shadow-xl">
                  <div>
                    <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                      01 // PROFILE & IDENTITY CONFIGURATION
                    </span>
                    <h2 className="font-display font-bold text-2xl text-white">
                      Hero Manifesto & Author Bio
                    </h2>
                  </div>

                  {/* Photo Uploader & Remover */}
                  <div className="p-5 rounded-2xl bg-[#1c1d21] border border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {profileForm.avatarUrl ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-[#e2b6ff]/50 shadow-md">
                          <Image
                            src={profileForm.avatarUrl}
                            alt="Developer Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b0fa6] to-[#0c0c0c] border-2 border-[#e2b6ff]/40 flex items-center justify-center text-[#e2b6ff] shadow-md">
                          <span className="material-symbols-outlined text-2xl">neurology</span>
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="font-display font-bold text-base text-white">
                          {profileForm.avatarUrl ? 'Photo Active' : 'Generative Cyber Node (No Photo)'}
                        </span>
                        <span className="font-mono text-xs text-[#8d9194]">
                          {profileForm.avatarUrl ? 'Supabase CDN URL / S3 Bucket' : 'Graceful mesh fallback active'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-4 py-2 rounded-full bg-[#24252a] hover:bg-[#32343c] text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border border-white/[0.08]">
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        <span>Replace Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>

                      {profileForm.avatarUrl && (
                        <button
                          onClick={() => {
                            deleteAvatar();
                            setProfileForm(prev => ({ ...prev, avatarUrl: null }));
                            showToast("Photo removed. Intentional cyber mesh fallback activated.");
                          }}
                          className="px-3.5 py-2 rounded-full bg-[#1c1d21] hover:bg-red-500/20 text-[#8d9194] hover:text-red-400 font-mono text-xs uppercase tracking-wider transition-colors border border-white/[0.08]"
                          title="Remove Photo"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                        Developer Moniker / Handle
                      </label>
                      <input
                        type="text"
                        value={profileForm.moniker}
                        onChange={(e) => setProfileForm({ ...profileForm, moniker: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                      Hero Headline (Epilogue Black Display)
                    </label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                      Academic Credential & Availability Pill
                    </label>
                    <input
                      type="text"
                      value={profileForm.credential}
                      onChange={(e) => setProfileForm({ ...profileForm, credential: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                      Sub-Headline / Architectural Focus
                    </label>
                    <textarea
                      rows={2}
                      value={profileForm.subHeadline}
                      onChange={(e) => setProfileForm({ ...profileForm, subHeadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-wider text-[#8d9194]">
                      Extended Bio Dossier Narrative (About Me)
                    </label>
                    <textarea
                      rows={4}
                      value={profileForm.aboutBio}
                      onChange={(e) => setProfileForm({ ...profileForm, aboutBio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-body text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#e2b6ff] border border-white/[0.06]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                    <button
                      onClick={handleProfileSave}
                      className="px-8 py-3 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(226,182,255,0.3)]"
                    >
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      <span>Save Profile & Sync DB</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Live Viewport Card (Solid Inversion / Mirror from Stitch) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="sticky top-24 rounded-3xl bg-[#141517] p-6 border border-white/[0.08] shadow-xl">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#e2b6ff] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#e2b6ff] animate-pulse" />
                      Live Public Preview Refraction
                    </span>
                    <span className="font-mono text-xs text-[#8d9194]">
                      DESKTOP REACTION
                    </span>
                  </div>

                  {/* Mockup Card */}
                  <div className="p-8 rounded-2xl bg-[#0c0c0c] text-[#e5e2e1] shadow-2xl border border-white/[0.08] flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#6b0fa6]/25 blur-[60px] pointer-events-none rounded-full" />

                    <span className="px-3.5 py-1 rounded-full bg-[#1c1d21] border border-[#e2b6ff]/30 text-[#e2b6ff] font-mono text-[10px] tracking-wider uppercase mb-4 z-10">
                      {profileForm.credential || "B.Tech CSE (AI & ML) // Available for Sprints"}
                    </span>

                    {/* Developer Avatar in Mockup */}
                    <div className="relative mb-4 z-10">
                      {profileForm.avatarUrl ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden relative border-2 border-[#e2b6ff]/50 shadow-lg mx-auto">
                          <Image
                            src={profileForm.avatarUrl}
                            alt="Mockup Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6b0fa6] to-[#0c0c0c] border-2 border-[#e2b6ff]/40 flex items-center justify-center text-[#e2b6ff] shadow-lg mx-auto">
                          <span className="material-symbols-outlined text-3xl">neurology</span>
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#3ECF8E] border-2 border-[#0c0c0c]" />
                    </div>

                    <h3 className="font-display font-black text-2xl uppercase tracking-tight bg-gradient-to-b from-[#8d98a3] via-[#cbd7e2] to-[#434b52] bg-clip-text text-transparent mb-2">
                      {profileForm.tagline}
                    </h3>

                    <p className="font-mono text-xs text-[#e2b6ff] uppercase tracking-wider mb-3 font-semibold">
                      {profileForm.name} ({profileForm.moniker})
                    </p>

                    <p className="font-body text-xs text-[#8d9194] line-clamp-3 mb-4 leading-relaxed">
                      {profileForm.subHeadline}
                    </p>

                    <div className="flex items-center gap-2 pt-3 border-t border-white/[0.08] w-full justify-center font-mono text-[10px] text-[#8d9194]">
                      <span>{data.projects.length} CASE STUDIES</span>
                      <span>•</span>
                      <span>SUB-10MS LATENCY</span>
                      <span>•</span>
                      <span className="text-[#3ECF8E]">99.9% UPTIME</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-[#1c1d21] flex items-center justify-between px-4 border border-white/[0.05]">
                    <span className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                      Dynamic State Revalidation
                    </span>
                    <span className="font-mono text-xs text-[#3ECF8E] font-bold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOCIALS & CHANNELS MANAGER */}
          {activeTab === 'socials' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                    02 // NETWORK & SOCIAL MEDIA CHANNELS
                  </span>
                  <h2 className="font-display font-bold text-2xl text-white">
                    Public Social Channels & Contact Endpoints
                  </h2>
                </div>
                <button
                  onClick={() => {
                    const newSocial: SocialLink = {
                      id: `soc_${Date.now()}`,
                      platform: 'custom',
                      label: 'New Channel',
                      url: 'https://',
                      enabled: true
                    };
                    updateSocials([...data.socials, newSocial]);
                    showToast("New social link channel added.");
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Social Channel</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.socials.map((social) => (
                  <div 
                    key={social.id}
                    className="p-5 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col gap-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[#e2b6ff] text-xl">
                          {social.platform === 'github' ? 'terminal' : 
                           social.platform === 'email' ? 'alternate_email' : 
                           social.platform === 'linkedin' ? 'badge' : 'share'}
                        </span>
                        <input
                          type="text"
                          value={social.label}
                          onChange={(e) => {
                            const updated = data.socials.map(s => s.id === social.id ? { ...s, label: e.target.value } : s);
                            updateSocials(updated);
                          }}
                          className="bg-transparent font-display font-bold text-base text-white focus:outline-none focus:bg-[#1c1d21] px-2 py-1 rounded"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = data.socials.map(s => s.id === social.id ? { ...s, enabled: !s.enabled } : s);
                            updateSocials(updated);
                          }}
                          className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold transition-colors ${
                            social.enabled 
                              ? 'bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]/30' 
                              : 'bg-white/[0.05] text-[#8d9194]'
                          }`}
                        >
                          {social.enabled ? 'ACTIVE' : 'MUTED'}
                        </button>
                        <button
                          onClick={() => {
                            const updated = data.socials.filter(s => s.id !== social.id);
                            updateSocials(updated);
                            showToast(`Channel ${social.label} removed.`);
                          }}
                          className="material-symbols-outlined text-[#8d9194] hover:text-red-400 text-lg transition-colors"
                          title="Delete Link"
                        >
                          delete
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-[#8d9194]">
                        Destination URL / Target Address
                      </label>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => {
                          const updated = data.socials.map(s => s.id === social.id ? { ...s, url: e.target.value } : s);
                          updateSocials(updated);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1d21] text-[#e5e2e1] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#e2b6ff] border border-white/[0.05]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TECH STACK & MARQUEE MATRIX */}
          {activeTab === 'stack' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                    03 // DEVELOPER TOOLING & KERNEL COMPILERS
                  </span>
                  <h2 className="font-display font-bold text-2xl text-white">
                    Running Marquee Tech Matrix & Dedicated Pages
                  </h2>
                </div>
                <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#141517] text-[#e2b6ff] border border-[#e2b6ff]/30">
                  {data.techStack.length} Active Badges (Clicking each opens `/stack/[slug]`)
                </span>
              </div>

              {/* Add New Badge Bar */}
              <div className="p-4 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
                <span className="material-symbols-outlined text-[#8d9194] pl-2 hidden sm:inline">add_box</span>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="Mount technology (e.g. Triton, FlashAttention, Ray, Kubernetes)..."
                  className="w-full bg-[#1c1d21] sm:bg-transparent px-4 py-2 sm:px-0 rounded-xl text-white font-mono text-xs focus:outline-none"
                />
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-[#1c1d21] text-xs font-mono text-white focus:outline-none border border-white/[0.05]"
                >
                  <option value="ai">AI / Deep Learning</option>
                  <option value="systems">Distributed Systems</option>
                  <option value="fullstack">Full-Stack SSR</option>
                  <option value="data">Relational & Vector</option>
                  <option value="tooling">Tooling</option>
                </select>
                <button
                  onClick={handleAddSkill}
                  className="px-6 py-2.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shrink-0"
                >
                  Mount Badge
                </button>
              </div>

              {/* Tag Stream & Configuration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.techStack.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col justify-between gap-4 shadow-sm hover:border-[#e2b6ff]/40 transition-colors"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: item.badgeColor }}
                          />
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updated = data.techStack.map(s => s.id === item.id ? { ...s, name: e.target.value } : s);
                              updateTechStack(updated);
                            }}
                            className="font-display font-bold text-lg text-white bg-transparent focus:outline-none focus:bg-[#1c1d21] px-1 rounded"
                          />
                        </div>
                        <button
                          onClick={() => {
                            deleteTechStack(item.id);
                            showToast(`Badge ${item.name} unmounted.`);
                          }}
                          className="material-symbols-outlined text-[#8d9194] hover:text-red-400 text-lg transition-colors"
                          title="Delete Badge"
                        >
                          close
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#e2b6ff] uppercase tracking-wider">
                          Row {item.marqueeRow}
                        </span>
                        <span className="text-[#8d9194]">•</span>
                        <span className="font-mono text-[10px] text-[#8d9194] uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                      </div>

                      <textarea
                        rows={2}
                        value={item.summary}
                        onChange={(e) => {
                          const updated = data.techStack.map(s => s.id === item.id ? { ...s, summary: e.target.value } : s);
                          updateTechStack(updated);
                        }}
                        className="w-full p-2.5 rounded-xl bg-[#1c1d21] text-xs font-body text-[#c4c7ca] focus:outline-none border border-white/[0.05]"
                      />
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <button
                        onClick={() => {
                          const nextRow: 1 | 2 = item.marqueeRow === 1 ? 2 : 1;
                          const updated = data.techStack.map(s => s.id === item.id ? { ...s, marqueeRow: nextRow } : s);
                          updateTechStack(updated);
                          showToast(`Moved ${item.name} to Marquee Row ${nextRow}.`);
                        }}
                        className="font-mono text-[11px] text-[#8d9194] hover:text-white transition-colors"
                      >
                        Toggle Row ({item.marqueeRow === 1 ? '1 ➔ 2' : '2 ➔ 1'})
                      </button>

                      <Link
                        href={`/stack/${item.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e2b6ff] hover:underline"
                      >
                        <span>Open Page</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS & RESEARCH CRUD */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                    04 // REPOSITORY & SYSTEM CASE STUDIES (CRUD)
                  </span>
                  <h2 className="font-display font-bold text-2xl text-white">
                    Featured Research Projects & Photo Control
                  </h2>
                </div>
                <button
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: `proj_${Date.now()}`,
                      slug: `new-system-${Date.now()}`,
                      title: "New AI Architecture",
                      category: "AI / Distributed Systems",
                      categoryTag: "AI / Systems",
                      summary: "High-performance inference engine built with Next.js, PyTorch & Supabase.",
                      description: "Autonomous high-throughput systems case study analyzing real-time vector embeddings and distributed execution.",
                      problemStatement: "Solving high-dimensional non-stationary data streams with sub-millisecond deterministic latencies.",
                      architectureDetails: "Engineered with custom CUDA memory pools, Redis caching buffers, and Next.js 15 UI telemetry viewports.",
                      techStackTags: ["Next.js 15", "PyTorch", "Supabase", "TypeScript", "Docker"],
                      githubUrl: "https://github.com/anil404/new-system",
                      liveUrl: "https://demo.anil404.dev",
                      metrics: [
                        { label: "LATENCY", value: "<10MS" },
                        { label: "UPTIME", value: "99.9%" }
                      ],
                      images: [],
                      published: true,
                      featured: true
                    };
                    addProject(newProj);
                    showToast("New Research Case Study Initialized.");
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Add New Research Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="flex flex-col gap-8">
                {data.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 sm:p-8 rounded-3xl bg-[#141517] border border-white/[0.08] flex flex-col gap-6 shadow-xl"
                  >
                    {/* Project Top Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#6b0fa6]/30 text-[#e2b6ff] font-mono text-xs font-bold uppercase tracking-wider border border-[#e2b6ff]/30">
                          {project.published ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => {
                            updateProject({ ...project, category: e.target.value });
                          }}
                          className="bg-[#1c1d21] px-3 py-1 rounded-lg text-xs font-mono text-[#8d9194] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateProject({ ...project, published: !project.published });
                            showToast(`Project ${project.title} ${!project.published ? 'published' : 'unpublished'}.`);
                          }}
                          className="px-4 py-1.5 rounded-full bg-[#1c1d21] hover:bg-[#24252a] text-white font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          {project.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => {
                            deleteProject(project.id);
                            showToast(`Project ${project.title} removed.`);
                          }}
                          className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Title & Description Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject({ ...project, title: e.target.value })}
                          className="px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-display font-bold text-lg focus:outline-none focus:ring-1 focus:ring-[#e2b6ff] border border-white/[0.05]"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                          Tech Stack Tags (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={project.techStackTags.join(', ')}
                          onChange={(e) => updateProject({ 
                            ...project, 
                            techStackTags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                          })}
                          className="px-4 py-3 rounded-xl bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#e2b6ff] border border-white/[0.05]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                        Full Architectural Narrative / Problem Statement
                      </label>
                      <textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => updateProject({ ...project, description: e.target.value })}
                        className="p-4 rounded-xl bg-[#1c1d21] text-white font-body text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#e2b6ff] border border-white/[0.05]"
                      />
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1d21] border border-white/[0.05]">
                        <span className="material-symbols-outlined text-[16px] text-[#8d9194]">code</span>
                        <input
                          type="text"
                          placeholder="GitHub Repository URL"
                          value={project.githubUrl}
                          onChange={(e) => updateProject({ ...project, githubUrl: e.target.value })}
                          className="bg-transparent text-xs font-mono text-white w-full focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1d21] border border-white/[0.05]">
                        <span className="material-symbols-outlined text-[16px] text-[#8d9194]">link</span>
                        <input
                          type="text"
                          placeholder="Live Demo Deployment URL"
                          value={project.liveUrl}
                          onChange={(e) => updateProject({ ...project, liveUrl: e.target.value })}
                          className="bg-transparent text-xs font-mono text-white w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* PHOTO & SCREENSHOT MANAGER - "DOES NOT CARE IF IT REMOVE" */}
                    <div className="p-5 rounded-2xl bg-[#101114] border border-white/[0.06] flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#e2b6ff] text-lg">photo_library</span>
                          <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                            Visual Assets & Screenshots ({project.images?.length || 0})
                          </span>
                        </div>

                        <label className="px-4 py-1.5 rounded-full bg-[#1c1d21] hover:bg-[#24252a] text-[#e2b6ff] font-mono text-xs uppercase tracking-wider cursor-pointer border border-[#e2b6ff]/30 flex items-center gap-1.5 transition-all">
                          <span className="material-symbols-outlined text-[15px]">add_photo_alternate</span>
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleProjectImageUpload(project.id, e)}
                          />
                        </label>
                      </div>

                      {/* Photo Thumbnails with instant Single-Click Removal */}
                      {project.images && project.images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {project.images.map((img, imgIdx) => (
                            <div 
                              key={img.id || imgIdx}
                              className="relative h-40 rounded-xl overflow-hidden bg-[#1c1d21] group border border-white/[0.08]"
                            >
                              <Image
                                src={img.url}
                                alt={img.caption || `Image ${imgIdx + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                                <span className="font-mono text-[10px] text-white truncate">
                                  {img.caption || `Screenshot ${imgIdx + 1}`}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteProjectImage(project.id, img.id);
                                    showToast("Photo removed seamlessly. Layout dynamically adapted.");
                                  }}
                                  className="self-end px-3 py-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-colors shadow-lg flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[13px]">delete</span>
                                  <span>Remove Photo</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 rounded-xl bg-[#1c1d21]/60 border border-white/[0.04] text-center flex flex-col items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-[#8d9194] mb-2">image_not_supported</span>
                          <span className="font-mono text-xs text-[#8d9194]">
                            No photo attached — Intentional cyber blueprint & telemetry canvas active on public site.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAPABILITIES & ACADEMICS */}
          {activeTab === 'services' && (
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                  05 // CAPABILITIES MATRIX & ACADEMIC DEGREE
                </span>
                <h2 className="font-display font-bold text-2xl text-white">
                  5 Engineering Domains & Degree Specialization
                </h2>
              </div>

              {/* Academic Degree Module */}
              <div className="p-6 rounded-3xl bg-[#141517] border border-[#e2b6ff]/30 flex flex-col gap-4 shadow-xl">
                <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-wider font-bold">
                  ACADEMIC DEGREE // HONOURS PURSUIT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs text-[#8d9194] uppercase">Degree Title</label>
                    <input
                      type="text"
                      value={data.academic.degree}
                      onChange={(e) => updateAcademic({ ...data.academic, degree: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-[#1c1d21] text-white font-display font-bold text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-xs text-[#8d9194] uppercase">Specialization</label>
                    <input
                      type="text"
                      value={data.academic.specialization}
                      onChange={(e) => updateAcademic({ ...data.academic, specialization: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 5 Domains Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.capabilities.map((cap) => (
                  <div key={cap.id} className="p-6 rounded-2xl bg-[#141517] border border-white/[0.08] flex flex-col gap-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#1c1d21] text-[#e2b6ff] font-mono text-xs font-bold">
                        {cap.number}
                      </span>
                      <span className="material-symbols-outlined text-[#e2b6ff]">{cap.icon}</span>
                    </div>
                    <input
                      type="text"
                      value={cap.title}
                      onChange={(e) => {
                        const updated = data.capabilities.map(c => c.id === cap.id ? { ...c, title: e.target.value } : c);
                        updateCapabilities(updated);
                      }}
                      className="font-display font-bold text-lg text-white bg-transparent focus:outline-none"
                    />
                    <textarea
                      rows={3}
                      value={cap.description}
                      onChange={(e) => {
                        const updated = data.capabilities.map(c => c.id === cap.id ? { ...c, description: e.target.value } : c);
                        updateCapabilities(updated);
                      }}
                      className="p-3 rounded-xl bg-[#1c1d21] text-xs font-body text-[#c4c7ca] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SUPABASE & VERCEL CENTER */}
          {activeTab === 'supabase' && (
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-mono text-xs text-[#e2b6ff] uppercase tracking-widest block mb-1">
                  06 // CLOUD INFRASTRUCTURE & BACKUP
                </span>
                <h2 className="font-display font-bold text-2xl text-white">
                  Supabase Database, Storage & Vercel Hosting Center
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Supabase Operations */}
                <div className="p-8 rounded-3xl bg-[#141517] border border-white/[0.08] flex flex-col gap-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#3ECF8E] text-2xl">database</span>
                    <h3 className="font-display font-bold text-xl text-white">
                      Supabase Cloud Sync
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#8d9194] leading-relaxed">
                    Synchronize all current projects, tech stack badges, social links, and identity parameters directly to your PostgreSQL database.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleGlobalPush}
                      className="w-full py-3.5 rounded-full bg-[#3ECF8E] text-[#0c0c0c] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(62,207,142,0.3)]"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      <span>Push All Seed Data to Supabase</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`-- Run schema.sql in Supabase SQL editor`);
                        showToast("SQL script location referenced in src/lib/supabase/schema.sql");
                      }}
                      className="w-full py-3 rounded-full bg-[#1c1d21] hover:bg-[#24252a] text-white font-mono text-xs uppercase tracking-wider transition-colors border border-white/[0.08]"
                    >
                      Copy SQL Schema (schema.sql)
                    </button>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="p-8 rounded-3xl bg-[#141517] border border-white/[0.08] flex flex-col gap-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#e2b6ff] text-2xl">save_as</span>
                    <h3 className="font-display font-bold text-xl text-white">
                      JSON Vault Export & Import
                    </h3>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-[#8d9194] leading-relaxed">
                    Export your complete site snapshot to a portable JSON document, or restore previously saved configurations with one click.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleDownloadBackup}
                      className="w-full py-3.5 rounded-full bg-[#e2b6ff] text-[#4d007b] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(226,182,255,0.3)]"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Export Configuration JSON</span>
                    </button>

                    <label className="w-full py-3 rounded-full bg-[#1c1d21] hover:bg-[#24252a] text-white font-mono text-xs uppercase tracking-wider transition-colors border border-white/[0.08] cursor-pointer flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      <span>Restore from JSON File</span>
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={handleImportBackup}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Owner Security & Password Management Card */}
              <div className="p-8 rounded-3xl bg-[#141517] border border-red-500/20 flex flex-col gap-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-2xl">lock</span>
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">
                        Owner Security & Admin Password
                      </h3>
                      <span className="font-mono text-xs text-[#8d9194]">
                        Single-Operator Access: Anil Kumar Rout (anilcollage001@gmail.com / Anil404)
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-red-500/30 self-start sm:self-auto">
                    PROTECTED GATEWAY
                  </span>
                </div>

                <p className="font-body text-xs sm:text-sm text-[#8d9194] leading-relaxed">
                  Update your personal admin passkey. The change takes effect immediately on disk and in memory. Only you can log in to modify this portfolio.
                </p>

                <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm border border-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm border border-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs text-[#8d9194] uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="px-4 py-3 rounded-xl bg-[#1c1d21] text-white font-mono text-sm border border-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#e2b6ff]"
                    />
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordChangeLoading}
                      className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(239,68,68,0.3)] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">key</span>
                      <span>{passwordChangeLoading ? 'UPDATING PASSKEY...' : 'UPDATE ADMIN PASSWORD'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Vercel Hosting Guide Card */}
              <div className="p-8 rounded-3xl bg-[#141517] border border-white/[0.08] flex flex-col gap-4 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#e2b6ff]">rocket_launch</span>
                  <h3 className="font-display font-bold text-xl text-white">
                    Vercel Hosting & Production Deployment
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.05]">
                    <span className="text-[#8d9194] block mb-1">BUILD COMMAND</span>
                    <span className="text-[#3ECF8E] font-bold">bun run build</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.05]">
                    <span className="text-[#8d9194] block mb-1">FRAMEWORK PRESET</span>
                    <span className="text-white font-bold">Next.js</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.05]">
                    <span className="text-[#8d9194] block mb-1">INSTALL COMMAND</span>
                    <span className="text-[#e2b6ff] font-bold">bun install</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1c1d21] border border-white/[0.05] flex flex-col gap-2 font-mono text-xs text-[#8d9194]">
                  <span className="text-white font-semibold">Recommended Vercel Environment Variables:</span>
                  <p>• NEXT_PUBLIC_SUPABASE_URL = your-supabase-project-url</p>
                  <p>• NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key</p>
                  <p>• SUPABASE_SERVICE_ROLE_KEY = your-supabase-service-role-key</p>
                  <p>• ADMIN_SECRET_KEY = your-custom-admin-password (default: admin123456)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
