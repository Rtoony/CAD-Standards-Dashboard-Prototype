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
  stats: {
    usage: number; // 0-100
    complexity: number; // 0-10
  };
}

export interface NavButton {
  id: string;
  label: string;
  action: SidebarFilter; // Map button to a specific filter action
  isSpecial?: boolean;
}

export type SidebarFilter = 'ALL' | 'NEW' | 'FAVORITES' | 'FREQUENT';