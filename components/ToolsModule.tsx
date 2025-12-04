
import React, { useState, useEffect } from 'react';
import { ToolItem, ToolTier } from '../types';
import { DataService } from '../services/dataService';
import { ToolFormModal } from './ToolFormModal';
import { GoogleGenAI, Type } from "@google/genai";
import { Wrench, Hash, FileCode, Search, Map, Database, Calculator, Network, Eye, FileText, Copy, Check, AlertTriangle, Zap, Layers, ShieldCheck, Terminal, Info, Plus, Edit, Trash2, Bot, Loader2, Sparkles, ScanLine, Activity } from 'lucide-react';

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

  // --- SURVEY DECODER STATE ---
  const [decoderInput, setDecoderInput] = useState('');
  const [decodedResult, setDecodedResult] = useState<{description: string, category: string, confidence: number} | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

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

  const handleDecode = async () => {
      if (!decoderInput.trim()) return;
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
          alert("API Key required for Field Cipher.");
          return;
      }
      
      setIsDecoding(true);
      setDecodedResult(null);

      try {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `Decode this Land Surveying Field Code: "${decoderInput}".
              
              Translate standard abbreviations (e.g., "TC" = Top of Curb, "IP" = Iron Pipe, "FND" = Found).
              Return JSON with:
              - description: The full human-readable meaning.
              - category: Broad classification (e.g., Monumentation, Topography, Utilities, Vegetation).
              - confidence: A number 1-100 indicating how standard this code is.
              `,
              config: {
                  responseMimeType: 'application/json',
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          description: { type: Type.STRING },
                          category: { type: Type.STRING },
                          confidence: { type: Type.NUMBER }
                      },
                      required: ['description', 'category', 'confidence']
                  }
              }
          });
          
          const text = response.text;
          if (text) {
              const data = JSON.parse(text);
              setDecodedResult(data);
          }
      } catch (e) {
          console.error("Decode failed", e);
          setDecodedResult({ description: "Decryption Failed: Unknown Code Protocol", category: "ERROR", confidence: 0 });
      } finally {
          setIsDecoding(false);
      }
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

  // Widget visibility checks
  const showLayerGen = tools.some(t => t.id === 'layer-gen' && t.status !== 'PLANNED');
  const showSurvDecoder = tools.some(t => t.id === 'surv-code' && t.status !== 'PLANNED');

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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            
            {/* --- WIDGET 1: LAYER NAME GENERATOR --- */}
            {showLayerGen && (
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm shadow-2xl overflow-visible relative z-20 flex flex-col">
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
                    <div className="p-6 flex-1 flex flex-col gap-6">
                        {/* Controls */}
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(OPTIONS).map(([key, options]) => (
                                <div key={key} className="group relative">
                                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1 group-hover:text-amber-500 transition-colors w-max">
                                        {key}
                                    </label>
                                    <div className="relative z-10">
                                        <select 
                                            value={(layerState as any)[key]}
                                            onChange={(e) => setLayerState({...layerState, [key]: e.target.value})}
                                            className="w-full appearance-none bg-black/40 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all cursor-pointer hover:border-white/20"
                                        >
                                            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Output / Preview */}
                        <div className="mt-auto">
                            <div className="bg-[#09090b] border border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center text-center relative group">
                                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Generated Layer Key</div>
                                
                                <div className="text-xl font-mono font-bold text-white tracking-tight break-all mb-4">
                                    {generatedLayerName}
                                </div>
                                
                                <button 
                                    onClick={handleCopy}
                                    className={`
                                        w-full py-2 px-4 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all
                                        ${copied 
                                            ? 'bg-emerald-500 text-black hover:bg-emerald-400' 
                                            : 'bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]'}
                                    `}
                                >
                                    {copied ? <Check size={14}/> : <Copy size={14}/>}
                                    {copied ? 'Copied' : 'Copy Name'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- WIDGET 2: FIELD CODE CIPHER --- */}
            {showSurvDecoder && (
                <div className="bg-[#18181b] border border-indigo-500/30 rounded-sm shadow-2xl overflow-visible relative z-20 flex flex-col">
                    {/* Widget Header */}
                    <div className="bg-[#121212] border-b border-white/5 p-4 flex justify-between items-center relative overflow-hidden rounded-t-sm">
                         <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                         <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Hash className="text-indigo-500" size={20} /> Field Code Cipher
                            </h2>
                            <p className="text-xs text-neutral-500 mt-1">Decrypt legacy survey codes with AI analysis.</p>
                         </div>
                         <div className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20 rounded flex items-center gap-1">
                             <Sparkles size={10}/> AI-Powered
                         </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-6">
                        <div className="relative">
                            <label className="block text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-2">Raw Data Input</label>
                            <div className="relative">
                                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                                <input 
                                    type="text" 
                                    value={decoderInput}
                                    onChange={(e) => setDecoderInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleDecode()}
                                    placeholder="Enter code (e.g. FND 3/4 IP RE TAG)"
                                    className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded text-sm font-mono text-white focus:outline-none focus:border-indigo-500/50 placeholder:text-neutral-700 transition-all uppercase"
                                />
                                <button 
                                    onClick={handleDecode}
                                    disabled={isDecoding || !decoderInput}
                                    className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white rounded font-bold text-xs uppercase transition-colors flex items-center"
                                >
                                    {isDecoding ? <Loader2 size={14} className="animate-spin"/> : "DEC"}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 bg-[#09090b] border border-white/10 rounded p-4 relative overflow-hidden min-h-[140px] flex items-center justify-center">
                            {/* Scanning Grid Background */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                            
                            {!decodedResult && !isDecoding && (
                                <div className="text-center text-neutral-600">
                                    <Bot size={32} className="mx-auto mb-2 opacity-50"/>
                                    <p className="text-xs font-mono uppercase tracking-widest">Awaiting Transmission...</p>
                                </div>
                            )}

                            {isDecoding && (
                                <div className="text-center text-indigo-500">
                                    <Loader2 size={32} className="mx-auto mb-2 animate-spin"/>
                                    <p className="text-xs font-mono uppercase tracking-widest animate-pulse">Running Heuristics...</p>
                                </div>
                            )}

                            {decodedResult && !isDecoding && (
                                <div className="w-full text-left animate-in fade-in slide-in-from-bottom-2">
                                    <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-2">
                                        <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Decoded Payload</div>
                                        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-500">
                                            <Activity size={10}/> {decodedResult.confidence}% Confidence
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-white mb-2 leading-tight">
                                        {decodedResult.description}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-neutral-500 uppercase">Category:</span>
                                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase tracking-wide">
                                            {decodedResult.category}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
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
