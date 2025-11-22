import React, { useState } from 'react';
import { StandardCard, ThemeConfig } from '../types';
import { MousePointer2, Star, FileText, Box, Layers, Terminal, Ruler, FileCode, HardDrive, Copy, Check, ExternalLink, Book } from 'lucide-react';

interface TradingCardProps {
  card: StandardCard;
  theme: ThemeConfig;
  variant?: 'gallery' | 'zoomed';
  onZoom?: () => void;
  onClose?: () => void;
  onToggleFavorite?: (id: string) => void;
}

export const TradingCard: React.FC<TradingCardProps> = ({ card, theme, variant = 'gallery', onZoom, onClose, onToggleFavorite }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Right click exits zoom mode if zoomed
    if (variant === 'zoomed' && onClose) {
      onClose();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (variant === 'gallery' && onZoom) {
      onZoom();
    } else if (variant === 'zoomed') {
      // Left click flips in zoomed mode
      handleFlip();
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(card.id);
    }
  }

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.fullPath) {
        navigator.clipboard.writeText(card.fullPath);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render Category Icon
  const renderIcon = () => {
    const size = variant === 'gallery' ? 48 : 80;
    const props = { size, strokeWidth: 2.5, className: theme.textColor };
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
  // GALLERY VARIANT
  // ============================================================================
  if (variant === 'gallery') {
    return (
      <div 
        onClick={handleClick}
        className={`
          group relative w-full aspect-[3/4] 
          bg-white border-4 border-black rounded-xl
          shadow-hard hover:shadow-hard-lg 
          hover:-translate-y-1 hover:-translate-x-1 hover:scale-[1.02]
          transition-all duration-200 cursor-pointer
          flex flex-col overflow-hidden
        `}
      >
         {/* Star Badge */}
         <button 
            onClick={handleStarClick}
            className="absolute top-2 right-2 z-20 hover:scale-125 transition-transform"
         >
            <Star 
              size={24} 
              className={`${card.isFavorite ? 'fill-yellow-400 text-black' : 'text-neutral-300'} drop-shadow-sm transition-colors`} 
              strokeWidth={3}
            />
         </button>

         {/* Header */}
         <div className={`h-16 ${theme.baseColor} border-b-4 border-black flex items-center px-3 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20" style={{ background: theme.pattern }}></div>
            <span className={`font-black text-lg leading-none ${theme.textColor} uppercase truncate z-10 pr-6`}>
              {card.title}
            </span>
         </div>

         {/* Body */}
         <div className="flex-1 flex items-center justify-center bg-neutral-100 relative">
             <div className="absolute inset-0 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:10px_10px]"></div>
             
             {/* Central Graphic */}
             <div className={`
                w-24 h-24 rounded-full border-4 border-black ${theme.accentColor} 
                flex items-center justify-center shadow-hard-sm group-hover:scale-110 transition-transform
             `}>
               {renderIcon()}
             </div>
         </div>

         {/* Footer */}
         <div className="p-3 border-t-4 border-black bg-white flex flex-col gap-1">
            <div className="w-8 h-1 bg-black mb-1"></div>
            <p className="font-mono text-xs text-neutral-600 leading-tight line-clamp-2">
              {card.description}
            </p>
         </div>

         {/* Hover Hint */}
         <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
             <div className="text-white font-mono text-xs flex flex-col items-center animate-bounce">
                <MousePointer2 className="mb-2" />
                <span>CLICK TO ZOOM</span>
             </div>
         </div>
      </div>
    );
  }

  // ============================================================================
  // ZOOMED VARIANT
  // ============================================================================
  return (
    <div 
      className="relative w-[340px] h-[520px] md:w-[500px] md:h-[700px] perspective-1000 cursor-pointer selection:bg-transparent"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
       <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* ================= FRONT FACE ================= */}
          <div className={`
             absolute inset-0 backface-hidden bg-white border-[6px] border-black rounded-2xl 
             shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden
          `}>
             {/* Header Area */}
             <div className={`h-24 ${theme.baseColor} border-b-[6px] border-black flex items-center justify-between px-6 relative`}>
                <div className="absolute inset-0 opacity-20" style={{ background: theme.pattern }}></div>
                <div>
                  <h2 className={`text-3xl font-black ${theme.textColor} uppercase tracking-tight truncate max-w-[300px]`}>{card.title}</h2>
                  <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 rounded-sm inline-block mt-1">
                    REV 2.0
                  </span>
                </div>
                <button 
                  onClick={handleStarClick} 
                  className="hover:scale-110 transition-transform z-20"
                >
                  <Star size={40} className={`${card.isFavorite ? 'fill-yellow-400 text-black' : 'text-black/20'}`} strokeWidth={3} />
                </button>
             </div>

             {/* Main Diagram Area */}
             <div className="flex-1 bg-neutral-100 p-6 flex flex-col gap-4 relative">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#ddd_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                
                {/* Schematic Box */}
                <div className="flex-1 border-4 border-black bg-white shadow-hard-sm relative flex flex-col items-center justify-center overflow-hidden group">
                   {/* Corner bolts */}
                   <div className="absolute top-2 left-2 w-3 h-3 rounded-full border-2 border-black bg-neutral-300"></div>
                   <div className="absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-black bg-neutral-300"></div>
                   <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full border-2 border-black bg-neutral-300"></div>
                   <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-black bg-neutral-300"></div>

                   <div className="scale-150 transform group-hover:rotate-12 transition-transform duration-500">
                     {renderIcon()}
                   </div>
                   <div className="mt-8 font-mono font-bold text-2xl tracking-widest opacity-20">SCHEMATIC_VIEW</div>
                </div>

                {/* Info Row */}
                <div className="h-24 grid grid-cols-3 gap-4 font-mono">
                   <div className="border-4 border-black bg-white shadow-hard-sm flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-xs text-neutral-500 font-bold">ID</span>
                      <span className="text-xl font-black">{card.id}</span>
                   </div>
                   <div className="border-4 border-black bg-white shadow-hard-sm flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-xs text-neutral-500 font-bold">CAT</span>
                      <span className="text-sm font-black truncate w-full">{card.category.substring(0, 4)}</span>
                   </div>
                   <div className="border-4 border-black bg-white shadow-hard-sm flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-xs text-neutral-500 font-bold">USAGE</span>
                      <span className="text-xl font-black">{card.stats.usage}%</span>
                   </div>
                </div>
             </div>
          </div>


          {/* ================= BACK FACE ================= */}
          <div className={`
             absolute inset-0 backface-hidden rotate-y-180 bg-neutral-900 border-[6px] border-black rounded-2xl 
             shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden
          `}>
             {/* Back Header */}
             <div className="h-20 bg-neutral-800 border-b-[6px] border-black flex items-center justify-center">
                <h2 className="text-2xl font-black text-white uppercase tracking-widest">Specifications</h2>
             </div>

             {/* Blue Print Content */}
             <div className="flex-1 bg-[#1a365d] p-8 flex flex-col gap-4 relative text-blue-100 font-mono overflow-y-auto scrollbar-none">
                 <div className="absolute inset-0 opacity-20 pointer-events-none" 
                      style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                 </div>

                 {/* Description */}
                 <div className="border-2 border-blue-300/30 bg-blue-900/40 p-4 rounded backdrop-blur-sm">
                   <h3 className="font-bold text-blue-300 mb-2 border-b border-blue-300/30 pb-1 flex items-center gap-2">
                     <FileText size={16}/> DESCRIPTION
                   </h3>
                   <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
                 </div>

                 {/* File Info */}
                 <div className="border-2 border-blue-300/30 bg-blue-900/40 p-4 rounded backdrop-blur-sm flex-1 flex flex-col">
                   <h3 className="font-bold text-blue-300 mb-4 border-b border-blue-300/30 pb-1 flex items-center gap-2">
                     <HardDrive size={16}/> FILE SOURCE
                   </h3>
                   
                   <div className="space-y-6">
                     <div>
                       <div className="text-xs text-blue-400 mb-1">FILENAME</div>
                       <div className="text-white font-bold text-sm break-all flex items-center gap-2 group cursor-pointer hover:text-yellow-300 transition-colors">
                         <FileCode size={16} className="shrink-0"/> 
                         <span className="border-b border-transparent group-hover:border-yellow-300">{card.filename || 'N/A'}</span>
                         <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                       </div>
                     </div>
                     
                     <div>
                       <div className="text-xs text-blue-400 mb-1 flex justify-between items-center">
                         <span>FULL PATH</span>
                         {copied && <span className="text-green-400 flex items-center gap-1"><Check size={12}/> COPIED</span>}
                       </div>
                       <div 
                         onClick={handleCopyPath}
                         className="bg-black/40 p-3 rounded text-xs font-mono text-green-400 break-all border border-blue-500/30 hover:border-green-400/50 cursor-copy transition-all relative group"
                       >
                         {card.fullPath || 'Network path unavailable'}
                         <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900/80 p-1 rounded">
                            <Copy size={14} className="text-white"/>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Action Button */}
                 <div className="mt-auto pt-4">
                   <button 
                    onClick={(e) => { e.stopPropagation(); /* Add load logic */ }} 
                    className="w-full py-4 bg-yellow-400 text-black font-black uppercase tracking-widest border-4 border-black shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-yellow-500"
                   >
                     Load Standard
                   </button>
                 </div>
             </div>
          </div>

       </div>
    </div>
  );
};