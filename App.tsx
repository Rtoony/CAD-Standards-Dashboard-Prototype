import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TradingCard } from './components/TradingCard';
import { THEMES, SIDEBAR_BUTTONS, SUB_CATEGORIES, generateMockCards } from './constants';
import { ElementType, SidebarFilter } from './types';
import { X, Search, ChevronDown, ArrowUpDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ElementType>(ElementType.LAYERS);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('ALL');
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilter>('ALL');
  const [zoomedCardId, setZoomedCardId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<'NAME_ASC' | 'NAME_DESC' | 'USAGE_DESC' | 'USAGE_ASC'>('NAME_ASC');
  
  // Use state for cards to support favorite toggling
  // Initial load from constants
  const [allCards, setAllCards] = useState(generateMockCards(activeCategory));

  // Update cards when category changes
  useEffect(() => {
    setAllCards(generateMockCards(activeCategory));
    setActiveSubCategory('ALL'); // Reset sub-category on main category change
    setSidebarFilter('ALL'); // Reset sidebar filter on category change
  }, [activeCategory]);

  const toggleFavorite = (id: string) => {
    setAllCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  // Derived state for display
  const activeTheme = THEMES[activeCategory];
  const currentSubCategories = SUB_CATEGORIES[activeCategory];
  
  // Filter AND Sort cards
  const filteredCards = allCards
    .filter(card => {
      // 1. Search Text
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            card.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Sub-Category Filter
      const matchesSubCat = activeSubCategory === 'ALL' || card.subCategory === activeSubCategory;
      
      // 3. Sidebar "Mode" Filter
      let matchesSidebar = true;
      switch (sidebarFilter) {
        case 'NEW':
          matchesSidebar = card.isNew;
          break;
        case 'FAVORITES':
          matchesSidebar = card.isFavorite;
          break;
        case 'FREQUENT':
          // Handled by sort, but we filter to ensure we only show relevant ones? 
          // Or just allow all? Let's allow all but auto-sort.
          matchesSidebar = true; 
          break;
        case 'ALL':
        default:
          matchesSidebar = true;
          break;
      }

      return matchesSearch && matchesSubCat && matchesSidebar;
    })
    .sort((a, b) => {
      // If Sidebar is set to FREQUENT, override sort to Usage Descending
      if (sidebarFilter === 'FREQUENT') {
        return b.stats.usage - a.stats.usage;
      }

      switch (sortMode) {
        case 'NAME_ASC': return a.title.localeCompare(b.title);
        case 'NAME_DESC': return b.title.localeCompare(a.title);
        case 'USAGE_DESC': return b.stats.usage - a.stats.usage;
        case 'USAGE_ASC': return a.stats.usage - b.stats.usage;
        default: return 0;
      }
    });

  const zoomedCard = allCards.find(c => c.id === zoomedCardId);

  // Reset search when changing categories
  useEffect(() => {
    setSearchTerm("");
  }, [activeCategory]);

  return (
    <div className="flex h-screen w-screen bg-[#202020] overflow-hidden font-sans relative">
      
      <Sidebar 
        buttons={SIDEBAR_BUTTONS} 
        theme={activeTheme} 
        activeFilter={sidebarFilter}
        onFilterChange={setSidebarFilter}
        filteredCount={filteredCards.length}
        totalCount={allCards.length}
      />

      <main className="flex-1 flex flex-col relative">

        {/* Background: Drafting Table Mat Look */}
        <div className="absolute inset-0 -z-10 bg-[#1a1a1a]">
           <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
           {/* Large faded category text */}
           <div className="absolute bottom-0 right-10 text-[15rem] font-black text-white/5 pointer-events-none select-none leading-none">
              {activeCategory.charAt(0)}
           </div>
        </div>

        {/* Top Tabs Area */}
        <div className="pt-8 pl-8 flex items-end z-10 gap-1 overflow-x-auto scrollbar-hide">
          {Object.values(THEMES).map((theme) => {
            const isActive = activeCategory === theme.id;
            
            return (
              <button
                key={theme.id}
                onClick={() => setActiveCategory(theme.id)}
                className={`
                  relative px-8 py-3 min-w-[140px] font-black tracking-tight uppercase text-lg transition-all duration-200
                  border-t-4 border-x-4 border-black rounded-t-lg shrink-0
                  ${isActive 
                    ? `${theme.baseColor} ${theme.textColor} translate-y-1 z-10` 
                    : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'}
                `}
              >
                {theme.label}
                {/* Tab Highlight Line */}
                {isActive && <div className="absolute bottom-[-4px] left-0 w-full h-4 bg-inherit z-20"></div>}
              </button>
            );
          })}
          {/* Line that runs under inactive tabs */}
          <div className="flex-1 border-b-4 border-black h-4 transform translate-y-[-4px] bg-transparent min-w-[50px]"></div>
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto relative scroll-smooth border-t-4 border-black bg-[#252525] shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]`}>
          
          {/* Sticky Compact Header (Search & Sort & Sub-cats) */}
          <div className="sticky top-0 z-30 bg-[#252525]/95 backdrop-blur-sm border-b-2 border-black/20 shadow-xl flex flex-col">
             
             {/* Top Row: Search & Sort */}
             <div className="px-6 py-3 flex flex-col sm:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative group flex-1 w-full sm:w-auto max-w-3xl">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                          <Search className="text-black/40" size={18} strokeWidth={3} />
                      </div>
                      <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder={`SEARCH ${activeTheme.label}...`}
                          className="
                            block w-full pl-10 pr-4 py-2 
                            border-4 border-black bg-white 
                            text-black font-bold font-mono uppercase text-sm
                            shadow-hard-sm transition-all 
                            focus:outline-none focus:shadow-hard focus:-translate-y-0.5 focus:-translate-x-0.5
                            placeholder:text-neutral-400
                          "
                      />
                </div>

                {/* Sort Control */}
                <div className="relative w-full sm:w-auto min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <ArrowUpDown className="text-black/40" size={16} strokeWidth={3} />
                    </div>
                    <select
                        value={sortMode}
                        onChange={(e) => setSortMode(e.target.value as any)}
                        disabled={sidebarFilter === 'FREQUENT'} // Disable manual sort if FREQUENT mode is active
                        className={`
                            appearance-none w-full pl-10 pr-8 py-2
                            border-4 border-black bg-white
                            text-black font-bold font-mono uppercase text-sm
                            shadow-hard-sm transition-all cursor-pointer
                            focus:outline-none focus:shadow-hard focus:-translate-y-0.5 focus:-translate-x-0.5
                            ${sidebarFilter === 'FREQUENT' ? 'opacity-50 cursor-not-allowed bg-neutral-200' : ''}
                        `}
                    >
                        {sidebarFilter === 'FREQUENT' ? (
                           <option>AUTO: FREQUENT</option>
                        ) : (
                          <>
                            <option value="NAME_ASC">NAME (A-Z)</option>
                            <option value="NAME_DESC">NAME (Z-A)</option>
                            <option value="USAGE_DESC">USAGE (HIGH)</option>
                            <option value="USAGE_ASC">USAGE (LOW)</option>
                          </>
                        )}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                        <ChevronDown className="text-black" size={16} strokeWidth={4} />
                    </div>
                </div>
             </div>

             {/* Bottom Row: Sub-Categories */}
             <div className="px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
                {currentSubCategories.map((subCat) => {
                  const isActive = activeSubCategory === subCat;
                  return (
                    <button
                      key={subCat}
                      onClick={() => setActiveSubCategory(subCat)}
                      className={`
                        px-4 py-1 rounded-full font-bold text-xs font-mono uppercase tracking-wider border-2 border-black transition-all
                        ${isActive 
                          ? `${activeTheme.accentColor} text-black shadow-hard-sm -translate-y-0.5` 
                          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'}
                      `}
                    >
                      {subCat}
                    </button>
                  );
                })}
             </div>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-32 px-8 pt-6">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <TradingCard 
                  key={card.id} 
                  card={card} 
                  theme={activeTheme} 
                  variant="gallery"
                  onZoom={() => setZoomedCardId(card.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-64 text-neutral-500 font-mono">
                 <Search size={64} className="mb-4 opacity-20" />
                 <p className="text-xl font-bold">NO_RECORDS_FOUND</p>
                 <p className="text-sm">ADJUST FILTERS OR SEARCH</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* ZOOM OVERLAY */}
      {zoomedCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setZoomedCardId(null)}
        >
           {/* Close Instructions */}
           <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-50">
             <button 
                onClick={() => setZoomedCardId(null)}
                className="bg-red-500 text-white p-2 rounded border-4 border-black shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
             >
               <X size={32} />
             </button>
             <span className="text-white font-mono text-xs bg-black px-2 py-1 hidden md:block">ESC / CLICK BG TO CLOSE</span>
           </div>

           {/* The Card */}
           <div className="cursor-default" onClick={(e) => e.stopPropagation()}>
             <TradingCard 
                card={zoomedCard} 
                theme={activeTheme} 
                variant="zoomed" 
                onClose={() => setZoomedCardId(null)}
                onToggleFavorite={toggleFavorite}
             />
           </div>

           <div className="absolute bottom-12 text-white font-mono text-lg font-bold tracking-[0.2em] uppercase animate-pulse bg-black px-4 py-2 border-2 border-white pointer-events-none">
              Left Click to Flip | Right Click to Exit
           </div>
        </div>
      )}
    </div>
  );
};

export default App;