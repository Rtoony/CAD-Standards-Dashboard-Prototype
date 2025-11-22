
import React, { useState } from 'react';
import { 
  Search, Clock, Activity, Users, MapPin, Server, Cpu, 
  Lightbulb, FileText, Shield, ExternalLink, Send, 
  AlertTriangle, Coffee, Calendar, ArrowUpRight, Zap
} from 'lucide-react';

export const HomeModule: React.FC = () => {
  const [suggestion, setSuggestion] = useState('');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090b] overflow-y-auto custom-scrollbar relative">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 p-8 max-w-[1920px] mx-auto w-full flex flex-col gap-6">
        
        {/* 1. HEADER & CORE UTILITY */}
        <header className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">System.OS // Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Good Morning, Alex
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Tuesday, October 24th • <span className="font-mono text-indigo-400">08:42 AM PST</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
             {/* Intranet Search */}
             <div className="relative flex-1 sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                <input 
                    type="text" 
                    placeholder="Search projects, files, or directory..."
                    className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-neutral-500 font-mono">CTRL</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-neutral-500 font-mono">K</span>
                </div>
             </div>

             {/* Timesheet Action */}
             <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-95">
                <Clock size={16} />
                <span>Submit Timesheet</span>
             </button>
          </div>
        </header>


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 2. OPERATIONS CENTER (Left Column - 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
             
             {/* A. Project Status Snapshot */}
             <div className="bg-[#121212] border border-white/10 rounded-sm p-5 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <div className="flex justify-between items-center mb-4">
                   <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Activity size={18} className="text-emerald-500" /> 
                      Active Projects
                   </h2>
                   <button className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 transition-colors">
                      View All <ArrowUpRight size={12}/>
                   </button>
                </div>
                
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider border-b border-white/5">
                         <tr>
                            <th className="pb-2 pl-2">Project</th>
                            <th className="pb-2">Lead</th>
                            <th className="pb-2">Phase</th>
                            <th className="pb-2">Deadline</th>
                            <th className="pb-2 text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody className="font-mono text-neutral-300">
                         <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 pl-2 font-bold text-white">23-042 • Riverside Plaza</td>
                            <td className="py-3">J. Doe</td>
                            <td className="py-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">DESIGN</span></td>
                            <td className="py-3 text-neutral-400">Oct 30</td>
                            <td className="py-3 text-right"><span className="text-emerald-500">● On Track</span></td>
                         </tr>
                         <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 pl-2 font-bold text-white">23-108 • High St. Utility</td>
                            <td className="py-3">M. Smith</td>
                            <td className="py-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">PERMITTING</span></td>
                            <td className="py-3 text-neutral-400">Nov 12</td>
                            <td className="py-3 text-right"><span className="text-amber-500">● Flagged</span></td>
                         </tr>
                         <tr className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 pl-2 font-bold text-white">24-001 • North Ind. Park</td>
                            <td className="py-3">A. Mercer</td>
                            <td className="py-3"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px]">SURVEY</span></td>
                            <td className="py-3 text-neutral-400">Oct 28</td>
                            <td className="py-3 text-right"><span className="text-emerald-500">● On Track</span></td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>

             {/* B. Field Crew & Software (Split Row) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Field Crew Board */}
                <div className="bg-[#121212] border border-white/10 rounded-sm p-5 shadow-sm relative">
                   <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                   <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                         <MapPin size={18} className="text-amber-500" /> 
                         Field Ops
                      </h2>
                      <span className="px-2 py-1 rounded bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-white/5">3 CREWS OUT</span>
                   </div>

                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-xs font-bold text-white">C1</div>
                            <div>
                               <div className="text-xs font-bold text-white">Crew 1 (Topo)</div>
                               <div className="text-[10px] text-neutral-500">Riverside Plaza • ETA 14:00</div>
                            </div>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-xs font-bold text-white">C2</div>
                            <div>
                               <div className="text-xs font-bold text-white">Crew 2 (Stake)</div>
                               <div className="text-[10px] text-neutral-500">High St. • ETA 16:30</div>
                            </div>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-400">C3</div>
                            <div>
                               <div className="text-xs font-bold text-neutral-400">Crew 3</div>
                               <div className="text-[10px] text-neutral-600">Office / Equip Maint.</div>
                            </div>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                   </div>
                </div>

                {/* Software Status */}
                <div className="bg-[#121212] border border-white/10 rounded-sm p-5 shadow-sm relative flex flex-col">
                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                   <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                         <Server size={18} className="text-blue-500" /> 
                         Licenses
                      </h2>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ONLINE
                      </div>
                   </div>

                   <div className="space-y-5 my-auto">
                      <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-300 font-bold">AutoCAD 2024</span>
                            <span className="text-neutral-500 font-mono">18/20 USED</span>
                         </div>
                         <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[90%]"></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-300 font-bold">Civil 3D</span>
                            <span className="text-neutral-500 font-mono">8/15 USED</span>
                         </div>
                         <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[53%]"></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-300 font-bold">ArcGIS Pro</span>
                            <span className="text-neutral-500 font-mono">2/5 USED</span>
                         </div>
                         <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[40%]"></div>
                         </div>
                      </div>
                   </div>
                </div>

             </div>

             {/* 4. TECHNICAL RESOURCES (Quick Links) */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <button className="p-4 bg-[#121212] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all rounded text-left group">
                     <FileText className="text-neutral-500 group-hover:text-indigo-400 mb-3" size={24} />
                     <div className="text-sm font-bold text-white">CAD Standards</div>
                     <div className="text-[10px] text-neutral-500 mt-1">Plot styles, CTBs, DWTs</div>
                 </button>
                 <button className="p-4 bg-[#121212] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all rounded text-left group">
                     <Shield className="text-neutral-500 group-hover:text-indigo-400 mb-3" size={24} />
                     <div className="text-sm font-bold text-white">Specs Library</div>
                     <div className="text-[10px] text-neutral-500 mt-1">Master specs 00-33</div>
                 </button>
                 <button className="p-4 bg-[#121212] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all rounded text-left group">
                     <Users className="text-neutral-500 group-hover:text-indigo-400 mb-3" size={24} />
                     <div className="text-sm font-bold text-white">Survey Control</div>
                     <div className="text-[10px] text-neutral-500 mt-1">Benchmark database</div>
                 </button>
                 <button className="p-4 bg-[#121212] border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all rounded text-left group">
                     <ExternalLink className="text-neutral-500 group-hover:text-indigo-400 mb-3" size={24} />
                     <div className="text-sm font-bold text-white">Muni Codes</div>
                     <div className="text-[10px] text-neutral-500 mt-1">City/County zoning</div>
                 </button>
             </div>
          </div>

          {/* 3. INNOVATION & CULTURE (Right Column - 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             
             {/* Innovation Hub */}
             <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-sm p-5 shadow-[0_0_30px_rgba(79,70,229,0.1)] relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                 
                 <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Cpu size={20} className="text-indigo-400" />
                    <h2 className="text-lg font-bold text-white">AI Innovation Hub</h2>
                 </div>

                 <div className="grid grid-cols-1 gap-3 relative z-10">
                    <button className="flex items-center gap-3 p-3 bg-[#09090b]/60 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-500/20 rounded transition-all group">
                        <div className="p-2 bg-indigo-500/20 rounded text-indigo-400 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all">
                           <Zap size={18} />
                        </div>
                        <div className="text-left">
                           <div className="text-xs font-bold text-white">Drafting Assist</div>
                           <div className="text-[10px] text-indigo-300">Auto-generate notes</div>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-[#09090b]/60 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 rounded transition-all group">
                        <div className="p-2 bg-purple-500/20 rounded text-purple-400 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all">
                           <Search size={18} />
                        </div>
                        <div className="text-left">
                           <div className="text-xs font-bold text-white">Code Lookup</div>
                           <div className="text-[10px] text-purple-300">Jurisdictional Rqs</div>
                        </div>
                    </button>
                 </div>

                 {/* Tech Tip */}
                 <div className="mt-4 pt-4 border-t border-indigo-500/20 relative z-10">
                    <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-2">Tech Tip of the Week</div>
                    <div className="bg-black/40 rounded border border-indigo-500/20 p-3 flex items-start gap-3">
                       <div className="w-16 h-10 bg-neutral-800 rounded flex items-center justify-center shrink-0">
                          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
                       </div>
                       <div>
                          <div className="text-xs font-bold text-white">Civil 3D Corridors</div>
                          <div className="text-[10px] text-neutral-400">Mastering regions & targeting in 2 mins.</div>
                       </div>
                    </div>
                 </div>
             </div>

             {/* Suggestion Box */}
             <div className="bg-[#121212] border border-white/10 rounded-sm p-5">
                 <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={18} className="text-yellow-500" />
                    <h2 className="text-sm font-bold text-white">Ideas & Improvements</h2>
                 </div>
                 <div className="relative">
                    <textarea 
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Suggest a LISP routine, workflow change, or new tool..."
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-yellow-500/50 transition-all resize-none h-24"
                    ></textarea>
                    <button className="absolute bottom-2 right-2 p-1.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition-colors">
                        <Send size={12} />
                    </button>
                 </div>
             </div>

             {/* Culture / Feed */}
             <div className="bg-[#121212] border border-white/10 rounded-sm p-5 flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                        <Coffee size={18} className="text-neutral-400" /> Community
                    </h2>
                 </div>
                 
                 <div className="space-y-4">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 border border-red-500/30">
                           <AlertTriangle size={14} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-white">Safety Briefing</div>
                           <p className="text-[10px] text-neutral-400 mt-0.5">New PPE requirements for highway sites effective Nov 1st.</p>
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 border border-indigo-500/30">
                           <Users size={14} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-white">New Hire</div>
                           <p className="text-[10px] text-neutral-400 mt-0.5">Please welcome Sarah Jenkins (Survey Tech) to the team!</p>
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center shrink-0 border border-white/10">
                           <Calendar size={14} />
                        </div>
                        <div>
                           <div className="text-xs font-bold text-white">Pizza Friday</div>
                           <p className="text-[10px] text-neutral-400 mt-0.5">Break room at 12:00. Sponsored by the Structural Dept.</p>
                        </div>
                     </div>
                 </div>

                 <button className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500 border border-dashed border-neutral-800 hover:border-neutral-600 hover:text-neutral-300 transition-all rounded">
                     View Directory
                 </button>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};
