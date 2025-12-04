
export enum ElementType {
  LAYERS = 'LAYERS',
  MACROS = 'MACROS',
  SYMBOLS = 'SYMBOLS',
  BLOCKS = 'BLOCKS',
  DETAILS = 'DETAILS',
  SPECIFICATIONS = 'SPECIFICATIONS'
}

export interface ThemeConfig {
  id: ElementType;
  label: string;
  // Colors are now hex codes or specific tailwind classes for specific uses
  baseColor: string;    // Main background for panels
  accentColor: string;  // Highlights
  textColor: string;    // Text on base
  pattern: string;      // CSS Pattern
  iconName: string;
}

export interface SvgNode {
  tag: string;
  attrs?: Record<string, string | number>;
  children?: SvgNode[];
  content?: string;
}

export interface RecursiveCadVector {
  viewBox: string;
  elements: SvgNode[];
}

// Helper to unify the types for usage (supporting legacy paths or new nodes)
export interface CadVector {
  viewBox: string;
  paths?: { d: string; opacity?: number; strokeWidth?: number; fill?: string }[];
  elements?: SvgNode[];
}

export interface StandardCard {
  id: string;
  title: string;
  category: ElementType;
  subCategory: string;
  description: string;
  isFavorite: boolean;
  isNew: boolean;
  filename?: string;
  fullPath?: string;
  previewSvg?: CadVector;
  stats: {
    usage: number; // 0-100
    complexity: number; // 0-10
  };
  lastModified?: number;
}

export interface NavButton {
  id: string;
  label: string;
  action: SidebarFilter; // Map button to a specific filter action
  isSpecial?: boolean;
}

export type SidebarFilter = 'ALL' | 'NEW' | 'FAVORITES' | 'FREQUENT';

export interface UserPreferences {
  showGrid: boolean;
  highContrast: boolean;
  defaultExport: 'DWG' | 'PDF' | 'DXF';
  notifications: boolean;
  colorTheme?: 'default' | 'copper' | 'verdant' | 'steel';
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  level: number; // Gamification level (1-10)
  preferences: UserPreferences;
  recentHistory: string[]; // IDs of recently viewed cards
  // Robust Profile Fields
  department?: string;
  email?: string;
  phone?: string;
  startDate?: string;
  status?: string;
  expertise?: string[];
  bio?: string;
  quote?: string;
}

// --- TOOLS MODULE TYPES ---

export enum ToolTier {
  TIER_1 = 'ESSENTIALS', // Do First
  TIER_2 = 'POWER_TOOLS', // Do Second
  TIER_3 = 'ADVANCED' // Do Later
}

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  tier: ToolTier;
  iconName: string; // Lucide icon name
  status: 'LIVE' | 'BETA' | 'PLANNED';
  isWidget?: boolean; // If true, renders inline
}

// --- PROJECT MODULE TYPES ---

export type ProjectStatus = 'ACTIVE' | 'HOLD' | 'COMPLETED' | 'ARCHIVED' | 'BIDDING';

export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string; // PM, Lead, Drafter
  avatarUrl?: string;
}

export interface Project {
  id: string; // Job Number e.g., 24-105
  name: string;
  client: string;
  location: string;
  status: ProjectStatus;
  phase: string; // "Design Development", "Construction Docs", "Permitting"
  progress: number; // 0-100
  dueDate: string;
  manager: ProjectTeamMember;
  team: ProjectTeamMember[];
  tags: string[];
  description?: string; // AI Generated scope
}

// --- PERSONNEL MODULE TYPES ---

export type EmployeeStatus = 'ACTIVE' | 'FIELD' | 'REMOTE' | 'LEAVE' | 'MEETING';

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: 'Engineering' | 'Surveying' | 'Admin' | 'GIS' | 'Management';
  email: string;
  phone: string;
  location: string; // Physical office/site
  status: EmployeeStatus;
  avatarUrl: string;
  skills: string[];
}
