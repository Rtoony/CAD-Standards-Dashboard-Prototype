
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { LayoutGrid, ArrowRight, Activity, Users, AlertTriangle, Lightbulb, Terminal, Clock, Database, Shield, Map, Zap, ExternalLink, Quote } from 'lucide-react';

interface HomeModuleProps {
  user: UserProfile;
  onNavigate: (module: string) => void;
}

const TOONY_TIPS = [
    { title: "On GPS Rovers", text: "That little screen lies to you. $0.05' horizontal is a fantasy until you can point to the base station and confirm you tied in the damn control yourself. Digital doesn't mean perfect." },
    { title: "On CAD Standards", text: "If you use a layer called 'Junk' or 'Stuff-Temporary', I will find you. If the layers aren't clean, the client gets garbage." },
    { title: "On Communication", text: "If you have to forward an email more than twice, you've already failed. Get off your chair, walk over to the engineer, and talk to them." },
    { title: "On Field Codes", text: "My LISP routine runs on logic, not fairy dust. Learn your field codes before you ask for more AI tools. Garbage in, garbage out." },
    { title: "On Site Visits", text: "Before you design a road, you drive to the site. You smell it. You talk to the neighbors. You can't design a boundary from a satellite image. You need mud on your boots." }
];

export const HomeModule: React.FC<HomeModuleProps> = ({ user, onNavigate }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotate tips every 10 seconds
  useEffect(() => {
    const duration = 10000; // 10s
    const interval = 100; // update progress every 100ms
    
    const timer = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                setTipIndex(idx => (idx + 1) % TOONY_TIPS.length);
                return 0;
            }
            return prev + (interval / duration) * 100;
        });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const activeTip = TOONY_TIPS[tipIndex];

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)] relative overflow-y-auto custom-scrollbar">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative z-10 p-8 max-w-[1600px] mx-auto w-full">
         
         {/* Welcome Header */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
            <div>
                <div className="flex items-center gap-2 text-indigo-500 mb-1 font-mono text-xs font-bold uppercase tracking-widest">
                    <Activity size={14} /> Operations Center
                </div>
                <h1 className="text-4xl font-bold text-[var(--text-main)] tracking-tight mb-2">
                    Welcome back, {user.name.split(' ')[0]}
                </h1>
                <p className="text-neutral-500 max-w-2xl">
                    System nominal. Field crews are reported active. CAD Standards library v2.4.0 is live.
                </p>
            </div>
            
            <div className="flex gap-3">
                <button 
                    onClick={() => onNavigate('library')}
                    className="flex items-center gap-2 px-5 py-3 bg-[#18181b] border border-[var(--border-main)] text-[var(--text-main)] hover:border-indigo-500 transition-colors rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                    <Database size={16} className="text-indigo-500" />
                    <span>Library</span>
                </button>
                <button 
                    onClick={() => onNavigate('tools')}
                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors rounded-sm text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-indigo-500/20"
                >
                    <Terminal size={16} />
                    <span>Tools</span>
                </button>
            </div>
         </div>

         {/* Main Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- COLUMN 1: ACTIONABLE --- */}
            <div className="space-y-6">
                
                {/* TOONY'S TECH TIP (Rotating) */}
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm shadow-lg relative overflow-hidden group">
                    {/* Header */}
                    <div className="bg-[#121212] p-4 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-wider">
                            <Quote size={14} /> Toony's Tech Tip
                        </div>
                        <div className="text-[9px] font-mono text-neutral-600">TIP #{tipIndex + 1}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 min-h-[180px] flex flex-col justify-center relative z-10">
                        <h3 className="text-lg font-bold text-white mb-3">{activeTip.title}</h3>
                        <p className="text-sm text-neutral-400 italic leading-relaxed">
                            "{activeTip.text}"
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                             <div className="w-6 h-6 rounded bg-neutral-800 border border-white/10 overflow-hidden">
                                 <img src={user.avatarUrl} className="w-full h-full object-cover grayscale opacity-70" alt="Toony" />
                             </div>
                             <span className="text-[10px] font-mono text-neutral-500 uppercase">- Sir R. Toony</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                </div>

                {/* PROJECT SNAPSHOT */}
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm p-0 overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Projects</h3>
                        <button className="text-[10px] text-indigo-400 hover:text-indigo-300 uppercase tracking-wider">View All</button>
                    </div>
                    <table className="w-full text-left text-xs">
                        <thead className="bg-white/5 text-neutral-500 font-mono uppercase">
                            <tr>
                                <th className="p-3 font-medium">Project</th>
                                <th className="p-3 font-medium">Phase</th>
                                <th className="p-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-neutral-300">
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-bold">Smith Creek Subd.</td>
                                <td className="p-3 text-neutral-500">Const. Staking</td>
                                <td className="p-3 text-right text-emerald-500 font-mono">ACTIVE</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-bold">Hwy 101 Widening</td>
                                <td className="p-3 text-neutral-500">Topo Survey</td>
                                <td className="p-3 text-right text-amber-500 font-mono">DELAYED</td>
                            </tr>
                            <tr className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-bold">City Hall Annex</td>
                                <td className="p-3 text-neutral-500">As-Builts</td>
                                <td className="p-3 text-right text-emerald-500 font-mono">ACTIVE</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            {/* --- COLUMN 2: FIELD & OPS --- */}
            <div className="space-y-6">
                
                {/* FIELD CREW BOARD */}
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm p-5 relative">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                        <Map size={16} className="text-emerald-500" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Field Crew Status</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-3 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-white flex items-center gap-2">
                                    <Users size={12} className="text-indigo-400"/> Crew SUR-A (Toony)
                                </span>
                                <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 font-mono">LATE</span>
                            </div>
                            <p className="text-xs text-neutral-400 mb-2">1234 Smith Creek Subdivision</p>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-mono">
                                <Clock size={10} /> ETA Return: 17:30
                            </div>
                        </div>

                        <div className="p-3 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-white flex items-center gap-2">
                                    <Users size={12} className="text-indigo-400"/> Crew SUR-B (Miller)
                                </span>
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">ON SITE</span>
                            </div>
                            <p className="text-xs text-neutral-400 mb-2">Hwy 101 Corridor MP 14</p>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-600 font-mono">
                                <Clock size={10} /> ETA Return: 15:00
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-2 border-t border-white/5">
                        <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 uppercase tracking-wider font-bold">
                            View Full Schedule <ArrowRight size={10} />
                        </a>
                    </div>
                </div>

                {/* SOFTWARE STATUS */}
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm p-5">
                     <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                        <Shield size={16} className="text-indigo-500" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">License Status</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-[10px] text-neutral-400 mb-1 uppercase tracking-wider">
                                <span>Autodesk Civil 3D</span>
                                <span className="text-white font-mono">8/10</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[80%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] text-neutral-400 mb-1 uppercase tracking-wider">
                                <span>ArcGIS Pro</span>
                                <span className="text-white font-mono">2/5</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[40%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] text-neutral-400 mb-1 uppercase tracking-wider">
                                <span>Trimble Business Center</span>
                                <span className="text-amber-500 font-mono">1/1</span>
                            </div>
                            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[100%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- COLUMN 3: INNOVATION & COMMUNITY --- */}
            <div className="space-y-6">
                
                {/* AI INNOVATION HUB */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-[#18181b] border border-indigo-500/30 rounded-sm p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Zap size={64} className="text-indigo-500" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                        <Lightbulb size={16} className="text-yellow-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Innovation Hub</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3 relative z-10">
                        <button className="flex items-center gap-3 p-3 bg-[#09090b]/50 border border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all rounded text-left group">
                            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded group-hover:text-white group-hover:bg-indigo-500 transition-colors">
                                <Terminal size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white group-hover:text-indigo-300">Drafting Assist Agent</div>
                                <div className="text-[10px] text-neutral-500">AI Note Generator</div>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 p-3 bg-[#09090b]/50 border border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all rounded text-left group">
                            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded group-hover:text-white group-hover:bg-emerald-500 transition-colors">
                                <Database size={16} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white group-hover:text-emerald-300">Survey Data Cleaner</div>
                                <div className="text-[10px] text-neutral-500">Raw Point Processing</div>
                            </div>
                        </button>
                        
                        <div className="mt-2 pt-2 border-t border-white/5">
                            <button className="w-full py-2 text-[10px] font-bold text-neutral-400 hover:text-white border border-dashed border-neutral-700 hover:border-neutral-500 rounded uppercase tracking-wider transition-all">
                                + Submit Suggestion
                            </button>
                        </div>
                    </div>
                </div>

                {/* QUICK RESOURCES */}
                <div className="bg-[#18181b] border border-[var(--border-main)] rounded-sm p-5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <ExternalLink size={14} className="text-neutral-500"/> Quick Resources
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block p-2 hover:bg-white/5 rounded text-xs text-neutral-400 hover:text-white transition-colors flex justify-between">
                                <span>Timesheet Portal</span>
                                <ExternalLink size={10} className="opacity-50"/>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block p-2 hover:bg-white/5 rounded text-xs text-neutral-400 hover:text-white transition-colors flex justify-between">
                                <span>Vehicle Reservation</span>
                                <ExternalLink size={10} className="opacity-50"/>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block p-2 hover:bg-white/5 rounded text-xs text-neutral-400 hover:text-white transition-colors flex justify-between">
                                <span>IT Help Ticket</span>
                                <ExternalLink size={10} className="opacity-50"/>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

         </div>

      </div>
    </div>
  );
};
