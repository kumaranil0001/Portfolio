'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  PortfolioData, 
  ProfileConfig, 
  SocialLink, 
  TechStackItem, 
  ProjectItem, 
  CapabilityDomain, 
  AcademicMilestone 
} from '../data/types';
import { initialPortfolioData } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../supabase/client';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  saveAllData: (updated: PortfolioData) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (profileUpdates: Partial<ProfileConfig>) => void;
  deleteAvatar: () => void;
  updateSocials: (socials: SocialLink[]) => void;
  updateTechStack: (stack: TechStackItem[]) => void;
  addTechStack: (item: TechStackItem) => void;
  deleteTechStack: (id: string) => void;
  updateProject: (project: ProjectItem) => void;
  addProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  deleteProjectImage: (projectId: string, imageId: string) => void;
  updateCapabilities: (capabilities: CapabilityDomain[]) => void;
  updateAcademic: (academic: AcademicMilestone) => void;
  resetToDefaults: () => void;
  pushToSupabase: () => Promise<{ success: boolean; error?: string; message?: string }>;
  exportToJson: () => string;
  importFromJson: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'anil404_portfolio_data_v2';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Load initial data from localStorage and/or Supabase
  useEffect(() => {
    async function loadData() {
      let loadedData = initialPortfolioData;

      // 1. First check localStorage for instant responsiveness
      if (typeof window !== 'undefined') {
        try {
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            loadedData = {
              profile: { ...initialPortfolioData.profile, ...(parsed.profile || {}) },
              socials: parsed.socials || initialPortfolioData.socials,
              techStack: parsed.techStack || initialPortfolioData.techStack,
              projects: parsed.projects || initialPortfolioData.projects,
              capabilities: parsed.capabilities || initialPortfolioData.capabilities,
              academic: parsed.academic || initialPortfolioData.academic,
            };
            setData(loadedData);
          }
        } catch (e) {
          console.warn('Error reading from localStorage:', e);
        }
      }

      // 2. If Supabase is configured, test connection & try to pull live master records
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: configRows, error: configError } = await supabase
            .from('portfolio_config')
            .select('*')
            .eq('id', 'main')
            .single();

          if (!configError && configRows) {
            setIsSupabaseConnected(true);
            const { data: projectRows } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
            const { data: stackRows } = await supabase.from('tech_stack').select('*').order('sort_order', { ascending: true });

            const supabaseHydratedData: PortfolioData = {
              profile: configRows.profile || loadedData.profile,
              socials: configRows.socials || loadedData.socials,
              capabilities: configRows.capabilities || loadedData.capabilities,
              academic: configRows.academic || loadedData.academic,
              projects: projectRows && projectRows.length > 0 ? (projectRows as unknown as ProjectItem[]) : loadedData.projects,
              techStack: stackRows && stackRows.length > 0 ? (stackRows as unknown as TechStackItem[]) : loadedData.techStack,
            };

            setData(supabaseHydratedData);
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseHydratedData));
            }
          } else {
            // Table might not exist or be empty yet
            setIsSupabaseConnected(true);
          }
        } catch (err) {
          console.warn('Supabase fetch error:', err);
          setIsSupabaseConnected(false);
        }
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  // Internal helper to persist state
  const persistState = async (nextData: PortfolioData): Promise<{ success: boolean; error?: string }> => {
    setData(nextData);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      window.dispatchEvent(new Event('portfolio_data_updated'));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('portfolio_config')
          .upsert({
            id: 'main',
            profile: nextData.profile,
            socials: nextData.socials,
            capabilities: nextData.capabilities,
            academic: nextData.academic,
            updated_at: new Date().toISOString()
          });

        return { success: true };
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Supabase auto-sync error:', error);
        return { success: false, error: error?.message || 'Failed to sync to Supabase' };
      }
    }

    return { success: true };
  };

  const saveAllData = async (updated: PortfolioData) => {
    return await persistState(updated);
  };

  const updateProfile = (profileUpdates: Partial<ProfileConfig>) => {
    const updated: PortfolioData = {
      ...data,
      profile: {
        ...data.profile,
        ...profileUpdates
      }
    };
    persistState(updated);
  };

  const deleteAvatar = () => {
    const updated: PortfolioData = {
      ...data,
      profile: {
        ...data.profile,
        avatarUrl: null
      }
    };
    persistState(updated);
  };

  const updateSocials = (socials: SocialLink[]) => {
    const updated: PortfolioData = { ...data, socials };
    persistState(updated);
  };

  const updateTechStack = (techStack: TechStackItem[]) => {
    const updated: PortfolioData = { ...data, techStack };
    persistState(updated);
  };

  const addTechStack = (item: TechStackItem) => {
    const updated: PortfolioData = {
      ...data,
      techStack: [...data.techStack, item]
    };
    persistState(updated);
  };

  const deleteTechStack = (id: string) => {
    const updated: PortfolioData = {
      ...data,
      techStack: data.techStack.filter(s => s.id !== id)
    };
    persistState(updated);
  };

  const updateProject = (project: ProjectItem) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.map(p => p.id === project.id ? project : p)
    };
    persistState(updated);
  };

  const addProject = (project: ProjectItem) => {
    const updated: PortfolioData = {
      ...data,
      projects: [...data.projects, project]
    };
    persistState(updated);
  };

  const deleteProject = (id: string) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    };
    persistState(updated);
  };

  const deleteProjectImage = (projectId: string, imageId: string) => {
    const updatedProjects = data.projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          images: p.images.filter(img => img.id !== imageId)
        };
      }
      return p;
    });

    const updated: PortfolioData = {
      ...data,
      projects: updatedProjects
    };
    persistState(updated);
  };

  const updateCapabilities = (capabilities: CapabilityDomain[]) => {
    const updated: PortfolioData = { ...data, capabilities };
    persistState(updated);
  };

  const updateAcademic = (academic: AcademicMilestone) => {
    const updated: PortfolioData = { ...data, academic };
    persistState(updated);
  };

  const resetToDefaults = () => {
    persistState(initialPortfolioData);
  };

  const pushToSupabase = async (): Promise<{ success: boolean; error?: string; message?: string }> => {
    if (!isSupabaseConfigured || !supabase) {
      return { 
        success: false, 
        error: 'Supabase credentials are not configured in .env.local yet (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY required).' 
      };
    }

    try {
      // 1. Push main config
      const { error: configError } = await supabase
        .from('portfolio_config')
        .upsert({
          id: 'main',
          profile: data.profile,
          socials: data.socials,
          capabilities: data.capabilities,
          academic: data.academic,
          updated_at: new Date().toISOString()
        });

      if (configError) throw configError;

      // 2. Push tech stack
      for (const item of data.techStack) {
        await supabase.from('tech_stack').upsert({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          category_label: item.categoryLabel,
          badge_color: item.badgeColor,
          icon_name: item.iconName,
          summary: item.summary,
          marquee_row: item.marqueeRow,
          sort_order: item.order,
          description: item.description,
          why_used: item.whyUsed,
          architecture_role: item.architectureRole,
          key_features: item.keyFeatures,
          associated_project_ids: item.associatedProjectIds,
          experience_years: item.experienceYears,
          status: item.status
        });
      }

      // 3. Push projects
      for (let i = 0; i < data.projects.length; i++) {
        const proj = data.projects[i];
        await supabase.from('projects').upsert({
          id: proj.id,
          slug: proj.slug,
          title: proj.title,
          category: proj.category,
          category_tag: proj.categoryTag,
          summary: proj.summary,
          description: proj.description,
          problem_statement: proj.problemStatement,
          architecture_details: proj.architectureDetails,
          tech_stack_tags: proj.techStackTags,
          github_url: proj.githubUrl,
          live_url: proj.liveUrl,
          metrics: proj.metrics,
          images: proj.images,
          published: proj.published,
          featured: proj.featured,
          sort_order: i,
          updated_at: new Date().toISOString()
        });
      }

      setIsSupabaseConnected(true);
      return { success: true, message: 'All portfolio data, tech stack items, and project case studies successfully pushed to Supabase!' };
    } catch (err: unknown) {
      const error = err as Error;
      return { success: false, error: error?.message || 'Error pushing to Supabase' };
    }
  };

  const exportToJson = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && parsed.techStack && parsed.projects) {
        persistState(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON import:', e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isSupabaseConnected,
        saveAllData,
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
        resetToDefaults,
        pushToSupabase,
        exportToJson,
        importFromJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
