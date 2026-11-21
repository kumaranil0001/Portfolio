export interface ProfileConfig {
  name: string;
  moniker: string;
  tagline: string;
  credential: string;
  subHeadline: string;
  aboutBio: string;
  avatarUrl: string | null;
  email: string;
  location: string;
  stats: {
    label: string;
    value: string;
    sub?: string;
  }[];
}

export interface SocialLink {
  id: string;
  platform: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'email' | 'discord' | 'custom';
  label: string;
  url: string;
  enabled: boolean;
  icon?: string;
}

export interface TechStackItem {
  id: string;
  slug: string;
  name: string;
  category: 'ai' | 'systems' | 'fullstack' | 'data' | 'tooling';
  categoryLabel: string;
  badgeColor: string;
  iconName: string;
  summary: string;
  marqueeRow: 1 | 2;
  order: number;
  description: string;
  whyUsed: string;
  architectureRole: string;
  keyFeatures: string[];
  associatedProjectIds: string[];
  experienceYears?: string;
  status: 'active' | 'core' | 'production';
}

export interface ProjectImage {
  id: string;
  url: string;
  caption: string;
  type?: 'sub_1' | 'sub_2' | 'main';
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryTag: string;
  summary: string;
  description: string;
  problemStatement?: string;
  architectureDetails?: string;
  techStackTags: string[];
  githubUrl: string;
  liveUrl: string;
  metrics: { label: string; value: string }[];
  images: ProjectImage[];
  published: boolean;
  featured: boolean;
}

export interface CapabilityDomain {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface AcademicMilestone {
  degree: string;
  specialization: string;
  status: string;
  honours: string;
  coreFocus: string[];
  researchInitiatives: string[];
}

export interface PortfolioData {
  profile: ProfileConfig;
  socials: SocialLink[];
  techStack: TechStackItem[];
  projects: ProjectItem[];
  capabilities: CapabilityDomain[];
  academic: AcademicMilestone;
}
