
import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { X, Save, Briefcase, MapPin, Calendar, Activity, AlertCircle } from 'lucide-react';

interface ProjectFormModalProps {
  mode: 'CREATE' | 'EDIT';
  initialData?: Project;
  onClose: () => void;
  onSave: (data: Partial<Project>) => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ 
  mode, 
  initialData, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    client: '',
    location: '',
    status: 'ACTIVE',
    phase: 'Design Development',
    progress: 0,
    dueDate: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "Project Name is required";
    if (!formData.client?.trim()) newErrors.client = "Client is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#18181b] border border-indigo-500/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative">
        
        {/* Top Accent */}
        <div className="h-1 w-full bg-indigo-600"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#121212] flex justify-between items-center">
          <div>
            <div className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-widest mb-1">
              Job Control
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {mode === 'CREATE' ? 'Open New Job Number' : 'Modify Project Record'}
            </h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          {/* ID Display (Read Only) */}
          {mode === 'EDIT' && (
              <div className="p-2 bg-white/5 border border-white/10 rounded flex justify-between items-center">
                  <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Job Number</span>
                  <span className="text-sm font-mono text-white font-bold">{initialData?.id}</span>
              </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                <Briefcase size={10} /> Project Name <span className="text-red-500">*</span>
             </label>
             <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Smith Creek Subdivision"
                className={`w-full p-3 bg-[#09090b] border rounded text-sm text-white focus:outline-none transition-colors font-bold ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'}`}
             />
             {errors.name && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</span>}
          </div>

          {/* Client & Location */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                   Client <span className="text-red-500">*</span>
                </label>
                <input 
                   type="text"
                   value={formData.client}
                   onChange={(e) => setFormData({...formData, client: e.target.value})}
                   placeholder="Client Name"
                   className={`w-full p-3 bg-[#09090b] border rounded text-sm text-white focus:outline-none transition-colors ${errors.client ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'}`}
                />
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                   <MapPin size={10} /> Location
                </label>
                <input 
                   type="text"
                   value={formData.location}
                   onChange={(e) => setFormData({...formData, location: e.target.value})}
                   placeholder="City, State"
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
                />
             </div>
          </div>

          {/* Status & Due Date */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                   <Activity size={10} /> Status
                </label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as ProjectStatus})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors cursor-pointer"
                >
                   <option value="ACTIVE">ACTIVE</option>
                   <option value="HOLD">HOLD</option>
                   <option value="COMPLETED">COMPLETED</option>
                   <option value="BIDDING">BIDDING</option>
                   <option value="ARCHIVED">ARCHIVED</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider flex items-center gap-2">
                   <Calendar size={10} /> Due Date
                </label>
                <input 
                   type="date"
                   value={formData.dueDate}
                   onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                   className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
                />
             </div>
          </div>

          {/* Phase */}
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                Current Phase
             </label>
             <input 
                type="text"
                value={formData.phase}
                onChange={(e) => setFormData({...formData, phase: e.target.value})}
                placeholder="e.g. Construction Documents"
                className="w-full p-3 bg-[#09090b] border border-white/10 rounded text-sm text-white focus:border-indigo-500 focus:outline-none transition-colors"
             />
          </div>

          {/* Progress Slider */}
          <div className="space-y-2">
             <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Completion</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{formData.progress}%</span>
             </div>
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={formData.progress} 
                onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
             />
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
              className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
           >
              <Save size={14} />
              {mode === 'CREATE' ? 'Initialize Job' : 'Update Record'}
           </button>
        </div>

      </div>
    </div>
  );
};
