
import React, { useState } from 'react';
import { StandardCard, ThemeConfig, ElementType } from '../types';
import { MousePointer2, Star, FileText, Box, Layers, Terminal, Ruler, FileCode, HardDrive, Copy, Check, ExternalLink, Book, MoreVertical, ScanLine, Hash, Activity, RefreshCw, ShieldCheck, User } from 'lucide-react';

interface TradingCardProps {
  card: StandardCard;
  description?: string;
  theme: ThemeConfig;
  variant?: 'gallery' | 'zoomed';
  onZoom?: () => void;
  onClose?: () => void;
  onToggleFavorite?: (id: string) => void;
}

export const TradingCard: React.FC<TradingCardProps> = ({ card, description, theme, variant = 'gallery', onZoom, onClose, onToggleFavorite }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Determine layout mode based on category
  // Visual: SYMBOLS, BLOCKS, DETAILS (Focus on Geometry)
  // Data: LAYERS, MACROS, SPECS (Focus on Attributes/Text)
  const isVisualCategory = [ElementType.SYMBOLS, ElementType.BLOCKS, ElementType.DETAILS].includes(card.category);

  // Determine which description to show: prop override > card data
  const displayDescription = description || card.description;

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variant === 'zoomed' && onClose) onClose();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (variant === 'gallery' && onZoom) {
      onZoom();
    } else if (variant === 'zoomed') {
      handleFlip();
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(card.id);
  }

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.fullPath) {
        navigator.clipboard.writeText(card.fullPath);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to get border/text color class from theme base color
  // For text, we typically want the 400 or 500 shade which matches baseColor
  const borderColorClass = theme.baseColor.replace('bg-', 'border-');
  const textColorClass = theme.baseColor.replace('bg-', 'text-');
  const hoverBorderClass = theme.baseColor.replace('bg-', 'hover:border-');

  // Render either the CAD SVG or a fallback icon
  const renderPreview = (sizeOverride?: number, staticPreview: boolean = false) => {
    // Using SVG data if available
    if (card.previewSvg) {
        const { viewBox, paths } = card.previewSvg;
        
        // For Data cards, we use a simpler, non-animated rendering style
        const animateClass = !staticPreview && variant === 'zoomed' ? 'animate-enter-draw' : '';
        const hoverClass = !staticPreview && variant === 'gallery' ? 'group-hover:scale-110' : '';

        return (
            <svg 
              viewBox={viewBox} 
              className={`
                w-full h-full transition-transform duration-500 ease-out
                ${animateClass}
                ${hoverClass}
                ${textColorClass}
              `}
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
                {paths && paths.map((p, i) => (
                    <path 
                        key={i} 
                        d={p.d} 
                        stroke="currentColor" 
                        strokeWidth={p.strokeWidth || 1.5}
                        fill={p.fill || 'none'}
                        className="transition-all duration-500"
                        style={{ opacity: p.opacity || 1 }}
                    />
                ))}
            </svg>
        );
    }

    // Fallback
    const size = sizeOverride || (variant === 'gallery' ? 48 : 72);
    const className = `${textColorClass} opacity-80`;
    const props = { size, strokeWidth: 1.5, className };
    
    switch (card.category) {
      case 'LAYERS': return <Layers {...props} />;
      case 'MACROS': return <Terminal {...props} />;
      case 'SYMBOLS': return <Box {...props} />;
      case 'BLOCKS': return <Box {...props} />;
      case 'DETAILS': return <Ruler {...props} />;
      case 'SPECIFICATIONS': return <Book {...props} />;
      default: return <FileText {...props} />;
    }
  };

  // ============================================================================
  // GALLERY VARIANT (UNIFIED LAYOUT)
  // ============================================================================
  if (variant === 'gallery') {
    return (
      <div 
        onClick={handleClick}
        className={`
          group relative w-full aspect-[4/3] 
          bg-[var(--bg-card)] rounded-sm overflow-hidden
          border border-[var(--border-main)]
          transition-all duration-300 cursor-pointer
          flex flex-col shadow-md
          hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
          ${hoverBorderClass}
        `}
      >
         {/* Top Accent Bar (Thick) */}
         <div className={`w-full h-1.5 ${theme.baseColor}`}></div>

         {/* Header Row */}
         <div className="px-3 pt-3 flex justify-between items-start">
             <div className="flex-1 pr-2">
                <h3 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--text-highlight)] tracking-wide leading-tight truncate">
                   {card.title}
                </h3>
             </div>
             <div className="flex flex-col items-end gap-1">
                <span className={`text-[9px] font-bold uppercase tracking-wider ${textColorClass}`}>
                    {card.subCategory}
                </span>
                <button 
                    onClick={handleStarClick} 
                    className="hover:scale-110 transition-transform"
                >
                   <Star size={12} className={card.isFavorite ? "fill-amber-400 text-amber-400" : "text-neutral-600 hover:text-neutral-400"} />
                </button>
             </div>
         </div>

         {/* Main Content Body (Divergent based on Type) */}
         <div className="flex-1 relative px-3 py-2 flex items-center justify-center overflow-hidden">
             
             {isVisualCategory ? (
                 // --- VISUAL STYLE: Large Animated SVG ---
                 <div className="w-full h-full flex items-center justify-center p-2 relative">
                    {/* Background Grid for Visuals */}
                    <div className="absolute inset-2 border border-[var(--border-subtle)] bg-white/[0.02] rounded-sm"></div>
                    <div className="relative w-full h-full z-10">
                        {renderPreview()}
                    </div>
                 </div>
             ) : (
                 // --- DATA STYLE: Text + Small Static Icon ---
                 <div className="w-full h-full relative flex flex-col">
                     {/* Description Text */}
                     <div className="relative z-10 flex-1 overflow-hidden group-hover:overflow-y-auto custom-scrollbar pr-8 pt-1">
                        <p className={`
                            text-xs leading-relaxed font-medium text-neutral-500 dark:text-neutral-400 
                            group-hover:${textColorClass} 
                            transition-colors
                        `}>
                           {displayDescription}
                        </p>
                     </div>

                     {/* Static Icon - Positioned Top Right, Small & Static */}
                     <div className="absolute top-0 right-0 w-8 h-8 opacity-60 pointer-events-none">
                        {renderPreview(32, true)}
                     </div>
                 </div>
             )}

         </div>

         {/* Footer Row */}
         <div className="px-3 pb-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] font-mono text-neutral-500">
             <div className="flex items-center gap-1 truncate max-w-[60%]">
                <FileCode size={10} />
                <span className="truncate uppercase">{card.filename || 'NO_FILE'}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="opacity-50">ID:</span>
                <span className="text-neutral-400">{card.id}</span>
             </div>
         </div>
      </div>
    );
  }

  // ============================================================================
  // ZOOMED VARIANT (DARK INDUSTRIAL THEME)
  // ============================================================================
  return (
    <div 
      className="relative w-[360px] h-[540px] md:w-[550px] md:h-[750px] perspective-1000 cursor-pointer selection:bg-transparent"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
       <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* ================= FRONT FACE ================= */}
          <div className="absolute inset-0 backface-hidden bg-[var(--bg-card)] border border-[var(--border-main)] rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
             
             {/* Status Bar */}
             <div className="h-1.5 w-full flex">
                <div className={`flex-1 ${theme.baseColor} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}></div>
                <div className="w-16 bg-neutral-800 border-l border-white/5"></div>
             </div>

             {/* Header Section */}
             <div className="px-8 pt-8 pb-6 flex justify-between items-start bg-white/[0.02] border-b border-[var(--border-subtle)] relative">
                {/* Decorative Corner Mark */}
                <div className={`absolute top-0 right-0 w-0 h-0 border-t-[24px] border-l-[24px] border-t-${theme.baseColor.split('-')[1]}-500/20 border-l-transparent`}></div>

                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-3 mb-3">
                     <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-white/10 text-neutral-300 rounded border border-white/5 tracking-wider">
                       ID.{card.id}
                     </span>
                     <div className="h-px w-8 bg-white/10"></div>
                     <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${textColorClass}`}>
                        {card.category} // {card.subCategory}
                     </span>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight leading-none mb-2">{card.title}</h2>
                  
                  {/* Data Card Description (Front Face) */}
                  {!isVisualCategory && displayDescription && (
                     <div className="mt-4 relative pl-4">
                        <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${theme.baseColor} opacity-50`}></div>
                        <p className="text-sm text-neutral-400 font-medium leading-relaxed">
                            {displayDescription}
                        </p>
                     </div>
                  )}
                </div>
                <button 
                    onClick={handleStarClick} 
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all group shadow-lg"
                >
                  <Star size={24} className={card.isFavorite ? "fill-amber-400 text-amber-400" : "text-neutral-600 group-hover:text-white"} />
                </button>
             </div>

             {/* Main Content Area (Grid Background) */}
             <div className="flex-1 p-8 relative flex flex-col">
                {/* Dark Dot Grid Background */}
                <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none"></div>
                
                {isVisualCategory ? (
                    // --- VISUAL ZOOMED LAYOUT ---
                    <div className="flex-1 flex items-center justify-center relative z-10">
                        {/* Glowing Portal Container */}
                        <div className={`
                            relative w-56 h-56 md:w-72 md:h-72 rounded-full 
                            flex items-center justify-center group-hover:scale-105 transition-transform duration-500
                            ${textColorClass}
                        `}>
                            {/* Outer Glow Ring */}
                            <div className={`absolute inset-0 rounded-full border-2 ${borderColorClass} opacity-20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}></div>
                            {/* Rotating Ring */}
                            <div className={`absolute inset-4 rounded-full border border-dashed ${borderColorClass} opacity-20 animate-[spin_10s_linear_infinite]`}></div>
                            
                            {/* The SVG Itself */}
                            <div className="w-36 h-36 md:w-52 md:h-52 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                {renderPreview(undefined, false)}
                            </div>
                        </div>
                        
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded border border-white/10 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                                <ScanLine size={12} /> Interactive Geometry
                             </div>
                        </div>
                    </div>
                ) : (
                    // --- DATA ZOOMED LAYOUT ---
                    <div className="flex-1 flex flex-col relative z-10">
                        {/* Static Icon Header */}
                        <div className="flex items-center gap-6 mb-8">
                             <div className={`w-24 h-24 p-5 rounded-xl border border-white/10 bg-black/20 shadow-inner flex items-center justify-center ${textColorClass}`}>
                                {renderPreview(undefined, true)}
                             </div>
                             <div className="space-y-2">
                                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">System UUID</div>
                                <div className="font-mono text-xl text-white tracking-widest">{card.id}</div>
                                <div className="h-1 w-16 bg-white/10 rounded-full"></div>
                             </div>
                        </div>

                        {/* Quick Attributes Grid - Dark Theme */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                             <div className="p-4 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-colors">
                                 <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                                    <RefreshCw size={12}/> Revision
                                 </div>
                                 <div className="font-mono text-sm font-bold text-white">v2.0.4</div>
                             </div>
                             <div className="p-4 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-colors">
                                 <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                                    <User size={12}/> Author
                                 </div>
                                 <div className="font-mono text-sm font-bold text-white">Admin</div>
                             </div>
                             <div className="p-4 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-colors">
                                 <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                                    <Ruler size={12}/> Scale
                                 </div>
                                 <div className="font-mono text-sm font-bold text-white">1:1 (NTS)</div>
                             </div>
                             <div className="p-4 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-colors">
                                 <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                                    <Activity size={12}/> Usage
                                 </div>
                                 <div className={`font-mono text-sm font-bold ${parseInt(card.stats.usage.toString()) > 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {card.stats.usage}/100
                                 </div>
                             </div>
                        </div>
                        
                        <div className="mt-6 text-center opacity-40">
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Standard Configuration</span>
                        </div>
                    </div>
                )}
             </div>

             {/* Footer Actions */}
             <div className="h-16 bg-[var(--bg-main)] border-t border-[var(--border-subtle)] flex items-center text-xs font-bold text-neutral-400">
                <div className="flex-1 h-full flex items-center justify-center gap-2 border-r border-[var(--border-subtle)]">
                   <ShieldCheck size={14} className="text-emerald-500"/>
                   <span className="tracking-wider">VERIFIED</span>
                </div>
                <div className="flex-1 h-full flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-colors group text-neutral-300">
                   <span className="tracking-wider">INSPECT SPEC</span>
                   <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity"/>
                </div>
             </div>
          </div>


          {/* ================= BACK FACE (Specification) ================= */}
          <div className={`
             absolute inset-0 backface-hidden rotate-y-180 
             bg-[var(--bg-card)] border border-[var(--border-main)] rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]
             flex flex-col overflow-hidden text-neutral-300
          `}>
             {/* Top Bar */}
             <div className={`h-1.5 w-full ${theme.baseColor} opacity-50`}></div>

             {/* Header */}
             <div className="h-20 bg-[#121212] border-b border-white/5 flex items-center px-8 justify-between">
                <div>
                    <h2 className={`text-lg font-bold tracking-widest uppercase font-mono flex items-center gap-2 ${textColorClass}`}>
                    <FileText size={18} /> Specification
                    </h2>
                    <p className="text-[10px] text-neutral-600 font-mono mt-1">INTERNAL REFERENCE DATA</p>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded border border-white/5 text-xs font-mono text-neutral-400">
                    REF-{card.id}
                </div>
             </div>

             {/* Scrollable Terminal Content */}
             <div className="flex-1 p-8 font-mono text-sm overflow-y-auto custom-scrollbar bg-[#09090b] relative">
                 {/* Subtle Grid in Background */}
                 <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                 
                 <div className="relative z-10 space-y-8">
                    
                    {/* Section 1: Description */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${textColorClass} opacity-80`}>
                            <Hash size={12}/> Description
                        </h3>
                        <p className="leading-7 text-neutral-400 border-l-2 border-white/10 pl-4 text-xs">
                            {displayDescription}
                        </p>
                    </div>

                    {/* Section 2: Source Data */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${textColorClass} opacity-80`}>
                            <HardDrive size={12}/> Source Data
                        </h3>
                        
                        <div className="space-y-3">
                            {/* Filename */}
                            <div className="group">
                                <label className="block text-[9px] text-neutral-600 mb-1 uppercase tracking-wider">Filename</label>
                                <div className="flex items-center gap-3 text-neutral-300 bg-white/5 p-3 rounded border border-white/5 hover:border-white/20 transition-colors">
                                    <FileCode size={14} className="opacity-50 shrink-0"/>
                                    <span className="truncate select-all">{card.filename || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Full Path */}
                            <div className="group">
                                <div className="flex justify-between items-end mb-1">
                                    <label className="block text-[9px] text-neutral-600 uppercase tracking-wider">Network Path</label>
                                    {copied && <span className="text-[9px] text-emerald-500 font-bold animate-pulse">COPIED</span>}
                                </div>
                                <div 
                                    onClick={handleCopyPath}
                                    className="relative flex items-start gap-3 text-neutral-400 bg-white/5 p-3 rounded border border-white/5 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all cursor-pointer"
                                >
                                    <Terminal size={14} className="mt-1 shrink-0 opacity-50"/>
                                    <span className="break-all text-xs leading-relaxed">{card.fullPath}</span>
                                    <div className="absolute top-2 right-2 p-1 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Copy size={10} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: System Properties (Data Cards Only) */}
                    {!isVisualCategory && (
                        <div>
                            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${textColorClass} opacity-80`}>
                                <Layers size={12}/> Layer Attributes
                            </h3>
                            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded overflow-hidden">
                                <div className="p-3 bg-[#121212]">
                                    <div className="text-[9px] text-neutral-600 uppercase">Layer Key</div>
                                    <div className="text-xs text-neutral-300 mt-1">C-PROP-LINE</div>
                                </div>
                                <div className="p-3 bg-[#121212]">
                                    <div className="text-[9px] text-neutral-600 uppercase">Color</div>
                                    <div className="text-xs text-neutral-300 mt-1">INDEX 4 (CYAN)</div>
                                </div>
                                <div className="p-3 bg-[#121212]">
                                    <div className="text-[9px] text-neutral-600 uppercase">Linetype</div>
                                    <div className="text-xs text-neutral-300 mt-1">PHANTOM2</div>
                                </div>
                                <div className="p-3 bg-[#121212]">
                                    <div className="text-[9px] text-neutral-600 uppercase">Plot Style</div>
                                    <div className="text-xs text-neutral-300 mt-1">NORMAL</div>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
             </div>

             {/* Action Footer */}
             <div className="p-6 bg-[#121212] border-t border-white/10">
                <button className={`
                    w-full py-3 font-bold text-black text-sm uppercase tracking-widest rounded shadow-lg 
                    ${theme.baseColor} hover:brightness-110 active:scale-[0.98] transition-all 
                    flex items-center justify-center gap-2
                `}>
                  Load Into Project <ExternalLink size={16}/>
                </button>
             </div>
          </div>

       </div>
       
       <style>{`
           @keyframes dash {
              from { stroke-dasharray: 100; stroke-dashoffset: 100; }
              to { stroke-dasharray: 100; stroke-dashoffset: 0; }
           }
           .animate-enter-draw path {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: dash 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
           }
           /* Stagger animations */
           .animate-enter-draw path:nth-child(1) { animation-delay: 0.1s; }
           .animate-enter-draw path:nth-child(2) { animation-delay: 0.3s; }
           .animate-enter-draw path:nth-child(3) { animation-delay: 0.5s; }
       `}</style>
    </div>
  );
};
