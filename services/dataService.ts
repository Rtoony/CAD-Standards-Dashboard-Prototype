
import { ElementType, StandardCard, CadVector, Project, Employee } from '../types';
import { generateVectorData } from '../constants';

// --- MOCK DATABASE (Eventually replace this with SQLite calls) ---
const MOCK_DB: any[] = [
  // LAYERS
  { id: '425', title: 'Layers - Detail', cat: 'LAYERS', subCat: 'DETAIL', desc: 'Layers - Detail - Piping/Schematics Only', file: '$BR Prot-detail.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR Prot-detail.dwg' },
  { id: '426', title: 'Layers - Existing', cat: 'LAYERS', subCat: 'EXISTING', desc: 'Layers - Existing Configuration Template', file: '$BR PROT-existing.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-existing.dwg' },
  { id: '427', title: 'Layers - New', cat: 'LAYERS', subCat: 'PROPOSED', desc: 'Layers - New Project Template', file: '$BR PROT-new.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-new.dwg' },
  { id: '503', title: 'Prop Line Note', cat: 'LAYERS', subCat: 'GENERAL', desc: 'Note Setup - Property Line Note & MText Setup', file: 'NOTE SETUP-PROPERTY LINE.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\NOTE SETUP.dwg' },
  { id: '428', title: 'Layers - Demo', cat: 'LAYERS', subCat: 'EXISTING', desc: 'Layers - Demolition Plan Template', file: '$BR PROT-demo.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-demo.dwg' },
  { id: '429', title: 'Layers - Grading', cat: 'LAYERS', subCat: 'PROPOSED', desc: 'Layers - Grading and Drainage Plan', file: '$BR PROT-grading.dwg', path: 'J:\\LIB\\BR\\Palette Tools\\$BR PROT-grading.dwg' },

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

const MOCK_PROJECTS: Project[] = [
  {
    id: '24-105',
    name: 'Smith Creek Subdivision',
    client: 'Lennar Homes',
    location: 'Santa Rosa, CA',
    status: 'ACTIVE',
    phase: 'Construction Docs',
    progress: 65,
    dueDate: '2024-06-15',
    manager: { id: 'pm1', name: 'Sarah J.', role: 'PM' },
    team: [
        { id: 'sur1', name: 'R. Toony', role: 'Lead Surveyor' },
        { id: 'dr1', name: 'Mike D.', role: 'Drafter' }
    ],
    tags: ['Residential', 'Grading', 'Storm']
  },
  {
    id: '24-089',
    name: 'Hwy 101 Corridor Widening',
    client: 'CalTrans',
    location: 'Petaluma, CA',
    status: 'HOLD',
    phase: 'Design Development',
    progress: 30,
    dueDate: '2024-09-01',
    manager: { id: 'pm2', name: 'David R.', role: 'PM' },
    team: [
        { id: 'eng1', name: 'Jessica T.', role: 'Civil Lead' }
    ],
    tags: ['Transportation', 'Public Works']
  },
  {
    id: '23-210',
    name: 'City Hall Annex Retrofit',
    client: 'City of Napa',
    location: 'Napa, CA',
    status: 'COMPLETED',
    phase: 'As-Builts',
    progress: 100,
    dueDate: '2024-02-28',
    manager: { id: 'pm1', name: 'Sarah J.', role: 'PM' },
    team: [
        { id: 'dr2', name: 'Tom H.', role: 'Drafter' }
    ],
    tags: ['Commercial', 'Retrofit']
  },
  {
    id: '24-112',
    name: 'Oakmont Senior Living',
    client: 'Oakmont Group',
    location: 'Windsor, CA',
    status: 'BIDDING',
    phase: 'Proposal',
    progress: 10,
    dueDate: '2024-04-20',
    manager: { id: 'pm3', name: 'Robert L.', role: 'Principal' },
    team: [],
    tags: ['Commercial', 'Grading']
  },
  {
    id: '24-115',
    name: 'Riverside Park Improvements',
    client: 'County Parks',
    location: 'Healdsburg, CA',
    status: 'ACTIVE',
    phase: 'Permitting',
    progress: 85,
    dueDate: '2024-05-10',
    manager: { id: 'pm2', name: 'David R.', role: 'PM' },
    team: [
        { id: 'sur1', name: 'R. Toony', role: 'Lead Surveyor' }
    ],
    tags: ['Public Works', 'Parks']
  }
];

const MOCK_EMPLOYEES: Employee[] = [
    { 
        id: 'ENG-101', 
        name: 'Elena Vance', 
        title: 'Senior Civil Engineer', 
        department: 'Engineering', 
        status: 'ACTIVE', 
        email: 'e.vance@acme.com', 
        phone: 'x120', 
        location: 'Office 204', 
        skills: ['Hydrology', 'HEC-RAS', 'Project Mgmt'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Elena&backgroundColor=b6e3f4'
    },
    { 
        id: 'CAD-055', 
        name: 'Marcus Thorne', 
        title: 'CAD Technician III', 
        department: 'Engineering', 
        status: 'REMOTE', 
        email: 'm.thorne@acme.com', 
        phone: 'x135', 
        location: 'Remote (OR)', 
        skills: ['Civil 3D', 'LISP', 'ArcGIS'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Marcus&backgroundColor=ffdfbf'
    },
    { 
        id: 'MGT-002', 
        name: 'Sarah Jenkins', 
        title: 'Project Manager', 
        department: 'Management', 
        status: 'MEETING', 
        email: 's.jenkins@acme.com', 
        phone: 'x102', 
        location: 'Office 101', 
        skills: ['Client Relations', 'Budgeting', 'Scheduling'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah&backgroundColor=c0aede'
    },
    { 
        id: 'CAD-089', 
        name: 'Mike ' + "'New Guy'" + ' Davis', 
        title: 'Jr. Drafter', 
        department: 'Engineering', 
        status: 'ACTIVE', 
        email: 'm.davis@acme.com', 
        phone: 'x140', 
        location: 'Bullpen Desk 4', 
        skills: ['AutoCAD', 'Coffee Runs', 'Learning'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mike&backgroundColor=d1d4f9'
    },
    { 
        id: 'SUR-042', 
        name: 'Jim ' + "'Boots'" + ' Buckner', 
        title: 'Party Chief', 
        department: 'Surveying', 
        status: 'FIELD', 
        email: 'j.buckner@acme.com', 
        phone: 'Mobile', 
        location: 'Site: Hwy 101', 
        skills: ['Trimble', 'Boundary', 'Chainsaw'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jim&backgroundColor=ffd5dc'
    },
    { 
        id: 'GIS-012', 
        name: 'Chloe Rayner', 
        title: 'GIS Specialist', 
        department: 'GIS', 
        status: 'ACTIVE', 
        email: 'c.rayner@acme.com', 
        phone: 'x155', 
        location: 'Server Room', 
        skills: ['Python', 'QGIS', 'Database Admin'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Chloe&backgroundColor=c0aede'
    },
    { 
        id: 'INT-099', 
        name: 'Sam K.', 
        title: 'Summer Intern', 
        department: 'Engineering', 
        status: 'ACTIVE', 
        email: 'intern@acme.com', 
        phone: 'N/A', 
        location: 'Archive Room', 
        skills: ['Scanning', 'Filing', 'Optimism'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sam&backgroundColor=b6e3f4'
    },
    { 
        id: 'ADM-001', 
        name: 'Linda Graham', 
        title: 'Office Manager', 
        department: 'Admin', 
        status: 'ACTIVE', 
        email: 'l.graham@acme.com', 
        phone: 'x100', 
        location: 'Front Desk', 
        skills: ['Payroll', 'Logistics', 'Enforcement'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Linda&backgroundColor=ffdfbf'
    },
    { 
        id: 'ENG-104', 
        name: 'Raj Patel', 
        title: 'Hydrology Engineer', 
        department: 'Engineering', 
        status: 'LEAVE', 
        email: 'r.patel@acme.com', 
        phone: 'x124', 
        location: 'Office 205', 
        skills: ['WSPG', 'StormCAD', 'Modeling'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Raj&backgroundColor=d1d4f9'
    },
    { 
        id: 'SUR-045', 
        name: 'Tyrell Williams', 
        title: 'Drone Pilot / Surveyor', 
        department: 'Surveying', 
        status: 'FIELD', 
        email: 't.williams@acme.com', 
        phone: 'Mobile', 
        location: 'Site: Smith Creek', 
        skills: ['LiDAR', 'DroneDeploy', 'Photogrammetry'],
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Tyrell&backgroundColor=ffd5dc'
    }
];

export class DataService {
  
  /**
   * Simulates a database query with latency
   */
  static async fetchCards(category: ElementType): Promise<StandardCard[]> {
    // Simulate network latency (300-600ms)
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 300));

    // "Query" the mock DB
    let categoryItems = MOCK_DB.filter(item => item.cat === category);

    // Pad with duplicates if low count (just for the demo aesthetic)
    if (categoryItems.length < 8) {
        const extras = Array.from({ length: 8 - categoryItems.length }).map((_, i) => ({
            ...categoryItems[i % categoryItems.length],
            id: `${categoryItems[i % categoryItems.length].id}_copy_${i}`,
            title: `${categoryItems[i % categoryItems.length].title} ${i + 2}`
        }));
        categoryItems = [...categoryItems, ...extras];
    }

    // Map to StandardCard interface
    // Note: In a real app, the SVG generation might happen on the client 
    // OR be stored as a JSON string in the DB.
    return categoryItems.map((item) => ({
        id: item.id,
        title: item.title,
        category: category,
        subCategory: item.subCat || 'GENERAL',
        isFavorite: false, // Default, overriden by App state
        isNew: Math.random() > 0.7,
        description: item.desc,
        filename: item.file,
        fullPath: item.path,
        previewSvg: generateVectorData(category, item.subCat || 'GENERAL', item.id, item.title),
        stats: {
          usage: Math.floor(Math.random() * 100),
          complexity: Math.floor(Math.random() * 10)
        }
    }));
  }

  /**
   * Fetches Projects
   */
  static async fetchProjects(): Promise<Project[]> {
      await new Promise(resolve => setTimeout(resolve, 400)); // Sim latency
      return MOCK_PROJECTS;
  }

  /**
   * Fetches Employees
   */
  static async fetchEmployees(): Promise<Employee[]> {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_EMPLOYEES;
  }
}
