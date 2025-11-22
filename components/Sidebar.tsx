import React from 'react';
import { NavButton, ThemeConfig, SidebarFilter } from '../types';
import { Settings, Battery, Zap, Hexagon, Layers, Terminal, TriangleAlert, Cuboid, Ruler, Book, Activity, Database, Server } from 'lucide-react';

interface SidebarProps {
  buttons: NavButton[];
  theme: ThemeConfig;
  activeFilter: SidebarFilter;
  onFilterChange: (filter: SidebarFilter) => void;
  filteredCount: number;
  totalCount: number;
}

// Map string icon names from constants to Lucide components
const ThemeIconMap: Record<string, React.ElementType> = {
  'Layers': Layers,
  'Terminal': Terminal,
  'TriangleAlert': TriangleAlert,
  'Cuboid': Cuboid,
  'Ruler': Ruler,
  'Book': Book
};

export const Sidebar: React.FC<SidebarProps> = ({ buttons, theme, activeFilter, onFilterChange, filteredCount, totalCount }) => {
  // Determine which icon to use based on the active theme
  const ThemeIcon = ThemeIconMap[theme.iconName] || Hexagon;

  return (
    <div className={`w-72 flex-shrink-0 border-r-4 border-black flex flex-col relative transition-colors duration-500 ${theme.baseColor} shadow-[4px_0px_10px_rgba(0,0,0,0.3)] z-20`}>
      
      {/* Panel Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundSize: '20px 20px', backgroundImage: theme.pattern }}></div>
      
      {/* Header: Theme Indicator */}
      <div className="p-6 border-b-4 border-black bg-black/10 backdrop-blur-sm relative">
        {/* Decorative Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-neutral-800 border border-black flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-black rotate-45"></div></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-neutral-800 border border-black flex items-center justify-center shadow-inner"><div className="w-full h-[1px] bg-black rotate-45"></div></div>

        <div className="flex items-center justify-between mb-2">
           <span className="font-bold text-xs font-mono tracking-widest text-black/60">SYS.PANEL_01</span>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-black/30"></div>
           </div>
        </div>
        <h2 className={`text-4xl font-black uppercase tracking-tighter text-black drop-shadow-sm`}>
          {theme.label}
        </h2>
        <div className="w-full h-2 bg-black/20 mt-2 rounded-full overflow-hidden border-2 border-black">
          <div className="h-full bg-white animate-scan w-1/2"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto z-10">
        {buttons.map((btn) => {
          const isActive = activeFilter === btn.action;
          
          return (
            <button
              key={btn.id}
              onClick={() => onFilterChange(btn.action)}
              className={`
                relative w-full p-3 font-bold text-sm uppercase transition-all duration-100
                border-4 border-black bg-white
                text-black
                flex items-center justify-between group
                ${btn.isSpecial ? 'bg-red-500 text-white hover:bg-red-400' : 'hover:bg-neutral-100'}
                ${isActive ? 'translate-x-1 translate-y-1 shadow-none border-l-8 border-t-8 bg-neutral-200' : 'hover:translate-x-1 hover:translate-y-[-4px] hover:shadow-hard shadow-hard-sm'}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Status LED */}
                {!btn.isSpecial && (
                  <div className={`
                    w-3 h-3 rounded-full border border-black transition-all duration-300
                    ${isActive ? `bg-${theme.accentColor.replace('bg-', '')} shadow-[0_0_8px_rgba(255,255,255,0.8)]` : 'bg-neutral-300'}
                  `}></div>
                )}
                <span className="z-10 relative">{btn.label}</span>
              </div>
              
              {btn.isSpecial && <Zap size={16} className="fill-yellow-300 text-black animate-pulse" />}
              {!btn.isSpecial && <ThemeIcon size={16} className={`text-black/20 group-hover:text-black/50 transition-colors`} />}
            </button>
          );
        })}
      </div>

      {/* Decorative "Gadget" / System Diagnostics Area */}
      <div className="p-4 border-t-4 border-black bg-black/5 relative">
         {/* Screws */}
         <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-neutral-400 border border-black"></div>
         <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neutral-400 border border-black"></div>

         <div className="bg-black p-4 rounded-sm border-4 border-neutral-700 shadow-[inset_0_0_10px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
            
            <div className="flex justify-between text-green-500 mb-3 border-b border-green-900/50 pb-1">
               <div className="flex items-center gap-2">
                 <Activity size={14} className="animate-pulse" />
                 <span className="font-mono text-[10px] font-bold">SYS_MONITOR</span>
               </div>
               <Settings size={14} className="animate-spin-slow text-green-700" />
            </div>
            
            <div className="font-mono text-xs text-green-400 space-y-1">
              <div className="flex justify-between">
                <span className="text-green-700">></span> 
                <span className="opacity-70">MODE:</span>
                <span className="font-bold text-white">{activeFilter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">></span> 
                <span className="opacity-70">MODULES:</span>
                <span className="font-bold text-white">{filteredCount.toString().padStart(3, '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">></span> 
                <span className="opacity-70">TOTAL:</span>
                <span className="font-bold text-white">{totalCount.toString().padStart(3, '0')}</span>
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="mt-3 flex gap-0.5 h-4 items-end">
               {Array.from({ length: 10 }).map((_, i) => {
                 // Simple fake visualization based on count
                 const height = Math.max(20, (filteredCount * (i + 1) * 13) % 100); 
                 return (
                   <div key={i} className="flex-1 bg-green-900/40 relative">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-green-500 transition-all duration-500" 
                        style={{ height: `${height}%` }}
                      ></div>
                   </div>
                 )
               })}
            </div>
         </div>
      </div>
    </div>
  );
};