import { ElementType, ThemeConfig, NavButton, StandardCard } from './types';

export const THEMES: Record<ElementType, ThemeConfig> = {
  [ElementType.LAYERS]: {
    id: ElementType.LAYERS,
    label: 'LAYERS',
    baseColor: 'bg-blue-500',
    accentColor: 'bg-blue-300',
    textColor: 'text-blue-950',
    pattern: 'radial-gradient(circle, #3b82f6 2px, transparent 2.5px)', // Blueprint dots
    iconName: 'Layers'
  },
  [ElementType.MACROS]: {
    id: ElementType.MACROS,
    label: 'MACROS',
    baseColor: 'bg-emerald-500',
    accentColor: 'bg-emerald-300',
    textColor: 'text-emerald-950',
    pattern: 'linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, .1) 25%, rgba(0, 0, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .1) 75%, rgba(0, 0, 0, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, .1) 25%, rgba(0, 0, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, .1) 75%, rgba(0, 0, 0, .1) 76%, transparent 77%, transparent)',
    iconName: 'Terminal'
  },
  [ElementType.SYMBOLS]: {
    id: ElementType.SYMBOLS,
    label: 'SYMBOLS',
    baseColor: 'bg-yellow-400',
    accentColor: 'bg-yellow-200',
    textColor: 'text-yellow-950',
    pattern: 'repeating-linear-gradient(45deg, #facc15, #facc15 10px, #eab308 10px, #eab308 20px)',
    iconName: 'TriangleAlert'
  },
  [ElementType.BLOCKS]: {
    id: ElementType.BLOCKS,
    label: 'BLOCKS',
    baseColor: 'bg-orange-500',
    accentColor: 'bg-orange-300',
    textColor: 'text-orange-950',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)',
    iconName: 'Cuboid'
  },
  [ElementType.DETAILS]: {
    id: ElementType.DETAILS,
    label: 'DETAILS',
    baseColor: 'bg-purple-500',
    accentColor: 'bg-purple-300',
    textColor: 'text-purple-950',
    pattern: 'linear-gradient(135deg, #a855f7 25%, transparent 25%) -10px 0, linear-gradient(225deg, #a855f7 25%, transparent 25%) -10px 0, linear-gradient(315deg, #a855f7 25%, transparent 25%), linear-gradient(45deg, #a855f7 25%, transparent 25%)',
    iconName: 'Ruler'
  },
  [ElementType.SPECIFICATIONS]: {
    id: ElementType.SPECIFICATIONS,
    label: 'SPECS',
    baseColor: 'bg-slate-500',
    accentColor: 'bg-slate-300',
    textColor: 'text-slate-950',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)',
    iconName: 'Book'
  }
};

export const SUB_CATEGORIES: Record<ElementType, string[]> = {
  [ElementType.LAYERS]: ['ALL', 'GENERAL', 'EXISTING', 'PROPOSED', 'DETAIL'],
  [ElementType.MACROS]: ['ALL', 'GENERAL', 'DYNAMIC', 'TOOLS'],
  [ElementType.SYMBOLS]: ['ALL', 'GENERAL', 'ANNOTATION', 'ARROWS', 'STAMPS', 'LEGENDS'],
  [ElementType.BLOCKS]: ['ALL', 'GENERAL', 'LANDSCAPE', 'TRANSPORT', 'UTILITIES', 'STRUCTURES'],
  [ElementType.DETAILS]: ['ALL', 'GENERAL', 'STORM', 'SEWER', 'WATER', 'ROADWAY'],
  [ElementType.SPECIFICATIONS]: ['ALL', 'GENERAL', 'SITEWORK', 'CONCRETE', 'UTILITIES']
};

export const SIDEBAR_BUTTONS: NavButton[] = [
  { id: 'new', label: 'WHATS NEW', action: 'NEW' },
  { id: 'frequent', label: 'FREQUENTLY USE', action: 'FREQUENT' },
  { id: 'favorites', label: 'Josh Favorites', action: 'FAVORITES' },
  { id: 'collections', label: 'Drawing Setup Collections', action: 'ALL' },
  { id: 'point', label: 'Do you get the point yet?', action: 'ALL', isSpecial: true },
];

// Raw data subset from the provided CSV
const RAW_CAD_DATA = [
  // LAYERS
  { id: '425', title: 'Layers - Detail', cat: 'LAYERS', subCat: 'DETAIL', desc: 'Layers - Detail - Piping/Schematics Only', file: '$BR Prot-detail.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR Prot-detail.dwg' },
  { id: '426', title: 'Layers - Existing', cat: 'LAYERS', subCat: 'EXISTING', desc: 'Layers - Existing Configuration Template', file: '$BR PROT-existing.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-existing.dwg' },
  { id: '427', title: 'Layers - New', cat: 'LAYERS', subCat: 'PROPOSED', desc: 'Layers - New Project Template', file: '$BR PROT-new.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-new.dwg' },
  { id: '503', title: 'Prop Line Note', cat: 'LAYERS', subCat: 'GENERAL', desc: 'Note Setup - Property Line Note & MText Setup', file: 'NOTE SETUP-PROPERTY LINE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\NOTE SETUP.dwg' },

  // MACROS
  { id: '3', title: 'Arrow - Dynamic', cat: 'MACROS', subCat: 'DYNAMIC', desc: 'Fancy Arrow - Dynamic - Adjustable', file: 'ARR DYNAMIC.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\ARR DYNAMIC.dwg' },
  { id: '8', title: 'Flow Arrow', cat: 'MACROS', subCat: 'DYNAMIC', desc: 'Flow Arrow - Dynamic Directional', file: 'ARR FLOW2.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\ARR FLOW2.dwg' },
  { id: '857', title: 'Window Dynamic', cat: 'MACROS', subCat: 'DYNAMIC', desc: 'Window Dynamic Block - Resizable', file: 'WINDOW DYNAMIC.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\WINDOW DYNAMIC.dwg' },
  { id: '924', title: 'Vehicle Dynamic', cat: 'MACROS', subCat: 'DYNAMIC', desc: 'Vehicle Dynamic - Configurable Plan View', file: 'VEHICLE DYNAMIC.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\VEHICLE DYNAMIC.dwg' },
  { id: '953', title: 'Tree - Dynamic', cat: 'MACROS', subCat: 'DYNAMIC', desc: 'Tree - Various - Plan & Elevation Views', file: 'TREE DYNAMIC.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TREE DYNAMIC.dwg' },
  { id: '793', title: 'Guide Lines', cat: 'MACROS', subCat: 'TOOLS', desc: 'Guide Lines - Dynamic - Insert into Title Block', file: 'TB GUIDE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TB GUIDE.dwg' },

  // SYMBOLS
  { id: '1', title: 'Arrow & Line', cat: 'SYMBOLS', subCat: 'ARROWS', desc: 'Arrow & Line - 1 or 2 ways', file: 'ARR LINE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\ARR LINE.dwg' },
  { id: '440', title: 'North Arrow', cat: 'SYMBOLS', subCat: 'ARROWS', desc: 'North Arrow - Standard', file: 'NORTHA2.DWG', path: 'J:\\LIB\\BR\\Palette Tools\\NORTHA2.DWG' },
  { id: '441', title: 'Scale - Std', cat: 'SYMBOLS', subCat: 'ANNOTATION', desc: 'Scale Bar - Standard', file: 'SCALE.DWG', path: 'J:\\LIB\\BR\\Palette Tools\\SCALE.DWG' },
  { id: '474', title: 'Stamp - DRAFT', cat: 'SYMBOLS', subCat: 'STAMPS', desc: 'Stamp - DRAFT - Not for Construction', file: 'STAMP DRAFT.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\STAMP DRAFT.dwg' },
  { id: '11', title: 'Star Symbol', cat: 'SYMBOLS', subCat: 'GENERAL', desc: 'Standard Star Marker', file: 'STAR.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\STAR.dwg' },
  { id: '464', title: 'Legend AutoTurn', cat: 'SYMBOLS', subCat: 'LEGENDS', desc: 'Legend - AutoTurn Analysis', file: 'LEGEND AUTOTURN.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\LEGEND AUTOTURN.dwg' },
  { id: '476', title: 'Stamp Submittal', cat: 'SYMBOLS', subCat: 'STAMPS', desc: 'Stamp - __% Submittal Placeholder', file: 'STAMP SUBMIT.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\STAMP SUBMIT.dwg' },

  // BLOCKS
  { id: '42', title: 'Pipe Break', cat: 'BLOCKS', subCat: 'UTILITIES', desc: '00 PIPE BREAK Symbol', file: '00 PIPE BREAK.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\00 PIPE BREAK.dwg' },
  { id: '446', title: 'Tree - Save', cat: 'BLOCKS', subCat: 'LANDSCAPE', desc: 'Tree - Save - Existing Vegetation', file: 'TREE SAVE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TREE SAVE.dwg' },
  { id: '447', title: 'Tree - Remove', cat: 'BLOCKS', subCat: 'LANDSCAPE', desc: 'Tree - Remove - Demolition Plan', file: 'TREE REMOVE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TREE REMOVE.dwg' },
  { id: '848', title: 'Bench', cat: 'BLOCKS', subCat: 'LANDSCAPE', desc: 'Site Furniture - Bench', file: 'BENCH.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\BENCH.dwg' },
  { id: '849', title: 'Bike Rack', cat: 'BLOCKS', subCat: 'LANDSCAPE', desc: 'Site Furniture - Bike Rack', file: 'BIKE RACK.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\BIKE RACK.dwg' },
  { id: '850', title: 'Bollard', cat: 'BLOCKS', subCat: 'TRANSPORT', desc: 'Traffic Control - Bollard', file: 'BOLLARD.DWG', path: 'J:\\LIB\\BR\\Palette Tools\\BOLLARD.DWG' },
  { id: '1063', title: 'Fire Hydrant', cat: 'BLOCKS', subCat: 'UTILITIES', desc: '00 FH - Fire Hydrant Assembly', file: '00 FH.DWG', path: 'J:\\LIB\\BR\\Palette Tools\\00 FH.DWG' },
  { id: '50', title: '02 Flange', cat: 'BLOCKS', subCat: 'GENERAL', desc: '02 FLG - Standard Flange', file: '02 FLG.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\02 FLG.dwg' },
  { id: '52', title: '02 Tee Flange', cat: 'BLOCKS', subCat: 'GENERAL', desc: '02 TEE FLG - Standard Tee', file: '02 TEE FLG.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\02 TEE FLG.dwg' },
  { id: '925', title: 'Fire Truck', cat: 'BLOCKS', subCat: 'TRANSPORT', desc: 'Vehicle - Fire Truck Front View', file: 'VEHICLE TRUCK FIRE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\VEHICLE TRUCK.dwg' },

  // DETAILS
  { id: '485', title: 'Title - Detail', cat: 'DETAILS', subCat: 'GENERAL', desc: 'Title - Detail/Section With Bubble - Not To Scale', file: 'TITLE DETAIL.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TITLE DETAIL.dwg' },
  { id: '31', title: 'Note Sheet', cat: 'DETAILS', subCat: 'GENERAL', desc: 'Sonoma County - Standard Note Sheet for Subdivisions', file: 'NOTE COUNTY.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\NOTE COUNTY.dwg' },
  { id: '449', title: 'Section Angled', cat: 'DETAILS', subCat: 'GENERAL', desc: 'Section With Angle Indicator', file: 'SECTION ANGLED.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\SECTION ANGLED.dwg' },
  { id: '1199', title: 'Yard Drain', cat: 'DETAILS', subCat: 'STORM', desc: 'SD - Yard Drain - Private', file: 'SD - Yard Drain.dwg', path: 'J:\\LIB\\BR\\SD - Yard Drain.dwg' },
  { id: '1200', title: 'Conc Wall', cat: 'DETAILS', subCat: 'ROADWAY', desc: 'Wall - Concrete Construction Detail', file: 'Wall - Concrete.dwg', path: 'J:\\LIB\\BR\\Wall - Concrete.dwg' },
  { id: '466', title: 'Earthwork Table', cat: 'DETAILS', subCat: 'GENERAL', desc: 'Legend - Earthwork Cut/Fill Table', file: 'LEGEND EARTHWORK.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\LEGEND EARTHWORK.dwg' },
  { id: '800', title: 'Cover 11x17', cat: 'DETAILS', subCat: 'GENERAL', desc: 'B&R 11x17 - Cover Sheet Template', file: 'TB COVER BR 11x17.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\TB COVER BR 11x17.dwg' },

  // SPECIFICATIONS
  { id: 'spec-01', title: '00 72 00', cat: 'SPECIFICATIONS', subCat: 'GENERAL', desc: 'General Conditions - Standard Project Requirements', file: '00 72 00 General Conditions.docx', path: 'J:\\LIB\\SPECS\\00 72 00.docx' },
  { id: 'spec-02', title: '31 00 00', cat: 'SPECIFICATIONS', subCat: 'SITEWORK', desc: 'Earthwork - Excavation and Fill', file: '31 00 00 Earthwork.docx', path: 'J:\\LIB\\SPECS\\31 00 00.docx' },
  { id: 'spec-03', title: '33 40 00', cat: 'SPECIFICATIONS', subCat: 'UTILITIES', desc: 'Storm Drainage Utilities - Piping and Structures', file: '33 40 00 Storm Drainage.docx', path: 'J:\\LIB\\SPECS\\33 40 00.docx' },
  { id: 'spec-04', title: '03 30 00', cat: 'SPECIFICATIONS', subCat: 'CONCRETE', desc: 'Cast-in-Place Concrete', file: '03 30 00 Concrete.docx', path: 'J:\\LIB\\SPECS\\03 30 00.docx' },
  { id: 'spec-05', title: '33 30 00', cat: 'SPECIFICATIONS', subCat: 'UTILITIES', desc: 'Sanitary Sewerage Utilities', file: '33 30 00 Sanitary.docx', path: 'J:\\LIB\\SPECS\\33 30 00.docx' },
  { id: 'spec-06', title: '31 10 00', cat: 'SPECIFICATIONS', subCat: 'SITEWORK', desc: 'Site Clearing', file: '31 10 00 Clearing.docx', path: 'J:\\LIB\\SPECS\\31 10 00.docx' },
  { id: 'spec-07', title: '31 23 00', cat: 'SPECIFICATIONS', subCat: 'SITEWORK', desc: 'Excavation and Fill', file: '31 23 00 Excavation.docx', path: 'J:\\LIB\\SPECS\\31 23 00.docx' },
];

export const generateMockCards = (category: ElementType): StandardCard[] => {
  // Filter the raw data by the requested category
  // If the category in raw data matches the mapping, use it.
  // If not, fall back to some generic generated ones if needed, but here we just filter.
  
  let categoryItems = RAW_CAD_DATA.filter(item => item.cat === category);

  // If we don't have enough real items for a category in our small subset, 
  // duplicate them slightly with different IDs to fill the grid for the prototype look.
  if (categoryItems.length < 8) {
      const extras = Array.from({ length: 8 - categoryItems.length }).map((_, i) => ({
          ...categoryItems[i % categoryItems.length],
          id: `${categoryItems[i % categoryItems.length].id}_copy_${i}`,
          title: `${categoryItems[i % categoryItems.length].title} ${i + 2}`
      }));
      categoryItems = [...categoryItems, ...extras];
  }

  return categoryItems.map((item) => ({
    id: item.id,
    title: item.title,
    category: category,
    subCategory: item.subCat || 'GENERAL',
    isFavorite: Math.random() > 0.8, // Random favorite status
    isNew: Math.random() > 0.7, // Random "New" status
    description: item.desc,
    filename: item.file,
    fullPath: item.path,
    stats: {
      usage: Math.floor(Math.random() * 100), // Mock usage stat
      complexity: Math.floor(Math.random() * 10) // Mock complexity stat
    }
  }));
};