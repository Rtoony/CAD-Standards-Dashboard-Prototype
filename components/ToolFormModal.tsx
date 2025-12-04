
import React, { useState } from 'react';
import { ToolItem, ToolTier } from '../types';
import { X, Save, Wrench, FileText, AlertCircle, LayoutGrid, Zap, ShieldCheck, Activity } from 'lucide-react';

interface ToolFormModalProps {
  mode: 'CREATE' | 'EDIT';
  initialData?: ToolItem;
  onClose: () => void;
  onSave: (data: Partial<ToolItem>) => void;
}

export const ToolFormModal: React.FC<ToolFormModalProps> = ({ 
  mode, 
  initialData, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<ToolItem>>({
    title: '',
    description: '',
    tier: ToolTier.TIER_2,
    status: 'PLANNED',
    iconName: 'Wrench',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.description?.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const icons = ['Wrench', 'Layers', 'ShieldCheck', 'Map', 'Hash', 'FileCode', 'Calculator', 'Network', 'Zap', 'Terminal'];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#18181b] border border-amber-500/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-amber-500"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#121212] flex justify-between items-center">
          <div>
            <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-1">
              Tool Configuration
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {mode === 'CREATE' ? 'Provision New Utility' : 'Modify Tool Definition'}
            </h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          {/* Title */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                <Wrench size={10} /> Tool Name <span className="text-red-500">*</span>
             </label>
             <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Slope Calculator"
                className={`w-full p-3 bg-[#09090b] border rounded text-sm text-white focus:outline-none transition-colors font-bold ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
             />
             {errors.title && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10}/> {errors.title}</span>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                <FileText size={10} /> Description <span className="text-red-500">*</span>
             </label>
             <textarea 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe functionality..."
                className={`w-full p-3 bg-[#09090b] border rounded text-sm text-white focus:outline-none transition-colors resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-amber-500'}`}
             />
             {errors.description && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10}/> {errors.description}</span>}
          </div>

          {/* Tier & Status */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                   Category Tier
                </label>
                <select 
                   value={formData.tier}
                   onChange={(e) => setFormData({...formData, tier: e.target.value as ToolTier})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
                >
                   <option value={ToolTier.TIER_1}>Tier 1: Essentials</option>
                   <option value={ToolTier.TIER_2}>Tier 2: Power Tools</option>
                   <option value={ToolTier.TIER_3}>Tier 3: Advanced</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                   Deployment Status
                </label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
                >
                   <option value="LIVE">LIVE</option>
                   <option value="BETA">BETA</option>
                   <option value="PLANNED">PLANNED</option>
                </select>
             </div>
          </div>

          {/* Icon Selector */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                System Icon
             </label>
             <div className="flex flex-wrap gap-2 p-3 bg-[#09090b] border border-white/10 rounded">
                {icons.map(icon => (
                    <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({...formData, iconName: icon})}
                        className={`p-2 rounded border transition-all ${formData.iconName === icon ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-neutral-500 border-transparent hover:bg-white/5 hover:text-white'}`}
                    >
                        {/* We assume these are mapped in ToolsModule */}
                        <span className="text-xs font-mono">{icon}</span>
                    </button>
                ))}
             </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-6 bg-[#121212] border-t border-white/10 flex justify-end gap-3">
           <button 
              onClick={onClose}
              className="px-4 py-2 rounded border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider"
           >
              Cancel
           </button>
           <button 
              onClick={handleSubmit}
              className="px-6 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-bold transition-colors text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
           >
              <Save size={14} />
              {mode === 'CREATE' ? 'Deploy Tool' : 'Save Changes'}
           </button>
        </div>

      </div>
    </div>
  );
};
