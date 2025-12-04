
import React, { useState, useEffect } from 'react';
import { ToolItem, ToolTier } from '../types';
import { DataService } from '../services/dataService';
import { ToolFormModal } from './ToolFormModal';
import { Wrench, Hash, FileCode, Search, Map, Database, Calculator, Network, Eye, FileText, Copy, Check, AlertTriangle, Zap, Layers, ShieldCheck, Terminal, Info, Plus, Edit, Trash2 } from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
  'Layers': Layers,
  'ShieldCheck': ShieldCheck,
  'Map': Map,
  'Hash': Hash,
  'FileCode': FileCode,
  'Calculator': Calculator,
  'Network': Network,
  'Zap': Zap,
  'Terminal': Terminal,
  'Wrench': Wrench
};

// --- TIER EXPLANATIONS ---
const TIER_INFO: Record<string, { layman: string, engineer: string }> = {
  discipline: {
    layman: "Who is responsible for this object? (e.g., Civil vs Survey)",
    engineer: "Tier 1: Liability/Ownership separation for XREF management."
  },
  category: {
    layman: "Which major system does this belong to? (e.g., Utilities)",
    engineer: "Tier 2: Functional Grouping for broad filtration."
  },
  element: {
    layman: "The 'Noun'. What is the object physically? (e.g., Pipe, Manhole)",
    engineer: "Tier 3: Primary Database Object classification."
  },
  modifier: {
    layman: "The 'Adjective'. Describes specific details like '12-inch', 'PVC', or 'Main'.",
    engineer: "Tier 4: Attribute Discriminator. Specificity control to prevent layer collisions."
  },
  status: {
    layman: "When does this exist? (e.g., Existing, New, Future)",
    engineer: "Tier 5: Temporal Phase status for construction logic."
  },
  type: {
    layman: "How is it drawn? (e.g., Line, Text, Block)",
    engineer: "Tier 6: Geometry/Entity Format type."
  }
};

export const ToolsModule: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // CRUD State
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);

  // --- LAYER GENERATOR STATE ---
  const [layerState, setLayerState] = useState({
      discipline: 'CIV',
      category: 'UTIL',
      element: 'STRM',
      modifier: 'MAIN',
      status: 'PROP',
      type: 'LIN'
  });

  useEffect(() => {
      loadTools();
  }, []);

  const loadTools = async () => {
      setIsLoading(true);
      try {
          const data = await DataService.fetchTools();
          setTools(data);
      } finally {
          setIsLoading(false);
      }
  };

  const handleCreateStart = () => {
      setEditingTool(null);
      setShowModal(true);
  };

  const handleEditStart = (tool: ToolItem, e: React.MouseEvent) => {
      e.stopPropagation();
      setEditingTool(tool);
      setShowModal(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if(window.confirm("Uninstall this tool?")) {
          await DataService.deleteTool(id);
          setTools(prev => prev.filter(t => t.id !== id));
      }
  };

  const handleSave = async (data: Partial<ToolItem>) => {
      setShowModal(false);
      if (editingTool) {
          const updated = await DataService.updateTool({ ...editingTool, ...data } as ToolItem);
          setTools(prev => prev.map(t => t.id === updated.id ? updated : t));
      } else {
          const created = await DataService.addTool(data);
          setTools(prev => [...prev, created]);
      }
  };

  const generatedLayerName = `${layerState.discipline}-${layerState.category}-${layerState.element}-${layerState.modifier}-${layerState.status}-${layerState.type}`;

  const handleCopy = () => {
      navigator.clipboard.writeText(generatedLayerName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  // Dropdown Options
  const OPTIONS = {
      discipline: ['CIV', 'SUR', 'LND', 'GEN', 'GIS'],
      category: ['UTIL', 'TRAN', 'ENV', 'CTRL', 'BNDY', 'ANNO'],
      element: ['STRM', 'SANI', 'WATR', 'FIRE', 'PVMT', 'TREE', 'GRAD', 'VEG'],
      modifier: ['MAIN', 'LATR', 'FITT', 'MH', 'VALV', 'TEXT', 'DIMS', 'P-LINE'],
      status: ['PROP', 'EXST', 'DEMO', 'FUTR', 'TEMP'],
      type: ['LIN', 'BLK', 'PNT', 'PAT', 'TXT', 'SHT', 'DTL']
  };

  const essentials = tools.filter(t => t.tier === ToolTier.TIER_1 && !t.isWidget);
  const powerTools = tools.filter(t => t.tier === ToolTier.TIER_2);
  const advanced = tools.filter(t => t.tier === ToolTier.TIER_3);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)] overflow-y-auto custom-scrollbar relative">
       {/* Background Texture */}
       <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
       
       <div className="relative z-10 p-8 max-w-[1600px] mx-auto w-full">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
              <div>
                  <div className="flex items-center gap-2 mb-1">
                      <Wrench size={16} className="text-amber-500" />
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Engineering Utilities</span>
                  </div>
                  <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Micro-Apps & Tools</h1>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex gap-2">
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 text-xs font-bold uppercase tracking-wider">
                        {tools.filter(t => t.status === 'LIVE').length} Active
                    </div>
                    <div className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-neutral-400 text-xs font-bold uppercase tracking-wider">
                        {tools.filter(t => t.status === 'PLANNED').length} Planned
                    </div>
                 </div>
                 <button 
                    onClick={handleCreateStart}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black rounded shadow-lg font-bold text-xs uppercase tracking-wider transition-colors"
                 >
                     <Plus size={16} /> New Tool
                 </button>
              </div>
          </div>

          {/* --- FEATURED WIDGET: LAYER NAME GENERATOR --- */}
          <div className="mb-12">
             <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm shadow-2xl overflow-visible relative z-20">
                 {/* Widget Header */}
                 <div className="bg-[#121212] border-b border-white/5 p-4 flex justify-between items-center relative overflow-hidden rounded-t-sm">
                     <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                     <div>
                         <h2 className="text-lg font-bold text-white flex items-center gap-2">
                             <Layers className="text-amber-500" size={20} /> Layer Name Generator
                         </h2>
                         <p className="text-xs text-neutral-500 mt-1">Generate compliant UCCS layer names instantly.</p>
                     </div>
                     <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 rounded">
                         Ready
                     </div>
                 </div>

                 {/* Widget Body */}
                 <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                     {/* Controls */}
                     <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(OPTIONS).map(([key, options]) => (
                            <div key={key} className="group relative">
                                <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5 ml-1 group-hover:text-amber-500 transition-colors cursor-help w-max">
                                    {key}
                                </label>
                                <div className="relative z-10">
                                    <select 
                                        value={(layerState as any)[key]}
                                        onChange={(e) => setLayerState({...layerState, [key]: e.target.value})}
                                        className="w-full appearance-none bg-black/40 border border-white/10 rounded p-3 text-sm font-mono text-white focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all cursor-pointer hover:border-white/20"
                                    >
                                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                        <Terminal size={12} className="text-neutral-400" />
                                    </div>
                                </div>

                                {/* Tooltip / Guide */}
                                <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-neutral-900 p-3 rounded border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-2 group-hover:translate-y-0">
                                    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
                                        <Info size={12} className="text-amber-500"/>
                                        <span className="text-[10px] font-bold uppercase text-white">Tier Guide: {key}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-[9px] text-neutral-500 uppercase font-bold block mb-0.5">Layman</span>
                                            <span className="text-[10px] text-neutral-300 leading-tight block">
                                                {TIER_INFO[key]?.layman}
                                            </span>
                                        </div>
                                        <div>
                                             <span className="text-[9px] text-neutral-500 uppercase font-bold block mb-0.5">Engineer</span>
                                             <span className="text-[10px] text-indigo-400 leading-tight block font-mono">
                                                {TIER_INFO[key]?.engineer}
                                             </span>
                                        </div>
                                    </div>
                                    {/* Little arrow */}
                                    <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-neutral-900 border-r border-b border-white/10 transform rotate-45"></div>
                                </div>
                            </div>
                        ))}
                     </div>

                     {/* Output / Preview */}
                     <div className="lg:col-span-4 flex flex-col justify-center">
                         <div className="bg-[#09090b] border border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center text-center relative group">
                             <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Generated Layer Key</div>
                             
                             <div className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight break-all">
                                 {generatedLayerName}
                             </div>
                             
                             <div className="mt-6 w-full">
                                 <button 
                                    onClick={handleCopy}
                                    className={`
                                        w-full py-3 px-4 rounded font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all
                                        ${copied 
                                            ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
                                            : 'bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'}
                                    `}
                                 >
                                     {copied ? <Check size={16}/> : <Copy size={16}/>}
                                     {copied ? 'Copied to Clipboard' : 'Copy Layer Name'}
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
          </div>


          {/* --- TOOL GRID --- */}
          <div className="space-y-12">
             
             {/* TIER 1 */}
             <div>
                 <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Tier 1: Essentials</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {essentials.map(tool => {
                         const Icon = IconMap[tool.iconName] || Wrench;
                         const isPlanned = tool.status === 'PLANNED';
                         
                         return (
                             <div 
                                key={tool.id} 
                                className={`
                                    bg-[#18181b] border border-[var(--border-main)] p-5 rounded-sm transition-all group cursor-pointer relative overflow-hidden flex flex-col
                                    ${isPlanned ? 'opacity-60 border-dashed border-white/5 bg-transparent' : 'hover:border-emerald-500/50 hover:bg-[#202023] hover:-translate-y-1 hover:shadow-lg'}
                                `}
                             >
                                 <div className="flex justify-between items-start mb-4">
                                     <div className={`p-3 rounded border transition-colors ${isPlanned ? 'bg-white/5 border-white/5 text-neutral-500' : 'bg-[#09090b] border-white/10 text-emerald-500 group-hover:text-white group-hover:bg-emerald-500'}`}>
                                         <Icon size={20} />
                                     </div>
                                     <div className="flex items-center gap-2">
                                        {tool.status === 'BETA' && <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20">BETA</span>}
                                        {isPlanned && <span className="text-[9px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-white/5">PLANNED</span>}
                                        
                                        {/* Actions */}
                                        {!tool.isWidget && (
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => handleEditStart(tool, e)} className="p-1 text-neutral-500 hover:text-indigo-400 hover:bg-white/10 rounded"><Edit size={12}/></button>
                                                <button onClick={(e) => handleDelete(tool.id, e)} className="p-1 text-neutral-500 hover:text-red-400 hover:bg-white/10 rounded"><Trash2 size={12}/></button>
                                            </div>
                                        )}
                                     </div>
                                 </div>
                                 <h4 className="text-sm font-bold text-white mb-2">{tool.title}</h4>
                                 <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1">{tool.description}</p>
                                 {!isPlanned && (
                                    <div className="flex items-center text-[10px] font-bold text-neutral-600 group-hover:text-emerald-400 transition-colors uppercase tracking-wider mt-auto">
                                        Launch Tool <Terminal size={10} className="ml-1" />
                                    </div>
                                 )}
                             </div>
                         );
                     })}
                 </div>
             </div>

             {/* TIER 2 */}
             <div>
                 <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Tier 2: Power Tools</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {powerTools.map(tool => {
                         const Icon = IconMap[tool.iconName] || Wrench;
                         const isPlanned = tool.status === 'PLANNED';
                         return (
                             <div 
                                key={tool.id} 
                                className={`
                                    bg-[#18181b] border border-[var(--border-main)] p-5 rounded-sm transition-all group cursor-pointer relative overflow-hidden flex flex-col
                                    ${isPlanned ? 'opacity-60 border-dashed border-white/5 bg-transparent' : 'hover:border-blue-500/50 hover:bg-[#202023] hover:-translate-y-1 hover:shadow-lg'}
                                `}
                             >
                                 <div className="flex justify-between items-start mb-4">
                                     <div className={`p-3 rounded border transition-colors ${isPlanned ? 'bg-white/5 border-white/5 text-neutral-500' : 'bg-[#09090b] border-white/10 text-blue-500 group-hover:text-white group-hover:bg-blue-500'}`}>
                                         <Icon size={20} />
                                     </div>
                                     <div className="flex items-center gap-2">
                                        {isPlanned && <span className="text-[9px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-white/5">PLANNED</span>}
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => handleEditStart(tool, e)} className="p-1 text-neutral-500 hover:text-indigo-400 hover:bg-white/10 rounded"><Edit size={12}/></button>
                                                <button onClick={(e) => handleDelete(tool.id, e)} className="p-1 text-neutral-500 hover:text-red-400 hover:bg-white/10 rounded"><Trash2 size={12}/></button>
                                        </div>
                                     </div>
                                 </div>
                                 <h4 className="text-sm font-bold text-white mb-2">{tool.title}</h4>
                                 <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1">{tool.description}</p>
                             </div>
                         );
                     })}
                 </div>
             </div>
             
             {/* TIER 3 */}
             <div>
                 <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Tier 3: AI & Advanced</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {advanced.map(tool => {
                         const Icon = IconMap[tool.iconName] || Wrench;
                         const isPlanned = tool.status === 'PLANNED';
                         return (
                             <div 
                                key={tool.id} 
                                className={`
                                    bg-[#18181b] border border-[var(--border-main)] p-5 rounded-sm transition-all group cursor-pointer relative overflow-hidden flex flex-col
                                    ${isPlanned ? 'opacity-60 border-dashed border-white/5 bg-transparent' : 'hover:border-purple-500/50 hover:bg-[#202023] hover:-translate-y-1 hover:shadow-lg'}
                                `}
                             >
                                 {/* Shine effect for Tier 3 */}
                                 {!isPlanned && <div className="absolute -right-10 -top-10 w-20 h-20 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-500/20 transition-all"></div>}
                                 
                                 <div className="flex justify-between items-start mb-4 relative z-10">
                                     <div className={`p-3 rounded border transition-colors ${isPlanned ? 'bg-white/5 border-white/5 text-neutral-500' : 'bg-[#09090b] border-white/10 text-purple-500 group-hover:text-white group-hover:bg-purple-500'}`}>
                                         <Icon size={20} />
                                     </div>
                                     <div className="flex items-center gap-2">
                                        {isPlanned && <span className="text-[9px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-white/5">PLANNED</span>}
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => handleEditStart(tool, e)} className="p-1 text-neutral-500 hover:text-indigo-400 hover:bg-white/10 rounded"><Edit size={12}/></button>
                                                <button onClick={(e) => handleDelete(tool.id, e)} className="p-1 text-neutral-500 hover:text-red-400 hover:bg-white/10 rounded"><Trash2 size={12}/></button>
                                        </div>
                                     </div>
                                 </div>
                                 <h4 className="text-sm font-bold text-white mb-2 relative z-10">{tool.title}</h4>
                                 <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1 relative z-10">{tool.description}</p>
                             </div>
                         );
                     })}
                 </div>
             </div>

          </div>

       </div>

       {/* Modal */}
       {showModal && (
           <ToolFormModal 
                mode={editingTool ? 'EDIT' : 'CREATE'}
                initialData={editingTool || undefined}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
           />
       )}
    </div>
  );
};
